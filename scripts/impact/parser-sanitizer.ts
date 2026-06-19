import { JSDOM } from 'jsdom';

/**
 * Normalizes layout-tree HTML for deterministic diffing by stripping volatile
 * asset IDs, browser instrumentation, and build-specific parameters to prevent
 * false-positive regressions in CI.
 */
export function normalizeHtmlForDiffing(htmlString: string): string {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  ['script', 'style', 'link', 'meta', 'noscript', 'template'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  document.querySelectorAll('*').forEach(el => {
    ['data-reactroot', 'data-testid', 'nonce', 'data-discover'].forEach(attr => el.removeAttribute(attr));

    const cleanedAttrs: { name: string; value: string }[] = [];
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-v-')) { el.removeAttribute(attr.name); return; }
      let val = attr.value;
      if (attr.name === 'src' || attr.name === 'href') {
        val = val.replace(/-[a-zA-Z0-9]{8,12}\.(js|css)/g, '.$1');
      }
      cleanedAttrs.push({ name: attr.name, value: val });
      el.removeAttribute(attr.name);
    });

    cleanedAttrs.sort((a, b) => a.name.localeCompare(b.name));
    cleanedAttrs.forEach(attr => el.setAttribute(attr.name, attr.value));
  });

  const rawHtml = document.body ? document.body.innerHTML : dom.serialize();
  return rawHtml.replace(/\s+/g, ' ').replace(/>\s*</g, '>\n<').trim();
}
