import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR } from './visualReviewConstants';
import type { CodeReviewSummary, CodeReviewResult } from './codeReviewTypes';
import { execFile as execFileCb, spawn } from 'child_process';
import { promisify } from 'util';
import { loadProjectConfig } from './projectConfig';

const execFile = promisify(execFileCb);
const projectConfig = loadProjectConfig();
const MAX_DIFF_CHARS = projectConfig.max_diff_chars;

export interface CodeReviewClientStrategy {
  botName: string;
  reportTitle: string;
  botTagline: string;
  reportFileName: string;
  invokeReview: (summary: CodeReviewSummary, forceMaxOutputTokens?: number) => Promise<CodeReviewResult>;
}

async function getAIContext(inputData: string): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    const child = spawn('td-cli', ['ai', 'get-context']);
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });
    child.on('close', (code) => {
      if (code === 0) {
        try { resolve(JSON.parse(stdout)); }
        catch { reject(new Error('Failed to parse AI context')); }
      } else {
        reject(new Error(`AI context error: ${stderr}`));
      }
    });
    child.stdin.write(inputData);
    child.stdin.end();
  });
}

export async function getCodeDiffSummary(targetFiles?: string[]): Promise<CodeReviewSummary> {
    const baseRef = process.env.GITHUB_BASE_REF || projectConfig.base_branch || 'main';
    const diffArgs = ['diff', '-U10', `${baseRef}...HEAD`];
    const nameOnlyArgs = ['diff', '--name-only', `${baseRef}...HEAD`];

    let rawDiff: string;
    if (targetFiles && targetFiles.length > 0) {
      const res = await execFile('git', [...diffArgs, '--', ...targetFiles]);
      rawDiff = res.stdout;
    } else {
      const res = await execFile('git', diffArgs);
      rawDiff = res.stdout;
    }

    let isTruncated = false;
    let diffStat: string | undefined = undefined;
    let diffContext = rawDiff;

    if (rawDiff.length > MAX_DIFF_CHARS) {
        isTruncated = true;
        const res = await execFile('git', ['diff', '--stat', `${baseRef}...HEAD`, '--', ...(targetFiles || [])]);
        diffStat = res.stdout;
        diffContext = rawDiff.slice(0, MAX_DIFF_CHARS) +
            `\n\n...[TRUNCATED FOR LLM]\n\nDIFF STAT SUMMARY:\n${diffStat}\n\n[The diff was truncated at ${MAX_DIFF_CHARS} characters. AI analysis may be incomplete.]`;
    }

    const resFiles = await execFile('git', nameOnlyArgs);
    const files = targetFiles || resFiles.stdout.split('\n').filter(Boolean);

    let impactSemanticContext = '';
    try {
        const batchFiles = [];
        for (const file of files) {
            if (fs.existsSync(file)) {
                const fDiff = await execFile('git', ['diff', baseRef, '--', file]);
                batchFiles.push({ path: file, diff: fDiff.stdout });
            }
        }
        if (batchFiles.length > 0) {
            const results = await getAIContext(JSON.stringify({ files: batchFiles }));
            for (const ctx of results) {
                impactSemanticContext += `\n### Context for ${ctx.path}\n`;
                if (ctx.dependencies && Array.isArray(ctx.dependencies)) {
                    impactSemanticContext += `- Deps: ${ctx.dependencies.join(', ')}\n`;
                }
                if (ctx.dependents && Array.isArray(ctx.dependents)) {
                    impactSemanticContext += `- Impacted: ${ctx.dependents.join(', ')}\n`;
                }
            }
        }
    } catch (e) { console.warn('Context gathering failed', e); }

    return {
        diffContext,
        fullDiff: rawDiff,
        changedFiles: files,
        isTruncated,
        diffStat,
        impactSemanticContext: impactSemanticContext.trim() || undefined
    };
}

export function reconcileVerdict(result: CodeReviewResult, _diff: string): CodeReviewResult {
  if (result.llmVerdict !== 'fail') return result;
  const open = result.state?.findings?.filter(f => f.status === 'open') || [];
  return open.length === 0 ? { ...result, llmVerdict: 'warn' } : result;
}

export async function orchestrateCodeReview(client: CodeReviewClientStrategy): Promise<void> {
  const summary = await getCodeDiffSummary();
  const result = await client.invokeReview(summary);
  const report = `# ${client.reportTitle}\n\n${result.feedback}`;
  if (!fs.existsSync(ARTIFACTS_DIR)) fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, client.reportFileName), report);
}
