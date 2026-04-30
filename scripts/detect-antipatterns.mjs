import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx'];

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
    'transparent', 'current', 'yellow-400', 'emerald-500', 'red-500',
    'amber-500', 'success', 'error', 'warning'
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
      pattern: /\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b/,
      isClassNameRule: true,
      severity: 'minor',
      message: 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
    },
    {
      name: 'div Layout',
      pattern: /<div\s+[^>]*?className=["'](.*?(?:flex|grid|p-|m-|gap-).*?)["']/g,
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
    }
  ]
};

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
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

  // 1. Multi-line and General Rules (Global Scanner)
  const compiledRules = CONFIG.rules
    .filter(r => !r.isClassNameRule)
    .map(r => ({
      ...r,
      regex: new RegExp(r.pattern.source, r.name === 'div Layout' ? 'gs' : 'g')
    }));

  compiledRules.forEach(rule => {
    const matches = content.matchAll(rule.regex);
    for (const match of matches) {
      const lineNum = getLineNumber(match.index);

      // Check for impeccable-ignore on that line
      const line = content.split('\n')[lineNum - 1];
      if (line.includes('// impeccable-ignore')) continue;

      violations.push({
        line: lineNum,
        pattern: rule.name,
        severity: rule.severity || 'minor',
        value: match[0].length > 60 ? match[0].substring(0, 60).replace(/\s+/g, ' ') + '...' : match[0].replace(/\s+/g, ' '),
        message: rule.message
      });
    }
  });

  // 2. ClassName Specific Rules (Line-by-Line for Granularity)
  const lines = content.split('\n');
  lines.forEach((line, lineIdx) => {
    const lineNum = lineIdx + 1;
    if (line.includes('// impeccable-ignore')) return;

    const classNameMatches = line.matchAll(/className=["'](.*?)["']/g);
    for (const cnMatch of classNameMatches) {
      const classStr = cnMatch[1];
      const classes = classStr.split(/\s+/);

      classes.forEach(cls => {
        // Raw Layout/Spacing
        const layoutRule = CONFIG.rules.find(r => r.name === 'Raw Layout/Spacing');
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

            // Special case for hex values which are caught by separate rule but should be flagged here too if they leaked
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
      Object.entries(LAYOUT_SUGGESTIONS).forEach(([pattern, suggestion]) => {
        if (classStr.includes(pattern)) {
          if (!violations.find(v => v.line === lineNum && v.pattern === 'Layout Suggestion')) {
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
  });

  // Sort violations by line number
  return violations.sort((a, b) => a.line - b.line);
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
const targets = args.filter(arg => !arg.startsWith('--'));

if (!isJson) {
  console.log('\x1b[34m🔍 Scanning for UI anti-patterns...\x1b[0m\n');
  checkPRScope();
}

const auditTargets = targets.length > 0 ? targets : CHECK_DIRS.map(d => d.includes('.') ? d : `${d}/**/*.{ts,tsx}`);
const allViolations = {};

const files = await glob(auditTargets, { cwd: ROOT, absolute: true, ignore: ['**/node_modules/**'] });

files.forEach(filepath => {
  if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
    const violations = checkFile(filepath);
    if (violations.length > 0) {
      allViolations[path.relative(ROOT, filepath)] = violations;
    }
  }
});

if (isJson) {
  process.stdout.write(JSON.stringify(allViolations, null, 2));
  process.exit(Object.keys(allViolations).length > 0 ? 1 : 0);
}

if (Object.keys(allViolations).length === 0) {
  console.log('\x1b[32m✔ No anti-patterns detected!\x1b[0m');
  generateTodoFile({});
} else {
  console.log('\x1b[31m✖ Anti-patterns detected:\x1b[0m\n');
  for (const [file, violations] of Object.entries(allViolations)) {
    console.log(`\x1b[36m${file}\x1b[0m`);
    violations.forEach(v => {
      console.log(`  \x1b[90mLine ${v.line}:\x1b[0m [${v.pattern}] \x1b[33m${v.value}\x1b[0m - ${v.message}`);
    });
    console.log();
  }
  generateTodoFile(allViolations);
  console.log("Successfully generated TODO_ANTIPATTERNS.md");
  process.exit(1);
}
