import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { generateGraph, DependencyGraph } from "./dependency-graph.ts";
import { IMPACT_CONFIG } from "./impact-analysis.config.ts";

function getChangedFiles(): string[] {
  try {
    const output = execSync("git diff --name-only HEAD~1", {
      encoding: "utf-8",
      stdio: "pipe",
    });
    return output
      .split("\n")
      .filter(Boolean)
      .map((f) => path.normalize(f).replace(/\\/g, "/"));
  } catch {
    try {
      const output = execSync("git diff --name-only HEAD", {
        encoding: "utf-8",
        stdio: "pipe",
      });
      const files = output
        .split("\n")
        .filter(Boolean)
        .map((f) => path.normalize(f).replace(/\\/g, "/"));
      if (files.length > 0) return files;

      const untracked = execSync("git ls-files --others --exclude-standard", {
        encoding: "utf-8",
        stdio: "pipe",
      });
      const untrackedFiles = untracked
        .split("\n")
        .filter(Boolean)
        .map((f) => path.normalize(f).replace(/\\/g, "/"));
      return untrackedFiles;
    } catch {
      // ignore
    }
  }
  return [];
}

/**
 * Builds a reverse dependency map (child -> [parents]).
 */
function buildReverseMap(graph: DependencyGraph): Record<string, string[]> {
  const reverseMap: Record<string, string[]> = {};

  graph.modules.forEach((module) => {
    module.dependencies.forEach((dep) => {
      const child = dep.resolved;
      if (!reverseMap[child]) {
        reverseMap[child] = [];
      }
      if (!reverseMap[child].includes(module.source)) {
        reverseMap[child].push(module.source);
      }
    });
  });

  return reverseMap;
}

/**
 * Recursively finds all affected files starting from the changed files.
 */
function findAffectedFiles(
  changedFiles: string[],
  reverseMap: Record<string, string[]>,
): string[] {
  const affected = new Set<string>();
  const queue = [...changedFiles];

  while (queue.length > 0) {
    const file = queue.shift()!;
    if (affected.has(file)) continue;
    affected.add(file);

    const parents = reverseMap[file] || [];
    queue.push(...parents);
  }

  return Array.from(affected);
}

/**
 * Maps page component files to public URLs.
 */
function mapPageToUrl(filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));

  if (IMPACT_CONFIG.PAGE_ROUTE_OVERRIDES[fileName]) {
    return IMPACT_CONFIG.PAGE_ROUTE_OVERRIDES[fileName];
  }

  // Convert PascalCase to kebab-case
  const route = fileName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  return `/${route}`;
}

/**
 * Determines the severity of the change.
 */
function getSeverity(changedFiles: string[]): "HIGH" | "MEDIUM" | "LOW" {
  for (const file of changedFiles) {
    if (IMPACT_CONFIG.HIGH_IMPACT_PATHS.some((p) => file.startsWith(p)))
      return "HIGH";
  }

  for (const file of changedFiles) {
    if (IMPACT_CONFIG.MEDIUM_IMPACT_PATHS.some((p) => file.startsWith(p)))
      return "MEDIUM";
  }

  return "LOW";
}

/**
 * Handles content changes and maps them to URLs.
 */
function getContentAffectedUrls(changedFiles: string[]): string[] {
  const urls: string[] = [];

  for (const file of changedFiles) {
    // Check public images
    if (file.startsWith("public/images/gear/")) {
      urls.push("/gear");

      let slug = file.split("public/images/gear/").pop();
      if (slug) {
        slug = slug.split("/")[0];
        if (slug !== "sketches") {
          slug = slug.split(".")[0];
          urls.push(`/gear/${slug}`);
        } else {
          // Find matching gear post
          const baseName = path.basename(file).split(".")[0];
          const files = fs.readdirSync("content/resources");
          const match = files.find((f) => f.endsWith(`${baseName}.md`));
          if (match) {
            const exactSlug = match.replace(".md", "");
            urls.push(`/gear/${exactSlug}`);
          }
        }
      }
    } else if (file.startsWith("public/images/blog/")) {
      urls.push("/blog");
      let slug = file.split("public/images/blog/").pop();
      if (slug) {
        slug = slug.split("/")[0];
        if (slug !== "sketches") {
          slug = slug.split(".")[0];
          urls.push(`/blog/${slug}`);
        } else {
          // Find matching blog post
          const baseName = path.basename(file).split(".")[0];
          const files = fs.readdirSync("content/posts");
          const match = files.find((f) => f.endsWith(`${baseName}.md`));
          if (match) {
            const exactSlug = match.replace(".md", "");
            urls.push(`/blog/${exactSlug}`);
          }
        }
      }
    } else if (file.startsWith("public/images/events/")) {
      urls.push("/events");
      let slug = file.split("public/images/events/").pop();
      if (slug) {
        slug = slug.split("/")[0];
        if (slug !== "sketches") {
          slug = slug.split(".")[0];
          urls.push(`/events/${slug}`);
        } else {
          // Find matching event post
          const baseName = path.basename(file).split(".")[0];
          const files = fs.readdirSync("content/events");
          const match = files.find((f) => f.endsWith(`${baseName}.md`));
          if (match) {
            const exactSlug = match.replace(".md", "");
            urls.push(`/events/${exactSlug}`);
          }
        }
      }
    }
    for (const [dir, prefix] of Object.entries(IMPACT_CONFIG.CONTENT_MAP)) {
      if (file.startsWith(dir) && file.endsWith(".md")) {
        const slug = path.basename(file, ".md");
        urls.push(`${prefix}${slug}`);
      }
    }
  }

  return urls;
}

async function main() {
  console.log("🚀 Running Deployment Impact Analysis...");

  try {
    const changedFilesInput = process.argv.slice(2);
    const changedFiles =
      changedFilesInput.length > 0 ? changedFilesInput : getChangedFiles();
    if (changedFiles.length === 0) {
      console.log("✅ No changes detected.");
      return;
    }

    console.log(`\nFound ${changedFiles.length} changed files.`);

    // Generate dependency graph
    const graph = generateGraph();
    const reverseMap = buildReverseMap(graph);

    // Find affected files in src/
    const srcChanges = changedFiles.filter((f) => f.startsWith("src/"));
    const allAffected = findAffectedFiles(srcChanges, reverseMap);

    // Find affected pages
    const affectedPages = allAffected.filter((f) =>
      f.startsWith(IMPACT_CONFIG.PAGES_DIR),
    );

    // Global impact check - only if the CHANGED files themselves are global triggers
    const hasGlobalImpact = changedFiles.some((f) =>
      IMPACT_CONFIG.GLOBAL_TRIGGERS.includes(f),
    );

    let pageUrls: string[];

    if (hasGlobalImpact) {
      console.log(
        "🌍 Global impact detected (App, Routes, or MainLayout affected).",
      );
      pageUrls = IMPACT_CONFIG.DEFAULT_STATIC_PAGES;
    } else {
      pageUrls = affectedPages.map(mapPageToUrl);
    }

    // Content URLs
    const contentUrls = getContentAffectedUrls(changedFiles);

    // Combine and deduplicate URLs
    const allUrls = Array.from(new Set([...pageUrls, ...contentUrls])).sort();

    // Severity
    const severity = getSeverity(changedFiles);

    // Generate Report
    const report = {
      changedFiles,
      affectedPages,
      routes: allUrls,
      visualReviewRequired: allUrls,
      impactLevel: severity,
    };

    // Human readable output
    console.log("\n" + "=".repeat(40));
    console.log("DEPLOYMENT IMPACT Analysis");
    console.log("=".repeat(40));

    console.log(`\nIMPACT LEVEL: ${severity}`);

    console.log("\nCHANGED FILES:");
    changedFiles.forEach((f) => console.log(`  - ${f}`));

    console.log("\nVISUAL REVIEW REQUIRED:");
    if (allUrls.length > 0) {
      allUrls.forEach((url) => console.log(`  - ${url}`));
    } else {
      console.log("  None detected (code-only changes)");
    }

    console.log("\n" + "=".repeat(40));

    // Write to artifacts
    const outputDir = path.join(process.cwd(), "artifacts", "impact-analysis");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'impact.json'), JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(process.cwd(), 'artifacts', 'impact-analysis.json'), JSON.stringify(report, null, 2));

    const changedFilesList = changedFiles.map(f => `- ${f}`).join('\n');

    const severityEmoji = severity === 'HIGH' ? '🔴' : severity === 'MEDIUM' ? '🟡' : '🟢';

    const markdown = `## ${severityEmoji} Deployment Impact Analysis

    const changedFilesList = changedFiles.map((f) => `- ${f}`).join("\n");

    const severityEmoji =
      severity === "HIGH" ? "🔴" : severity === "MEDIUM" ? "🟡" : "🟢";

    const markdown = `## ${severityEmoji} Deployment Impact Analysis\n\n> **Impact Level:** ${severity}\n\n### 👁️ Visual Review Required\n${allUrls.length > 0 ? allUrls.map((url) => `- [${url}](https://boomtick.blog${url})`).join("\n") : "_None detected (code-only change)_"}\n\n<details>\n<summary><b>📝 Changed Files (${changedFiles.length})</b></summary>\n\n${changedFilesList}\n</details>\n\n---\n*Generated by Boomtick Impact Analyzer*\n`;

    fs.writeFileSync(path.join(outputDir, "impact.md"), markdown);
    console.log(`\n✅ Reports generated in ${outputDir}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error during impact analysis: ${err.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
