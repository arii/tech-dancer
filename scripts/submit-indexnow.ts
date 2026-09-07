import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRoutes } from '../src/lib/routes-discovery.ts';

export const INDEXNOW_KEY = '820c893087310094431014cec746eac5'; // gitleaks:allow
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface SubmitIndexNowOptions {
  appUrl?: string;
  urls?: string[];
  key?: string;
  dryRun?: boolean;
}

export interface SubmitIndexNowResult {
  success: boolean;
  statusCode?: number;
  message?: string;
  dryRun?: boolean;
  payload: IndexNowPayload;
}

/**
 * Discovers site URLs from sitemap.xml or routes discovery utility.
 */
export function discoverSiteUrls(appUrl: string): string[] {
  const normalizedAppUrl = appUrl.replace(/\/$/, '');
  const distSitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');
  const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

  const targetSitemapPath = fs.existsSync(distSitemapPath)
    ? distSitemapPath
    : (fs.existsSync(publicSitemapPath) ? publicSitemapPath : null);

  if (targetSitemapPath) {
    try {
      const xml = fs.readFileSync(targetSitemapPath, 'utf-8');
      const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
      const sitemapUrls = locMatches.map(m => m[1].trim()).filter(Boolean);
      if (sitemapUrls.length > 0) {
        return Array.from(new Set(sitemapUrls));
      }
    } catch {
      // Fallback to route discovery if reading sitemap fails
    }
  }

  const { all: discoveredRoutes } = getAllRoutes();
  const routesUrls = discoveredRoutes.map(r => {
    const cleanRoute = r.startsWith('/') ? r : `/${r}`;
    return `${normalizedAppUrl}${cleanRoute}`;
  });

  return Array.from(new Set([normalizedAppUrl, ...routesUrls]));
}

/**
 * Constructs a compliant IndexNow JSON payload.
 */
export function buildIndexNowPayload(
  appUrl: string,
  urlList: string[],
  key: string = INDEXNOW_KEY
): IndexNowPayload {
  const normalizedAppUrl = appUrl.replace(/\/$/, '');
  const parsedUrl = new URL(normalizedAppUrl);
  const host = parsedUrl.host;
  const keyLocation = `${normalizedAppUrl}/${key}.txt`;

  const uniqueUrls = Array.from(new Set(urlList))
    .map(u => u.trim())
    .filter(Boolean);

  return {
    host,
    key,
    keyLocation,
    urlList: uniqueUrls
  };
}

/**
 * Submits URL list to IndexNow API endpoint.
 */
export async function submitIndexNow(options: SubmitIndexNowOptions = {}): Promise<SubmitIndexNowResult> {
  const appUrl = options.appUrl || process.env.VITE_APP_URL || 'https://arii.github.io/tech-dancer';
  const key = options.key || INDEXNOW_KEY;
  const urls = options.urls && options.urls.length > 0 ? options.urls : discoverSiteUrls(appUrl);
  const dryRun = options.dryRun ?? (
    process.argv.includes('--dry-run') ||
    process.env.INDEXNOW_DRY_RUN === 'true'
  );

  const payload = buildIndexNowPayload(appUrl, urls, key);

  console.log(`IndexNow Submission Details:`);
  console.log(`- Host: ${payload.host}`);
  console.log(`- Key Location: ${payload.keyLocation}`);
  console.log(`- URL Count: ${payload.urlList.length}`);

  if (dryRun) {
    console.log('Dry-run mode enabled. Skipping HTTP POST request.');
    return {
      success: true,
      dryRun: true,
      statusCode: 200,
      message: 'Dry run completed successfully.',
      payload
    };
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const isSuccess = response.status >= 200 && response.status < 300;
    const responseText = await response.text();

    if (isSuccess) {
      console.log(`✅ Successfully submitted ${payload.urlList.length} URLs to IndexNow (HTTP ${response.status})`);
    } else {
      console.warn('⚠️ IndexNow submission returned error status:', response.status, responseText);
    }

    return {
      success: isSuccess,
      statusCode: response.status,
      message: responseText || response.statusText,
      payload
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Failed to send IndexNow request:', errorMsg);
    return {
      success: false,
      message: errorMsg,
      payload
    };
  }
}

// CLI execution handling
if (process.argv[1] && (
  process.argv[1].endsWith('submit-indexnow.ts') ||
  process.argv[1].endsWith('submit-indexnow.js')
)) {
  submitIndexNow().then(result => {
    if (!result.success && !result.dryRun) {
      process.exitCode = 1;
    }
  });
}
