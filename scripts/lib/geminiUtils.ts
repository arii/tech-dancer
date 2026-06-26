// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractFinishReason(res: any): string {
  // Langchain structure varies depending on the provider wrapper
  if (res.response_metadata?.finishReason) return res.response_metadata.finishReason;
  if (res.response_metadata?.finish_reason) return res.response_metadata.finish_reason;
  if (res.response_metadata?.finishReason) return res.response_metadata.finishReason;
  if (res.generationInfo?.finishReason) return res.generationInfo.finishReason;

  // Look deeper into candidates if raw output exposes it
  const candidate = res.response_metadata?.candidates?.[0];
  if (candidate?.finishReason) return candidate.finishReason;

  return 'UNKNOWN';
}


import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage, BaseMessage } from '@langchain/core/messages';

/**
 * Splits a standard payload into a single messages array for Gemini,
 * ensuring the system message is strictly the first element to avoid LangChain API ordering errors.
 */
export function splitPayloadForGemini(payload: { role: string; content: unknown }[]): { systemInstruction?: string; userMessages: BaseMessage[] } {
  const systemInstruction = payload
    .filter(msg => msg.role === 'system')
    .map(msg => msg.content)
    .join('\n\n');

  const userMessages: BaseMessage[] = payload
    .filter(msg => msg.role !== 'system')
    .map(msg => new HumanMessage({ content: msg.content as string | { type: string; text?: string; image_url?: string }[] }));

  if (systemInstruction) {
    userMessages.unshift(new SystemMessage({ content: systemInstruction }));
  }

  return {
    systemInstruction: systemInstruction || undefined,
    userMessages
  };
}

export function createGeminiModel(
  modelName: string,
  maxOutputTokens: number,
  thinkingBudget: number,
  responseSchema?: object,
  responseMimeType?: string,
  _systemInstruction?: string // Deprecated in favor of passing SystemMessage first in array
): ChatGoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey,
    maxOutputTokens: maxOutputTokens,
    responseMimeType: responseMimeType,
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
