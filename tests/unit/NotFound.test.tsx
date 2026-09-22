import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page Accessibility & Layout', () => {
  test('renders 404 header and RETURN TO HOME CTA button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(screen.getByText('RETURN TO HOME')).toBeDefined();
  });

  test('does not render a nested main landmark tag or duplicate main-content ID', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const mainElements = container.querySelectorAll('main');
    expect(mainElements.length).toBe(0);

    const mainContentIdElements = container.querySelectorAll('#main-content');
    expect(mainContentIdElements.length).toBe(0);
  });

  test('does not render decorative dashed line element', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const dashedElements = container.querySelectorAll('.border-dashed');
    expect(dashedElements.length).toBe(0);
  });
});
