import { Project, SyntaxKind } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const project = new Project();
// Add files manually to avoid tsconfig issues in sandbox
project.addSourceFilesAtPaths([
  'src/**/*.ts',
  'src/**/*.tsx',
]);

let allPassed = true;

function report(passed, message, file = '') {
  if (passed) {
    console.log(`✅ Passed: ${message} ${file ? `(${file})` : ''}`);
  } else {
    console.log(`❌ Failed: ${message} ${file ? `(${file})` : ''}`);
    allPassed = false;
  }
}

console.log('🔍 Auditing Codebase with AST-based Consistency Playbook...\n');

// Rule 1: Capped image heights
const cardPlaceholder = project.getSourceFile('src/components/ui/CardImagePlaceholder.tsx');
if (cardPlaceholder) {
  const boxElements = cardPlaceholder.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .concat(cardPlaceholder.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement))
    .filter(el => el.getTagNameNode().getText() === 'Box');

  const hasCappedHeight = boxElements.some(el => {
    const maxHeight = el.getAttribute('maxHeight');
    return maxHeight && maxHeight.getText().includes('160px');
  });
  report(hasCappedHeight, 'Missing maxHeight="160px" capped primitive', 'src/components/ui/CardImagePlaceholder.tsx');
} else {
  console.log('⚠️  Skipped: src/components/ui/CardImagePlaceholder.tsx (File missing)');
}

// Rule 2: Content Width tokens
const designTokens = project.getSourceFile('src/styles/design-tokens.ts');
if (designTokens) {
  const hasContentWidth = designTokens.getFullText().includes('contentWidth');
  report(!!hasContentWidth, 'Missing contentWidth definition', 'src/styles/design-tokens.ts');
}

const detailLayout = project.getSourceFile('src/components/layout/DetailLayout.tsx');
if (detailLayout) {
  const usesContentWidth = detailLayout.getFullText().includes('contentWidth[maxWidth]');
  report(usesContentWidth, 'Not utilizing contentWidth token dynamically', 'src/components/layout/DetailLayout.tsx');
}

const blogPostDetail = project.getSourceFile('src/features/journal/components/BlogPostDetail.tsx');
if (blogPostDetail) {
  const hasMaxWidthArticle = blogPostDetail.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .some(el => el.getAttribute('maxWidth')?.getText().includes('article'));
  report(hasMaxWidthArticle, 'Not utilizing maxWidth="article"', 'src/features/journal/components/BlogPostDetail.tsx');
}

// Rule 3: Guard empty states
const gearPostDetail = project.getSourceFile('src/features/lab/components/GearPostDetail.tsx');
if (gearPostDetail) {
  const hasGuard = gearPostDetail.getFullText().includes('Object.keys(post.specs).length > 0');
  report(hasGuard, 'SpecsTable missing empty state guard', 'src/features/lab/components/GearPostDetail.tsx');
}

// Rule 4: Frontmatter validation
const contentLib = project.getSourceFile('src/lib/content.ts');
if (contentLib) {
  const hasValidatePost = !!contentLib.getFunction('validatePost');
  report(hasValidatePost, 'Missing validatePost() validation layer', 'src/lib/content.ts');
}

// Rule 5: Typography casing
if (designTokens) {
  const displayToken = designTokens.getFullText().match(/display:[\s\S]*?}/);
  const hasUppercase = displayToken && displayToken[0].includes('uppercase');
  report(!hasUppercase, 'Typography display token still contains uppercase', 'src/styles/design-tokens.ts');
}

// Rule 6: Special-purpose layouts
const uxAuditor = project.getSourceFile('src/pages/UXAuditor.tsx');
if (uxAuditor) {
  const hasToolLayout = uxAuditor.getFullText().includes('contentWidth.tool');
  report(hasToolLayout, 'Missing contentWidth.tool wide layout container', 'src/pages/UXAuditor.tsx');
}

// Rule 7: Anti-pattern detection in CI
const packageJsonPath = path.join(ROOT_DIR, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
report(!!packageJson.scripts?.['audit:ui'], 'Missing audit:ui script definition', 'package.json');

console.log('\n🏁 AST Audit complete.');

if (!allPassed) {
  process.exit(1);
}
