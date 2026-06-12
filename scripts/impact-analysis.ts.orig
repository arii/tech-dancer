import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getRouteMap } from './route-map.ts';
import { generateGraph, findReverseDependencies } from './dependency-graph.ts';

function getChangedFiles(): string[] {
  try {
    const output = execSync('git diff --name-only HEAD~1', { encoding: 'utf-8', stdio: 'pipe' });
    return output.split('\n').filter(Boolean).map(f => path.normalize(f).replace(/\\/g, '/'));
  } catch {
    try {
      const output = execSync('git diff --name-only HEAD', { encoding: 'utf-8', stdio: 'pipe' });
      const files = output.split('\n').filter(Boolean).map(f => path.normalize(f).replace(/\\/g, '/'));
      if (files.length > 0) return files;

      const untracked = execSync('git ls-files --others --exclude-standard', { encoding: 'utf-8', stdio: 'pipe' });
      const untrackedFiles = untracked.split('\n').filter(Boolean).map(f => path.normalize(f).replace(/\\/g, '/'));
      return untrackedFiles;

    } catch {}
  }
  return [];
}

function determineImpactLevel(changedFiles: string[]): 'High' | 'Medium' | 'Low' | 'None' {
  if (changedFiles.length === 0) return 'None';

  let level: 'Low' | 'Medium' | 'High' = 'Low';

  for (const file of changedFiles) {
    if (file.startsWith('src/layouts/') || file.startsWith('src/components/') || file.startsWith('src/styles/') || file.startsWith('src/index.css')) {
      return 'High';
    } else if (file.startsWith('src/features/')) {
      level = 'Medium';
    } else if (file.startsWith('src/pages/') && level === 'Low') {
      level = 'Low';
    } else {
      // For config or other core changes, we might want to default to High, but following specs:
      if (level === 'Low') level = 'Low';
    }
  }

  return level;
}

export function analyzeImpact(changedFilesInput?: string[]) {
  const changedFiles = changedFilesInput || getChangedFiles();

  if (changedFiles.length === 0) {
    console.log('No changed files detected.');
    return { changedFiles: [], affectedPages: [], impactLevel: 'None' };
  }

  const srcChangedFiles = changedFiles.filter(f => f.startsWith('src/'));

  let affectedPages = new Set<string>();
  let impactLevel = determineImpactLevel(changedFiles);

  if (srcChangedFiles.length > 0) {
    const routeMap = getRouteMap();
    const graph = generateGraph();
    const affectedFiles = findReverseDependencies(graph, srcChangedFiles);

    affectedFiles.forEach(file => {
      if (routeMap[file]) {
        affectedPages.add(routeMap[file]);
      }
    });
  }

  const result = {
    changedFiles,
    affectedPages: Array.from(affectedPages),
    impactLevel
  };

  generateReports(result);

  return result;
}

function generateReports(result: { changedFiles: string[], affectedPages: string[], impactLevel: string }) {
  const artifactsDir = path.resolve(process.cwd(), 'artifacts/impact-analysis');
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  // JSON Report
  fs.writeFileSync(
    path.join(artifactsDir, 'deployment-impact.json'),
    JSON.stringify(result, null, 2)
  );

  // Markdown Report
  let mdContent = `## Deployment Impact Analysis\n\n`;
  mdContent += `### Changed Files\n\n`;
  if (result.changedFiles.length > 0) {
    result.changedFiles.forEach(f => mdContent += `- ${f}\n`);
  } else {
    mdContent += `*None*\n`;
  }

  mdContent += `\n### Pages Requiring Review\n\n`;
  if (result.affectedPages.length > 0) {
    result.affectedPages.forEach(p => mdContent += `- ${p}\n`);
  } else {
    mdContent += `*None*\n`;
  }

  mdContent += `\n### Impact Level\n\n**${result.impactLevel}**\n`;

  mdContent += `\n### Review Count\n${result.affectedPages.length} pages\n`;

  fs.writeFileSync(
    path.join(artifactsDir, 'deployment-impact.md'),
    mdContent
  );

  console.log(`Reports generated in ${artifactsDir}`);
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = analyzeImpact();
  console.log('Impact Level:', result.impactLevel);
  console.log('Affected Pages:', result.affectedPages);
}
