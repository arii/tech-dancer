import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { IMPACT_CONFIG } from './impact-analysis.config';

// Types for dependency-cruiser output
interface Dependency {
  resolved: string;
}

interface Module {
  source: string;
  dependencies: Dependency[];
}

interface DependencyGraph {
  modules: Module[];
}

/**
 * Executes a shell command and returns the output.
 * Throws an error if the command fails.
 */
function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string };
    throw new Error(`Command failed: ${command}\n${err.stderr || err.message}`, { cause: error });
  }
}

/**
 * Helper to split string into lines and filter empty values.
 */
const splitAndFilter = (output: string): string[] => (output ? output.split('\n').filter(Boolean) : []);

/**
 * Gets the list of changed files between current HEAD and origin/main.
 * Falls back to HEAD~1 if origin/main is not available.
 */
function getChangedFiles(): string[] {
  // Check for staged and unstaged changes first
  const staged = exec('git diff --name-only --cached');
  const unstaged = exec('git diff --name-only');
  const workingChanges = new Set([...splitAndFilter(staged), ...splitAndFilter(unstaged)]);

  let base = 'origin/main';
  try {
    execSync(`git rev-parse ${base}`, { stdio: 'ignore' });
  } catch {
    try {
      execSync('git rev-parse HEAD~1', { stdio: 'ignore' });
      base = 'HEAD~1';
    } catch {
      // Use empty tree hash if no previous commit exists
      base = exec('git hash-object -t tree /dev/null');
    }
  }

  const committed = exec(`git diff --name-only ${base} HEAD`);
  const allChanges = new Set([...workingChanges, ...splitAndFilter(committed)]);

  return Array.from(allChanges).filter(Boolean);
}

/**
 * Builds a reverse dependency map (child -> [parents]).
 */
function buildReverseMap(graph: DependencyGraph): Record<string, string[]> {
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
function findAffectedFiles(changedFiles: string[], reverseMap: Record<string, string[]>): string[] {
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
  const route = fileName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return `/${route}`;
}

/**
 * Determines the severity of the change.
 */
function getSeverity(changedFiles: string[]): 'HIGH' | 'MEDIUM' | 'LOW' {
  for (const file of changedFiles) {
    if (IMPACT_CONFIG.HIGH_IMPACT_PATHS.some(p => file.startsWith(p))) return 'HIGH';
  }

  for (const file of changedFiles) {
    if (IMPACT_CONFIG.MEDIUM_IMPACT_PATHS.some(p => file.startsWith(p))) return 'MEDIUM';
  }

  return 'LOW';
}

/**
 * Handles content changes and maps them to URLs.
 */
function getContentAffectedUrls(changedFiles: string[]): string[] {
  const urls: string[] = [];

  for (const file of changedFiles) {
    for (const [dir, prefix] of Object.entries(IMPACT_CONFIG.CONTENT_MAP)) {
      if (file.startsWith(dir) && file.endsWith('.md')) {
        const slug = path.basename(file, '.md');
        urls.push(`${prefix}${slug}`);
      }
    }
  }

  return urls;
}

async function main() {
  console.log('🚀 Running Deployment Impact Analysis...');

  try {
    const changedFiles = getChangedFiles();
    if (changedFiles.length === 0) {
      console.log('✅ No changes detected.');
      return;
    }

    console.log(`\nFound ${changedFiles.length} changed files.`);

    // Generate dependency graph
    console.log('📊 Generating dependency graph...');
    const graphJson = exec('npx depcruise src --config .dependency-cruiser.config.mjs --ts-config tsconfig.app.json --output-type json');
    const graph: DependencyGraph = JSON.parse(graphJson);
    const reverseMap = buildReverseMap(graph);

    // Find affected files in src/
    const srcChanges = changedFiles.filter(f => f.startsWith('src/'));
    const allAffected = findAffectedFiles(srcChanges, reverseMap);

    // Find affected pages
    const affectedPages = allAffected.filter(f => f.startsWith(IMPACT_CONFIG.PAGES_DIR));

    // Global impact check - only if the CHANGED files themselves are global triggers
    const hasGlobalImpact = changedFiles.some(f => IMPACT_CONFIG.GLOBAL_TRIGGERS.includes(f));

    let pageUrls: string[];

    if (hasGlobalImpact) {
      console.log('🌍 Global impact detected (App, Routes, or MainLayout affected).');
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
      visualReviewRequired: allUrls,
      impactLevel: severity
    };

    // Human readable output
    console.log('\n' + '='.repeat(40));
    console.log('DEPLOYMENT IMPACT ANALYSIS');
    console.log('='.repeat(40));

    console.log(`\nIMPACT LEVEL: ${severity}`);

    console.log('\nCHANGED FILES:');
    changedFiles.forEach(f => console.log(`  - ${f}`));

    console.log('\nVISUAL REVIEW REQUIRED:');
    if (allUrls.length > 0) {
      allUrls.forEach(url => console.log(`  - ${url}`));
    } else {
      console.log('  None detected (code-only changes)');
    }

    console.log('\n' + '='.repeat(40));

    // Write to artifacts
    const outputDir = path.join(process.cwd(), 'artifacts', 'impact-analysis');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'impact.json'), JSON.stringify(report, null, 2));

    const changedFilesList = changedFiles.map(f => `- ${f}`).join('\n');
    const visualReviewList = allUrls.length > 0 ? allUrls.map(url => `- ${url}`).join('\n') : 'None detected.';

    const severityEmoji = severity === 'HIGH' ? '🔴' : severity === 'MEDIUM' ? '🟡' : '🟢';

    const markdown = `## ${severityEmoji} Deployment Impact Analysis

> **Impact Level:** ${severity}

### 👁️ Visual Review Required
${allUrls.length > 0 ? allUrls.map(url => `- [${url}](https://boomtick.blog${url})`).join('\n') : '_None detected (code-only change)_'}

<details>
<summary><b>📝 Changed Files (${changedFiles.length})</b></summary>

${changedFilesList}
</details>

---
*Generated by Boomtick Impact Analyzer*
`;

    fs.writeFileSync(path.join(outputDir, 'impact.md'), markdown);
    console.log(`\n✅ Reports generated in ${outputDir}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error during impact analysis: ${err.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
