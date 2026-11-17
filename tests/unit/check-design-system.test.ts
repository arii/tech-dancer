// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { countViolations, compareToBaseline } from '../../scripts/check-design-system.mjs';

describe('check-design-system ratchet', () => {
  it('counts raw font, weight, size, tracking and !important uses', () => {
    const counts = countViolations({
      'src/a.tsx': '<p className="font-mono font-semibold text-5xl text-[13px] tracking-widest font-bold text-sm" />',
      'src/b.css': '.x { color: red !important; } .y { @apply text-fluid-h1; }',
      'index.html': 'html, body { font-family: system-ui; }',
      'tests/c.tsx': 'font-mono',
    });
    expect(counts['raw-font-family']).toEqual({ 'src/a.tsx': 1 });
    expect(counts['off-spec-weight']).toEqual({ 'src/a.tsx': 1 });
    expect(counts['off-scale-size']).toEqual({ 'src/a.tsx': 2, 'src/b.css': 1 });
    expect(counts['raw-tracking']).toEqual({ 'src/a.tsx': 1 });
    expect(counts.important).toEqual({ 'src/b.css': 1 });
    expect(counts['inline-font-family']).toEqual({ 'index.html': 1 });
  });

  it('flags increases and stale (decreased) baseline entries', () => {
    const baseline = { 'raw-font-family': { 'src/a.tsx': 2, 'src/gone.tsx': 1 } };
    const { increased, decreased } = compareToBaseline({ 'raw-font-family': { 'src/a.tsx': 3 } }, baseline);
    expect(increased).toEqual([{ rule: 'raw-font-family', file: 'src/a.tsx', was: 2, now: 3 }]);
    expect(decreased).toEqual([{ rule: 'raw-font-family', file: 'src/gone.tsx', was: 1, now: 0 }]);
  });
});
