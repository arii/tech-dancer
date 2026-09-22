import fs from 'fs';
import path from 'path';

export interface RetrievedGuideline {
  title: string;
  source: string;
  content: string;
}

const WCAG_REMEDIATION_RULES: Record<string, string> = {
  'color-contrast': `WCAG 1.4.3 Contrast (Minimum): Text elements must maintain a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (>= 18pt or >= 14pt bold). Use design token classes like 'text-main', 'text-body', or 'text-primary' with 'bg-surface'. Avoid hardcoded low-contrast gray shades and avoid dark red on black.`,
  'target-size': `WCAG 2.5.5 / 2.5.8 Target Size: Interactive touch targets (buttons, links, icon triggers) must be at least 44x44px on touch viewports or provide 44px spacing between targets. Use 'min-h-[44px] min-w-[44px] p-2' or flex wrapper with adequate padding.`,
  'button-name': `WCAG 4.1.2 Name, Role, Value: Buttons without visible text (e.g. icon-only buttons) must have an explicit 'aria-label' or 'sr-only' child text describing the action (e.g. <button aria-label="Open navigation menu">).`,
  'link-name': `WCAG 2.4.4 Link Purpose: Links must have accessible text describing their destination. Never use generic 'click here' or empty <a> tags. Provide 'aria-label' or descriptive text.`,
  'heading-order': `WCAG 1.3.1 Info and Relationships: Heading levels must increment logically without skipping (e.g. H1 -> H2 -> H3). Do not jump from H1 directly to H4.`,
  'landmark-main-is-top-level': `WCAG 1.3.1: Landmark <main> must be a top-level container and not nested within another <main> landmark. Change inner <main> tags to <div> or <section>.`,
  'landmark-no-duplicate-main': `WCAG 1.3.1: A document must not have more than one <main> landmark unless distinct unique aria-labels are provided. Consolidate into a single top-level <main id="main-content">.`,
  'landmark-unique': `WCAG 1.3.1: All landmarks of the same role must have unique accessible names.`,
  'aria-allowed-attr': `WCAG 4.1.2: ARIA attributes must be valid and conform to the element role. Ensure 'aria-expanded' is only used on expandable triggers with proper 'aria-controls'.`,
  'image-alt': `WCAG 1.1.1 Non-text Content: Images must have meaningful 'alt' attributes describing the visual information, or 'alt=""' if purely decorative.`
};

export class DesignSystemRAGRetriever {
  private indexedSnippets: RetrievedGuideline[] = [];
  private componentFileMap: string[] = [];

  constructor() {
    this.indexLocalDesignSystem();
    this.indexComponentFileTree();
  }

  private indexLocalDesignSystem(): void {
    const rootDir = process.cwd();

    // 1. Index AGENTS.md design tokens & styling rules
    const agentsMdPath = path.join(rootDir, 'AGENTS.md');
    if (fs.existsSync(agentsMdPath)) {
      try {
        const content = fs.readFileSync(agentsMdPath, 'utf8');
        this.indexedSnippets.push({
          title: 'Repository Styling Rules & Token Guidelines',
          source: 'AGENTS.md',
          content: this.extractSection(content, 'Core Principle', '---') || content.slice(0, 1500)
        });
      } catch {
        // ignore
      }
    }

    // 2. Index Primitives layout conventions and import path
    const primitivesPath = path.join(rootDir, 'src', 'layouts', 'Primitives.tsx');
    if (fs.existsSync(primitivesPath)) {
      try {
        const content = fs.readFileSync(primitivesPath, 'utf8');
        this.indexedSnippets.push({
          title: 'Primitives Layout Components (<Box>, <Stack>, <Grid>, <Text>, <Button>)',
          source: 'src/layouts/Primitives.tsx',
          content: `IMPORT PATH: import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';\n\n${content.slice(0, 1400)}`
        });
      } catch {
        // ignore
      }
    }

    // 3. Index Global CSS tokens
    const indexCssPath = path.join(rootDir, 'src', 'index.css');
    if (fs.existsSync(indexCssPath)) {
      try {
        const content = fs.readFileSync(indexCssPath, 'utf8');
        this.indexedSnippets.push({
          title: 'Design Tokens & Theme Variables',
          source: 'src/index.css',
          content: content.slice(0, 1500)
        });
      } catch {
        // ignore
      }
    }
  }

  private indexComponentFileTree(): void {
    const rootDir = process.cwd();
    const scanDirs = [
      path.join(rootDir, 'src', 'pages'),
      path.join(rootDir, 'src', 'features'),
      path.join(rootDir, 'src', 'layouts'),
      path.join(rootDir, 'src', 'components')
    ];

    for (const dir of scanDirs) {
      if (!fs.existsSync(dir)) continue;
      this.collectFilesRecursively(dir, rootDir);
    }
  }

  private collectFilesRecursively(currentDir: string, rootDir: string): void {
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== '__tests__') {
            this.collectFilesRecursively(fullPath, rootDir);
          }
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          const relPath = path.relative(rootDir, fullPath);
          this.componentFileMap.push(relPath);
        }
      }
    } catch {
      // ignore
    }
  }

  private extractSection(text: string, startHeader: string, endDelimiter: string): string {
    const startIdx = text.indexOf(startHeader);
    if (startIdx === -1) return '';
    const endIdx = text.indexOf(endDelimiter, startIdx);
    return endIdx !== -1 ? text.slice(startIdx, endIdx).trim() : text.slice(startIdx, startIdx + 1200).trim();
  }

  /**
   * Retrieves relevant design system tokens, layout conventions, WCAG guidance, and verified file map.
   */
  public retrieveContext(axeViolationIds: string[] = []): string {
    const lines: string[] = [];

    lines.push('=== REPOSITORY DESIGN SYSTEM & CODE GUIDELINES ===');
    for (const snippet of this.indexedSnippets) {
      lines.push(`### Source: ${snippet.source} (${snippet.title})`);
      lines.push(snippet.content);
      lines.push('');
    }

    lines.push('=== VERIFIED REPOSITORY COMPONENT FILE MAP ===');
    lines.push('When generating unified diff paths, cross-reference these real project files:');
    this.componentFileMap.forEach(f => lines.push(`- ${f}`));
    lines.push('');

    lines.push('=== WCAG 2.2 AA REMEDIATION RULES ===');
    for (const violationId of axeViolationIds) {
      if (WCAG_REMEDIATION_RULES[violationId]) {
        lines.push(`- **${violationId}**: ${WCAG_REMEDIATION_RULES[violationId]}`);
      }
    }
    if (axeViolationIds.length === 0) {
      lines.push('- Maintain high contrast (>= 4.5:1), touch targets (>= 44x44px), and clear heading hierarchy.');
    }

    return lines.join('\n');
  }
}
