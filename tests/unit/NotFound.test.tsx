import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '@/pages/NotFound';
import { MainLayout } from '@/layouts/MainLayout';

describe('NotFound Page Component', () => {
  beforeEach(() => {
    cleanup();
  });

  test('renders 404 header and return to home button without creating main landmark', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/resources/2024-06-01-portable-charger']}>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('404')).toBeDefined();
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(screen.getByText('RETURN TO HOME')).toBeDefined();

    // Verify NotFound component itself does NOT render a <main> or id="main-content"
    expect(container.querySelector('main')).toBeNull();
    expect(container.querySelector('#main-content')).toBeNull();
    // Verify no border-dashed elements
    expect(container.querySelector('.border-dashed')).toBeNull();
  });

  test('renders strictly single <main id="main-content"> when wrapped inside MainLayout', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <MainLayout>
            <NotFound />
          </MainLayout>
        </MemoryRouter>
      </HelmetProvider>
    );

    const mainElements = container.querySelectorAll('main');
    expect(mainElements.length).toBe(1);

    const mainContentElements = container.querySelectorAll('#main-content');
    expect(mainContentElements.length).toBe(1);
    expect(mainElements[0].id).toBe('main-content');
  });

  test('clicking RETURN TO HOME button triggers navigation', () => {
    const { getByRole, getByTestId } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/resources/2024-06-01-portable-charger']}>
          <Routes>
            <Route path="/resources/2024-06-01-portable-charger" element={<NotFound />} />
            <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    const button = getByRole('button', { name: /return to home/i });
    fireEvent.click(button);

    expect(getByTestId('home-page')).toBeDefined();
  });
});
