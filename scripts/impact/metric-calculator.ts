import { JSDOM } from 'jsdom';
import { type DomRouteSummary } from '../impact-review-utils';

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

export function summarizeDomCompact(beforeHtml: string, afterHtml: string): DomRouteSummary['metrics'] {
  const beforeNodes = countElements(beforeHtml);
  const afterNodes = countElements(afterHtml);
  const beforeImages = countElements(beforeHtml, 'img');
  const afterImages = countElements(afterHtml, 'img');
  const beforeLinks = countElements(beforeHtml, 'a');
  const afterLinks = countElements(afterHtml, 'a');

  return {
    nodesAdded: Math.max(0, afterNodes - beforeNodes),
    nodesRemoved: Math.max(0, beforeNodes - afterNodes),
    imagesAdded: Math.max(0, afterImages - beforeImages),
    imagesRemoved: Math.max(0, beforeImages - afterImages),
    linksAdded: Math.max(0, afterLinks - beforeLinks),
    linksRemoved: Math.max(0, beforeLinks - afterLinks)
  };
}
