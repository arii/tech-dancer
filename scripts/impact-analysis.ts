import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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

const PAGES_DIR = 'src/pages';

/**
 * Executes a shell command and returns the output.
 */
function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    return '';
  }
}

/**
 * Gets the list of changed files between current HEAD and origin/main.
 * Falls back to HEAD~1 if origin/main is not available.
 */
function getChangedFiles(): string[] {
  // Check for staged and unstaged changes first
  const staged = exec('git diff --name-only --cached');
  const unstaged = exec('git diff --name-only');
  const workingChanges = new Set([...(staged ? staged.split('\n') : []), ...(unstaged ? unstaged.split('\n') : [])]);

  let base = 'origin/main';
  try {
    execSync(`git rev-parse ${base}`, { stdio: 'ignore' });
  } catch {
    try {
      execSync('git rev-parse HEAD~1', { stdio: 'ignore' });
      base = 'HEAD~1';
    } catch {
      base = exec('git hash-object -t tree /dev/null');
    }
  }

  const committed = exec(`git diff --name-only ${base} HEAD`);
  const allChanges = new Set([...workingChanges, ...(committed ? committed.split('\n') : [])]);

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

  if (fileName === 'Home') return '/';

  // Convert PascalCase to kebab-case
  let route = fileName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  if (route === 'u-x-auditor') route = 'ux-auditor';
  if (route === 'blog-post') route = 'blog/:slug';
  if (route === 'gear-post') route = 'gear/:slug';
  if (route === 'event-guide') route = 'events/:slug';
  if (route === 'research-detail') route = 'research/:id';

  return `/${route}`;
}

/**
 * Determines the severity of the change.
 */
function getSeverity(changedFiles: string[]): 'HIGH' | 'MEDIUM' | 'LOW' {
  const highImpactPaths = ['src/layouts/', 'src/styles/', 'src/components/ui/', 'src/index.css'];
  const mediumImpactPaths = ['src/features/'];

  for (const file of changedFiles) {
    if (highImpactPaths.some(p => file.startsWith(p))) return 'HIGH';
  }

  for (const file of changedFiles) {
    if (mediumImpactPaths.some(p => file.startsWith(p))) return 'MEDIUM';
  }

  return 'LOW';
}

/**
 * Handles content changes and maps them to URLs.
 */
function getContentAffectedUrls(changedFiles: string[]): string[] {
  const urls: string[] = [];
  const contentMap: Record<string, string> = {
    'content/posts/': '/blog/',
    'content/resources/': '/gear/',
    'content/events/': '/events/',
    'content/studies/': '/research/'
  };

  for (const file of changedFiles) {
    for (const [dir, prefix] of Object.entries(contentMap)) {
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

  const changedFiles = getChangedFiles();
  if (changedFiles.length === 0) {
    console.log('✅ No changes detected.');
    return;
  }

  console.log(`\nFound ${changedFiles.length} changed files.`);

  // Generate dependency graph
  console.log('📊 Generating dependency graph...');
  const graphJson = exec('npx depcruise src --config .dependency-cruiser.config.mjs --ts-config tsconfig.app.json --output-type json');
  if (!graphJson) {
    console.error('❌ Failed to generate dependency graph.');
    process.exit(1);
  }

  const graph: DependencyGraph = JSON.parse(graphJson);
  const reverseMap = buildReverseMap(graph);

  // Find affected files in src/
  const srcChanges = changedFiles.filter(f => f.startsWith('src/'));
  const allAffected = findAffectedFiles(srcChanges, reverseMap);

  // Find affected pages
  const affectedPages = allAffected.filter(f => f.startsWith(PAGES_DIR));

  // Map pages to URLs
  const pageUrls = affectedPages.map(mapPageToUrl);

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

  fs.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));

  let markdown = `# Deployment Impact Analysis\n\n`;
  markdown += `### Impact Level: ${severity}\n\n`;
  markdown += `### Changed Files\n\n`;
  changedFiles.forEach(f => markdown += `- ${f}\n`);
  markdown += `\n### Visual Review Required\n\n`;
  if (allUrls.length > 0) {
    allUrls.forEach(url => markdown += `- ${url}\n`);
  } else {
    markdown += `None detected.\n`;
  }

  fs.writeFileSync(path.join(outputDir, 'report.md'), markdown);
  console.log(`\n✅ Reports generated in ${outputDir}`);
}

main().catch(console.error);
