export interface GitHubModel {
  id: string;
  name: string;
  publisher: string;
  rate_limit_tier: 'high' | 'low';
  supported_input_modalities: string[];
  capabilities: string[];
}

export async function getAvailableModels(token: string): Promise<GitHubModel[]> {
  try {
    const apiVersion = process.env.GITHUB_API_VERSION || '2026-03-10';
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

    let models: GitHubModel[];
    try {
      models = JSON.parse(text) as GitHubModel[];
    } catch (parseError) {
      console.warn(`⚠️ Failed to parse models catalog JSON: ${parseError}`);
      return [];
    }

    return Array.isArray(models) ? models : [];
  } catch (error) {
    console.warn(`⚠️ Error fetching models catalog: ${error}`);
    return [];
  }
}

export async function pickOptimalModel(token: string, fallback: string = 'gpt-4o-mini', needsVision: boolean = false): Promise<string> {
  const models = await getAvailableModels(token);
  if (!models || models.length === 0) return fallback;

  const suitableModels = models.filter(m => {
    if (needsVision && !m.supported_input_modalities?.includes('image')) return false;
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
        return found.id;
    }
  }

  if (poolToPickFrom.length > 0 && poolToPickFrom[0]) {
     return poolToPickFrom[0].id;
  }

  return fallback;
}
