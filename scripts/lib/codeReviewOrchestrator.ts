import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR } from './visualReviewConstants';
import { postPRComment, countExistingReviews, getJulesSessionIdFromPR, sendJulesMessage, getPreviousReviewState } from './visualReviewUtils';
import type { CodeReviewSummary, CodeReviewResult, CodeReviewState } from './codeReviewTypes';
import { execSync, spawnSync } from 'child_process';

export interface CodeReviewClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: CodeReviewSummary) => Promise<CodeReviewResult>;
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

export async function getCodeDiffSummary(): Promise<CodeReviewSummary> {
  try {
    let diffCommand = 'git diff -U10 HEAD~1 HEAD';
    let nameOnlyCommand = 'git diff --name-only HEAD~1 HEAD';

    // Verify if origin/main exists, fallback to git history for CI if needed
    try {
      execSync('git rev-parse origin/main', { stdio: 'ignore' });
      diffCommand = 'git diff -U10 origin/main...HEAD';
      nameOnlyCommand = 'git diff --name-only origin/main...HEAD';
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
    const rawDiff = execSync(diffCommand, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });

    // basic sanity check - just take the first N chars if it's absurdly large to avoid blowing up context
    const maxChars = 100000;
    const diffContext = rawDiff.length > maxChars
      ? rawDiff.slice(0, maxChars) + '\n\n...[TRUNCATED FOR LLM — diff continues beyond this point, do not assume missing context means missing code]'
      : rawDiff;

    const fullDiff = rawDiff;
    const prGoal = await fetchPRGoal();
    const files = execSync(nameOnlyCommand, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);

    // Context gathering
    const externalFilePaths = new Set<string>();

    // Extract baseRef for git diff <baseRef> -- <file>
    // diffCommand examples: 'git diff origin/main...HEAD', 'git diff main...HEAD', 'git diff HEAD~1 HEAD'
    const diffParts = diffCommand.split(' ');
    const diffSpec = diffParts[2] || 'HEAD~1';
    const baseRef = diffSpec.split('...')[0] || 'HEAD~1';

    for (const file of files) {
      if (!fs.existsSync(file)) continue;

      try {
        const diffResult = spawnSync('git', ['diff', baseRef, '--', file], { encoding: 'utf-8' });
        const fileDiff = diffResult.stdout || '';
        const fileContent = fs.readFileSync(file, 'utf-8');
        const imports = parseImports(fileContent);

        // Identify which imported symbols are used in the diff
        for (const [symbol, importPath] of imports.entries()) {
          // Use a safer regex that handles characters like $ and ensures word boundaries correctly
          const symbolRegex = new RegExp(`(?:^|[^a-zA-Z0-9_$])${escapeRegExp(symbol)}(?:[^a-zA-Z0-9_$]|$)`);
          if (symbolRegex.test(fileDiff)) {
            const resolved = resolveImportPath(importPath, file);
            if (resolved && resolved !== file) externalFilePaths.add(resolved);
          }
        }
      } catch (err) {
        console.warn(`Could not gather context for ${file}:`, err);
      }
    }

    let externalContext = '';
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

    return {
      diffContext,
      fullDiff,
      prGoal,
      externalContext: hasRealContent ? externalContext.trim() : undefined,
    };
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

  return `## ${client.reportTitle}

> ${client.botTagline}

**Reviewing:** ${prLink}
${costLine}
${modelLine}

### Code Review Feedback
${result.feedback}

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

  const summary = await getCodeDiffSummary();

  // Load previous state and auto-resolve findings that are no longer in the diff
  const prevState = await getPreviousReviewState<CodeReviewState>(client.reportTitle);
  if (prevState?.findings && Array.isArray(prevState.findings)) {
    for (const finding of prevState.findings) {
      if (finding.status === 'open' && finding.snippet) {
        // Use fullDiff for auto-resolution check to avoid truncation issues
        const diffToCheck = summary.fullDiff || summary.diffContext;
        if (!diffToCheck.includes(finding.snippet)) {
          finding.status = 'resolved';
          finding.fixSummary = 'Jules response: snippet no longer present in diff.';
          console.log(`✅ Auto-resolved finding: ${finding.issue}`);
        }
      }
    }
    summary.previousState = prevState;
  }

  if (!summary.diffContext) {
    console.log(`✅ No code changes detected — skipping agent review.`);
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nNo code changes detected.\n`);
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  console.log(`🤖 Reviewing code diff with ${client.botName}...`);

  let reviewResult = await client.invokeReview(summary);

  // HARD GATE: a truncated/malformed response must never silently resolve to PASS.
  // A cut-off <findings> block, or a verdict tag that got chopped off the end,
  // both currently degrade to the parser's default ('pass', undefined state) —
  // which would let real bugs slip through with zero signal anyone is missing.
  if (reviewResult.truncated || reviewResult.parseError) {
    const reason = reviewResult.truncated 
      ? "was truncated before completion (likely an output token limit)"
      : `had a malformed findings block (parse error: ${reviewResult.parseError})`;
    console.error(
      `❌ ${client.botName} output ${reason} — treating as inconclusive, not PASS.`
    );
    reviewResult = {
      ...reviewResult,
      llmVerdict: 'warn',
      feedback: `${reviewResult.feedback}\n\n---\n⚠️ **Review incomplete:** the model's response ${reason}. This review could not verify all findings and should not be treated as a clean pass. Consider re-running.`,
    };
  }

  reviewResult = reconcileVerdict(reviewResult, summary.fullDiff || summary.diffContext);


  // Merge findings in orchestrator instead of relying solely on LLM
  // This prevents data loss if LLM forgets to echo back some findings
  if (reviewResult.state && summary.previousState) {
    const existingIds = new Set(reviewResult.state.findings.map(f => f.id));
    const missingFindings = summary.previousState.findings.filter(f => !existingIds.has(f.id));
    if (missingFindings.length > 0) {
      console.log(`♻️  Restoring ${missingFindings.length} findings omitted by LLM.`);
      reviewResult.state.findings.push(...missingFindings);
    }
  }

  const report = generateCodeReviewMarkdown(reviewResult, client);

  // Write local report
  fs.writeFileSync(agentReportPath, report);
  console.log(`✅ Local report written to ${agentReportPath}`);

  // Post to GitHub PR
  await postPRComment(report, client.reportTitle, reviewResult.state);

  // Also alert Jules if this PR is from a Jules session
  const julesSessionId = await getJulesSessionIdFromPR();
  if (julesSessionId) {
    const isFail = reviewResult.llmVerdict === 'fail';
    const passFailMsg = isFail ? "FAIL ❌" : "PASS ✅";
    const julesMessage = `[${client.reportTitle}] posted a code review (${passFailMsg}). Please read the review comments on the PR, analyze the diff context provided, and fix any failed or warned areas.`;
    await sendJulesMessage(julesSessionId, julesMessage);
  }

  // Write a structured result file alongside the markdown
  const isFail = reviewResult.llmVerdict === 'fail';

  const verdictPath = path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`);
  fs.writeFileSync(verdictPath, JSON.stringify({
    passed: !isFail,
    highCount: isFail ? 1 : 0,
    routes: [], // To maintain schema compatibility with visual-review if needed
    llmVerdict: reviewResult.llmVerdict,
    state: reviewResult.state
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
function reconcileVerdict(
  result: CodeReviewResult,
  diffForVerification: string
): CodeReviewResult {
  // If we couldn't parse findings at all but the model's prose still claims
  // a FAIL, that's a parsing/format failure, not evidence — don't trust it blind.
  if (result.llmVerdict === 'fail' && !result.state) {
    console.warn(`⚠️  FAIL verdict with no parseable findings — downgrading to WARN.`);
    return { ...result, llmVerdict: 'warn' };
  }

  if (result.llmVerdict !== 'fail' || !result.state?.findings?.length) {
    return result;
  }

  const newFindings = result.state.findings.filter(f => f.status !== 'resolved');
  if (newFindings.length === 0) return result;

  const hasCredibleBlocker = newFindings.some(f => {
    const text = `${f.issue} ${f.fixSummary ?? ''}`;
    if (HEDGE_PATTERN.test(text)) return false;
    if (f.snippet && !diffForVerification.includes(f.snippet)) return false;
    return true;
  });

  if (!hasCredibleBlocker) {
    console.warn(
      `⚠️  Downgrading FAIL→WARN: no finding had both verifiable evidence and non-hedged language.`
    );
    return { ...result, llmVerdict: 'warn' };
  }

  return result;
}