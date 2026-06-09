import { z } from "zod";
import { config } from "../config.js";

export const HealthInputSchema = z.object({});

export async function healthHandler() {
  return {
    status: "ok",
    config: {
      githubOwner: config.githubOwner,
      githubRepo: config.githubRepo,
      repoPath: config.repoPath,
      readOnly: !config.githubToken,
      ghPath: config.ghPath
    },
  };
}
