import { describe, it, expect } from 'vitest';
import { renderAdsTxt, publisherIdFromClient, assertNoAdScript } from '../../scripts/generate-ads-txt.mjs';

describe('generate-ads-txt', () => {
  it('renders the AdSense authorized-digital-sellers record', () => {
    expect(renderAdsTxt('pub-2398582836159289')).toBe(
      'google.com, pub-2398582836159289, DIRECT, f08c47fec0942fa0'
    );
  });

  it('derives the publisher id from a valid client id and rejects malformed ones', () => {
    expect(publisherIdFromClient('ca-pub-2398582836159289')).toBe('pub-2398582836159289');
    expect(() => publisherIdFromClient('pub-2398582836159289')).toThrow();
    expect(() => publisherIdFromClient('ca-pub-nope')).toThrow();
  });

  it('accepts built HTML that references no AdSense entities', () => {
    expect(() => assertNoAdScript('<!DOCTYPE html><html><head><title>blog</title></head></html>')).not.toThrow();
  });

  it('fails built HTML that ships an ad script or account meta while ads are disabled', () => {
    expect(() => assertNoAdScript('<script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">')).toThrow(/adsbygoogle/);
    expect(() => assertNoAdScript('<meta name="google-adsense-account" content="ca-pub-1">')).toThrow(/google-adsense-account/);
  });
});
