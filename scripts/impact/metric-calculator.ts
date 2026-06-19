import { JSDOM } from 'jsdom';
import { type DomRouteSummary } from '../impact-review-utils';

export function countElements(html: string, selector = '*'): number {
  return new JSDOM(html).window.document.querySelectorAll(selector).length;
}

export function summarizeDomCompact(beforeHtml: string, afterHtml: string): DomRouteSummary['metrics'] {
  const [bn, an] = [countElements(beforeHtml), countElements(afterHtml)];
  const [bi, ai] = [countElements(beforeHtml, 'img'), countElements(afterHtml, 'img')];
  const [bl, al] = [countElements(beforeHtml, 'a'), countElements(afterHtml, 'a')];
  return {
    nodesAdded:    Math.max(0, an - bn), nodesRemoved:  Math.max(0, bn - an),
    imagesAdded:   Math.max(0, ai - bi), imagesRemoved: Math.max(0, bi - ai),
    linksAdded:    Math.max(0, al - bl), linksRemoved:  Math.max(0, bl - al),
  };
}
