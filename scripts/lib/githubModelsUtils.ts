import { ChatOpenAI } from '@langchain/openai';

export function createGitHubModel(): ChatOpenAI {
  const apiKey = process.env.GITHUB_TOKEN;
  if (!apiKey) {
    throw new Error('Review failed: GITHUB_TOKEN is not set. Ensure the secret is available in your workflow environment.');
  }

  return new ChatOpenAI({
    modelName: process.env.GITHUB_MODELS_MODEL || 'gpt-4o-mini',
    apiKey: apiKey,
    configuration: {
      baseURL: 'https://models.inference.ai.azure.com',
    },
    maxTokens: 1024,
    temperature: 0.1,
  });
}
