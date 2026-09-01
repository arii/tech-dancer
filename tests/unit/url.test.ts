import { describe, it, expect } from 'vitest';
import { isValidUrl, sanitizeUrlForDisplay } from '@/utils/url';

describe('url utils', () => {
  describe('isValidUrl', () => {
    it('returns true for valid http and https URLs', () => {
      expect(isValidUrl('https://boomtick.blog')).toBe(true);
      expect(isValidUrl('http://example.com/path?query=1#hash')).toBe(true);
      expect(isValidUrl('https://sub.domain.co.uk/page')).toBe(true);
    });

    it('returns false for null, undefined, or non-string inputs', () => {
      expect(isValidUrl(null)).toBe(false);
      expect(isValidUrl(undefined)).toBe(false);
      expect(isValidUrl('')).toBe(false);
      // @ts-expect-request invalid type testing
      expect(isValidUrl(123 as unknown as string)).toBe(false);
      // @ts-expect-request invalid type testing
      expect(isValidUrl({} as unknown as string)).toBe(false);
    });

    it('returns false for protocol-relative URLs starting with //', () => {
      expect(isValidUrl('//evil.com/phishing')).toBe(false);
      expect(isValidUrl('//google.com')).toBe(false);
    });

    it('returns false for unsafe or disallowed protocols', () => {
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
      expect(isValidUrl('javascript:void(0)')).toBe(false);
      expect(isValidUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isValidUrl('file:///etc/passwd')).toBe(false);
      expect(isValidUrl('ftp://example.com/file')).toBe(false);
      expect(isValidUrl('mailto:user@example.com')).toBe(false);
    });

    it('returns false for malformed or relative path strings', () => {
      expect(isValidUrl('/just/a/relative/path')).toBe(false);
      expect(isValidUrl('relative/path')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('not a url at all')).toBe(false);
    });
  });

  describe('sanitizeUrlForDisplay', () => {
    it('returns empty string for null, undefined, or empty string inputs', () => {
      expect(sanitizeUrlForDisplay(null)).toBe('');
      expect(sanitizeUrlForDisplay(undefined)).toBe('');
      expect(sanitizeUrlForDisplay('')).toBe('');
    });

    it('returns trimmed URL when input is valid', () => {
      expect(sanitizeUrlForDisplay('  https://boomtick.blog  ')).toBe('https://boomtick.blog');
      expect(sanitizeUrlForDisplay('http://example.com/foo ')).toBe('http://example.com/foo');
    });

    it('returns about:blank when input is malicious, invalid, or whitespace-only', () => {
      expect(sanitizeUrlForDisplay('   ')).toBe('about:blank');
      expect(sanitizeUrlForDisplay('javascript:alert("xss")')).toBe('about:blank');
      expect(sanitizeUrlForDisplay('data:text/html,bad')).toBe('about:blank');
      expect(sanitizeUrlForDisplay('//evil.com/phish')).toBe('about:blank');
      expect(sanitizeUrlForDisplay('/relative/path')).toBe('about:blank');
    });
  });
});
