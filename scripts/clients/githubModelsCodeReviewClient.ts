import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload
} from '../lib/codeReviewUtils';
import { buildSystemPrompt } from '../lib/buildCodeReviewPrompt';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';
import { pickOptimalModel, getAvailableModels } from '../lib/modelPicker';

async function createModel(
  estimatedInputTokens: number = 0,
  maxOutputTokens: number = 1500
): Promise<{ modelName: string, maxTokens: number }> {
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

  return { modelName, maxTokens: finalMaxTokens };
}

export const githubModelsCodeReviewClient: CodeReviewClientStrategy = {
  botName: 'github-models-code-review',
  reportTitle: '🐙 GitHub Models Code Review',
  botTagline: 'Powered by GitHub Models',
  reportFileName: 'github-models-code-review.md',

  invokeReview: async (summary: CodeReviewSummary, forceMaxOutputTokens?: number): Promise<CodeReviewResult> => {
    const systemPrompt = buildSystemPrompt(summary);
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    // Count every chunk that actually goes into the request.
    const totalInputChars = systemPrompt.length + diffText.length + (externalText ? externalText.length : 0);
    const estimatedInputTokens = Math.ceil(totalInputChars / 4);

    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, 0); // OpenAi via github models does not support thinking tokens.
    const { modelName, maxTokens } = await createModel(estimatedInputTokens, maxOutputTokens);

    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const apiKey = process.env.GITHUB_TOKEN;
    const url = 'https://models.inference.ai.azure.com/chat/completions';

    // Construct the standard messages payload
    // OpenAI REST API takes an array of parts for multi-modal content
    let contentParts: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
    if (typeof baseContent === 'string') {
        contentParts = [{ type: 'text', text: baseContent }];
    } else if (Array.isArray(baseContent)) {
        contentParts = baseContent.map(item => {
            if (typeof item === 'string') return { type: 'text', text: item };

            // Structural transformation for Azure OpenAI REST API
            const recordItem = item as Record<string, unknown>;
            if (recordItem.type === 'image_url' && typeof recordItem.image_url === 'string') {
                return {
                    type: 'image_url',
                    image_url: { url: recordItem.image_url }
                };
            }

            return item as { type: string; text?: string; image_url?: { url: string } };
        });
    }

    const payload = {
        model: modelName,
        messages: [
            {
                role: 'user',
                content: contentParts
            }
        ],
        max_tokens: maxTokens,
        temperature: 0.1
    };

    let fetchResponse;
    try {
        fetchResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        throw new Error(`Failed to fetch from GitHub Models API: ${e}`, { cause: e });
    }

    if (!fetchResponse.ok) {
        const errText = await fetchResponse.text();
        throw new Error(`GitHub Models API error: ${fetchResponse.status} ${fetchResponse.statusText} - ${errText}`);
    }

    const response = await fetchResponse.json() as {
      usage?: {
          prompt_tokens?: number,
          completion_tokens?: number,
          total_tokens?: number,
          prompt_tokens_details?: { cached_tokens?: number }
      },
      choices?: Array<{ finish_reason?: string, message?: { content?: string } }>
    };

    const usageMetadata = response.usage;
    const inputTokens = usageMetadata?.prompt_tokens ?? 0;
    const outputTokens = usageMetadata?.completion_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    // Extract cached tokens if available
    const cacheTokens = usageMetadata?.prompt_tokens_details?.cached_tokens ?? 0;
    const cost = 0;

    const finishReason = response.choices?.[0]?.finish_reason;
    const isTruncated = finishReason === 'length';
    if (isTruncated) {
      console.warn(`⚠️  github-models-code-review output truncated (finish_reason: length, tokens: ${totalTokens}).`);
    }

    const feedback = response.choices?.[0]?.message?.content || '';

    const parsedState = parseCodeReviewStateDetailed(feedback);

    return {
      feedback: feedback,
      tokens: totalTokens,
      inputTokens,
      outputTokens,
      cacheTokens,
      cost: cost,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      modelName: modelName,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    };
  }
};
