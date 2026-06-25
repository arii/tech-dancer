import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR } from './visualReviewConstants';
import { postPRComment, countExistingReviews, getJulesSessionIdFromPR, sendJulesMessage, getPreviousReviewState } from './visualReviewUtils';
import { calculateEstimatedTokens, cleanupFeedback, batchFiles } from './codeReviewUtils';
import type { CodeReviewSummary, CodeReviewResult, CodeReviewState, CodeReviewRole } from './codeReviewTypes';
import { execSync, spawnSync } from 'child_process';
import { logReviewExecution } from './aiLogger';

export interface CodeReviewClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: CodeReviewSummary, forceMaxOutputTokens?: number) => Promise<CodeReviewResult>;
}

const MAX_REVIEWS_PER_PR = parseInt(process.env.MAX_AI_REVIEWS ?? '10', 10);

async function fetchPRGoal(): Promise<string | undefined> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const prNumber = process.env.PR_NUMBER;
  if (!token || !repo || !prNumber) return undefined;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/pulls/${prNumber}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return undefined;
    const pr = await res.json() as { title: string; body: string | null };
    const body = pr.body?.trim() ? `\n\n${pr.body.trim()}` : '';
    return `${pr.title}${body}`;
  } catch {
    return undefined;
  }
}

function parseImports(content: string): Map<string, string> {
  const imports = new Map<string, string>();
  const importRegex = /import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    let symbolsPart = match[1].trim();
    const importPath = match[2];

    // Remove 'type ' prefix if it exists
    if (symbolsPart.startsWith('type ')) {
      symbolsPart = symbolsPart.slice(5).trim();
    }

    if (symbolsPart.includes('{')) {
      const curlyMatch = symbolsPart.match(/\{([\s\S]*?)\}/);
      if (curlyMatch) {
        const curlySymbols = curlyMatch[1].split(',');
        for (let s of curlySymbols) {
          s = s.trim();
          if (!s) continue;
          if (s.startsWith('type ')) {
            s = s.slice(5).trim();
          }
          const parts = s.split(/\s+as\s+/);
          const localName = parts[parts.length - 1].trim();
          imports.set(localName, importPath);
        }
      }
      const beforeCurlies = symbolsPart.split('{')[0].replace(/,/g, '').trim();
      if (beforeCurlies) {
        imports.set(beforeCurlies, importPath);
      }
    } else if (symbolsPart.includes('* as ')) {
      const parts = symbolsPart.split(/\s+as\s+/);
      const localName = parts[parts.length - 1].trim();
      imports.set(localName, importPath);
    } else if (symbolsPart) {
      imports.set(symbolsPart, importPath);
    }
  }
  return imports;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveImportPath(importPath: string, currentFile: string): string | undefined {
  let resolvedPath: string;
  if (importPath.startsWith('@/')) {
    resolvedPath = path.join('src', importPath.slice(2));
  } else if (importPath.startsWith('.')) {
    resolvedPath = path.join(path.dirname(currentFile), importPath);
  } else {
    // Likely a node module, skip for now as we want project-specific interfaces
    return undefined;
  }

  const extensions = ['.tsx', '.ts', '.d.ts', '.jsx', '.js'];
  try {
    if (fs.existsSync(resolvedPath) && fs.lstatSync(resolvedPath).isFile()) {
      return resolvedPath;
    }

    for (const ext of extensions) {
      if (fs.existsSync(resolvedPath + ext)) {
        return resolvedPath + ext;
      }
    }

    for (const ext of extensions) {
      const indexPath = path.join(resolvedPath, 'index' + ext);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export async function getCodeDiffSummary(targetFiles?: string[]): Promise<CodeReviewSummary> {
  try {
    const baseRef = process.env.GITHUB_BASE_REF || 'origin/main';
    let diffCommand = `git diff -U10 ${baseRef}...HEAD`;
    let nameOnlyCommand = `git diff --name-only ${baseRef}...HEAD`;

    // Verify if baseRef exists, fallback to git history for CI if needed
    try {
      execSync(`git rev-parse ${baseRef}`, { stdio: 'ignore' });
    } catch {
      try {
        execSync('git rev-parse main', { stdio: 'ignore' });
        diffCommand = 'git diff -U10 main...HEAD';
        nameOnlyCommand = 'git diff --name-only main...HEAD';
      } catch {
        diffCommand = 'git diff -U10 HEAD~1 HEAD';
        nameOnlyCommand = 'git diff --name-only HEAD~1 HEAD';
      }
    }

    let rawDiff: string;
    if (targetFiles && targetFiles.length > 0) {
      const quotedFiles = targetFiles.map(f => `"${f}"`).join(' ');
      const specificDiffCommand = `${diffCommand} -- ${quotedFiles}`;
      rawDiff = execSync(specificDiffCommand, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });
    } else {
      rawDiff = execSync(diffCommand, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });
    }

    // basic sanity check - just take the first N chars if it's absurdly large to avoid blowing up context
    const maxChars = 60000;
    const diffContext = rawDiff.length > maxChars
      ? rawDiff.slice(0, maxChars) + '\n\n...[TRUNCATED FOR LLM — diff continues beyond this point, do not assume missing context means missing code]'
      : rawDiff;


    const fullDiff = rawDiff;
    const prGoal = await fetchPRGoal();
    const files = targetFiles || execSync(nameOnlyCommand, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);


    // Context gathering
    const externalFilePaths = new Set<string>();
    let localDefinitions = '';

    // Extract baseRef for git diff <baseRef> -- <file>
    // diffCommand examples: 'git diff origin/main...HEAD', 'git diff main...HEAD', 'git diff HEAD~1 HEAD'
    const diffParts = diffCommand.split(' ');
    const diffSpec = diffParts[2] || 'HEAD~1';
    const contextBaseRef = diffSpec.split('...')[0] || 'HEAD~1';

    for (const file of files) {
      if (!fs.existsSync(file)) continue;

      try {
        const diffResult = spawnSync('git', ['diff', contextBaseRef, '--', file], { encoding: 'utf-8' });
        const fileDiff = diffResult.stdout || '';
        const fileContent = fs.readFileSync(file, 'utf-8');
        const imports = parseImports(fileContent);

        // Identify which imported symbols are used in the diff
        const symbolsUsedInDiff = new Set<string>();
        const wordRegex = /[a-zA-Z0-9_$]+/g;
        let wordMatch;
        while ((wordMatch = wordRegex.exec(fileDiff)) !== null) {
          symbolsUsedInDiff.add(wordMatch[0]);
        }

        for (const [symbol, importPath] of imports.entries()) {
          if (symbolsUsedInDiff.has(symbol)) {
            const resolved = resolveImportPath(importPath, file);
            if (resolved && resolved !== file) externalFilePaths.add(resolved);
          }
        }

        // Also look for definitions of symbols used in diff that are NOT imports
        // (likely defined in the same file but outside the diff window)
        const fileLines = fileContent.split('\n');
        for (const symbol of symbolsUsedInDiff) {
          if (!imports.has(symbol)) {
            // Very basic heuristic: look for "const symbol", "function symbol", "class symbol", "interface symbol", "type symbol"
            const defRegex = new RegExp(`(?:export\\s+)?(?:const|let|var|function|class|interface|type)\\s+${escapeRegExp(symbol)}\\b`);
            const defLineIndex = fileLines.findIndex(line => defRegex.test(line));
            if (defLineIndex !== -1) {
              // Only include if it's NOT already in the diff (diff-U10 usually covers 10 lines)
              // We'll just include a small window of the definition to external context
              const start = Math.max(0, defLineIndex - 2);
              const end = Math.min(fileLines.length, defLineIndex + 15);
              const defSnippet = fileLines.slice(start, end).join('\n');

              // We append this to externalContext later, for now we can just store it
              // Or better, we can treat the same file as an "external" file if we want to reuse the mechanism
              // but since externalFilePaths works with paths, let's just use a special handling or a pseudo-path
              // For simplicity, let's just append it to a dedicated string for now
              localDefinitions += `\n\n--- LOCAL DEF: ${file}:${defLineIndex + 1} (${symbol}) ---\n${defSnippet}`;
            }
          }
        }
      } catch (err) {
        console.warn(`Could not gather context for ${file}:`, err);
      }
    }

    let externalContext = localDefinitions;
    const maxExternalChars = 30000;
    for (const extPath of externalFilePaths) {
      if (externalContext.length >= maxExternalChars) break;
      if (fs.existsSync(extPath)) {
        const content = fs.readFileSync(extPath, 'utf-8');
        externalContext += `\n\n--- FILE: ${extPath} ---\n${content}`;
      }
    }

    if (externalContext.length > maxExternalChars) {
      externalContext = externalContext.slice(0, maxExternalChars) + '\n\n...[TRUNCATED EXTERNAL CONTEXT]';
    }

    const hasRealContent = externalContext.replace(/\n\n\.\.\.\[TRUNCATED EXTERNAL CONTEXT\]/g, '').trim().length > 0;

    // AI Context enrichment
    let impactSemanticContext = '';
    try {
      const batchFiles = [];
      for (const file of files) {
        if (!fs.existsSync(file)) continue;
        const fileDiff = spawnSync('git', ['diff', contextBaseRef, '--', file], { encoding: 'utf-8' }).stdout || '';
        if (fileDiff) {
          batchFiles.push({ path: file, diff: fileDiff });
        }
      }

      if (batchFiles.length > 0) {
        const inputData = JSON.stringify({ files: batchFiles });
        const res = spawnSync('python3', ['dev-tools/get_ai_context.py'], {
          input: inputData,
          encoding: 'utf-8',
          maxBuffer: 1024 * 1024 * 50 // 50MB buffer for large diffs
        });

        if (res.status === 0 && res.stdout) {
          const contextResults = JSON.parse(res.stdout);
          for (const ctx of contextResults) {
            if (ctx.dependencies?.length || ctx.dependents?.length || ctx.semantic?.length) {
              impactSemanticContext += `\n\n### Context for ${ctx.path}\n`;
              if (ctx.dependencies?.length) impactSemanticContext += `- Dependencies: ${ctx.dependencies.join(', ')}\n`;
              if (ctx.dependents?.length) impactSemanticContext += `- Impacted (dependents): ${ctx.dependents.join(', ')}\n`;
              if (ctx.semantic?.length) {
                impactSemanticContext += `- Semantically related snippets:\n`;
                for (const s of ctx.semantic) {
                  impactSemanticContext += `  - From ${s.path}:\n    \`\`\`\n    ${s.document.slice(0, 300).replace(/\n/g, '\n    ')}\n    \`\`\`\n`;
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Could not gather impact/semantic context:', err);
    }

    const summary: CodeReviewSummary = {
      diffContext,
      fullDiff,
      prGoal,
      changedFiles: files,
      externalContext: hasRealContent ? externalContext.trim() : undefined,
      impactSemanticContext: impactSemanticContext.trim() || undefined,
    };

    summary.estimatedInputTokens = calculateEstimatedTokens([
      summary.diffContext,
      summary.externalContext || ''
    ]);

    return summary;
  } catch (error) {
    console.warn('Could not generate code diff:', error);
    return { diffContext: '' };
  }
}

export function generateCodeReviewMarkdown(
  result: CodeReviewResult,
  client: CodeReviewClientStrategy
): string {
  const prNumber = process.env.PR_NUMBER;
  const prLink = prNumber ? `[PR #${prNumber}](https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${prNumber})` : 'this PR';

  // AFTER
  let costLine = '';
  if (result.cost > 0) {
    costLine = `**Cost:** ~$${result.cost.toFixed(5)} (${result.tokens} tokens)\n`;
  }
  const modelLine = result.modelName ? `**Model:** ${result.modelName}\n` : '';

  const displayFeedback = cleanupFeedback(result.feedback);

  return `## ${client.reportTitle}

> ${client.botTagline}

**Reviewing:** ${prLink}
${costLine}
${modelLine}

### Code Review Feedback
${displayFeedback}

---
*Generated by ${client.botName}*
`;
}

export async function orchestrateCodeReview(
  client: CodeReviewClientStrategy,
  allReportTitles: string[] = []
): Promise<void> {
  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }

  const agentReportPath = path.join(ARTIFACTS_DIR, client.reportFileName);

  const existing = await countExistingReviews(allReportTitles);
  if (existing >= MAX_REVIEWS_PER_PR) {
    console.log(`⏭️  Skipping ${client.botName} — ${existing}/${MAX_REVIEWS_PER_PR} reviews already posted.`);
    fs.writeFileSync(
      agentReportPath,
      `## ${client.reportTitle}\n\nSkipped: review quota (${MAX_REVIEWS_PER_PR}) already met.\n`
    );
    const prevState = await getPreviousReviewState<CodeReviewState>(client.reportTitle);
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({
      passed: true,
      highCount: 0,
      routes: [],
      llmVerdict: 'pass',
      state: prevState
    }, null, 2));
    return;
  }

  // Get initial summary to find changed files
  const initialSummary = await getCodeDiffSummary();
  if (!initialSummary.diffContext) {
    console.log(`✅ No code changes detected — skipping agent review.`);
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nNo code changes detected.\n`);
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  const prevState = await getPreviousReviewState<CodeReviewState>(client.reportTitle);
  const changedFiles = initialSummary.changedFiles || [];

  // Batch files (max 10 per batch)
  const fileBatches = batchFiles(changedFiles, 10);
  const roles: CodeReviewRole[] = ['SECURITY', 'PERFORMANCE', 'STYLE', 'ARCHITECTURE'];

  console.log(`🤖 Reviewing ${changedFiles.length} files in ${fileBatches.length} batches with ${roles.length} specialized agents...`);

  const orchestratorStartTime = Date.now();
  const reviewPromises: Promise<CodeReviewResult>[] = [];

  for (const batch of fileBatches) {
    const batchSummaryPromise = getCodeDiffSummary(batch);

    for (const role of roles) {
      reviewPromises.push((async () => {
        const summary = { ...(await batchSummaryPromise), role, previousState: prevState };

        const startTime = Date.now();
        let result = await client.invokeReview(summary);

        if (result.truncated) {
          logReviewExecution('code-review', result, result.durationMs ?? (Date.now() - startTime));
          const retryStartTime = Date.now();
          result = await client.invokeReview(summary, 8192);
          result.durationMs = result.durationMs ?? (Date.now() - retryStartTime);
        } else {
          result.durationMs = result.durationMs ?? (Date.now() - startTime);
        }

        logReviewExecution('code-review', result, result.durationMs);

        // Final verification/reconciliation
        result = reconcileVerdict(result, summary.fullDiff || summary.diffContext);
        return result;
      })());
    }
  }

  const allResults = await Promise.all(reviewPromises);
  const orchestratorDurationMs = Date.now() - orchestratorStartTime;

  // Aggregation logic
  let aggregatedFeedback = '';
  const aggregatedFindings = [];
  let totalTokens = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCacheTokens = 0;
  let totalCost = 0;
  let finalVerdict: 'pass' | 'fail' | 'warn' = 'pass';
  const modelNames = new Set<string>();

  for (const res of allResults) {
    if (res.feedback) {
      aggregatedFeedback += `\n\n#### [${res.role}] Review\n${res.feedback}`;
    }
    if (res.state?.findings) {
      aggregatedFindings.push(...res.state.findings);
    }
    totalTokens += res.tokens;
    totalInputTokens += res.inputTokens ?? 0;
    totalOutputTokens += res.outputTokens ?? 0;
    totalCacheTokens += res.cacheTokens ?? 0;
    totalCost += res.cost;

    if (res.llmVerdict === 'fail') finalVerdict = 'fail';
    else if (res.llmVerdict === 'warn' && finalVerdict !== 'fail') finalVerdict = 'warn';

    if (res.modelName) modelNames.add(res.modelName);
  }

  // Restore findings omitted by LLM if we have previous state
  if (prevState?.findings) {
    const currentIds = new Set(aggregatedFindings.map(f => f.id));
    const missingFindings = prevState.findings.filter(f => !currentIds.has(f.id));
    if (missingFindings.length > 0) {
      console.log(`♻️  Restoring ${missingFindings.length} findings omitted by LLM agents.`);
      aggregatedFindings.push(...missingFindings);
    }
  }

  const finalResult: CodeReviewResult = {
    feedback: aggregatedFeedback.trim(),
    tokens: totalTokens,
    inputTokens: totalInputTokens,
    outputTokens: totalOutputTokens,
    cacheTokens: totalCacheTokens,
    cost: totalCost,
    llmVerdict: finalVerdict,
    state: { findings: aggregatedFindings },
    modelName: Array.from(modelNames).join(', '),
    durationMs: orchestratorDurationMs,
  };

  const report = generateCodeReviewMarkdown(finalResult, client);

  // Write local report
  fs.writeFileSync(agentReportPath, report);
  console.log(`✅ Local report written to ${agentReportPath}`);

  // Post to GitHub PR
  await postPRComment(report, client.reportTitle, finalResult.state);

  // Also alert Jules if this PR is from a Jules session
  const julesSessionId = await getJulesSessionIdFromPR();
  if (julesSessionId) {
    const isFail = finalResult.llmVerdict === 'fail';
    const passFailMsg = isFail ? "FAIL ❌" : "PASS ✅";
    const julesMessage = `[${client.reportTitle}] posted an aggregated code review (${passFailMsg}). Please read the review comments on the PR, analyze the diff context provided, and fix any failed or warned areas.`;
    await sendJulesMessage(julesSessionId, julesMessage);
  }

  const isFail = finalResult.llmVerdict === 'fail';
  const verdictPath = path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`);
  fs.writeFileSync(verdictPath, JSON.stringify({
    passed: !isFail,
    highCount: isFail ? 1 : 0,
    routes: [],
    llmVerdict: finalResult.llmVerdict,
    state: finalResult.state
  }, null, 2));

  if (isFail) {
    console.error(`❌ Code review returned FAIL — failing CI.`);
    process.exit(1);
  }
}


const HEDGE_PATTERN = /\b(may|might|could|possibly|unless|if not handled|potentially|likely)\b/i;

/**
 * Defends against the LLM ignoring its own severity rules: downgrades a FAIL
 * verdict to WARN if every finding backing it either (a) contains hedge
 * language the prompt explicitly says is non-blocking, or (b) cites a
 * snippet that doesn't actually appear in the diff it was given.
 */
export function reconcileVerdict(
  result: CodeReviewResult,
  diffForVerification: string
): CodeReviewResult {
  // If we couldn't parse findings at all but the model's prose still claims
  // a FAIL, that's a parsing/format failure, not evidence — don't trust it blind.
  if (result.llmVerdict === 'fail' && !result.state) {
    console.warn(`⚠️  FAIL verdict with no parseable findings — downgrading to WARN.`);
    return { ...result, llmVerdict: 'warn' };
  }

  let reconciledState = result.state;

  if (result.state?.findings?.length) {
    // Pre-process lines for easier matching
    const diffLines = diffForVerification.split('\n');
    const cleanDiffLines = diffLines.map(l => l.replace(/^([ +-])/, '').trim());

    // Scrub/Verify findings against hallucination
    const verifiedFindings = result.state.findings.map(f => {
      if (f.status === 'resolved' || !f.snippet) return f;

      const snippet = f.snippet.trim();
      if (!snippet) return f;

      // A snippet is "verifiable" if it exists exactly or as a full line (minus diff markers/indentation)
      const isExactMatch = diffForVerification.includes(f.snippet);
      const isFullLineMatch = cleanDiffLines.some(line => line === snippet);

      const verified = isExactMatch || isFullLineMatch;

      if (!verified) {
        console.warn(`🚫 Hallucinated snippet detected in ${f.file}: "${snippet}"`);
        return {
          ...f,
          issue: `[UNVERIFIED] ${f.issue}`,
          fixSummary: `Automatically invalidated: snippet not found in diff context.`,
          status: 'resolved',
        };
      }

      // STRICT SNIPPET RULE: It must be a full line. If it's only a substring, it might be truncated.
      // We specifically target "syntax error" claims which are the classic hallucination pattern
      // when a line is truncated in the LLM's reasoning.
      const issueLower = f.issue.toLowerCase();
      if (!isFullLineMatch && isExactMatch && (issueLower.includes('syntax error') || issueLower.includes('missing property') || issueLower.includes('missing method'))) {
        console.warn(`⚠️  Suspicious truncated snippet claiming syntax error: "${snippet}"`);
        return {
          ...f,
          issue: `[SUSPECTED TRUNCATION] ${f.issue}`,
          fixSummary: `Automatically invalidated: cites a truncated line which often triggers false syntax errors.`,
          status: 'resolved',
        };
      }

      return f;
    });

    reconciledState = {
      ...result.state,
      findings: verifiedFindings,
    };
  }

  const reconciledResult = {
    ...result,
    state: reconciledState,
  };

  if (reconciledResult.llmVerdict !== 'fail') {
    return reconciledResult;
  }

  const newFindings = reconciledResult.state?.findings?.filter(f => f.status !== 'resolved') || [];
  if (newFindings.length === 0) {
    console.warn(`⚠️  Downgrading FAIL→WARN: all findings were invalidated or already resolved.`);
    return { ...reconciledResult, llmVerdict: 'warn' };
  }

  const hasCredibleBlocker = newFindings.some(f => {
    const text = `${f.issue} ${f.fixSummary ?? ''}`;
    if (HEDGE_PATTERN.test(text)) return false;
    // Verification already performed in the mapping step above
    return true;
  });

  if (!hasCredibleBlocker) {
    console.warn(
      `⚠️  Downgrading FAIL→WARN: no finding had both verifiable evidence and non-hedged language.`
    );
    return { ...reconciledResult, llmVerdict: 'warn' };
  }

  return reconciledResult;
}