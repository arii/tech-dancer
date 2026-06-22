with open('scripts/impact-analysis.ts', 'r') as f:
    content = f.read()
import re
content = re.sub(
    r"    const changedFiles = getChangedFiles\(\);\n    if \(changedFiles\.length === 0\) \{",
    "    const envChangedFiles = (process.env.CHANGED_FILES || '').split(',').filter(Boolean);\n    const files = envChangedFiles.length > 0 ? envChangedFiles : getChangedFiles();\n    if (files.length === 0) {",
    content
)

content = re.sub(
    r"    console\.log\(`\\nFound \$\{changedFiles\.length\} changed files\.`\);",
    "    console.log(`\\nFound ${files.length} changed files.`);",
    content
)

content = re.sub(
    r"const srcChanges = changedFiles\.filter\(f => f\.startsWith\('src/'\)\);\n    const allAffected = findAffectedFiles\(srcChanges, reverseMap\);",
    "const srcChanges = files.filter(f => f.startsWith('src/'));\n    const allAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: true });\n    const staticAffected = findAffectedFiles(srcChanges, reverseMap, { includeDynamic: false });\n\n    // Resolve Dynamic Mapping and URLs\n    const dynamicRouteMapping = getDynamicRouteMapping(graph);\n    const allUrls = resolveAffectedUrls(allAffected, files, dynamicRouteMapping, staticAffected);\n\n    // Find all dynamic imports in the whole graph to identify dynamic boundaries\n    const allDynamicImports = new Set<string>();\n    graph.modules.forEach(m => m.dependencies.forEach(d => {\n      if (d.dynamic && d.resolved) allDynamicImports.add(d.resolved);\n    }));\n\n    const affectedDynamicImportsSet = allAffected.filter(f => allDynamicImports.has(f)).sort();\n\n    // Severity detection\n    const getSeverity = (fList: string[]): 'HIGH' | 'MEDIUM' | 'LOW' => {\n      for (const f of fList) if (IMPACT_CONFIG.HIGH_IMPACT_PATHS.some(p => f.startsWith(p))) return 'HIGH';\n      for (const f of fList) if (IMPACT_CONFIG.MEDIUM_IMPACT_PATHS.some(p => f.startsWith(p))) return 'MEDIUM';\n      return 'LOW';\n    };\n    const severity = getSeverity(files);\n\n    const report: ImpactReport = {\n      changedFiles: files,\n      affectedPages: allAffected.filter(f => f.startsWith(IMPACT_CONFIG.PAGES_DIR) || Object.keys(dynamicRouteMapping).includes(f)),\n      affectedDynamicImports: affectedDynamicImportsSet,\n      routes: allUrls,\n      visualReviewRequired: allUrls,\n      impactLevel: severity\n    };",
    content
)

# Replace the giant main URL resolution block which we're overriding above
block_to_remove = r"    // Find affected pages\n.*?const report = \{\n      changedFiles,\n      affectedPages,"
content = re.sub(block_to_remove, "", content, flags=re.DOTALL)

# Since we stripped "const report = { changedFiles, affectedPages,", we might have left a trailing block.
# Instead, let's just do a clean HEAD overwrite since impact-analysis.ts is mainly script logic and URL resolving.
