import { z } from 'zod';
import { JSDOM } from 'jsdom';

export const CompactRouteMetricSchema = z.object({
  route: z.string(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  metrics: z.object({
    nodes: z.tuple([z.number(), z.number()]).describe('[AddedCount, RemovedCount]'),
    images: z.tuple([z.number(), z.number()]).describe('[AddedCount, RemovedCount]'),
    links: z.tuple([z.number(), z.number()]).describe('[AddedCount, RemovedCount]')
  })
});

export type CompactRouteMetric = z.infer<typeof CompactRouteMetricSchema>;

/**
 * Calculates raw tree metric comparisons on an element collection array.
 */
export function computeCompactMetrics(beforeNodeCount: number, afterNodeCount: number): [number, number] {
  const diff = afterNodeCount - beforeNodeCount;
  return diff > 0 ? [diff, 0] : [0, Math.abs(diff)];
}

export function countElements(html: string, selector = '*'): number {
  const dom = new JSDOM(html);
  return dom.window.document.querySelectorAll(selector).length;
}

export function summarizeDomCompact(beforeHtml: string, afterHtml: string): CompactRouteMetric['metrics'] {
  const beforeNodes = countElements(beforeHtml);
  const afterNodes = countElements(afterHtml);
  const beforeImages = countElements(beforeHtml, 'img');
  const afterImages = countElements(afterHtml, 'img');
  const beforeLinks = countElements(beforeHtml, 'a');
  const afterLinks = countElements(afterHtml, 'a');

  return {
    nodes: computeCompactMetrics(beforeNodes, afterNodes),
    images: computeCompactMetrics(beforeImages, afterImages),
    links: computeCompactMetrics(beforeLinks, afterLinks)
  };
}
