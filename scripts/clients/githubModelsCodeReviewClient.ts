import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload,
  extractFeedbackText
} from '../lib/codeReviewUtils';
import { buildSystemPrompt } from '../lib/buildCodeReviewPrompt';
import type { CodeReviewSummary, CodeReviewResult } from '../lib/codeReviewTypes';
import type { CodeReviewClientStrategy } from '../lib/codeReviewOrchestrator';
import { pickOptimalModel, getAvailableModels } from '../lib/modelPicker';

async function createModelConfig(
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

    const calculatedTokens = calculateEstimatedTokens([systemPrompt, diffText, externalText || '']);
    const estimatedInputTokens = Math.max(summary.estimatedInputTokens || 0, calculatedTokens);

    const maxOutputTokens = forceMaxOutputTokens ?? estimateMaxOutputTokens(summary, systemPrompt.length, 0);
    const { modelName, maxTokens } = await createModelConfig(estimatedInputTokens, maxOutputTokens);

    const messages = buildReviewPayload(systemPrompt, diffText, externalText);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Failed to build a valid messages payload for the AI client.');
    }

    let response;
    try {
      response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: messages,
          max_tokens: maxTokens,
          temperature: 0.1
        })
      });
    } catch (err) {
      throw new Error(`Network or fetch error during GitHub Models Code Review: ${err instanceof Error ? err.message : String(err)}`, { cause: err });
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub Models API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const usageMetadata = data.usage;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const firstChoice = data.choices && data.choices[0];
    const finishReason = firstChoice?.finish_reason;
    const isTruncated = finishReason === 'length';
    if (isTruncated) {
      console.warn(`⚠️  github-models-code-review output truncated (finish_reason: length, tokens: ${totalTokens}).`);
    }

    const rawContent = firstChoice?.message?.content || '';
    const feedback = extractFeedbackText(rawContent);

    const parsedState = parseCodeReviewStateDetailed(feedback);

    return {
      feedback: feedback,
      tokens: totalTokens,
      inputTokens: usageMetadata?.prompt_tokens ?? 0,
      outputTokens: usageMetadata?.completion_tokens ?? 0,
      cacheTokens: usageMetadata?.prompt_tokens_details?.cached_tokens ?? 0,
      cost: 0,
      llmVerdict: parseCodeReviewVerdict(feedback),
      state: parsedState.state,
      modelName: modelName,
      truncated: isTruncated,
      parseError: parsedState.parseError,
    };
  }
};
