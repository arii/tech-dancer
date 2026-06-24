// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractFinishReason(res: any): string {
  const candidate = res.candidates?.[0];
  if (candidate?.finishReason) return candidate.finishReason;

  return 'UNKNOWN';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractFeedbackText(content: any): string {
  let feedback: string;
  if (typeof content === 'string') {
    feedback = content;
  } else if (Array.isArray(content)) {
    feedback = content
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((p: any) => !p.thought)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((p: any) => p.text ?? '')
      .join('');
  } else {
    feedback = JSON.stringify(content);
  }

  if (!feedback && Array.isArray(content)) {
    feedback = JSON.stringify(content);
  }
  return feedback || '';
}

export function createGeminiModel(
  modelName: string,
  maxOutputTokens: number,
  thinkingBudget: number
): { modelName: string; apiKey: string; maxOutputTokens: number; thinkingBudget: number } {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY environment variable');

  return {
    modelName,
    apiKey,
    maxOutputTokens,
    thinkingBudget
  };
}

export async function invokeGeminiAPI(model: { modelName: string; apiKey: string; maxOutputTokens: number; thinkingBudget: number }, contents: unknown) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model.modelName}:generateContent?key=${model.apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: model.maxOutputTokens,
        thinkingConfig: {
          thinkingBudget: model.thinkingBudget
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
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
