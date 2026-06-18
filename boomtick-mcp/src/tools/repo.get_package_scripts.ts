import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { config } from "../config.js";

export const GetPackageScriptsInputSchema = z.object({});

export async function getPackageScriptsHandler() {
  const packageJsonPath = path.join(config.repoPath, "package.json");
  try {
    const content = await fs.readFile(packageJsonPath, "utf-8");
    const pkg = JSON.parse(content);
    return { scripts: pkg.scripts || {} };
  } catch (error) {
    throw new Error(`Failed to read package.json: ${error instanceof Error ? error.message : String(error)}`);
  }
}
