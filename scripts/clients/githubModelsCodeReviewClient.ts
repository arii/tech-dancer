import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import type { CodeReviewSummary, CodeReviewResult, CodeReviewState, ParsedFindingsResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';
import { pickOptimalModel, getAvailableModels } from '../lib/modelPicker';

function buildSystemPrompt(summary: CodeReviewSummary): string {
  const goalSection = summary.prGoal
    ? `This PR's stated goal:
"${summary.prGoal}"

`
    : '';

  let priorStateSection = '';
  if (summary.previousState && summary.previousState.findings.length > 0) {
    const findingsStr = summary.previousState.findings
      .map(f => {
        let line = `- [${f.id}] ${f.file}${f.line ? `:${f.line}` : ''}: ${f.issue} (Status: ${f.status})`;
        if (f.fixSummary) {
          line += `\n   → ${f.fixSummary}`;
        }
        return line;
      })
      .join('\n');
    priorStateSection = `
PREVIOUS REVIEW ROUND FINDINGS:
${findingsStr}

Your job:
- Confirm THIS issue is resolved before raising anything new.
- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.
- Do not re-open a resolved issue under a different framing.
`;
  }

  return `You are an expert software engineer reviewing a pull request.
Review the following code diff for bugs, anti-patterns, missing types, and performance issues.
Provide actionable feedback. Focus on HIGH severity issues.

${goalSection}${priorStateSection}

Severity rules — apply these strictly:
- HIGH / Blocking: you can point to a concrete contradiction in the diff itself — a value
  passed where the type doesn't allow it, a class or function that doesn't exist, a call
  with the wrong arity, a test that would fail. Cite the exact line(s).
- If your concern is phrased with "could," "might," "unless," "if not handled properly,"
  or similar hedging language, it is NOT blocking. Downgrade it to a "Question" or
  "Nitpick" section instead.
- Do not raise a concern you cannot verify against the code you were given. State what
  you'd need to see to verify it, rather than assuming the worst case.

Scope and security rules:
- Flag security issues ONLY if this diff introduces a NEW untrusted input path (e.g. new
  user-controlled data flowing somewhere it wasn't before). Do not flag pre-existing patterns.
- Do not introduce review topics unrelated to the PR's stated goal unless you find a
  genuine, evidence-backed regression caused by this diff.

You MUST end your review with exactly one of the following strings indicating your final verdict:
[VERDICT: PASS]
[VERDICT: WARN]
[VERDICT: FAIL]

Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns that you can
demonstrate with evidence from the diff.

You MUST also provide a structured JSON summary of the findings (both old and new) at the end of your response, inside a \` <findings>\` tag:
<findings>
{
  "findings": [
    {
      "id": "finding-1",
      "file": "src/App.tsx",
      "line": 10,
      "snippet": "const x = 1;",
      "issue": "Brief description of the issue",
      "status": "resolved",
      "fixSummary": "Brief summary of how it was addressed"
    }
  ]
}
</findings>
Ensure 'snippet' is a unique string from the diff that identifies the issue.
`;
}

export function parseCodeReviewVerdict(feedback: string): 'pass' | 'fail' | 'warn' {
  const matches = [...feedback.matchAll(/\[VERDICT:\s*(PASS|WARN|FAIL)\]/gi)];
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1][1].toUpperCase();
    if (lastMatch === 'FAIL') return 'fail';
    if (lastMatch === 'WARN') return 'warn';
    return 'pass';
  }

  return 'pass';
}

export function parseCodeReviewState(feedback: string): CodeReviewState | undefined {
  return parseCodeReviewStateDetailed(feedback).state;
}

export function parseCodeReviewStateDetailed(feedback: string): ParsedFindingsResult {
  const openTag = '<findings>';
  const closeTag = '</findings>';
  
  const openIdx = feedback.lastIndexOf(openTag);
  const closeIdx = feedback.lastIndexOf(closeTag);
  
  if (openIdx === -1 || closeIdx === -1 || closeIdx < openIdx) {
    // Did the model even attempt a findings block? If <findings> opened but
    // never closed, that's a strong truncation signal.
    const openedButNeverClosed = openIdx !== -1 && (closeIdx === -1 || closeIdx < openIdx);
    return { parseError: openedButNeverClosed ? 'missing_closing_tag' : undefined };
  }

  const jsonText = feedback.slice(openIdx + openTag.length, closeIdx).trim();

  try {
    return { state: JSON.parse(jsonText) as CodeReviewState };
  } catch (e) {
    console.warn('Failed to parse findings JSON from LLM response:', e);
    return { parseError: 'invalid_json' };
  }
}


export function estimateMaxOutputTokens(summary: CodeReviewSummary): number {
  // Base budget covers prose review + a couple findings.
  let budget = 1500;

  // Each existing finding the model needs to echo back (resolved or not)
  // costs real output tokens. Scale up so large finding sets don't truncate.
  const priorFindingsCount = summary.previousState?.findings.length ?? 0;
  budget += priorFindingsCount * 200;

  // Larger diffs tend to surface more findings worth writing about.
  const diffSizeTokens = Math.ceil(summary.diffContext.length / 4);
  if (diffSizeTokens > 4000) budget += 1000;

  // Hard ceiling — avoid runaway cost/latency on pathological inputs.
  return Math.min(budget, 4096);
}

async function createModel(
  estimatedInputTokens: number = 0,
  maxOutputTokens: number = 1500
): Promise<{ model: ChatOpenAI; modelName: string }> {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) throw new Error('Missing GITHUB_TOKEN environment variable');

  const fallback = process.env.GITHUB_MODELS_MODEL || 'gpt-4o-mini';
  const modelName = await pickOptimalModel(apiKey, fallback, false, estimatedInputTokens);

  let finalMaxTokens = maxOutputTokens;
  try {
    const models = await getAvailableModels(apiKey);
    const matchedModel = models.find(m => m.id === modelName || m.id.includes(modelName));
    if (matchedModel?.limits?.max_output_tokens) {
      finalMaxTokens = Math.min(finalMaxTokens, matchedModel.limits.max_output_tokens);
    }
  } catch (err) {
    console.warn('⚠️ Could not check model limits from catalog, falling back to budgeted tokens:', err);
  }

  console.log(`📌 github-models-code-review using model: ${modelName}, maxOutputTokens: ${finalMaxTokens}`);

  const model = new ChatOpenAI({
    modelName: modelName,
    apiKey: apiKey,
    configuration: { baseURL: 'https://models.inference.ai.azure.com' },
    maxTokens: finalMaxTokens,
    temperature: 0.1,
  });

  return { model, modelName };
}

export const githubModelsCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'github-models-code-review',
  reportTitle: '🐙 GitHub Models Code Review',
  botTagline: 'Powered by GitHub Models',
  reportFileName: 'github-models-code-review.md',

  invokeReview: async (summary: CodeReviewSummary): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    
    // We must ensure the total input (systemPrompt + diffText + externalText) stays within the 8000-token limit of the endpoint.
    // Let's set a strict ceiling for input tokens: 6000 tokens (~24000 characters).
    const maxInputChars = 24000;
    
    // System prompt is essential. Let's see how much budget is left.
    const remainingBudgetForDiffAndContext = maxInputChars - systemPrompt.length;
    
    let diffText = `DIFF:\n\n${summary.diffContext}`;
    let externalText = summary.externalContext
      ? `EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\n${summary.externalContext}`
      : '';
      
    if (diffText.length + externalText.length > remainingBudgetForDiffAndContext) {
      // Allocate up to 16,000 chars for diffText, or the remaining budget if smaller
      const maxDiffChars = Math.min(diffText.length, Math.max(16000, remainingBudgetForDiffAndContext - 2000));
      if (diffText.length > maxDiffChars) {
        diffText = diffText.slice(0, maxDiffChars) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
      }
      
      const remainingForExternal = remainingBudgetForDiffAndContext - diffText.length;
      if (externalText && remainingForExternal > 200) {
        if (externalText.length > remainingForExternal) {
          externalText = externalText.slice(0, remainingForExternal - 50) + '\n\n...[TRUNCATED TO FIT TOKEN LIMIT]';
        }
      } else {
        externalText = '';
      }
    }

    // Count every chunk that actually goes into the request.
    const totalInputChars = systemPrompt.length + diffText.length + externalText.length;
    const estimatedInputTokens = Math.ceil(totalInputChars / 4);

    const maxOutputTokens = estimateMaxOutputTokens(summary);
    const { model, modelName } = await createModel(estimatedInputTokens, maxOutputTokens);

    const baseContent = [
      { type: 'text', text: systemPrompt } as const,
      { type: 'text', text: diffText } as const,
    ];

    if (externalText) {
      baseContent.push({ type: 'text', text: externalText } as const);
    }

    const message = new HumanMessage({ content: baseContent });

    // To debug why CI AI check is failing, log the verdict/result out temporarily
    // wait I cannot easily log this here because it runs on CI.
    // Instead I will just let it run. Let's see the previous report.
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cost = 0;

    const finishReason = (response as { response_metadata?: { finish_reason?: string } })
      .response_metadata?.finish_reason;
    const isTruncated = finishReason === 'length';
    if (isTruncated) {
      console.warn(`⚠️  github-models-code-review output truncated (finish_reason: length, tokens: ${totalTokens}).`);
    }

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    const parsedState = parseCodeReviewStateDetailed(feedback);

    return {
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      modelName: modelName,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    };
  }
};
