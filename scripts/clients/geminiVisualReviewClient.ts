import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { buildVisualReviewPayload, parseLLMVerdict, parseVisualReviewFindings } from '../lib/visualReviewUtils';
import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

function createModel(modelName: string, maxOutputTokens: number = 4096, thinkingBudget: number = 1024): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: maxOutputTokens,
    thinkingConfig: {
      includeThoughts: true,
      thinkingBudget: thinkingBudget,
    }
  });
}

export const geminiVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-gemini-review',
  reportTitle: '👁️ Visual Review Agent',
  botTagline: 'Powered by Gemini 3.x Vision + Blast-Radius Analyzer',
  reportFileName: 'gemini-review.md',

  invokeReview: async (summary: VisualRouteSummary): Promise<RouteReview> => {
    const modelName = pickGeminiModel('flash', 0);

    let maxOutputTokens = 4096;
    let thinkingBudget = 1024;
    let model = createModel(modelName, maxOutputTokens, thinkingBudget);
    const baseContent = buildVisualReviewPayload(summary);

    if (summary.previousFindings && summary.previousFindings.length > 0) {
      const findingsStr = summary.previousFindings
        .map(f => {
          let line = `- [${f.id}] ${f.issue} (Status: ${f.status})`;
          if (f.fixSummary) {
            line += `\n   → ${f.fixSummary}`;
          }
          return line;
        })
        .join('\n');

      baseContent.push({
        type: 'text',
        text: `PREVIOUS REVIEW ROUND FINDINGS FOR THIS ROUTE:
${findingsStr}

Your job:
- Confirm THIS issue is resolved before raising anything new.
- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.
- Do not re-open a resolved issue under a different framing.`
      });
    }

    baseContent.push({
      type: 'text',
      text: `You MUST also provide a structured JSON summary of the findings (both old and new) for this route at the end of your response, inside a <findings> tag:
<findings>
{
  "findings": [
    {
      "id": "finding-1",
      "route": "${summary.route}",
      "issue": "Brief description of the issue",
      "status": "resolved",
      "fixSummary": "Brief summary of how it was addressed"
    }
  ]
}
</findings>`
    });

    const message = new HumanMessage({ content: baseContent });
    let response = await model.invoke([message]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractFinishReason = (res: any): string => {
      if (res.response_metadata?.finish_reason) return res.response_metadata.finish_reason;
      if (res.generationInfo?.finishReason) return res.generationInfo.finishReason;
      const candidate = res.response_metadata?.candidates?.[0];
      if (candidate?.finishReason) return candidate.finishReason;
      return 'UNKNOWN';
    };

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usage_metadata,
      });

      maxOutputTokens = Math.round(maxOutputTokens * 1.25);
      thinkingBudget = Math.round(thinkingBudget * 0.5);

      model = createModel(modelName, maxOutputTokens, thinkingBudget);
      response = await model.invoke([message]);

      finishReason = extractFinishReason(response);
    }

    const usageMetadata = response.usage_metadata as {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      thoughts_token_count?: number;
    };
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const thoughtsTokenCount = usageMetadata?.thoughts_token_count ??
                               (response.response_metadata as { usage?: { thoughts_token_count?: number } })?.usage?.thoughts_token_count ?? 0;

    if (thoughtsTokenCount > thinkingBudget * 1.1) {
      console.warn('Thinking budget exceeded by >10%', {
        budgetSet: thinkingBudget,
        thoughtsUsed: thoughtsTokenCount,
        model: modelName,
      });
    }

    const isTruncated = finishReason !== 'STOP';

    if (isTruncated) {
      console.error('Gemini truncation', {
        finishReason,
        usage: usageMetadata,
      });
      return {
        route: summary.route,
        severity: summary.severity,
        differencePercent: summary.differencePercent,
        feedback: `Error: Gemini model was truncated during execution (finishReason=${finishReason}).`,
        tokens: totalTokens,
        cost: 0,
        modelName,
        llmVerdict: 'warn',
        findings: [],
      };
    }

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    let feedback: string;
    if (typeof response.content === 'string') {
      feedback = response.content;
    } else if (Array.isArray(response.content)) {
      feedback = response.content
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((p: any) => !p.thought)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((p: any) => p.text ?? '')
        .join('');
    } else {
      feedback = JSON.stringify(response.content);
    }

    if (!feedback && Array.isArray(response.content)) {
      feedback = JSON.stringify(response.content);
    }

    return {
      route: summary.route,
      severity: summary.severity,
      differencePercent: summary.differencePercent,
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: parseLLMVerdict(feedback),
      findings: parseVisualReviewFindings(feedback),
    };
  }
};
