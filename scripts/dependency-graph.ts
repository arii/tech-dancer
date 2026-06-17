// Types for dependency-cruiser output
export interface Dependency {
  resolved: string;
}

export interface Module {
  source: string;
  dependencies: Dependency[];
}

export interface DependencyGraph {
  modules: Module[];
}

/**
 * Builds a reverse dependency map (child -> [parents]).
 */
export function buildReverseMap(graph: DependencyGraph): Record<string, string[]> {
  const reverseMap: Record<string, string[]> = {};

  graph.modules.forEach(module => {
    module.dependencies.forEach(dep => {
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
export function findAffectedFiles(changedFiles: string[], reverseMap: Record<string, string[]>): string[] {
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
