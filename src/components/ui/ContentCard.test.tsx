import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { ContentCard } from './ContentCard';

describe('ContentCard', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    slug: 'test-post',
    title: 'Test Post Title',
    category: 'COMMUNITY',
    date: '2026-06-14',
    excerpt: 'Test post excerpt text.',
    basePath: '/blog',
  };

  it('renders title and excerpt without category pill by default', () => {
    const { container } = render(
      <MemoryRouter>
        <ContentCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Post Title')).toBeTruthy();
    expect(screen.getByText('Test post excerpt text.')).toBeTruthy();
    expect(container.querySelector('.rounded-full')).toBeNull();
  });

  it('renders category pill when showCategory is true', () => {
    const { container } = render(
      <MemoryRouter>
        <ContentCard {...defaultProps} showCategory={true} />
      </MemoryRouter>
    );

    const categoryPill = container.querySelector('.rounded-full');
    expect(categoryPill).toBeTruthy();
    expect(categoryPill?.textContent).toBe('COMMUNITY');
  });
});
