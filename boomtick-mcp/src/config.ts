import { resolve } from "node:path";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function boolFromEnv(name: string, fallback = false): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return TRUE_VALUES.has(value.trim().toLowerCase());
}

function stringFromEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

export type BoomtickConfig = {
  githubOwner: string;
  githubRepo: string;
  repoPath: string;
  defaultBaseBranch: string;
  viteBasePath: string;
  readOnly: boolean;
  writeMode: boolean;
  pushMode: boolean;
};

export function loadConfig(): BoomtickConfig {
  const writeMode = boolFromEnv("BOOMTICK_WRITE_MODE", false);
  const pushMode = boolFromEnv("BOOMTICK_PUSH_MODE", false);

  return {
    githubOwner: stringFromEnv("GITHUB_OWNER", "arii"),
    githubRepo: stringFromEnv("GITHUB_REPO", "tech-dancer"),
    repoPath: resolve(stringFromEnv("BOOMTICK_REPO_PATH", process.cwd())),
    defaultBaseBranch: stringFromEnv("DEFAULT_BASE_BRANCH", "main"),
    viteBasePath: stringFromEnv("VITE_BASE_PATH", "/tech-dancer/"),
    readOnly: !writeMode,
    writeMode,
    pushMode,
  };
}
