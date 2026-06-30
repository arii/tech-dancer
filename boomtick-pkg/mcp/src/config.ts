import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true
});

function getGithubToken(): string | undefined {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }
  try {
    const token = execSync("gh auth token", { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (token) {
      return token;
    }
  } catch (e) {}
  return undefined;
}

function getDynamicConfig() {
  try {
    // Attempt to load core properties from the Python CLI to avoid duplication
    const pythonPath = process.env.PYTHONPATH ? `PYTHONPATH=${process.env.PYTHONPATH} ` : "";
    const cmd = `${pythonPath}python3 -m dev_tools.cli config view`;
    const output = execSync(cmd, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
      cwd: path.resolve(__dirname, "../../cli")
    });
    return JSON.parse(output);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    // Throw error in dev/CI to prevent silent duplication drift,
    // but in production we might want a fail-safe.
    if (process.env.NODE_ENV === "development" || process.env.CI === "true") {
      throw new Error(`CRITICAL: Failed to load dynamic config from Python CLI: ${message}`);
    }
  }
  return null;
}

const dynamicConfig = getDynamicConfig();

// Helper to safely extract owner/repo from dynamic config
const [defaultOwner, defaultRepo] = (dynamicConfig?.github_repo || "arii/tech-dancer").split("/");

export const config = {
  githubToken: getGithubToken(),
  githubOwner: process.env.GITHUB_OWNER || defaultOwner,
  githubRepo: process.env.GITHUB_REPO || defaultRepo,
  repoPath: process.env.BOOMTICK_REPO_PATH || path.resolve(__dirname, "../../../../"),
  defaultBaseBranch: process.env.DEFAULT_BASE_BRANCH || dynamicConfig?.base_branch?.split("/").pop() || "main",
  viteBasePath: process.env.VITE_BASE_PATH || dynamicConfig?.vite_base_path || "/tech-dancer/",
  ghPath: process.env.GH_PATH || dynamicConfig?.gh_path || "gh"
};

