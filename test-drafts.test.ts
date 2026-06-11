import { describe, it, expect } from 'vitest';
import { getPosts } from './src/lib/content';

describe('Draft filter', () => {
  it('should not include draft posts', () => {
    const posts = getPosts();
    const financialPost = posts.find(p => p.slug === '2026-04-18-financial-literacy-dancers');
    expect(financialPost).toBeUndefined();
  });
});
