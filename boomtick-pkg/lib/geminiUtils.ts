/**
 * Extracts the finish reason from a Gemini response in a type-safe manner.
 * Handles various structures from LangChain and raw Gemini API.
 */
export function extractFinishReason(res: unknown): string {
  if (!res || typeof res !== 'object' || Array.isArray(res)) return 'UNKNOWN';

  const r = res as Record<string, unknown>;

  // Check response_metadata (LangChain)
  const metadata = r.response_metadata as Record<string, unknown> | undefined;
  if (metadata) {
    if (typeof metadata.finishReason === 'string') return metadata.finishReason;
    if (typeof metadata.finish_reason === 'string') return metadata.finish_reason;

    const candidates = metadata.candidates as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(candidates) && candidates[0]?.finishReason) {
      return String(candidates[0].finishReason);
    }
  }

  // Check generationInfo (LangChain)
  const genInfo = r.generationInfo as Record<string, unknown> | undefined;
  if (genInfo && typeof genInfo.finishReason === 'string') {
    return genInfo.finishReason;
  }

  return 'UNKNOWN';
}

/**
 * Creates a Gemini model instance with the specified configuration.
 * Enforces structured output if a responseSchema is provided.
 * Uses lazy loading for @langchain/google-genai to improve startup performance.
 */
export async function createGeminiModel(
  modelName: string,
  maxOutputTokens: number,
  thinkingBudget: number,
  responseSchema?: Record<string, unknown>
): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Missing or empty GEMINI_API_KEY environment variable');
  }

  const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');

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

/**
 * Returns configured token and thinking budget limits.
 */
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

/**
 * Adjusts token budget for a retry attempt.
 */
export function applyRetryStrategy(currentMax: number, currentThinking: number): { newMax: number; newThinking: number } {
  // Hard cap to avoid runaways
  const newMax = Math.min(Math.round(currentMax * 1.25), 8192);
  const newThinking = Math.round(currentThinking * 0.5);
  return { newMax, newThinking };
}
