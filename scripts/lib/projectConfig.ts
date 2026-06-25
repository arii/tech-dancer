import * as fs from 'fs';
import * as path from 'path';

export interface ProjectConfig {
  core_dirs: string[];
  monolithic_pr_threshold: number;
  base_branch: string;
  max_diff_chars: number;
  content_scopes: Record<string, string>;
  ai_synthesis_model?: string;
}

const DEFAULT_CONFIG: ProjectConfig = {
  core_dirs: ["src/layouts/", "src/components/"],
  monolithic_pr_threshold: 3,
  base_branch: "origin/main",
  max_diff_chars: 40000,
  content_scopes: {
    "resources": "content/resources/",
    "posts": "content/posts/",
    "blog": "content/blog/",
    "studies": "content/studies/"
  },
  ai_synthesis_model: "gpt-4o-mini"
};

/**
 * Loads project configuration from dev-tools/project_config.json.
 * Gracefully handles missing or malformed configuration files.
 */
export function loadProjectConfig(): ProjectConfig {
  try {
    const configPath = path.join(process.cwd(), 'dev-tools/project_config.json');
    if (!fs.existsSync(configPath)) return DEFAULT_CONFIG;

    const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    return {
      core_dirs: Array.isArray(raw.core_dirs) ? raw.core_dirs : DEFAULT_CONFIG.core_dirs,
      monolithic_pr_threshold: typeof raw.monolithic_pr_threshold === 'number' ? raw.monolithic_pr_threshold : DEFAULT_CONFIG.monolithic_pr_threshold,
      base_branch: typeof raw.base_branch === 'string' ? raw.base_branch : DEFAULT_CONFIG.base_branch,
      max_diff_chars: typeof raw.max_diff_chars === 'number' ? raw.max_diff_chars : DEFAULT_CONFIG.max_diff_chars,
      content_scopes: (raw.content_scopes && typeof raw.content_scopes === 'object') ? raw.content_scopes : DEFAULT_CONFIG.content_scopes,
      ai_synthesis_model: typeof raw.ai_synthesis_model === 'string' ? raw.ai_synthesis_model : DEFAULT_CONFIG.ai_synthesis_model
    };
  } catch (err) {
    console.warn('⚠️  Failed to load project_config.json, using defaults.', err);
    return DEFAULT_CONFIG;
  }
}
