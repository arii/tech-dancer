import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface DependencyNode {
  source: string;
  dependencies: {
    resolved: string;
    [key: string]: unknown;
  }[];
}

export interface DependencyGraph {
  modules: DependencyNode[];
}

export function generateGraph(): DependencyGraph {
  console.log("Generating dependency graph...");
  const tmpFile = path.resolve(process.cwd(), "dependency-graph-tmp.json");
  try {
    const output = execSync(
      "npx depcruise src --config .dependency-cruiser.config.mjs --output-type json",
      {
        stdio: ["pipe", "pipe", "pipe"],
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    fs.writeFileSync(tmpFile, output, "utf8");
  } catch (error: unknown) {
    // dependency-cruiser might return non-zero if there are validation errors, but we still get output
    console.warn(
      "dependency-cruiser exited with an error, but output might still be available.",
    );
    const err = error as { stdout?: string };
    if (err.stdout) {
      fs.writeFileSync(tmpFile, err.stdout, "utf8");
    } else {
      throw error;
    }
  }

  const output = fs.readFileSync(tmpFile, "utf8");
  fs.unlinkSync(tmpFile);
  return JSON.parse(output) as DependencyGraph;
}

export function findReverseDependencies(
  graph: DependencyGraph,
  changedFiles: string[],
): string[] {
  const affectedFiles = new Set<string>(changedFiles);
  const queue = [...changedFiles];
  const visited = new Set<string>();

  // Create a reverse mapping: file -> files that depend on it
  const reverseMap = new Map<string, string[]>();
  for (const module of graph.modules) {
    // Clean module source path
    const normalizedSource = path.normalize(module.source).replace(/\\/g, "/");
    for (const dep of module.dependencies) {
      // Clean resolved path
      const normalizedResolved = path
        .normalize(dep.resolved)
        .replace(/\\/g, "/");
      if (!reverseMap.has(normalizedResolved)) {
        reverseMap.set(normalizedResolved, []);
      }
      reverseMap.get(normalizedResolved)!.push(normalizedSource);
    }
  }

  while (queue.length > 0) {
    let currentFile = queue.shift()!;
    currentFile = path.normalize(currentFile).replace(/\\/g, "/");

    if (visited.has(currentFile)) continue;
    visited.add(currentFile);

    const dependants = reverseMap.get(currentFile) || [];
    for (const dependant of dependants) {
      if (!affectedFiles.has(dependant)) {
        affectedFiles.add(dependant);
        queue.push(dependant);
      }
    }
  }

  return Array.from(affectedFiles);
}

// Test execution when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const graph = generateGraph();
  console.log(`Graph has ${graph.modules.length} modules.`);
  const changed = ["src/components/ui/Icon.tsx"];
  const affected = findReverseDependencies(graph, changed);
  console.log(`Files affected by ${changed[0]}: ${affected.length}`);
  console.log(affected);
}
