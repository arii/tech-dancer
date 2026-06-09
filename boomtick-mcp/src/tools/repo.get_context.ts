import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { config } from "../config.js";
import { getRouteMapHandler } from "./repo.get_route_map.js";

export const GetContextInputSchema = z.object({});

export async function getContextHandler() {
  const packageJson = await fs.readFile(path.join(config.repoPath, "package.json"), "utf-8");
  const routeMap = await getRouteMapHandler();

  let designTokens = "";
  try {
    designTokens = await fs.readFile(path.join(config.repoPath, "src/styles/design-tokens.ts"), "utf-8");
  } catch (e) {
    designTokens = "// design-tokens.ts not found";
  }

  return {
    packageJson: JSON.parse(packageJson),
    routeMap,
    designTokens
  };
}
