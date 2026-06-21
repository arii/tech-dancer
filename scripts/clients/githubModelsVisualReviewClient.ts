import * as fs from 'fs';
import * as path from 'path';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { buildVisualReviewPayload, parseLLMVerdict, parseVisualReviewFindings } from '../lib/visualReviewUtils';
import type { LLMClientStrategy } from '../lib/visualReviewOrchestrator';
import type { RouteReview, VisualRouteSummary } from '../lib/visualReviewTypes';
import { pickOptimalModel } from '../lib/modelPicker';
import { DOM_REVIEW_DIR } from '../lib/visualReviewConstants';

async function createModel(estimatedInputTokens: number = 0): Promise<ChatOpenAI> {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) throw new Error('Missing GITHUB_TOKEN environment variable');

  const fallback = process.env.GITHUB_MODELS_MODEL || 'gpt-4o-mini';
  const modelName = await pickOptimalModel(apiKey, fallback, true, estimatedInputTokens);

  return new ChatOpenAI({
    modelName: modelName,
    apiKey: apiKey,
    configuration: {
      baseURL: 'https://models.inference.ai.azure.com',
    },
    maxTokens: 1024,
    temperature: 0.1,
  });
}

export const githubModelsVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-github-models-review',
  reportTitle: '🐙 GitHub Models Visual Review',
  botTagline: 'Powered by GitHub Models Vision + Deployment Impact Analyzer',
  reportFileName: 'github-models-review.md',

  invokeReview: async (summary: VisualRouteSummary): Promise<RouteReview> => {
    // Estimate tokens from DOM diff
    const domDiffPath = path.join(DOM_REVIEW_DIR, summary.slug, 'diff.txt');
    let domDiffLength = 0;
    if (fs.existsSync(domDiffPath)) {
      const content = fs.readFileSync(domDiffPath, 'utf8');
      // Cap at 3000 to match visualReviewUtils.ts truncation logic
      domDiffLength = Math.min(content.length, 3000);
    }
    const estimatedInputTokens = Math.ceil(domDiffLength / 4);

    const model = await createModel(estimatedInputTokens);
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
    const totalTokens = usageMetadata?.total_tokens ?? 0;

    // Approximating cost for general OpenAI API usage (e.g. gpt-4o) if used over GitHub models natively
    // GitHub Models are currently free/rate-limited depending on the tier.
    const cost = 0;

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
