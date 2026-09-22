import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import NotFound from '../NotFound';

describe('NotFound Page Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders page headers and return button', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeTruthy();
    expect(screen.getByText('Page Not Found')).toBeTruthy();
    expect(screen.getByText(/The page you requested does not exist/i)).toBeTruthy();
    expect(screen.getByText('RETURN TO HOME')).toBeTruthy();

    // Verify button has proper link/action label
    const returnButton = screen.getByRole('button', { name: /return to home/i });
    expect(returnButton).toBeTruthy();
  });

  it('does not contain duplicate main landmarks or main-content IDs', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const mainElements = container.querySelectorAll('main');
    expect(mainElements.length).toBe(0);

    const mainContentIds = container.querySelectorAll('#main-content');
    expect(mainContentIds.length).toBe(0);
  });

  it('does not contain unnecessary decorative dashed line', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const dashedElements = container.querySelectorAll('.border-dashed');
    expect(dashedElements.length).toBe(0);
  });
});
