import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const checkFile = (relativePath, successRegex, failMessage, inverse = false) => {
  const filePath = path.join(ROOT_DIR, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped (File missing): ${relativePath}`);
    return true; // Don't fail for missing files in this specific audit
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const match = successRegex.test(content);

  if ((!inverse && match) || (inverse && !match)) {
    console.log(`✅ Passed: ${relativePath}`);
    return true;
  } else {
    console.log(`❌ Failed: ${failMessage} (${relativePath})`);
    return false;
  }
};

console.log('🔍 Auditing Codebase against Consistency Playbook...\n');

let allPassed = true;

// Rule 1: Capped image heights
allPassed &= checkFile('src/components/ui/ContentCard.tsx', /maxHeight:\s*['"]160px['"]|maxHeight=['"]160px['"]/, 'Missing maxHeight: 160px capped primitive');
allPassed &= checkFile('src/features/lab/GearCard.tsx', /maxHeight:\s*['"]160px['"]|maxHeight=['"]160px['"]/, 'Missing maxHeight: 160px capped primitive');

// Rule 2: Content Width tokens
allPassed &= checkFile('src/styles/design-tokens.ts', /contentWidth/, 'Missing contentWidth definition');
allPassed &= checkFile('src/components/layout/DetailLayout.tsx', /contentWidth\[maxWidth\]/, 'Not utilizing contentWidth token dynamically');
allPassed &= checkFile('src/features/journal/components/BlogPostDetail.tsx', /maxWidth=["']article["']/, 'Not utilizing contentWidth.article token');

// Rule 3: Guard empty states
allPassed &= checkFile('src/features/lab/components/GearPostDetail.tsx', /Object\.keys\(.*\.specs\)\.length\s*>\s*0/, 'SpecsTable missing empty state guard');

// Rule 4: Frontmatter validation
allPassed &= checkFile('src/lib/content.ts', /function validatePost/, 'Missing validatePost() validation layer');

// Rule 5: Typography casing
allPassed &= checkFile('src/styles/design-tokens.ts', /display:.*uppercase/, 'Typography display token still contains uppercase', true);

// Rule 6: Special-purpose layouts
allPassed &= checkFile('src/pages/UXAuditor.tsx', /contentWidth\.tool/, 'Missing contentWidth.tool wide layout container');

// Rule 7: Anti-pattern detection in CI
allPassed &= checkFile('package.json', /"audit:ui":/, 'Missing audit:ui script definition');

console.log('\n🏁 Audit complete.');

if (!allPassed) {
  process.exit(1);
}
