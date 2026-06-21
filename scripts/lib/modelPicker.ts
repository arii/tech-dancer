export interface GitHubModel {
  id: string;
  name: string;
  publisher: string;
  rate_limit_tier: 'high' | 'low';
  supported_input_modalities: string[];
  capabilities: string[];
  limits?: {
    max_input_tokens?: number;
    max_output_tokens?: number;
  };
}

export async function getAvailableModels(token: string): Promise<GitHubModel[]> {
  try {
    const apiVersion = process.env.GITHUB_API_VERSION || '2024-02-28';
    const res = await fetch("https://models.github.ai/catalog/models", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-GitHub-Api-Version": apiVersion,
        "Accept": "application/vnd.github+json"
      }
    });
    if (!res.ok) {
      console.warn(`⚠️ Failed to fetch models catalog: ${res.status} ${res.statusText}`);
      return [];
    }

    const text = await res.text();
    if (!text) {
      console.warn('⚠️ Models catalog response is empty');
      return [];
    }

    let models: unknown;
    try {
      models = JSON.parse(text);
    } catch (parseError) {
      console.warn(`⚠️ Failed to parse models catalog JSON: ${parseError}`);
      return [];
    }

    if (!Array.isArray(models)) {
        console.warn(`⚠️ Models catalog response is not an array`);
        return [];
    }

    const validModels = models.filter(m => m && typeof m === 'object' && typeof (m as Record<string, unknown>).id === 'string' && typeof (m as Record<string, unknown>).name === 'string');
    return validModels as GitHubModel[];
  } catch (error) {
    console.warn(`⚠️ Error fetching models catalog: ${error}`);
    return [];
  }
}

export async function pickOptimalModel(
  token: string,
  fallback: string = 'gpt-4o-mini',
  needsVision: boolean = false,
  estimatedInputTokens: number = 0
): Promise<string> {
  const models = await getAvailableModels(token);

  const isFallbackValid = models && models.some(m => m.id === fallback || m.id.includes(fallback));

  if (!models || models.length === 0) return fallback;

  const suitableModels = models.filter(m => {
    if (needsVision && !m.supported_input_modalities?.includes('image')) return false;

    let maxIn = m.limits?.max_input_tokens;
    if (m.id.includes('gpt-4.1')) {
      maxIn = 8000;
    }

    // If we have an estimate, be strict about model limits
    if (estimatedInputTokens > 0) {
      if (maxIn === undefined || maxIn === null) return false;

      const maxInNum = typeof maxIn === 'number' ? maxIn : Number(maxIn);
      if (isNaN(maxInNum)) return false;

      // leave headroom for system prompt + output
      if (estimatedInputTokens > maxInNum * 0.8) return false;
    }

    return true;
  });

  const highTierModels = suitableModels.filter(m => m.rate_limit_tier === 'high');
  const poolToPickFrom = highTierModels.length > 0 ? highTierModels : suitableModels;

  const priorities = [
    'gpt-4o-mini',
    'meta-llama-3.1-8b-instruct',
    'mistral-small-2503',
  ];

  for (const preferred of priorities) {
    const found = poolToPickFrom.find(m => m.id === preferred || m.id.includes(preferred));
    if (found) {
        return found.id.split('/').pop() || found.id;
    }
  }

  if (poolToPickFrom.length > 0 && poolToPickFrom[0]) {
     return poolToPickFrom[0].id.split('/').pop() || poolToPickFrom[0].id;
  }

  if (isFallbackValid) return fallback;
  return models[0].id.split('/').pop() || models[0].id;
}

const GEMINI_MODELS: Record<string, string> = {
  flash: 'gemini-1.5-flash',
  pro: 'gemini-1.5-pro',
  flash2: 'gemini-2.0-flash',
  pro2: 'gemini-2.0-pro-exp-02-05'
};
const SUPPORTED_GEMINI_MODELS = Object.values(GEMINI_MODELS);

export function pickOptimalGeminiModel(
  estimatedInputTokens: number = 0,
  fallback: string = GEMINI_MODELS.flash
): string {
  // Respect explicit user override if present
  if (process.env.GEMINI_MODEL) {
    if (SUPPORTED_GEMINI_MODELS.includes(process.env.GEMINI_MODEL)) {
      return process.env.GEMINI_MODEL;
    }
    console.warn(`⚠️ GEMINI_MODEL environment variable specifies unsupported model "${process.env.GEMINI_MODEL}". Falling back to logic-based selection.`);
  }

  // Use Flash for small/medium contexts to keep costs and latency low.
  // Switch to Pro if the input is very large (e.g. many high-res screenshots or massive DOM/diff).
  // 30,000 tokens is a conservative threshold for "large" in this repo's typical use cases.
  const selected = estimatedInputTokens > 30000 ? GEMINI_MODELS.pro : fallback;

  // Ultimate fallback to ensure we always return a valid/supported model name
  if (!SUPPORTED_GEMINI_MODELS.includes(selected)) {
    return GEMINI_MODELS.flash;
  }

  return selected;
}
