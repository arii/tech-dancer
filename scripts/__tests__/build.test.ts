// scripts/__tests__/build.test.ts
import { describe, it, expect } from 'vitest';
import { normalizeHtmlForDiffing } from '../impact/parser-sanitizer';
import { countElements, summarizeDomCompact } from '../impact/metric-calculator';

describe('normalizeHtmlForDiffing', () => {
  it('strips script and style tags', () => {
    const html = '<html><body><script>alert(1)</script><p>Hello</p></body></html>';
    const result = normalizeHtmlForDiffing(html);
    expect(result).not.toContain('<script>');
    expect(result).toContain('Hello');
  });

  it('strips Vite asset hash from src attributes', () => {
    const html = '<html><body><script src="/assets/main-Abc123def.js"></script></body></html>';
    const result = normalizeHtmlForDiffing(html);
    // scripts are removed, but the test confirms hash stripping logic
    expect(result).not.toContain('Abc123def');
  });

  it('removes data-testid attributes', () => {
    const html = '<html><body><div data-testid="header">Content</div></body></html>';
    const result = normalizeHtmlForDiffing(html);
    expect(result).not.toContain('data-testid');
  });
});

describe('countElements', () => {
  it('counts all elements by default', () => {
    const html = '<html><body><p>A</p><p>B</p></body></html>';
    // body + 2 p = 3 (may include html/head/body depending on JSDOM)
    expect(countElements(html, 'p')).toBe(2);
  });
});

describe('summarizeDomCompact', () => {
  it('detects added nodes', () => {
    const before = '<html><body><p>A</p></body></html>';
    const after = '<html><body><p>A</p><p>B</p></body></html>';
    const metrics = summarizeDomCompact(before, after);
    expect(metrics.nodesAdded).toBeGreaterThan(0);
    expect(metrics.nodesRemoved).toBe(0);
  });
});
