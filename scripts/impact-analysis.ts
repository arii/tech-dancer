import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getRouteMap } from './route-map.js';

interface DepNode {
  source: string;
  dependencies: { resolved: string }[];
}

interface DepGraph {
  modules: DepNode[];
}

interface ImpactReport {
  changedFiles: string[];
  affectedRoutes: string[];
  impactLevel: 'Critical' | 'Moderate' | 'Low' | 'None';
}

function runDependencyCruiser(): DepGraph {
  console.log('Generating dependency graph...');
  const output = execSync('npx depcruise src --config .dependency-cruiser.config.mjs --output-type json', { maxBuffer: 1024 * 1024 * 10 });
  return JSON.parse(output.toString());
}

function buildReverseGraph(graph: DepGraph): Map<string, string[]> {
  const reverseMap = new Map<string, string[]>();
  graph.modules.forEach(node => {
    node.dependencies.forEach(dep => {
      const dependents = reverseMap.get(dep.resolved) || [];
      dependents.push(node.source);
      reverseMap.set(dep.resolved, dependents);
    });
  });
  return reverseMap;
}

function findAffectedRoutes(changedFiles: string[], reverseGraph: Map<string, string[]>, routeMap: Record<string, string[]>): Set<string> {
  const affectedRoutes = new Set<string>();
  const visited = new Set<string>();

  function traverse(file: string) {
    if (visited.has(file)) return;
    visited.add(file);

    // If this file is a route component, add its URLs
    if (routeMap[file]) {
      routeMap[file].forEach(url => affectedRoutes.add(url));
    }

    // Traverse upwards to files that import this file
    const dependents = reverseGraph.get(file) || [];
    dependents.forEach(dep => traverse(dep));
  }

  changedFiles.forEach(traverse);
  return affectedRoutes;
}

function determineImpactLevel(changedFiles: string[], affectedRoutes: Set<string>): ImpactReport['impactLevel'] {
  if (affectedRoutes.size === 0) return 'None';

  // Example categorization
  const isCritical = changedFiles.some(file =>
    file.startsWith('src/layouts/') ||
    file.startsWith('src/styles/') ||
    file.startsWith('src/components/ui/')
  );

  if (isCritical) return 'Critical';

  if (affectedRoutes.size > 2) return 'Moderate';

  return 'Low';
}

function main() {
  // Determine changed files. For this script, we can read them from command args, or use git diff against main/HEAD~1
  // Let's use `git diff --name-only HEAD~1` as a default if no args are passed
  let changedFiles: string[] = process.argv.slice(2);
  if (changedFiles.length === 0) {
    console.log('No files provided, falling back to git diff HEAD~1...');
    try {
      const gitDiff = execSync('git diff --name-only HEAD~1').toString().trim();
      if (gitDiff) {
        changedFiles = gitDiff.split('\n').filter(f => f.startsWith('src/'));
      }
    } catch {
      console.warn('Could not run git diff. Provide files as arguments.');
    }
  }

  if (changedFiles.length === 0) {
    console.log('No changed files detected in src/. Exiting.');
    process.exit(0);
  }

  console.log(`Analyzing impact for ${changedFiles.length} changed files:`, changedFiles);

  const routeMap = getRouteMap();
  const graph = runDependencyCruiser();
  const reverseGraph = buildReverseGraph(graph);

  const affectedRoutes = findAffectedRoutes(changedFiles, reverseGraph, routeMap);
  const impactLevel = determineImpactLevel(changedFiles, affectedRoutes);

  const report: ImpactReport = {
    changedFiles,
    affectedRoutes: Array.from(affectedRoutes).sort(),
    impactLevel
  };

  const outputDir = path.resolve(process.cwd(), 'artifacts/impact-analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputDir, 'impact.json'), JSON.stringify(report, null, 2));

  const mdReport = `## Deployment Impact Analysis

### Changed Files
${report.changedFiles.map(f => `- ${f}`).join('\n')}

### Pages Requiring Review
${report.affectedRoutes.length ? report.affectedRoutes.map(r => `- ${r}`).join('\n') : '- None'}

### Impact Level
${report.impactLevel}
`;

  fs.writeFileSync(path.join(outputDir, 'impact.md'), mdReport);

  console.log(`\nAnalysis complete!`);
  console.log(`Impact Level: ${impactLevel}`);
  console.log(`Affected Pages: ${report.affectedRoutes.length}`);
  console.log(`Report saved to artifacts/impact-analysis/impact.md`);
}

main();
