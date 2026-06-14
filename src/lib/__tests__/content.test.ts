import { describe, it, expect } from 'vitest';
import * as content from '../content';

// Since we cannot easily mock import.meta.glob with its complex eager:true, query:'?raw' behavior
// when it's already executed at module top level, we will test the exported functions
// and assume the transform logic (which we can't easily isolate without refactoring content.ts)
// is working as verified by our manual inspection and Playwright tests.

describe('Content loading', () => {
  it('should return arrays for content types', () => {
    expect(Array.isArray(content.getPosts())).toBe(true);
    expect(Array.isArray(content.getResources())).toBe(true);
    expect(content.getResources().length).toBe(0);
    expect(Array.isArray(content.getStudies())).toBe(true);
    expect(Array.isArray(content.getEvents())).toBe(true);
  });

  it('should have slugs for all items', () => {
    const allItems = [
      ...content.getPosts(),
      ...content.getResources(),
      ...content.getStudies(),
      ...content.getEvents()
    ];

    allItems.forEach(item => {
      expect(item.slug).toBeDefined();
      expect(typeof item.slug).toBe('string');
      expect(item.slug.length).toBeGreaterThan(0);
    });
  });

  it('should parse nested frontmatter objects', () => {
    const markdown = `---
title: "Test"
theme:
  name: "Galactic"
  description: "Space themed event"
gear:
  recommendations:
    - "Comfortable shoes"
    - "Water bottle"
  essentials: ["Earplugs", "Towel"]
---
Body content`;

    const { data } = content.parseFrontmatter(markdown);
    expect(data.title).toBe("Test");
    expect(data.theme).toEqual({
      name: "Galactic",
      description: "Space themed event"
    });
    expect(data.gear).toEqual({
      recommendations: ["Comfortable shoes", "Water bottle"],
      essentials: ["Earplugs", "Towel"]
    });
  });

  it('should handle flat alternative keys in frontmatter', () => {
    const markdown = `---
type: event
title: "Event with flat keys"
themeOutfitIds: ["outfit-1"]
gearShoeIds: ["shoe-1"]
---
Body`;

    const { data } = content.parseFrontmatter(markdown);
    // parseFrontmatter itself doesn't do the mapping, transform does.
    // However, transform uses import.meta.glob which we can't easily mock here.
    // We can at least verify parseFrontmatter picks them up.
    expect(data.themeOutfitIds).toEqual(["outfit-1"]);
    expect(data.gearShoeIds).toEqual(["shoe-1"]);
  });
});
