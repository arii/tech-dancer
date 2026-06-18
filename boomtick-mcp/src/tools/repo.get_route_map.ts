import { z } from "zod";
import { runCommand } from "../lib/shell.js";
import path from "path";

export const GetRouteMapInputSchema = z.object({});

export async function getRouteMapHandler(_input: z.infer<typeof GetRouteMapInputSchema>) {
  // Logic based on tech-dancer repo structure: src/config/routes.ts and content/

  // For simplicity in MVP, we'll try to find routes by listing content files
  // and reading the main routes file if it exists.
  let routeMap: Record<string, string> = {};

  try {
    const gitFiles = await runCommand("git", ["ls-files", "content/"]);
    const contentFiles = gitFiles.stdout.trim().split("\n");

    for (const file of contentFiles) {
      if (file.endsWith(".md")) {
        const slug = path.basename(file, ".md");
        if (file.includes("/posts/")) {
          routeMap[`/blog/${slug}`] = file;
        } else if (file.includes("/resources/")) {
          routeMap[`/resources/${slug}`] = file;
        }
      }
    }
  } catch {
    // If no content files, that's fine
  }

  return { routeMap };
}
