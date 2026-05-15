import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../content';

describe('parseFrontmatter prototype pollution', () => {
  it('should not allow prototype pollution via __proto__', () => {
    const content = `---
__proto__:
  polluted: "yes"
---
body`;
    parseFrontmatter(content);
    // @ts-expect-error - testing for prototype pollution
    expect({}.polluted).toBeUndefined();
  });

  it('should not allow prototype pollution via constructor', () => {
    const content = `---
constructor:
  prototype:
    polluted2: "yes"
---
body`;
    parseFrontmatter(content);
    // @ts-expect-error - testing for prototype pollution
    expect({}.polluted2).toBeUndefined();
  });
});
