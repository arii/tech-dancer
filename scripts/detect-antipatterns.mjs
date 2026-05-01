import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CHECK_DIRS = ['src/features', 'src/pages', 'src/components', 'src/App.tsx'];

const LAYOUT_SUGGESTIONS = {
  'flex flex-col': '<Stack direction="col">',
  'flex flex-row': '<Stack direction="row">',
  'flex items-center': '<Stack align="center">',
  'flex justify-between': '<Stack justify="between">',
  'grid grid-cols': '<Grid cols={...}>',
};

// Modularized linting configuration
const CONFIG = {
  allowedColors: [
    'bg', 'surface', 'accent', 'accent-brand', 'accent-navy',
    'text-main', 'text-body', 'text-dim', 'line', 'white', 'black',
    'transparent', 'current', 'yellow-400', 'emerald-500', 'emerald-600', 'red-500',
    'amber-500', 'success', 'error', 'warning', 'muted', 'muted/10'
  ],
  allowedTextUtils: ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic'],
  allowedTextSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
  rules: [
    {
      name: 'Arbitrary Value',
      pattern: /-\[.*?\]/g,
      severity: 'minor',
      message: 'Avoid arbitrary values like -[...]. Use design tokens instead.'
    },
    {
      name: 'Raw Layout/Spacing',
      pattern: /\b(flex(-[a-z0-9-]+)?|grid(-[a-z0-9-]+)?|items-[a-z-]+|justify-[a-z-]+|p[xytrbl]?-[0-9.]+|m[xytrbl]?-[0-9.]+|gap-[0-9.]+|shrink(-[0-9]+)?|grow(-[0-9]+)?|basis-[a-z0-9-]+|self-[a-z-]+)\b/,
      isClassNameRule: true,
      severity: 'minor',
      message: 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
    },
    {
      name: 'div Layout',
      pattern: /<div\s+[^>]*?className=(?:["'](.*?(?:flex|grid|p-|m-|gap-).*?)["']|\{.*?["'`].*?(?:flex|grid|p-|m-|gap-).*?["'`].*?\})/gs,
      severity: 'minor',
      message: 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
    },
    {
      name: 'HashRouter Usage',
      pattern: /HashRouter/g,
      severity: 'major',
      message: 'HashRouter is banned. Use createBrowserRouter (AGENTS.md §9)'
    },
    {
      name: 'Unnecessary React Import',
      pattern: /import\s+React\s+from\s+['"]react['"]/g,
      severity: 'minor',
      message: 'Unnecessary React import — React 17+ (AGENTS.md §4)'
    },
    {
      name: 'Inline Styles',
      pattern: /style=\{\{/g,
      severity: 'major',
      message: 'Inline styles are banned. Use design tokens (AGENTS.md §11)'
    },
    {
      name: 'Arbitrary Pixel Value',
      pattern: /text-\[\d+px\]/g,
      severity: 'minor',
      message: 'Arbitrary px Tailwind value. Use design tokens (AGENTS.md §1)'
    },
    {
      name: 'Raw Hex Color',
      pattern: /bg-\[#/g,
      severity: 'minor',
      message: 'Raw hex color in Tailwind. Use CSS variables from tokens.css'
    },
    {
      name: 'Arbitrary Text Size',
      pattern: /className=".*?text-\[\d/g,
      severity: 'minor',
      message: 'Arbitrary text size. Use typeSizes from design-tokens.ts'
    }
  ],
  deprecated: {
    assets: { 'accent-brand': 'accent', 'useSearch': 'useSearchParam' },
    paths: { 'src/components/common/': 'src/components/ui/' }
  },
  existingComponents: {
    'Box': 'src/layouts/Box.tsx', 'Stack': 'src/layouts/Stack.tsx', 'Grid': 'src/layouts/Grid.tsx',
    'Text': 'src/layouts/Text.tsx', 'Button': 'src/layouts/Button.tsx', 'ContentCard': 'src/components/ui/ContentCard.tsx',
    'PageHeader': 'src/components/ui/PageHeader.tsx', 'FilterBar': 'src/components/ui/FilterBar.tsx',
    'FolioGrid': 'src/components/ui/FolioGrid.tsx', 'Skeleton': 'src/components/ui/Skeleton.tsx',
    'ViewToggle': 'src/components/ui/ViewToggle.tsx', 'ListRow': 'src/components/ui/ListRow.tsx',
    'MarkdownRenderer': 'src/components/ui/MarkdownRenderer.tsx', 'DetailLayout': 'src/components/layout/DetailLayout.tsx',
    'useSearchParam': 'src/hooks/useSearchParam.ts', 'useHotkeys': 'src/hooks/useHotkeys.ts', 'safeSearch': 'src/lib/utils.ts',
  },
  requiredContentFields: ['type', 'title', 'date', 'author', 'category', 'excerpt']
};

function checkContent(content) {
  if (content.includes('// impeccable-ignore-file')) return [];

  const violations = [];

  // Helper to get line number from index efficiently
  const lineOffsets = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\n') lineOffsets.push(i + 1);
  }
  const getLineNumber = (index) => {
    let low = 0, high = lineOffsets.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] <= index) low = mid + 1;
      else high = mid - 1;
    }
    return low;
  };

  // Pre-compiled rules and helper utilities
  const lines = content.split('\n');
  const layoutRule = CONFIG.rules.find(r => r.name === 'Raw Layout/Spacing');
  const suggestionsEntries = Object.entries(LAYOUT_SUGGESTIONS);

  // 1. Multi-line and General Rules (Global Scanner)
  CONFIG.rules
    .filter(r => !r.isClassNameRule)
    .forEach(rule => {
      const regex = new RegExp(rule.pattern.source, rule.name === 'div Layout' ? 'gs' : 'g');
      const matches = content.matchAll(regex);

      for (const match of matches) {
        const lineNum = getLineNumber(match.index);
        if (lines[lineNum - 1] && lines[lineNum - 1].includes('// impeccable-ignore')) continue;

        violations.push({
          line: lineNum,
          pattern: rule.name,
          severity: rule.severity || 'minor',
          value: match[0].length > 60 ? match[0].substring(0, 60).replace(/\s+/g, ' ') + '...' : match[0].replace(/\s+/g, ' '),
          message: rule.message
        });
      }
    });

  // 2. ClassName Specific Rules (Global Scanner)
  for (const match of content.matchAll(/className=(?:["'](.*?)(?:["'])|\{(.*?)\})/gs)) {
    const lineNum = getLineNumber(match.index);
    if (lines[lineNum - 1] && lines[lineNum - 1].includes('// impeccable-ignore')) continue;

    const classStr = match[1] || match[2] || '';
    const classes = classStr.split(/[\s"'`,()[\]{}]+/).filter(Boolean);

    classes.forEach(cls => {
      // Raw Layout/Spacing
      if (layoutRule.pattern.test(cls)) {
        violations.push({
          line: lineNum,
          pattern: layoutRule.name,
          severity: layoutRule.severity || 'minor',
          value: cls,
          message: layoutRule.message
        });
      }

      // Colors check
      if (/\b(bg-|text-)\b/.test(cls)) {
        const colorMatch = cls.match(/\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b/);
        if (colorMatch) {
          const prefix = colorMatch[1];
          const baseColor = colorMatch[2].split('/')[0];
          const fullToken = `${prefix}-${baseColor}`;
          const isAllowed = CONFIG.allowedColors.includes(baseColor) ||
                            CONFIG.allowedColors.includes(fullToken) ||
                            CONFIG.allowedTextUtils.includes(baseColor) ||
                            CONFIG.allowedTextSizes.includes(baseColor);

          if (!isAllowed) {
            violations.push({
              line: lineNum,
              pattern: 'Non-token Color/Size',
              severity: 'minor',
              value: cls,
              message: `Class '${cls}' uses a value that is not a recognized design token.`
            });
          }
        }
      }
    });

    // Layout Suggestions
    suggestionsEntries.forEach(([pattern, suggestion]) => {
      if (classStr.includes(pattern)) {
        if (!violations.some(v => v.line === lineNum && v.pattern === 'Layout Suggestion' && v.value === pattern)) {
          violations.push({
            line: lineNum,
            pattern: 'Layout Suggestion',
            severity: 'minor',
            value: pattern,
            message: `Consider replacing '${pattern}' with ${suggestion}`
          });
        }
      }
    });
  }

  // Sort violations by line number
  return violations.sort((a, b) => a.line - b.line);
}

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  return checkContent(content);
}

function checkPRScope() {
  try {
    const scopeCheckScript = path.join(__dirname, "../dev-tools/scope_check.py");
    const output = execFileSync("python3", [scopeCheckScript], { encoding: "utf8" }).trim();
    if (output) {
      console.log(`\x1b[33m⚠️  ${output}\x1b[0m\n`);
    }
  } catch {
    // Python or script might not be available
  }
}

function generateTodoFile(allViolations) {
  let todoContent = "# UI Anti-Pattern TODO List\n\n";
  todoContent += "This list is automatically generated from the audit report. Fix these anti-patterns to adhere to the project design system.\n\n";

  for (const [file, violations] of Object.entries(allViolations)) {
    todoContent += `## ${file}\n`;
    violations.forEach(v => {
      todoContent += `- [ ] Line ${v.line}: [${v.pattern}] ${v.value} - ${v.message}\n`;
    });
    todoContent += "\n";
  }

  fs.writeFileSync(path.join(ROOT, 'TODO_ANTIPATTERNS.md'), todoContent);
}

const args = process.argv.slice(2);
const isJson = args.includes('--json');
const isCountOnly = args.includes('--count-only');
const targets = args.filter(arg => !arg.startsWith('--'));

if (!isJson && !isCountOnly) {
  console.log('\x1b[34m🔍 Scanning for UI anti-patterns...\x1b[0m\n');
  checkPRScope();
}

const allViolations = {};

if (targets.includes('-')) {
  let stdinContent = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) {
    stdinContent += chunk;
  }
  const violations = checkContent(stdinContent);
  if (violations.length > 0) {
    allViolations['stdin'] = violations;
  }
} else {
  const auditTargets = targets.length > 0 ? targets : CHECK_DIRS.map(d => d.includes('.') ? d : `${d}/**/*.{ts,tsx}`);
  const files = await glob(auditTargets, { cwd: ROOT, absolute: true, ignore: ['**/node_modules/**'] });

  files.forEach(filepath => {
    if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      const violations = checkFile(filepath);
      if (violations.length > 0) {
        allViolations[path.relative(ROOT, filepath)] = violations;
      }
    }
  });
}

const totalViolations = Object.values(allViolations).flat().length;

if (isCountOnly) {
  process.stdout.write(totalViolations.toString() + '\n');
  process.exit(0);
}

if (isJson) {
  process.stdout.write(JSON.stringify({
    violations: allViolations,
    config: {
      deprecated: CONFIG.deprecated,
      existingComponents: CONFIG.existingComponents,
      requiredContentFields: CONFIG.requiredContentFields
    }
  }, null, 2));
  process.exit(totalViolations > 0 ? 1 : 0);
}

if (totalViolations === 0) {
  console.log('\x1b[32m✔ No anti-patterns detected!\x1b[0m');
  generateTodoFile({});
} else {
  console.log(`\x1b[31m✖ ${totalViolations} anti-patterns detected:\x1b[0m\n`);
  for (const [file, violations] of Object.entries(allViolations)) {
    console.log(`\x1b[36m${file}\x1b[0m`);
    violations.forEach(v => {
      console.log(`  \x1b[90mLine ${v.line}:\x1b[0m [${v.pattern}] \x1b[33m${v.value}\x1b[0m - ${v.message}`);
    });
    console.log();
  }
  generateTodoFile(allViolations);
  process.exit(1);
}
