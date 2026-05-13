import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const BASELINE_FILE = path.join(ROOT, 'scripts/suppression-baseline.json');

const IGNORE_PATTERN = /impeccable-ignore-file/g;

function scanFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanFiles(fullPath));
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(IGNORE_PATTERN);
      if (matches) {
        results.push({
          file: path.relative(ROOT, fullPath),
          count: matches.length,
        });
      }
    }
  }
  return results;
}

const inventory = scanFiles(SRC_DIR);
const totalCount = inventory.reduce((sum, item) => sum + item.count, 0);

console.log('Suppression Inventory:');
inventory.forEach(item => {
  console.log(`- ${item.file}: ${item.count}`);
});
console.log(`\nTotal suppressions: ${totalCount}`);

let baseline = 0;
if (fs.existsSync(BASELINE_FILE)) {
  const baselineData = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  baseline = baselineData.count;
} else {
  console.warn(`\n⚠️  Baseline file not found at ${BASELINE_FILE}. Assuming baseline of 0.`);
}

console.log(`Baseline: ${baseline}`);

if (totalCount > baseline) {
  console.error(`\n❌ Error: Suppression count (${totalCount}) exceeds baseline (${baseline}).`);
  console.error('Please resolve the anti-patterns instead of suppressing them, or update the baseline if the suppressions are justified.');
  process.exit(1);
} else {
  console.log('\n✅ Suppression check passed.');
}
