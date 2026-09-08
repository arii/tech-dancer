import { fileURLToPath } from 'url';
import path from 'path';
import { getIndexNowKey } from './generate-indexnow.js';
import { getAllRoutes } from '../src/lib/routes-discovery.js';

/**
 * Builds the IndexNow submission payload and endpoint parameters.
 */
export function buildIndexNowPayload(appUrlInput?: string, keyInput?: string) {
  const appUrl = (appUrlInput || process.env.VITE_APP_URL || 'https://boomtick.blog').trim();
  const normalizedAppUrl = appUrl.endsWith('/') ? appUrl : `${appUrl}/`;
  const parsedUrl = new URL(normalizedAppUrl);
  const host = parsedUrl.hostname;

  const key = keyInput || getIndexNowKey();
  if (!key) {
    return null;
  }

  const keyLocation = `${normalizedAppUrl}${key}.txt`;

  // Discover all application routes
  const { sitemap: routes } = getAllRoutes();
  const urlList = routes.map(route => {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    return `${normalizedAppUrl}${cleanRoute}`;
  });

  return {
    host,
    key,
    keyLocation,
    urlList,
  };
}

/**
 * Submits discovery URLs to IndexNow endpoint.
 */
export async function submitIndexNow(): Promise<boolean> {
  const payload = buildIndexNowPayload();
  if (!payload) {
    console.log('ℹ️ INDEXNOW_KEY / VITE_INDEXNOW_KEY not present. Skipping IndexNow URL submission.');
    return false;
  }

  console.log(`🚀 Submitting ${payload.urlList.length} URLs to IndexNow for host "${payload.host}"...`);

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow submission successful (HTTP ${response.status})`);
      return true;
    } else {
      const text = await response.text();
      console.warn(`⚠️ IndexNow submission failed (HTTP ${response.status}): ${text}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error);
    return false;
  }
}

// Execute CLI directly if run as entry script
const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  submitIndexNow();
}
