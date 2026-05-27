import { describe, expect, it } from 'vitest';
import { createProductDeduplicator } from '../lib/deduplication';

describe('createProductDeduplicator', () => {
  it('filters duplicate product ids across calls', () => {
    const deduplicator = createProductDeduplicator();

    expect(
      deduplicator.filter([
        { id: 'one', label: 'One' },
        { id: 'two', label: 'Two' },
      ]),
    ).toEqual([
      { id: 'one', label: 'One' },
      { id: 'two', label: 'Two' },
    ]);

    expect(
      deduplicator.filter([
        { id: 'two', label: 'Two again' },
        { id: 'three', label: 'Three' },
      ]),
    ).toEqual([{ id: 'three', label: 'Three' }]);
  });

  it('tracks ids added manually', () => {
    const deduplicator = createProductDeduplicator();

    deduplicator.add('manual');

    expect(deduplicator.has('manual')).toBe(true);
    expect(deduplicator.filter([{ id: 'manual' }, { id: 'fresh' }])).toEqual([{ id: 'fresh' }]);
  });
});
