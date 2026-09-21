import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { pruneHtmlDom } from '../../scripts/ux-auditor/domPruner';
import { DesignSystemRAGRetriever } from '../../scripts/ux-auditor/ragRetriever';
import {
  UXHypothesesResponseSchema,
  UXAuditSynthesisSchema,
  type UXAuditState
} from '../../scripts/ux-auditor/types';
import { saveAuditArtifacts } from '../../scripts/ux-auditor/reporter';

describe('UX Auditor: DOM Pruner', () => {
  it('strips script, style, svg, and comment tags while preserving semantic tags', () => {
    const rawHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>.hero { color: red; }</style>
          <script>console.log("bad");</script>
        </head>
        <body>
          <!-- Top level navigation comment -->
          <header>
            <nav>
              <a href="/home" aria-label="Home page">Tech Dancer</a>
              <svg width="24" height="24"><path d="M0 0h24v24H0z"/></svg>
            </nav>
          </header>
          <main>
            <h1 class="text-4xl font-bold">Services</h1>
            <p>Comprehensive dance coaching.</p>
            <button role="button" aria-expanded="false" data-section="cta">Book Now</button>
          </main>
        </body>
      </html>
    `;

    const pruned = pruneHtmlDom(rawHtml);

    expect(pruned).not.toContain('<script');
    expect(pruned).not.toContain('<style');
    expect(pruned).not.toContain('<svg');
    expect(pruned).not.toContain('Top level navigation comment');
    expect(pruned).toContain('<header>');
    expect(pruned).toContain('aria-label="Home page"');
    expect(pruned).toContain('Services');
    expect(pruned).toContain('aria-expanded="false"');
    expect(pruned).toContain('data-section="cta"');
  });

  it('unwraps empty single-child non-semantic wrapper divs', () => {
    const rawHtml = `
      <div>
        <div>
          <button class="bg-primary text-white">Click Me</button>
        </div>
      </div>
    `;

    const pruned = pruneHtmlDom(rawHtml);
    expect(pruned).toBe('<button class="bg-primary text-white">Click Me</button>');
  });
});

describe('UX Auditor: RAG Retriever', () => {
  it('retrieves design token rules and WCAG guidelines', () => {
    const retriever = new DesignSystemRAGRetriever();
    const context = retriever.retrieveContext(['color-contrast', 'target-size']);

    expect(context).toContain('DESIGN SYSTEM');
    expect(context).toContain('WCAG 2.2 AA REMEDIATION RULES');
    expect(context).toContain('color-contrast');
    expect(context).toContain('target-size');
    expect(context).toContain('44x44px');
  });
});

describe('UX Auditor: Zod Schemas', () => {
  it('validates structured UX hypotheses output', () => {
    const validHypotheses = {
      visualHierarchySummary: 'Clear hero with prominent primary CTA.',
      primaryConversionGoal: 'Drive user inquiries via the booking form.',
      hypotheses: [
        {
          question: 'Does the multi-column pricing card collapse cleanly on mobile?',
          context: 'Table has 4 columns which may overflow on 375px viewport.',
          suggestedAction: 'Inspect mobile breakpoint for horizontal overflow.',
          recommendedViewportsToInspect: ['mobile']
        }
      ]
    };

    const parsed = UXHypothesesResponseSchema.parse(validHypotheses);
    expect(parsed.hypotheses).toHaveLength(1);
    expect(parsed.hypotheses[0].recommendedViewportsToInspect).toContain('mobile');
  });

  it('validates structured synthesis output', () => {
    const validSynthesis = {
      overallScore: 88,
      summaryMarkdown: 'The page has a strong visual hierarchy but minor mobile touch target issues.',
      findings: [
        {
          id: 'UX-01',
          category: 'RESPONSIVE_LAYOUT' as const,
          severity: 'HIGH' as const,
          title: 'Mobile touch target too small',
          description: 'The booking button in header is only 32px tall.',
          affectedViewport: 'mobile',
          elementSelector: 'header nav button',
          recommendedFix: 'Increase padding and min-height to 44px.',
          suggestedTailwindSnippet: '<button className="min-h-[44px] px-4 py-2 bg-primary text-surface rounded-md">Book</button>'
        }
      ]
    };

    const parsed = UXAuditSynthesisSchema.parse(validSynthesis);
    expect(parsed.overallScore).toBe(88);
    expect(parsed.findings[0].category).toBe('RESPONSIVE_LAYOUT');

    const slopFinding = {
      overallScore: 75,
      summaryMarkdown: 'Page suffers from pill badge overload.',
      findings: [
        {
          id: 'UX-02',
          category: 'AI_SLOP_PRUNING' as const,
          severity: 'MEDIUM' as const,
          title: 'Redundant hero pill badges echo subheadline',
          description: 'Row of 4 checkmark badges merely repeats the preceding paragraph.',
          elementSelector: 'section#hero .badge-row',
          recommendedFix: 'Remove badge row to increase data-ink ratio.',
          suggestedTailwindSnippet: '--- a/src/pages/Services.tsx\n+++ b/src/pages/Services.tsx\n@@ -1,4 +1,0 @@\n-<div className="badge-row">...</div>'
        }
      ]
    };

    const parsedSlop = UXAuditSynthesisSchema.parse(slopFinding);
    expect(parsedSlop.findings[0].category).toBe('AI_SLOP_PRUNING');
  });
});

describe('UX Auditor: Reporter Artifact Generator', () => {
  const tmpDir = path.join(process.cwd(), 'artifacts', 'test-ux-audit');

  afterEach(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('saves report.md and audit.json correctly', () => {
    const mockState: UXAuditState = {
      route: '/services',
      slug: 'services',
      selectedViewports: ['desktop', 'mobile'],
      messages: [],
      iterationCount: 1,
      maxIterations: 3,
      currentHypotheses: [],
      visualHierarchySummary: 'Strong hierarchy.',
      primaryConversionGoal: 'Consultation booking.',
      isApproved: true,
      overallScore: 92,
      summaryMarkdown: 'High quality services page.',
      expandedScans: {},
      finalFindings: [
        {
          id: 'F-1',
          category: 'CTA_CONVERSION',
          severity: 'MEDIUM',
          title: 'Secondary CTA lacks visual differentiation',
          description: 'Both buttons use dark solid backgrounds.',
          recommendedFix: 'Use outline styling on secondary CTA.',
          suggestedTailwindSnippet: 'border border-border text-primary hover:bg-surface'
        }
      ]
    };

    const { reportPath, jsonPath } = saveAuditArtifacts(mockState, tmpDir);

    expect(fs.existsSync(reportPath)).toBe(true);
    expect(fs.existsSync(jsonPath)).toBe(true);

    const mdContent = fs.readFileSync(reportPath, 'utf8');
    const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    expect(mdContent).toContain('UX Audit Report: `/services`');
    expect(mdContent).toContain('92 / 100');
    expect(mdContent).toContain('Secondary CTA lacks visual differentiation');
    expect(jsonContent.overallScore).toBe(92);
    expect(jsonContent.findings).toHaveLength(1);
  });
});
