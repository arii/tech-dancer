import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import Privacy from '@/pages/Privacy';
import ReturnPolicy from '@/pages/ReturnPolicy';
import ShippingPolicy from '@/pages/ShippingPolicy';
import Terms from '@/pages/Terms';

vi.mock('@/components/SEO', () => ({ SEO: () => null }));
afterEach(cleanup);

describe('policy page rendered content and layout', () => {
  it.each([
    ['privacy', Privacy],
    ['returns', ReturnPolicy],
    ['shipping', ShippingPolicy],
    ['terms', Terms],
  ] as const)('preserves the %s page DOM', (_name, Page) => {
    const { container } = render(<Page />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
