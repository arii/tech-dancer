import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR } from './visualReviewConstants';
import { postPRComment, countExistingReviews, getJulesSessionIdFromPR, sendJulesMessage } from './visualReviewUtils';
import type { CodeReviewSummary, CodeReviewResult, JsonSchemaContext } from './codeReviewTypes';
import { execSync } from 'child_process';

export interface CodeReviewClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: CodeReviewSummary) => Promise<CodeReviewResult>;
}

const MAX_REVIEWS_PER_PR = parseInt(process.env.MAX_AI_REVIEWS ?? '2', 10);

export async function getCodeDiffSummary(): Promise<CodeReviewSummary> {
  try {
    let diffCommand = 'git diff origin/main...HEAD';
    let nameOnlyCommand = 'git diff --name-only origin/main...HEAD';

    // Verify if origin/main exists, fallback to git history for CI if needed
    try {
        execSync('git rev-parse origin/main', { stdio: 'ignore' });
    } catch {
        diffCommand = 'git diff HEAD~1 HEAD';
        nameOnlyCommand = 'git diff --name-only HEAD~1 HEAD';
    }

    const rawDiff = execSync(diffCommand, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });

    // basic sanity check - just take the first N chars if it's absurdly large to avoid blowing up context
    const maxChars = 20000;
    const diffContext = rawDiff.length > maxChars
      ? rawDiff.slice(0, maxChars) + '\n\n...[TRUNCATED FOR LLM]'
      : rawDiff;

    const files = execSync(nameOnlyCommand, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);

    let schemasContext: string | undefined;
    try {
      const maxSchemaBytes = 10000;
      const MAX_FILES = 10;
      const MAX_DEPTH = 10;
      const MAX_FILE_SIZE = 5000;
      let totalBytes = 0;
      let fileCount = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sanitizePrototypePollution = (obj: any, depth = 0): any => {
        if (depth > MAX_DEPTH) {
            throw new Error(`Exceeded maximum object depth of ${MAX_DEPTH}`);
        }
        if (obj === null || typeof obj !== 'object') {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map(item => sanitizePrototypePollution(item, depth + 1));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cleaned: Record<string, any> = Object.create(null);
        for (const key of Object.keys(obj)) {
          if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
          }
          cleaned[key] = sanitizePrototypePollution(obj[key], depth + 1);
        }
        return cleaned;
      };

      const schemaDir = path.join('docs', 'agent');
      let globFiles: string[] = [];
      try {
        const files = await fs.promises.readdir(schemaDir);
        globFiles = files.filter(f => f.endsWith('.schema.json'));
      } catch {
        // Directory might not exist, ignore
      }

      if (globFiles.length > 0) {
        const schemas: JsonSchemaContext = Object.create(null);
        let successCount = 0;
        let failureCount = 0;

        for (const filename of globFiles) {
          if (fileCount >= MAX_FILES) {
            console.warn(`Reached maximum schema file limit (${MAX_FILES}). Skipping remaining files.`);
            break;
          }
          const nativePath = path.join('docs', 'agent', filename);
          const posixPath = path.posix.join('docs/agent', filename);
          try {
            const stat = await fs.promises.stat(nativePath);
            if (stat.size > MAX_FILE_SIZE) {
                console.warn(`Schema file too large (>${MAX_FILE_SIZE} bytes). Skipping: ${nativePath}`);
                continue;
            }
            if (totalBytes + stat.size > maxSchemaBytes) {
              console.warn(`Schema payload too large. Truncating file: ${nativePath}`);
              continue;
            }
            totalBytes += stat.size;
            fileCount++;

            const content = await fs.promises.readFile(nativePath, 'utf-8');
            let parsed = JSON.parse(content, (key, value) => {
              if (['__proto__', 'constructor', 'prototype'].includes(key)) {
                return undefined;
              }
              return value;
            });
            parsed = sanitizePrototypePollution(parsed);

            if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
                throw new Error(`Parsed schema is not a plain object: ${nativePath}`);
            }

            if (!parsed['$schema'] && !parsed['title'] && !parsed['type']) {
                throw new Error(`Parsed schema missing structural JSON Schema identifiers ($schema, title, type): ${nativePath}`);
            }

            schemas[posixPath] = parsed as Record<string, unknown>;
            successCount++;
          } catch (e) {
            console.warn(`Could not parse schema file ${nativePath}:`, e);
            failureCount++;
          }
        }

        if (successCount === 0) {
            console.warn(`No schemas were successfully parsed. Context will not be included.`);
            schemasContext = undefined;
        } else {
            if (failureCount > 0) {
                console.warn(`${failureCount} schema(s) failed to parse. Proceeding with ${successCount} successful schemas.`);
            }
            schemasContext = JSON.stringify(schemas);
        }
      }
    } catch (error) {
      console.warn('Could not find or parse schema files:', error);
    }

    return {
      files,
      diffContext,
      schemasContext
    };
  } catch (error) {
    console.warn('Could not generate code diff:', error);
    return { files: [], diffContext: '' };
  }
}

export function generateCodeReviewMarkdown(
  result: CodeReviewResult,
  client: CodeReviewClientStrategy
): string {
  const prNumber = process.env.PR_NUMBER;
  const prLink = prNumber ? `[PR #${prNumber}](https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${prNumber})` : 'this PR';

  let costLine = '';
  if (result.cost > 0) {
    costLine = `**Cost:** ~$${result.cost.toFixed(5)} (${result.tokens} tokens)\n`;
  }

  return `## ${client.reportTitle}

> ${client.botTagline}

**Reviewing:** ${prLink}
${costLine}

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
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  const summary = await getCodeDiffSummary();

  if (summary.files.length === 0 || !summary.diffContext) {
    console.log(`✅ No code changes detected — skipping agent review.`);
    fs.writeFileSync(agentReportPath, `## ${client.reportTitle}\n\nNo code changes detected.\n`);
    fs.writeFileSync(path.join(ARTIFACTS_DIR, `${client.reportFileName.replace('.md', '')}-verdict.json`), JSON.stringify({ passed: true, highCount: 0, routes: [], llmVerdict: 'pass' }, null, 2));
    return;
  }

  console.log(`🤖 Reviewing code diff with ${client.botName}...`);

  const reviewResult = await client.invokeReview(summary);
  const report = generateCodeReviewMarkdown(reviewResult, client);

  // Write local report
  fs.writeFileSync(agentReportPath, report);
  console.log(`✅ Local report written to ${agentReportPath}`);

  // Post to GitHub PR
  await postPRComment(report, client.reportTitle);

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
    llmVerdict: reviewResult.llmVerdict
  }, null, 2));

  if (isFail) {
    console.error(`❌ Code review returned FAIL — failing CI.`);
    process.exit(1);
  }
}
