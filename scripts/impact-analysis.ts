import { IMPACT_CONFIG } from './impact-analysis.config';
import {
  exec,
  getChangedFiles,
  buildReverseMap,
  findAffectedFiles,
  getDynamicRouteMapping,
  resolveAffectedUrls,
  generateReports,
  type DependencyGraph,
  type ImpactReport
} from './lib/impact-analysis-utils';

async function main() {
  console.log('🚀 Running Deployment Impact Analysis...');

  try {
    const envChangedFiles = (process.env.CHANGED_FILES || '').split(',').filter(Boolean);
    const files = envChangedFiles.length > 0 ? envChangedFiles : getChangedFiles();

    if (files.length === 0) {
      console.log('✅ No changes detected. Generating empty report.');
      const emptyReport: ImpactReport = {
        changedFiles: [],
        affectedPages: [],
        affectedDynamicImports: [],
        routes: [],
        visualReviewRequired: [],
        impactLevel: 'LOW'
      };
      generateReports(emptyReport, [], []);
      return;
    }

    console.log(`\nFound ${files.length} changed files.`);

    // Generate dependency graph
    console.log('📊 Generating dependency graph...');
    const graphJson = exec('npx depcruise src --config .dependency-cruiser.config.mjs --ts-config tsconfig.app.json --output-type json');

    let graph: DependencyGraph;
    try {
      graph = JSON.parse(graphJson);
    } catch (err: unknown) {
      throw new Error(`Failed to parse dependency-cruiser output as JSON. The tool output might be malformed or it failed silently. Error: ${(err as Error).message}`);
    }

    const reverseMap = buildReverseMap(graph);

    // Find affected files in src/
    const srcChanges = files.filter(f => f.startsWith('src/'));
    const allAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: true });
    const staticAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: false });

    // Resolve Dynamic Mapping and URLs
    const dynamicRouteMapping = getDynamicRouteMapping(graph);
    const allUrls = resolveAffectedUrls(allAffected, files, dynamicRouteMapping, staticAffected);

    // Find all dynamic imports in the whole graph to identify dynamic boundaries
    const allDynamicImports = new Set<string>();
    graph.modules.forEach(m => m.dependencies.forEach(d => {
      if (d.dynamic && d.resolved) allDynamicImports.add(d.resolved);
    }));

    const affectedDynamicImportsSet = allAffected.filter(f => allDynamicImports.has(f)).sort();

    // Severity detection
    const getSeverity = (fList: string[]): 'HIGH' | 'MEDIUM' | 'LOW' => {
      for (const f of fList) if (IMPACT_CONFIG.HIGH_IMPACT_PATHS.some(p => f.startsWith(p))) return 'HIGH';
      for (const f of fList) if (IMPACT_CONFIG.MEDIUM_IMPACT_PATHS.some(p => f.startsWith(p))) return 'MEDIUM';
      return 'LOW';
    };
    const severity = getSeverity(files);

    const report: ImpactReport = {
      changedFiles: files,
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
    files.forEach(f => console.log(`  - ${f}`));
    console.log('\nVISUAL REVIEW REQUIRED:');
    if (allUrls.length > 0) {
      allUrls.forEach(url => console.log(`  - ${url}`));
    } else {
      console.log('  None detected (code-only changes)');
    }
    console.log('\n' + '='.repeat(40));

    generateReports(report, files, affectedDynamicImportsSet);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error during impact analysis: ${err.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
