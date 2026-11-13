#!/usr/bin/env node
/**
 * Parameterized ads.txt gate (OD-13 D2).
 * - VITE_ADSENSE_CLIENT set: writes the authorized-digital-sellers record to dist/ads.txt.
 * - VITE_ADSENSE_CLIENT unset: removes any stale dist/ads.txt and fails the build if
 *   dist/index.html references AdSense anyway — an ad script with no publisher ID is
 *   the failure shape this gate exists to prevent.
 */
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');

export const renderAdsTxt = publisherId => `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

export const publisherIdFromClient = client => {
  if (!/^ca-pub-\d{10,}$/.test(client)) {
    throw new Error(`Invalid VITE_ADSENSE_CLIENT: ${client}`);
  }
  return client.replace(/^ca-/, '');
};

export const assertNoAdScript = html => {
  const offenders = ['adsbygoogle', 'google-adsense-account'].filter(needle => html.includes(needle));
  if (offenders.length > 0) {
    throw new Error(
      `VITE_ADSENSE_CLIENT is unset but built HTML references: ${offenders.join(', ')}. ` +
      'Ad scripts must stay env-gated.'
    );
  }
};

const client = process.env.VITE_ADSENSE_CLIENT;

if (client) {
  const adsTxt = renderAdsTxt(publisherIdFromClient(client));
  fs.writeFileSync(path.join(distDir, 'ads.txt'), `${adsTxt}\n`);
  console.log('✅ Generated dist/ads.txt');
} else {
  const adsTxtPath = path.join(distDir, 'ads.txt');
  if (fs.existsSync(adsTxtPath)) {
    fs.rmSync(adsTxtPath);
    console.log('🧹 Removed stale dist/ads.txt');
  }
  const indexHtml = path.join(distDir, 'index.html');
  if (fs.existsSync(indexHtml)) {
    assertNoAdScript(fs.readFileSync(indexHtml, 'utf8'));
    console.log('✅ Verified no AdSense scripts in built HTML (env unset)');
  }
}
