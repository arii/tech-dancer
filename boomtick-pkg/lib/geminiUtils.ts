export function extractFinishReason(res: unknown): string {
  if (!res || typeof res !== 'object') return 'UNKNOWN';

  const r = res as {
    response_metadata?: {
      finishReason?: string;
      finish_reason?: string;
      candidates?: Array<{ finishReason?: string }>;
    };
    generationInfo?: {
      finishReason?: string;
    };
  };

  // Langchain structure varies depending on the provider wrapper
  if (r.response_metadata?.finishReason) return r.response_metadata.finishReason;
  if (r.response_metadata?.finish_reason) return r.response_metadata.finish_reason;
  if (r.generationInfo?.finishReason) return r.generationInfo.finishReason;

  // Look deeper into candidates if raw output exposes it
  const candidate = r.response_metadata?.candidates?.[0];
  if (candidate?.finishReason) return candidate.finishReason;

  return 'UNKNOWN';
}


import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export function createGeminiModel(
  modelName: string,
  maxOutputTokens: number,
  thinkingBudget: number,
  responseSchema?: Record<string, unknown>
): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: maxOutputTokens,
    responseMimeType: responseSchema ? 'application/json' : 'text/plain',
    responseSchema: responseSchema,
    thinkingConfig: {
      includeThoughts: true,
      thinkingBudget: thinkingBudget,
    }
  });
}
export function getConfiguredTokens(type: 'code' | 'visual'): { maxOutputTokens: number; thinkingBudget: number } {
  let maxOutputTokens = type === 'code' ? 6000 : 4096;
  let thinkingBudget = type === 'code' ? 2048 : 1024;

  if (process.env.GEMINI_MAX_OUTPUT_TOKENS) {
    const val = parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS, 10);
    if (!isNaN(val)) maxOutputTokens = val;
  }

  if (process.env.GEMINI_THINKING_BUDGET) {
    const val = parseInt(process.env.GEMINI_THINKING_BUDGET, 10);
    if (!isNaN(val)) thinkingBudget = val;
  }

  return { maxOutputTokens, thinkingBudget };
}

export function applyRetryStrategy(currentMax: number, currentThinking: number): { newMax: number; newThinking: number } {
  // Hard cap to avoid runaways
  const newMax = Math.min(Math.round(currentMax * 1.25), 8192);
  const newThinking = Math.round(currentThinking * 0.5);
  return { newMax, newThinking };
}
