import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { EditorialHeader } from './EditorialHeader';

describe('EditorialHeader', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    category: 'Travel',
    date: '2026-06-01',
    readTime: '5 min read',
    title: 'Event Travel & Packing Essentials',
    dek: 'Everything you need to survive weekend dance events.',
    author: 'Ariel Anders',
    tags: ['Packing', 'Organization'],
  };

  it('renders title, author, category, and tags', () => {
    render(<EditorialHeader {...defaultProps} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Event Travel & Packing Essentials' })).toBeTruthy();
    expect(screen.getByText('BY ARIEL ANDERS')).toBeTruthy();
    expect(screen.getByText('Travel')).toBeTruthy();
    expect(screen.getByText('PACKING')).toBeTruthy();
  });

  it('renders accessible share button with aria-label', () => {
    const handleShare = vi.fn();
    render(<EditorialHeader {...defaultProps} onShare={handleShare} isShared={false} />);

    const shareBtn = screen.getByRole('button', { name: 'Share this article' });
    expect(shareBtn).toBeTruthy();

    fireEvent.click(shareBtn);
    expect(handleShare).toHaveBeenCalledTimes(1);
  });

  it('updates share button aria-label when isShared is true', () => {
    render(<EditorialHeader {...defaultProps} onShare={vi.fn()} isShared={true} />);

    const shareBtn = screen.getByRole('button', { name: 'Link copied to clipboard' });
    expect(shareBtn).toBeTruthy();
    expect(screen.getByText('COPIED!')).toBeTruthy();
  });
});
