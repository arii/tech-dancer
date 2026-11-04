import { describe, it, expect } from 'vitest';
import { resolveBorderClasses, filterMotionProps, buildBoxClasses } from '../box-styles';

describe('src/layouts/box-styles', () => {
  it('resolves border classes correctly', () => {
    expect(resolveBorderClasses({})).toBe('');
    expect(resolveBorderClasses({ border: true })).toBe('border border-line');
    expect(resolveBorderClasses({ border: 't' })).toBe('border-t border-line');
    expect(resolveBorderClasses({ smBorder: 't' })).toBe('sm:border-t');
  });

  it('filters motion props for non-motion and motion components', () => {
    const rawProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      invalidProp: 'ignore',
    };

    expect(filterMotionProps(false, rawProps)).toEqual({});
    expect(filterMotionProps(true, rawProps)).toEqual({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    });
  });

  it('builds combined utility classes for Box', () => {
    const classes = buildBoxClasses({
      padding: 4,
      margin: 2,
      display: 'flex',
      justify: 'center',
      align: 'center',
    });

    expect(classes).toContain('p-4');
    expect(classes).toContain('m-2');
    expect(classes).toContain('flex');
    expect(classes).toContain('justify-center');
    expect(classes).toContain('items-center');
  });
});
