import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx'];

// Allowed tokens or patterns that look like Tailwind but are safe
const ALLOWED_COLORS = ['bg', 'surface', 'accent', 'accent-navy', 'text-main', 'text-body', 'text-dim', 'line', 'white', 'black', 'transparent', 'current', 'yellow-400', 'success', 'warning', 'error', 'success-dim', 'warning-dim'];
const ALLOWED_TEXT_UTILS = ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic'];
const ALLOWED_TEXT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  if (content.includes('// impeccable-ignore-file')) {
    return [];
  }

  // 1. Check for arbitrary values -[...]
  const arbitraryRegex = /-\[.*?\]/g;
  let match;
  while ((match = arbitraryRegex.exec(content)) !== null) {
    const lineNum = getLineNumber(content, match.index);
    if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;

    violations.push({
      line: lineNum,
      pattern: 'Arbitrary Value',
      value: match[0],
      message: 'Avoid arbitrary values like -[...]. Use design tokens instead.'
    });
  }

  // 2. Check for raw Tailwind classes in className
  const classNameRegex = /className=["'](.*?)["']/g;
  while ((match = classNameRegex.exec(content)) !== null) {
    const lineNum = getLineNumber(content, match.index);
    if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;

    const classStr = match[1];
    const classes = classStr.split(/\s+/);

    classes.forEach(cls => {
      // Layout & Spacing
      if (/\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b/.test(cls)) {
        violations.push({
          line: lineNum,
          pattern: 'Raw Layout/Spacing',
          value: cls,
          message: 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
        });
      }

      // Colors
      if (/\b(bg-|text-)\b/.test(cls)) {
        const colorMatch = cls.match(/\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b/);
        if (colorMatch) {
          const baseColor = colorMatch[2].split('/')[0];
          const isAllowed = ALLOWED_COLORS.includes(baseColor) ||
                            ALLOWED_TEXT_UTILS.includes(baseColor) ||
                            ALLOWED_TEXT_SIZES.includes(baseColor);

          if (!isAllowed) {
            violations.push({
              line: lineNum,
              pattern: 'Non-token Color/Size',
              value: cls,
              message: `Class '${cls}' uses a value that is not a recognized design token.`
            });
          }
        }
      }
    });
  }

  // 3. Check for <div> with layout classes (Rule 3 & 21)
  const divRegex = /<div\s+[^>]*?className=["'](.*?(?:flex|grid|p-|m-|gap-).*?)["']/g;
  while ((match = divRegex.exec(content)) !== null) {
      const lineNum = getLineNumber(content, match.index);
      if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;

      violations.push({
          line: lineNum,
          pattern: 'div Layout',
          value: '<div> with layout classes',
          message: 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
      });
  }

  return violations;
}

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    if (fs.statSync(dir).isFile()) {
        callback(dir);
        return;
    }
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

console.log('\x1b[34m🔍 Scanning for UI anti-patterns...\x1b[0m\n');

const allViolations = {};
CHECK_DIRS.forEach(dir => {
    const fullPath = path.resolve(ROOT, dir);
    walk(fullPath, (filepath) => {
        if (filepath.endsWith('.tsx')) {
            const violations = checkFile(filepath);
            if (violations.length > 0) {
                allViolations[path.relative(ROOT, filepath)] = violations;
            }
        }
    });
});

if (Object.keys(allViolations).length === 0) {
  console.log('\x1b[32m✔ No anti-patterns detected!\x1b[0m');
} else {
  console.log('\x1b[31m✖ Anti-patterns detected:\x1b[0m\n');
  for (const [file, violations] of Object.entries(allViolations)) {
    console.log(`\x1b[36m${file}\x1b[0m`);
    violations.forEach(v => {
      console.log(`  \x1b[90mLine ${v.line}:\x1b[0m [${v.pattern}] \x1b[33m${v.value}\x1b[0m - ${v.message}`);
    });
    console.log();
  }
  process.exit(1);
}
