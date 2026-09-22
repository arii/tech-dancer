import { JSDOM } from 'jsdom';

/**
 * Structural & accessibility attributes that MUST be preserved.
 */
const PRESERVED_ATTRIBUTES = new Set([
  'id',
  'class',
  'role',
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-hidden',
  'aria-expanded',
  'aria-haspopup',
  'aria-controls',
  'aria-live',
  'aria-atomic',
  'aria-relevant',
  'aria-current',
  'aria-selected',
  'aria-checked',
  'aria-disabled',
  'aria-required',
  'aria-invalid',
  'tabindex',
  'href',
  'src',
  'alt',
  'title',
  'type',
  'name',
  'placeholder',
  'value',
  'for'
]);

/**
 * Elements to completely remove from DOM analysis (noise/scripts/styles/svgs).
 */
const NOISE_TAGS = new Set([
  'script',
  'style',
  'svg',
  'noscript',
  'iframe',
  'template',
  'canvas'
]);

/**
 * Prunes raw HTML to reduce token usage by ~80% while strictly preserving:
 * - Semantic layout structure (<header>, <nav>, <main>, <section>, <article>, <footer>, <button>, <a>, <h1-h6>)
 * - Structural ARIA accessibility attributes
 * - Text content and CTA microcopy
 * - Strips non-semantic nested wrapper <div>s that have no attributes and no classes
 */
export function pruneHtmlDom(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // 1. Remove noise tags
  for (const tag of NOISE_TAGS) {
    const elements = Array.from(doc.querySelectorAll(tag));
    for (const el of elements) {
      el.remove();
    }
  }

  // 2. Remove all HTML comments
  const removeComments = (node: Node) => {
    let child = node.firstChild;
    while (child) {
      const next = child.nextSibling;
      if (child.nodeType === 8) { // Comment node
        node.removeChild(child);
      } else if (child.nodeType === 1) {
        removeComments(child);
      }
      child = next;
    }
  };
  removeComments(doc.body);

  // 3. Clean attributes on remaining elements
  const cleanElementAttributes = (element: Element) => {
    const attributes = Array.from(element.attributes);
    for (const attr of attributes) {
      const name = attr.name.toLowerCase();
      // Keep data-section, data-testid, or preserved attributes
      if (
        !PRESERVED_ATTRIBUTES.has(name) &&
        !name.startsWith('aria-') &&
        !name.startsWith('data-section') &&
        !name.startsWith('data-testid')
      ) {
        element.removeAttribute(attr.name);
      }
    }
  };

  const allElements = Array.from(doc.body.querySelectorAll('*'));
  for (const el of allElements) {
    cleanElementAttributes(el);
  }

  // 4. Unwrap empty wrapper <div>s with no attributes and single child
  for (let pass = 0; pass < 3; pass++) {
    const divs = Array.from(doc.body.querySelectorAll('div'));
    for (const div of divs) {
      if (div.attributes.length === 0 && div.children.length === 1 && !div.textContent?.trim().replace(div.children[0]?.textContent?.trim() || '', '')) {
        const child = div.children[0];
        div.replaceWith(child);
      }
    }
  }

  // Extract body inner HTML and collapse multiple whitespaces
  const cleanedBody = doc.body.innerHTML
    .replace(/\n\s*\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  return cleanedBody;
}
