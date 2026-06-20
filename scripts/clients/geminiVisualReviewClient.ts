import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { buildVisualReviewPayload, parseLLMVerdict, parseVisualReviewFindings } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';
import { pickOptimalGeminiModel } from '../lib/modelPicker';

function createModel(estimatedInputTokens: number = 0): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  const modelName = pickOptimalGeminiModel(estimatedInputTokens);

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: 1024,
  });
}

export const geminiVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-gemini-review',
  reportTitle: '👁️ Visual Review Agent',
  botTagline: 'Powered by Gemini Vision + Blast-Radius Analyzer',
  reportFileName: 'gemini-review.md',

  invokeReview: async (summary: VisualRouteSummary): Promise<RouteReview> => {
    // Estimate tokens from payload (text only for now)
    const estimatedInputTokens = Math.ceil(JSON.stringify(summary).length / 4);
    const model = createModel(estimatedInputTokens);
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
    const response = await model.invoke([message]);

    const usageMetadata = response.usage_metadata;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    // Gemini 3.5 Flash pricing (approx)
    // Input: $0.075 / 1 million tokens
    // Output: $0.30 / 1 million tokens
    const cost = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.30;

    const feedback = typeof response.content === 'string'
      ? response.content
      : JSON.stringify(response.content);

    return {
      route: summary.route,
      severity: summary.severity,
      differencePercent: summary.differencePercent,
      feedback: feedback,
      tokens: totalTokens,
      cost: cost,
      llmVerdict: parseLLMVerdict(feedback),
      findings: parseVisualReviewFindings(feedback),
    };
  }
};
