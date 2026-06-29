import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true
});

export const config = {
  githubToken: process.env.GITHUB_TOKEN,
  githubOwner: process.env.GITHUB_OWNER,
  githubRepo: process.env.GITHUB_REPO,
  repoPath: process.env.BOOMTICK_REPO_PATH || path.resolve(__dirname, "../../../../"),
  defaultBaseBranch: process.env.DEFAULT_BASE_BRANCH || "main",
  viteBasePath: process.env.VITE_BASE_PATH || "/tech-dancer/",
  ghPath: process.env.GH_PATH || "gh"
};

if (process.env.CI === "true" && process.env.NODE_ENV !== "test" && process.env.VITEST !== "true") {
  if (!config.githubToken) throw new Error("GITHUB_TOKEN is required in CI");
  if (!config.githubOwner) throw new Error("GITHUB_OWNER is required in CI");
  if (!config.githubRepo) throw new Error("GITHUB_REPO is required in CI");
}
