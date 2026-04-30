import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "../dev-tools/project_config.json"), "utf8"));

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
      message: 'Avoid arbitrary values like -[...]. Use design tokens instead.'
    },
    {
      name: 'Raw Layout/Spacing',
      pattern: /\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b/,
      isClassNameRule: true,
      message: 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
    },
    {
      name: 'div Layout',
      pattern: /<div\s+[^>]*?className=["'](.*?(?:flex|grid|p-|m-|gap-).*?)["']/g,
      message: 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
    }
  ]
};

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  if (content.includes('// impeccable-ignore-file')) {
    return [];
  }

  // 1. Check for regex patterns defined in rules
  CONFIG.rules.forEach(rule => {
    if (rule.isClassNameRule) return; // Handled separately below

    let match;
    const regex = new RegExp(rule.pattern);
    while ((match = regex.exec(content)) !== null) {
      const lineNum = getLineNumber(content, match.index);
      if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;

      violations.push({
        line: lineNum,
        pattern: rule.name,
        value: match[0].length > 50 ? match[0].substring(0, 50) + '...' : match[0],
        message: rule.message
      });
    }
  });

  // 2. Check for classes in className
  const classNameRegex = /className=["'](.*?)["']/g;
  let match;
  while ((match = classNameRegex.exec(content)) !== null) {
    const lineNum = getLineNumber(content, match.index);
    if (lines[lineNum - 1].includes('// impeccable-ignore')) continue;

    const classStr = match[1];
    const classes = classStr.split(/\s+/);

    classes.forEach(cls => {
      // Check against Raw Layout/Spacing rule
      const layoutRule = CONFIG.rules.find(r => r.name === 'Raw Layout/Spacing');
      if (layoutRule.pattern.test(cls)) {
        violations.push({
          line: lineNum,
          pattern: layoutRule.name,
          value: cls,
          message: layoutRule.message
        });
      }

      // Colors check
      if (/\b(bg-|text-)\b/.test(cls)) {
        const colorMatch = cls.match(/\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b/);
        if (colorMatch) {
          const type = colorMatch[1];
          const baseColor = colorMatch[2].split('/')[0];
          const fullToken = `${type}-${baseColor}`;
          const isAllowed = CONFIG.allowedColors.includes(baseColor) ||
                            CONFIG.allowedColors.includes(fullToken) ||
                            CONFIG.allowedTextUtils.includes(baseColor) ||
                            CONFIG.allowedTextSizes.includes(baseColor);

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

      // Check for layout suggestions
      Object.entries(LAYOUT_SUGGESTIONS).forEach(([pattern, suggestion]) => {
        if (classStr.includes(pattern)) {
          // Only add once per line if not already added
          if (!violations.find(v => v.line === lineNum && v.pattern === 'Layout Suggestion')) {
            violations.push({
              line: lineNum,
              pattern: 'Layout Suggestion',
              value: pattern,
              message: `Consider replacing '${pattern}' with ${suggestion}`
            });
          }
        }
      });
    });
  }

  return violations;
}

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    if (fs.statSync(dir).isFile()) {
        callback(dir);
        return;
    }
    fs.readdirSync(dir).forEach( f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

function checkPRScope() {
  const { core_dirs: coreDirs, monolithic_pr_threshold: threshold, base_branch: base } = PROJECT_CONFIG;
  try {
    const changedFiles = execSync(`git diff --name-only ${base || 'origin/main'}`, { encoding: 'utf8' }).split('\n');
    const coreFiles = changedFiles.filter(f => coreDirs.some(d => f.startsWith(d)));

    if (coreFiles.length > threshold) {
      console.log(`\x1b[33m⚠️  PR Scope Warning: This branch modifies ${coreFiles.length} core files in ${coreDirs.join(", ")}.`);
      console.log(`   Consider splitting this monolithic PR to maintain isolated features and avoid conflicts (AGENTS.md §23).\x1b[0m\n`);
    }
  } catch {
    // Git might not be available or not a repo
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

console.log('\x1b[34m🔍 Scanning for UI anti-patterns...\x1b[0m\n');

checkPRScope();

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
  // If no violations, we can still update/clear the TODO file
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
