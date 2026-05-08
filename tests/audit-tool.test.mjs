import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIT_SCRIPT = path.join(ROOT, 'scripts/detect-antipatterns.mjs');

function runAudit(target) {
  try {
    const output = execSync(`node ${AUDIT_SCRIPT} ${target} --json`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    return JSON.parse(output);
  } catch (error) {
    if (error.stdout) {
      return JSON.parse(error.stdout);
    }
    throw error;
  }
}

const tests = [
  {
    name: 'Detects cramped padding in CSS',
    target: 'tests/audit-fixtures/violation-padding.css',
    expectedPatterns: ['Cramped Spacing']
  },
  {
    name: 'Detects hardcoded colors in CSS',
    target: 'tests/audit-fixtures/violation-colors.css',
    expectedPatterns: ['Hardcoded Color']
  },
  {
    name: 'Detects excessive nesting in CSS',
    target: 'tests/audit-fixtures/violation-nesting.css',
    expectedPatterns: ['Excessive Nesting']
  },
  {
    name: 'Passes valid CSS',
    target: 'tests/audit-fixtures/valid.css',
    expectedViolations: 0
  },
  {
    name: 'Detects violations in TSX',
    target: 'tests/audit-fixtures/violation.tsx',
    expectedPatterns: ['Arbitrary Value', 'Raw Layout/Spacing', 'div Layout', 'Inline Styles', 'Arbitrary Pixel Value']
  }
];

let failed = false;

for (const test of tests) {
  console.log(`Running test: ${test.name}`);
  const result = runAudit(test.target);
  const violations = Object.values(result.violations).flat();

  if (test.expectedViolations !== undefined) {
    if (violations.length !== test.expectedViolations) {
      console.error(`  FAIL: Expected ${test.expectedViolations} violations, got ${violations.length}`);
      failed = true;
    } else {
      console.log(`  PASS`);
    }
    continue;
  }

  const foundPatterns = new Set(violations.map(v => v.pattern));
  const missing = test.expectedPatterns.filter(p => !foundPatterns.has(p));

  if (missing.length > 0) {
    console.error(`  FAIL: Missing expected patterns: ${missing.join(', ')}`);
    console.log(`  Found patterns: ${Array.from(foundPatterns).join(', ')}`);
    failed = true;
  } else {
    console.log(`  PASS`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('\nAll audit tests passed!');
}
