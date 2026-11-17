// Ratchet check for docs/design-system.md: fails when any file gains a type-system violation,
// and when the baseline is stale (counts went down), so the baseline only ever shrinks.
// Update the baseline with: node scripts/check-design-system.mjs --update
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE_PATH = path.join(ROOT, 'scripts/design-system-baseline.json');

export const RULES = [
  { id: 'raw-font-family', pattern: /\bfont-(?:mono|serif|display|sans)\b/g, exts: ['.ts', '.tsx'] },
  { id: 'off-spec-weight', pattern: /\bfont-(?:thin|extralight|light|medium|semibold|extrabold|black)\b/g, exts: ['.ts', '.tsx'] },
  { id: 'off-scale-size', pattern: /\btext-(?:[3-9]xl\b|\[[\d.]+(?:px|rem|em)\]|fluid-[\w-]+)/g, exts: ['.ts', '.tsx', '.css'] },
  { id: 'raw-tracking', pattern: /\btracking-[\w[\].-]+/g, exts: ['.ts', '.tsx'] },
  { id: 'important', pattern: /!important\b/g, exts: ['.css'] },
  { id: 'inline-font-family', pattern: /font-family\s*:/g, files: ['index.html', 'src/index.css'] },
];

const isTestFile = (rel) => /\.(test|spec)\.[tj]sx?$/.test(rel) || rel.includes('__tests__');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : walk(full);
    return [full];
  });

export const countViolations = (files) => {
  const counts = {};
  for (const rule of RULES) {
    counts[rule.id] = {};
    for (const [rel, content] of Object.entries(files)) {
      const applies = rule.files ? rule.files.includes(rel) : rule.exts.includes(path.extname(rel)) && rel.startsWith('src/');
      if (!applies) continue;
      const n = (content.match(rule.pattern) || []).length;
      if (n > 0) counts[rule.id][rel] = n;
    }
  }
  return counts;
};

export const compareToBaseline = (counts, baseline) => {
  const increased = [];
  const decreased = [];
  for (const rule of RULES) {
    const current = counts[rule.id] || {};
    const base = baseline[rule.id] || {};
    for (const file of new Set([...Object.keys(current), ...Object.keys(base)])) {
      const now = current[file] || 0;
      const was = base[file] || 0;
      if (now > was) increased.push({ rule: rule.id, file, was, now });
      if (now < was) decreased.push({ rule: rule.id, file, was, now });
    }
  }
  return { increased, decreased };
};

const readSourceFiles = () => {
  const files = {};
  for (const full of walk(path.join(ROOT, 'src'))) {
    const rel = path.relative(ROOT, full).split(path.sep).join('/');
    if (['.ts', '.tsx', '.css'].includes(path.extname(rel)) && !isTestFile(rel)) files[rel] = fs.readFileSync(full, 'utf8');
  }
  files['index.html'] = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  return files;
};

const sortCounts = (counts) =>
  Object.fromEntries(
    Object.entries(counts).map(([rule, byFile]) => [rule, Object.fromEntries(Object.entries(byFile).sort(([a], [b]) => a.localeCompare(b)))])
  );

const total = (byFile = {}) => Object.values(byFile).reduce((sum, n) => sum + n, 0);

const main = () => {
  const counts = countViolations(readSourceFiles());
  if (process.argv.includes('--update')) {
    fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(sortCounts(counts), null, 2)}\n`);
    console.log(`Updated ${path.relative(ROOT, BASELINE_PATH)}`);
    return;
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
  for (const rule of RULES) console.log(`${rule.id}: ${total(counts[rule.id])} (baseline ${total(baseline[rule.id])})`);

  const { increased, decreased } = compareToBaseline(counts, baseline);
  for (const v of increased) console.error(`✖ ${v.rule} in ${v.file}: ${v.was} → ${v.now} (see docs/design-system.md)`);
  for (const v of decreased) console.error(`✖ stale baseline: ${v.rule} in ${v.file}: ${v.was} → ${v.now}; run node scripts/check-design-system.mjs --update`);
  if (increased.length || decreased.length) process.exit(1);
  console.log('✔ Design system ratchet holds.');
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
