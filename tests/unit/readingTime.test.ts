import { describe, it, expect } from 'vitest';
import { readingTime } from '@/lib/content';

describe('readingTime utility', () => {
  it('returns at least 1 minute for very short content', () => {
    expect(readingTime('Hello world')).toBe(1);
  });

  it('uses Math.ceil for words without images', () => {
    // 250 words / 200 = 1.25 -> ceil is 2
    const content = Array.from({ length: 250 }, () => 'word').join(' ');
    expect(readingTime(content)).toBe(2);
  });

  it('factors in markdown images and HTML images', () => {
    // 165 words -> 165/200 = 0.825 min.
    // 2 images * 0.2 = 0.4 min.
    // Total = 1.225 -> Math.ceil is 2
    const content = Array.from({ length: 165 }, () => 'word').join(' ') + '\n\n![img1](/path1.png)\n\n![img2](/path2.png)';
    expect(readingTime(content)).toBe(2);
  });

  it('uses excerpt proxy with Math.ceil when content is empty', () => {
    // 25 words in excerpt -> 25/20 = 1.25 -> ceil is 2
    const excerpt = Array.from({ length: 25 }, () => 'word').join(' ');
    expect(readingTime('', excerpt)).toBe(2);
  });
});
