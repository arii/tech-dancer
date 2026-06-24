import { buildVisualReviewPayload, parseLLMVerdict, parseVisualReviewFindings } from '../lib/visualReviewUtils';
import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';
import { extractFinishReason, createGeminiModel, applyRetryStrategy, invokeGeminiAPI } from '../lib/geminiUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';

export const geminiVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-gemini-review',
  reportTitle: '👁️ Visual Review Agent',
  botTagline: 'Powered by Gemini 3.x Vision + Blast-Radius Analyzer',
  reportFileName: 'gemini-review.md',

  invokeReview: async (summary: VisualRouteSummary): Promise<RouteReview> => {
    const modelName = pickGeminiModel('flash', 0);

    let maxOutputTokens = 4096;
    let thinkingBudget = 1024;
    let model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget);
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

    const message = {
      role: 'user',
      parts: baseContent.map(part => {
        if (typeof part === 'string') return { text: part };
        if (part.type === 'text') return { text: part.text };
        if (part.type === 'image_url') {
          return {
            inlineData: {
              mimeType: 'image/jpeg',
              data: part.image_url.url.replace(/^data:image\/jpeg;base64,/, '')
            }
          };
        }
        return { text: JSON.stringify(part) };
      })
    };

    let response = await invokeGeminiAPI(model, [message]);

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usageMetadata,
      });

      const { newMax, newThinking } = applyRetryStrategy(maxOutputTokens, thinkingBudget);
      maxOutputTokens = newMax;
      thinkingBudget = newThinking;

      model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget);
      response = await invokeGeminiAPI(model, [message]);

      finishReason = extractFinishReason(response);
    }

    const usageMetadata = response.usageMetadata || {};

    const inputTokens = usageMetadata.promptTokenCount ?? 0;
    const outputTokens = usageMetadata.candidatesTokenCount ?? 0;
    const totalTokens = usageMetadata.totalTokenCount ?? 0;
    const thoughtsTokenCount = usageMetadata.promptTokenCount ? (usageMetadata.totalTokenCount - usageMetadata.promptTokenCount - usageMetadata.candidatesTokenCount) || 0 : 0;

    if (thoughtsTokenCount > thinkingBudget * 1.1) {
      console.warn('Thinking budget exceeded by >10%', {
        budgetSet: thinkingBudget,
        thoughtsUsed: thoughtsTokenCount,
        model: modelName,
      });
    }

    const isTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'length' || finishReason === 'max_tokens';

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
        truncated: true,
      };
    }

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const textParts = response.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text) || [];
    const feedback = textParts.join('');

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
      truncated: isTruncated,
    };
  }
};
