import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
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
    const { diffText, externalText } = budgetInputContext(systemPrompt, summary);

    // Count every chunk that actually goes into the request.
    const totalInputChars = systemPrompt.length + diffText.length + (externalText ? externalText.length : 0);
    const estimatedInputTokens = Math.ceil(totalInputChars / 4);

    const maxOutputTokens = estimateMaxOutputTokens(summary);
    const { model, modelName } = await createModel(estimatedInputTokens, maxOutputTokens);

    const baseContent = buildReviewPayload(systemPrompt, diffText, externalText);

    const message = new HumanMessage({ content: baseContent });

    const response = await model.invoke([message]);


    const usageMetadata = response.usage_metadata;
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cacheTokens = (usageMetadata as any)?.cache_read_tokens || 0;
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
