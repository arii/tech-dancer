export interface GeminiModel {
  id: string;
  name: string;
  tier: 'pro' | 'flash' | 'lite';
  maxInputTokens: number;
  maxOutputTokens: number;
}

export const GEMINI_MODELS: GeminiModel[] = [
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro (Preview)',
    tier: 'pro',
    maxInputTokens: 2000000,
    maxOutputTokens: 8192
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    tier: 'flash',
    maxInputTokens: 1000000,
    maxOutputTokens: 8192
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    tier: 'lite',
    maxInputTokens: 1000000,
    maxOutputTokens: 8192
  }
];

export const DEPRECATED_MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro',
  'gemini-2.0-flash',
  'gemini-2.0-pro',
  'gemini-2.0-flash-thinking'
];

/**
 * Selects an optimal Gemini model based on the requested tier.
 * Explicitly avoids deprecated models.
 */
export function pickGeminiModel(
  preferredTier: 'pro' | 'flash' | 'lite' = 'flash',
  estimatedInputTokens: number = 0
): string {
  // Always filter out deprecated models just in case
  const activeModels = GEMINI_MODELS.filter(m => !DEPRECATED_MODELS.includes(m.id));

  // If we have an extreme token count, prefer Pro regardless of preferredTier if budget allows?
  // Actually, let's stick to the requested tier but fallback if needed.
  let selected = activeModels.find(m => m.tier === preferredTier);

  if (!selected) {
    selected = activeModels.find(m => m.tier === 'flash') || activeModels[0];
  }

  // If we have an estimate, ensure it fits
  if (estimatedInputTokens > 0 && selected.maxInputTokens < estimatedInputTokens) {
    const betterModel = activeModels.find(m => m.maxInputTokens >= estimatedInputTokens);
    if (betterModel) selected = betterModel;
  }

  return selected.id;
}

/**
 * Returns the pricing per 1 million tokens for the given Gemini model.
 * Values are based on Gemini 3.x estimates.
 */
export function getGeminiPricing(modelId: string): { inputCostPerM: number; outputCostPerM: number } {
  if (modelId.includes('pro')) {
    // Pro is usually ~10x-20x Flash
    return { inputCostPerM: 1.25, outputCostPerM: 5.00 };
  }
  if (modelId.includes('lite')) {
    // Lite is usually half of Flash
    return { inputCostPerM: 0.0375, outputCostPerM: 0.15 };
  }
  // Default to Flash pricing
  return { inputCostPerM: 0.075, outputCostPerM: 0.30 };
}
