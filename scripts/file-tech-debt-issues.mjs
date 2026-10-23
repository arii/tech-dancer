import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Running fallow...');
try {
  execSync('pnpm exec fallow --format json > fallow_results.json', { stdio: 'pipe' });
} catch (e) {
  // fallow might exit with non-zero if issues are found
}

const data = JSON.parse(fs.readFileSync('fallow_results.json', 'utf8'));

console.log('Running eslint...');
try {
  execSync('pnpm run lint:eslint --format json > eslint_results.json', { stdio: 'pipe' });
} catch (e) {
}

console.log('Running tsc...');
try {
  execSync('pnpm run lint:types > tsc_results.txt', { stdio: 'pipe' });
} catch (e) {
}

// Now we parse results
const issuesToCreate = [];

// 1. Unused Files (Dead Code)
if (data.check && data.check.unused_files && data.check.unused_files.length > 0) {
  const files = data.check.unused_files.map(f => f.file || f.path).join('\n- ');
  issuesToCreate.push({
    title: '[cleanup] Remove unused files',
    body: 'The following files appear to be completely unused and can likely be deleted:\n\n- ' + files + '\n\n**Recommended Fix:** Verify if these files are genuinely unused (or dynamically imported in a way `fallow` misses). If unused, delete them.'
  });
}

// 2. Unused Exports (Dead Code)
if (data.check && data.check.unused_exports && data.check.unused_exports.length > 0) {
  const exportsList = data.check.unused_exports.map(e => '- `' + e.export_name + '` in ' + (e.file || e.path || e.file_path || e.identifier || 'unknown file')).join('\n');
  issuesToCreate.push({
    title: '[cleanup] Remove unused exports',
    body: 'The following exports are not used anywhere in the project:\n\n' + exportsList + '\n\n**Recommended Fix:** Remove these exports if they are not part of an intended public API or dynamically used.'
  });
}

// 3. Circular Dependencies
if (data.check && data.check.circular_dependencies && data.check.circular_dependencies.length > 0) {
  const cycles = data.check.circular_dependencies.map(c => {
    let parts = [];
    if (c.files) parts = c.files;
    else if (c.cycle) parts = c.cycle;
    else if (c.edges) parts = c.edges.map(e => e.path);
    return '- ' + parts.join(' -> ');
  }).slice(0, 20).join('\n');
  issuesToCreate.push({
    title: '[cleanup] Resolve circular dependencies',
    body: 'The following circular dependencies were detected:\n\n' + cycles + (data.check.circular_dependencies.length > 20 ? '\n\n... and more.' : '') + '\n\n**Recommended Fix:** Refactor the modules to break the dependency cycles. Consider extracting shared logic to a new, independent module.'
  });
}

// 4. High Complexity
if (data.health && data.health.targets) {
  const complexityTargets = data.health.targets.filter(t => t.category === 'extract_complex_functions' || (t.recommendation && t.recommendation.toLowerCase().includes('extract')));
  if (complexityTargets.length > 0) {
    const list = complexityTargets.slice(0, 30).map(c => '- **' + c.path + '**: ' + c.recommendation).join('\n');
    issuesToCreate.push({
      title: '[cleanup] Refactor high complexity modules',
      body: 'The following files contain highly complex functions that should be refactored:\n\n' + list + (complexityTargets.length > 30 ? '\n\n... and more.' : '') + '\n\n**Recommended Fix:** Break down large, complex functions into smaller, more focused helper functions.'
    });
  }
}

// 5. ESLint Errors
let eslintData = [];
try {
  const fileContent = fs.readFileSync('eslint_results.json', 'utf8');
  if (fileContent.trim() !== '') {
    eslintData = JSON.parse(fileContent);
  }
} catch(e) {}

const eslintErrors = eslintData.filter(f => f.errorCount > 0 || f.warningCount > 0);
if (eslintErrors.length > 0) {
    const list = eslintErrors.slice(0, 30).map(e => '- **' + e.filePath + '**: ' + e.messages.map(m => m.message).join(', ')).join('\n');
    issuesToCreate.push({
      title: '[cleanup] Resolve ESLint errors',
      body: 'The following files contain ESLint errors:\n\n' + list + '\n\n**Recommended Fix:** Fix the linting errors.'
    });
} else {
    console.log('No ESLint errors found.');
}

// 6. TypeScript Errors
let tscData = '';
try {
  tscData = fs.readFileSync('tsc_results.txt', 'utf8');
} catch(e) {}

if (tscData && (tscData.includes('error TS') || tscData.includes('Error:'))) {
    issuesToCreate.push({
      title: '[cleanup] Resolve TypeScript errors',
      body: 'TypeScript compilation produced errors:\n\n```\n' + tscData.substring(0, 1000) + '\n```\n\n**Recommended Fix:** Fix the type errors.'
    });
} else {
    console.log('No TypeScript errors found.');
}

issuesToCreate.forEach((issue, index) => {
  const bodyFile = `issue_body_${index}.md`;
  fs.writeFileSync(bodyFile, issue.body);
  try {
    execSync(`td gh create-issue --title "${issue.title}" --file "${bodyFile}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error('Failed to create issue:', issue.title);
  }
  try { fs.unlinkSync(bodyFile); } catch(e) {}
});

try {
  fs.unlinkSync('fallow_results.json');
  fs.unlinkSync('eslint_results.json');
  fs.unlinkSync('tsc_results.txt');
} catch (e) {}

console.log('Done!');
