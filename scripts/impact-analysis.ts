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
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large graphs
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

  // For each dynamic import in the routes file, we try to associate it with a route path
  // Since we can't easily parse the TS AST here, we'll use a hybrid approach:
  // We'll look at the modules that the routes file depends on dynamically.
  routesModule.dependencies.forEach(dep => {
    if (dep.dynamic && dep.resolved) {
      // Look for known patterns in src/config/routes.ts via simple grep/regex
      // to find which path is associated with this module
      const modulePath = dep.module || '';
      if (!modulePath) return;

      try {
        const routesContent = fs.readFileSync('src/config/routes.ts', 'utf-8');
        // Match: path: '/blog', ... lazy: () => import('@/pages/Blog')
        // This is a bit brittle but works for the current standardized route config
        const escapedModule = modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`path:\\s*['"]([^'"]+)['"][^}]*import\\(['"]${escapedModule}['"]\\)`, 's');
        const match = routesContent.match(regex);

        if (match && match[1]) {
          mapping[dep.resolved] = match[1];
        }
      } catch (e) {
        console.error(`Error mapping route for ${modulePath}:`, e);
      }
    }
  });

  return mapping;
}

/**
 * Recursively finds all affected files starting from the changed files.
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

    // allAffected includes dynamic dependencies for route discovery
    const allAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: true });

    // staticAffected excludes dynamic dependencies for global impact check
    // This prevents page changes from triggering global impact via the router's dynamic imports
    const staticAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: false });

    // Create dynamic route mapping
    const dynamicRouteMapping = getDynamicRouteMapping(graph);
    const pageComponentFiles = Object.keys(dynamicRouteMapping);

    // Find affected pages (either by directory or by being a registered dynamic import)
    const affectedPages = allAffected.filter(f =>
      f.startsWith(IMPACT_CONFIG.PAGES_DIR) ||
      pageComponentFiles.includes(f)
    );

    // Global impact check - if ANY statically affected file is a global trigger,
    // or if a global trigger was changed directly.
    const hasGlobalImpact = staticAffected.some(f => IMPACT_CONFIG.GLOBAL_TRIGGERS.includes(f));

    let pageUrls: string[];

    const authoritativeSitemapUrls = getAllRoutes().stubs || [];

    if (hasGlobalImpact) {
      console.log('🌍 Global impact detected (App, Routes, or MainLayout affected).');
      pageUrls = IMPACT_CONFIG.DEFAULT_STATIC_PAGES;
    } else {
      // Map affected pages to URLs using both heuristics and the new dynamic mapping
      const mappedUrls = affectedPages.flatMap(pageFile => {
        // Try dynamic mapping first
        if (dynamicRouteMapping[pageFile]) {
          const routePattern = dynamicRouteMapping[pageFile];

          if (routePattern === '/') return authoritativeSitemapUrls.includes('/') ? ['/'] : [];

          // Handle dynamic route parameters
          const staticPrefixMatch = routePattern.match(/^(\/[a-z0-9-]+)\/:[a-zA-Z0-9_]+$/);
          if (staticPrefixMatch) {
            const prefix = `${staticPrefixMatch[1]}/`;
            return authoritativeSitemapUrls.filter(url => url.startsWith(prefix) && url !== staticPrefixMatch[1]);
          }

          if (authoritativeSitemapUrls.includes(routePattern)) return [routePattern];
        }

        // Fallback to legacy heuristic mapping
        return mapPageToUrls(pageFile, authoritativeSitemapUrls);
      });
      pageUrls = Array.from(new Set(mappedUrls));
    }

    // Content URLs
    const contentUrls = getContentAffectedUrls(changedFiles);

    // Public static files URLs (e.g., images referenced in markdown)
    const publicFileUrls = getAffectedUrlsByPublicFiles(changedFiles);

    // Combine and deduplicate URLs
    const allUrls = Array.from(new Set([...pageUrls, ...contentUrls, ...publicFileUrls])).sort();

    // Find all dynamic imports in the whole graph to identify dynamic boundaries
    const allDynamicImports = new Set<string>();
    graph.modules.forEach(m => {
      m.dependencies.forEach(d => {
        if (d.dynamic && d.resolved) {
          allDynamicImports.add(d.resolved);
        }
      });
    });

    // Affected dynamic imports are those that are in the affected dependency chain
    const affectedDynamicImportsSet = allAffected
      .filter(f => allDynamicImports.has(f))
      .sort();

    // Severity
    const severity = getSeverity(changedFiles);

    // Generate Report
    const report = {
      changedFiles,
      affectedPages,
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

    // Write to artifacts
    const outputDir = path.join(process.cwd(), 'artifacts', 'impact-analysis');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outputDir, 'impact.json'), JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(process.cwd(), 'artifacts', 'impact-analysis.json'), JSON.stringify(report, null, 2));

    const changedFilesList = changedFiles.map(f => `- ${f}`).join('\n');

    const severityEmoji = severity === 'HIGH' ? '🔴' : severity === 'MEDIUM' ? '🟡' : '🟢';

    // Extract base URL if running in a branch context, otherwise default to boomtick.blog
    // We check the standard GITHUB variables, or process.env.VITE_APP_URL
    let baseUrl = process.env.VITE_APP_URL || 'https://boomtick.blog';
    if (process.env.GITHUB_PAGES_URL) {
      baseUrl = process.env.GITHUB_PAGES_URL.replace(/\/$/, '');
    } else if (process.env.GITHUB_REPOSITORY && process.env.GITHUB_REF_NAME) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
      // Note: This matches the typical github pages path, but standard PR builds might have different links.
      // This ensures we're not hardcoding the production boomtick.blog domain.
      baseUrl = `https://${owner}.github.io/${repoName}/${process.env.GITHUB_REF_NAME}`;
    }

    const markdown = `## ${severityEmoji} Deployment Impact Analysis

> **Impact Level:** ${severity}

### 👁️ Visual Review Required
${allUrls.length > 0 ? allUrls.map(url => `- [${url}](${baseUrl}${url})`).join('\n') : '_None detected (code-only change)_'}

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
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error during impact analysis: ${err.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
