// tests/unit/merchItems.test.ts
import { describe, expect, it } from 'vitest';
import { SLOT_ERA_ITEMS, getMerchItems } from '@/lib/affiliateManager';

describe('Slot Era Merch Registry', () => {
  it('returns all defined Slot Era merchandise items', () => {
    const items = getMerchItems();
    expect(items.length).toBe(3);
  });

  it('validates Printful URL formats for merch items', () => {
    SLOT_ERA_ITEMS.forEach((item) => {
      expect(item.url).toMatch(/^https:\/\/boomtick\.printful\.me\/product\//);
      expect(item.badge).toBe('Merch');
      expect(item.image).toMatch(/^\/assets\/slot_era_.*\.webp$/);
    });
  });

  it('contains valid price formatting', () => {
    SLOT_ERA_ITEMS.forEach((item) => {
      expect(item.price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });
});
