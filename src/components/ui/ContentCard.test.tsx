import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContentCard } from './ContentCard';
import { describe, it, expect, afterEach } from 'vitest';

describe('ContentCard', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    slug: 'test-post',
    title: 'Test Post Title',
    category: 'COMMUNITY',
    excerpt: 'Test excerpt description.',
    basePath: '/blog',
    date: '2026-09-21',
    readingTime: '5 min read',
  };

  it('renders title and excerpt correctly', () => {
    render(
      <MemoryRouter>
        <ContentCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Post Title')).toBeTruthy();
    expect(screen.getByText('Test excerpt description.')).toBeTruthy();
  });

  it('does not render category pill badge by default when showCategory is false', () => {
    render(
      <MemoryRouter>
        <ContentCard {...defaultProps} />
      </MemoryRouter>
    );

    // With date and readingTime provided, category text is not rendered anywhere
    expect(screen.queryByText('COMMUNITY')).toBeNull();
  });

  it('renders category pill badge when showCategory is true', () => {
    render(
      <MemoryRouter>
        <ContentCard {...defaultProps} showCategory={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('COMMUNITY')).toBeTruthy();
  });
});
