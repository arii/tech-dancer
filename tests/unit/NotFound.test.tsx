import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page Component', () => {
  const renderNotFoundPage = () => {
    return render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  };

  test('renders 404 content and return home button', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(
      screen.getByText(
        'The page you requested does not exist. You may have typed the wrong address, or the content moved to a new location.'
      )
    ).toBeDefined();
    expect(screen.getByRole('button', { name: 'Return to Home' })).toBeDefined();
  });

  test('does not render duplicate <main> tag or duplicate id="main-content"', () => {
    const { container } = renderNotFoundPage();

    expect(container.querySelector('main')).toBeNull();
    expect(container.querySelector('#main-content')).toBeNull();
  });
});
