import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { IMPACT_CONFIG } from './impact-analysis.config';
import { getAllRoutes } from '../src/lib/routes-discovery';
import { mapPageToUrls } from './impact-review-utils';

// Types for dependency-cruiser output
interface Dependency {
  resolved: string;
  dynamic?: boolean;
  module?: string;
  dependencyTypes?: string[];
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
    return execSync(command, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: IMPACT_CONFIG.MAX_BUFFER
    }).trim();
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

interface ReverseDependency {
  source: string;
  dynamic: boolean;
}

/**
 * Builds a reverse dependency map (child -> [parents]).
 *
 * We track whether a dependency is 'dynamic' because our impact analysis needs to
 * distinguish between static and dynamic links. Specifically, we exclude dynamic
 * links when calculating 'global impact' to avoid page changes incorrectly
 * triggering application-wide visual review requirements via the router.
 */
function buildReverseMap(graph: DependencyGraph): Record<string, ReverseDependency[]> {
  const reverseMap: Record<string, ReverseDependency[]> = {};

  graph.modules.forEach(module => {
    module.dependencies.forEach(dep => {
      const child = dep.resolved;
      if (!child) return;

      if (!reverseMap[child]) {
        reverseMap[child] = [];
      }

      if (!reverseMap[child].some(rd => rd.source === module.source)) {
        reverseMap[child].push({
          source: module.source,
          dynamic: !!dep.dynamic
        });
      }
    });
  });

  return reverseMap;
}

/**
 * Maps resolved file paths to their application routes by analyzing the router configuration and dependency graph.
 */
function getDynamicRouteMapping(graph: DependencyGraph): Record<string, string> {
  const mapping: Record<string, string> = {};

  // Find the routes configuration module
  const routesModule = graph.modules.find(m => m.source === 'src/config/routes.ts');
  if (!routesModule) return mapping;

  const routesFilePath = 'src/config/routes.ts';
  if (!fs.existsSync(routesFilePath)) return mapping;

  const routesContent = fs.readFileSync(routesFilePath, 'utf-8');

  // For each dynamic import in the routes file, we try to associate it with a route path.
  // We split the configuration by route objects to minimize regex brittleness.
  const routeConfigs = routesContent.split(/\{[\s\n]*path:/);

  routesModule.dependencies.forEach(dep => {
    if (dep.dynamic && dep.resolved) {
      const modulePath = dep.module || '';
      if (!modulePath) return;

      const escapedModule = modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const moduleRegex = new RegExp(`import\\(['"]${escapedModule}['"]\\)`);

      for (const config of routeConfigs) {
        if (moduleRegex.test(config)) {
          // Extract the path value which was part of the split delimiter
          // We search for the first quoted string in this block as the path
          const pathMatch = config.match(/^\s*['"]([^'"]+)['"]/);
          if (pathMatch && pathMatch[1]) {
            mapping[dep.resolved] = pathMatch[1];
            break;
          }
        }
      }
    }
  });

  return mapping;
}

/**
 * Recursively finds all affected files starting from the changed files using BFS.
 *
 * Note: While dependency-cruiser provides reachability analysis, we perform a manual
 * traversal here to gain granular control over the 'dynamic' vs 'static' dependency
 * links.
 *
 * The `includeDynamic` option allows us to control the depth and nature of the traversal.
 * 1. For route discovery: We include dynamic imports because we want to see which
 *    routes are logically reached by a change.
 * 2. For global impact: We exclude dynamic imports to ensure that changing a specific
 *    page doesn't flag a "global impact" just because the router dynamically imports it.
 */
function findAffectedFiles(
  changedFiles: string[],
  reverseMap: Record<string, ReverseDependency[]>,
  options: { includeDynamic: boolean } = { includeDynamic: true }
): string[] {
  const affected = new Set<string>();
  const queue = [...changedFiles];

  while (queue.length > 0) {
    const file = queue.shift()!;
    if (affected.has(file)) continue;
    affected.add(file);

    const parents = reverseMap[file] || [];
    for (const parent of parents) {
      if (options.includeDynamic || !parent.dynamic) {
        queue.push(parent.source);
      }
    }
  }

  return Array.from(affected);
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


/**
 * Find affected markdown files when public static files (e.g. images) are changed.
 */
function getAffectedUrlsByPublicFiles(changedFiles: string[]): string[] {
  const urls: Set<string> = new Set();
  const publicFiles = changedFiles.filter(f => f.startsWith('public/'));

  if (publicFiles.length === 0) return [];

  const searchStrings = publicFiles.map(f => f.replace(/^public/, ''));

  for (const [dir, prefix] of Object.entries(IMPACT_CONFIG.CONTENT_MAP)) {
    const mdFiles = exec(`find ${dir} -name "*.md"`).split('\n').filter(Boolean);

    for (const mdFile of mdFiles) {
      const content = fs.readFileSync(mdFile, 'utf-8');
      for (const searchStr of searchStrings) {
        if (content.includes(searchStr)) {
          const slug = path.basename(mdFile, '.md');
          urls.add(`${prefix}${slug}`);
          urls.add(prefix.replace(/\/$/, '')); // Add index page
        }
      }
    }
  }
  return Array.from(urls);
}

/**
 * Resolves the list of affected URLs based on code, content, and public file changes.
 */
function resolveAffectedUrls(
  allAffected: string[],
  changedFiles: string[],
  dynamicRouteMapping: Record<string, string>,
  staticAffected: string[]
): string[] {
  const pageComponentFiles = Object.keys(dynamicRouteMapping);
  const authoritativeSitemapUrls = getAllRoutes().stubs || [];

  // Global impact check - if ANY statically affected file is a global trigger
  const hasGlobalImpact = staticAffected.some(f => IMPACT_CONFIG.GLOBAL_TRIGGERS.includes(f));

  let pageUrls: string[];
  if (hasGlobalImpact) {
    console.log('🌍 Global impact detected (App, Routes, or MainLayout affected).');
    pageUrls = IMPACT_CONFIG.DEFAULT_STATIC_PAGES;
  } else {
    const affectedPages = allAffected.filter(f =>
      f.startsWith(IMPACT_CONFIG.PAGES_DIR) || pageComponentFiles.includes(f)
    );

    pageUrls = Array.from(new Set(affectedPages.flatMap(pageFile => {
      if (dynamicRouteMapping[pageFile]) {
        const routePattern = dynamicRouteMapping[pageFile];
        if (routePattern === '/') return authoritativeSitemapUrls.includes('/') ? ['/'] : [];

        const staticPrefixMatch = routePattern.match(/^(\/[a-z0-9-]+)\/:[a-zA-Z0-9_]+$/);
        if (staticPrefixMatch) {
          const prefix = `${staticPrefixMatch[1]}/`;
          return authoritativeSitemapUrls.filter(url => url.startsWith(prefix) && url !== staticPrefixMatch[1]);
        }

        if (authoritativeSitemapUrls.includes(routePattern)) return [routePattern];
      }
      return mapPageToUrls(pageFile, authoritativeSitemapUrls);
    })));
  }

  const contentUrls = getContentAffectedUrls(changedFiles);
  const publicFileUrls = getAffectedUrlsByPublicFiles(changedFiles);

  return Array.from(new Set([...pageUrls, ...contentUrls, ...publicFileUrls])).sort();
}

interface ImpactReport {
  changedFiles: string[];
  affectedPages: string[];
  affectedDynamicImports: string[];
  routes: string[];
  visualReviewRequired: string[];
  impactLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

/**
 * Generates and writes the impact analysis reports.
 */
function generateReports(report: ImpactReport, changedFiles: string[], affectedDynamicImportsSet: string[]) {
  const outputDir = path.join(process.cwd(), 'artifacts', 'impact-analysis');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, 'impact.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(process.cwd(), 'artifacts', 'impact-analysis.json'), JSON.stringify(report, null, 2));

  let baseUrl = process.env.VITE_APP_URL || 'https://boomtick.blog';
  if (process.env.GITHUB_PAGES_URL) {
    baseUrl = process.env.GITHUB_PAGES_URL.replace(/\/$/, '');
  } else if (process.env.GITHUB_REPOSITORY && process.env.GITHUB_REF_NAME) {
    const [owner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    baseUrl = `https://${owner}.github.io/${repoName}/${process.env.GITHUB_REF_NAME}`;
  }

  const severityEmoji = report.impactLevel === 'HIGH' ? '🔴' : report.impactLevel === 'MEDIUM' ? '🟡' : '🟢';
  const changedFilesList = changedFiles.map(f => `- ${f}`).join('\n');

  const markdown = `## ${severityEmoji} Deployment Impact Analysis

> **Impact Level:** ${report.impactLevel}

### 👁️ Visual Review Required
${report.routes.length > 0 ? report.routes.map((url: string) => `- [${url}](${baseUrl}${url})`).join('\n') : '_None detected (code-only change)_'}

<details>
<summary><b>📦 Dynamic Imports Affected (${affectedDynamicImportsSet.length})</b></summary>

${affectedDynamicImportsSet.length > 0 ? affectedDynamicImportsSet.map(f => `- ${f}`).join('\n') : '_None detected_'}
</details>

<details>
<summary><b>📝 Changed Files (${changedFiles.length})</b></summary>

${changedFilesList}
</details>

---
*Generated by Boomtick Impact Analyzer*
`;

  fs.writeFileSync(path.join(outputDir, 'impact.md'), markdown);
  console.log(`\n✅ Reports generated in ${outputDir}`);
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
    const allAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: true });
    const staticAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: false });

    // Resolve Dynamic Mapping and URLs
    const dynamicRouteMapping = getDynamicRouteMapping(graph);
    const allUrls = resolveAffectedUrls(allAffected, changedFiles, dynamicRouteMapping, staticAffected);

    // Find all dynamic imports in the whole graph to identify dynamic boundaries
    const allDynamicImports = new Set<string>();
    graph.modules.forEach(m => m.dependencies.forEach(d => {
      if (d.dynamic && d.resolved) allDynamicImports.add(d.resolved);
    }));

    const affectedDynamicImportsSet = allAffected.filter(f => allDynamicImports.has(f)).sort();
    const severity = getSeverity(changedFiles);

    const report = {
      changedFiles,
      affectedPages: allAffected.filter(f => f.startsWith(IMPACT_CONFIG.PAGES_DIR) || Object.keys(dynamicRouteMapping).includes(f)),
      affectedDynamicImports: affectedDynamicImportsSet,
      routes: allUrls,
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

    generateReports(report, changedFiles, affectedDynamicImportsSet);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error during impact analysis: ${err.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
