import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EditorialHeader } from './EditorialHeader';

describe('EditorialHeader Component', () => {
  it('renders header, share button with accessible label, and filters redundant category tags', () => {
    render(
      <EditorialHeader
        category="Travel"
        date="2026-06-01"
        readTime="5 min read"
        title="Event Travel & Packing"
        author="Ariel Anders"
        tags={['travel', 'packing']}
        onShare={() => {}}
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Event Travel & Packing' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Share article' })).toBeDefined();

    const tagsSection = document.querySelector('[data-section="article-tags"]');
    expect(tagsSection?.textContent).toContain('PACKING');
    expect(tagsSection?.textContent).not.toContain('TRAVEL');
  });
});
