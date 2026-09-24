import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EditorialHeader } from './EditorialHeader';

describe('EditorialHeader Component', () => {
  it('renders title, author, category, date, and read time', () => {
    render(
      <EditorialHeader
        category="Travel"
        date="2026-06-01"
        readTime="5 min read"
        title="Event Travel & Packing"
        author="Ariel Anders"
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Event Travel & Packing' })).toBeDefined();
    expect(screen.getByText('BY ARIEL ANDERS')).toBeDefined();
    expect(screen.getByText('Travel')).toBeDefined();
    expect(screen.getByText(/2026-06-01/)).toBeDefined();
  });

  it('filters out redundant category tags from the tags list', () => {
    render(
      <EditorialHeader
        category="Travel"
        date="2026-06-01"
        readTime="5 min read"
        title="Event Travel & Packing"
        author="Ariel Anders"
        tags={['travel', 'packing', 'organization']}
      />
    );

    const tagsSection = screen.getByDataTestId ? screen.queryByTestId('article-tags') : document.querySelector('[data-section="article-tags"]');
    expect(tagsSection).not.toBeNull();
    if (tagsSection) {
      expect(tagsSection.textContent).toContain('PACKING');
      expect(tagsSection.textContent).toContain('ORGANIZATION');
      expect(tagsSection.textContent).not.toContain('TRAVEL');
    }
  });

  it('renders share button with discernible text and correct accessibility attributes', () => {
    const handleShare = vi.fn();
    render(
      <EditorialHeader
        category="Travel"
        date="2026-06-01"
        readTime="5 min read"
        title="Event Travel & Packing"
        author="Ariel Anders"
        onShare={handleShare}
        isShared={false}
      />
    );

    const shareButton = screen.getByRole('button', { name: 'Share article' });
    expect(shareButton).toBeDefined();
    expect(shareButton.getAttribute('type')).toBe('button');
    expect(shareButton.getAttribute('aria-label')).toBe('Share article');

    fireEvent.click(shareButton);
    expect(handleShare).toHaveBeenCalledTimes(1);
  });

  it('updates share button label when copied/shared', () => {
    render(
      <EditorialHeader
        category="Travel"
        date="2026-06-01"
        readTime="5 min read"
        title="Event Travel & Packing"
        author="Ariel Anders"
        onShare={() => {}}
        isShared={true}
      />
    );

    const shareButton = screen.getByRole('button', { name: 'URL copied to clipboard' });
    expect(shareButton).toBeDefined();
    expect(screen.getByText('COPIED!')).toBeDefined();
  });
});
