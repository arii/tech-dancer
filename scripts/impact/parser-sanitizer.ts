import { JSDOM } from 'jsdom';

/**
 * @summary Programmatically normalizes layout-tree HTML to ensure deterministic textual diffing.
 * @purpose Strips baseline-volatile asset identifiers, browser instrumentation data, and build parameters
 * to prevent false-positive visual regression locks in production CI lines.
 * @logic-gate Handles Vite custom file asset hash strings via matching regex arrays. Drops nodes matching
 * layout-silent blocks (style, script, template).
 * @token-contract [AI Note] Unless refactoring the sanitization engine logic directly, this logic can be safely
 * treated as a black-box container. Do not modify property selectors without consulting the
 * corresponding `tests/build.test.js` file.
 */
export function normalizeHtmlForDiffing(htmlString: string): string {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const technicalSelectors = ['script', 'style', 'link', 'meta', 'noscript', 'template'];
  technicalSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    ['data-reactroot', 'data-testid', 'nonce', 'data-discover'].forEach(attr => {
      el.removeAttribute(attr);
    });

    const cleanedAttrs: { name: string; value: string }[] = [];
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-v-')) {
        el.removeAttribute(attr.name);
        return;
      }

      let val = attr.value;
      if (attr.name === 'src' || attr.name === 'href') {
        val = val.replace(/-[a-zA-Z0-9]{8,12}\.(js|css)/g, '.$1');
      }
      cleanedAttrs.push({ name: attr.name, value: val });
      el.removeAttribute(attr.name);
    });

    cleanedAttrs.sort((a, b) => a.name.localeCompare(b.name));
    cleanedAttrs.forEach(attr => {
      el.setAttribute(attr.name, attr.value);
    });
  });

  const rawHtml = document.body ? document.body.innerHTML : dom.serialize();

  return rawHtml
    .replace(/\s+/g, ' ')       // Collapse duplicate spaces/newlines into single spaces
    .replace(/>\s*</g, '>\n<')   // Insert a clean newline between every tag boundary
    .trim();
}
