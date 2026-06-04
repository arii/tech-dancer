import { z } from "zod";

const envSchema = z.object({
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_OWNER: z.string().default("arii"),
  GITHUB_REPO: z.string().default("tech-dancer"),
  BOOMTICK_REPO_PATH: z.string().default(process.cwd()),
  DEFAULT_BASE_BRANCH: z.string().default("main"),
  VITE_BASE_PATH: z.string().default("/tech-dancer/"),
  BOOMTICK_WRITE_MODE: z.enum(["true", "false"]).default("false"),
  BOOMTICK_PUSH_MODE: z.enum(["true", "false"]).default("false"),
});

export type BoomtickConfig = ReturnType<typeof loadConfig>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env) {
  const parsed = envSchema.parse(env);

  return {
    githubTokenConfigured: Boolean(parsed.GITHUB_TOKEN),
    owner: parsed.GITHUB_OWNER,
    repo: parsed.GITHUB_REPO,
    repoPath: parsed.BOOMTICK_REPO_PATH,
    defaultBaseBranch: parsed.DEFAULT_BASE_BRANCH,
    viteBasePath: parsed.VITE_BASE_PATH,
    readOnly: parsed.BOOMTICK_WRITE_MODE !== "true",
    writeMode: parsed.BOOMTICK_WRITE_MODE === "true",
    pushMode: parsed.BOOMTICK_PUSH_MODE === "true",
  };
}
