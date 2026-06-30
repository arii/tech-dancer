import fs from 'fs';
import path from 'path';

export const DEFAULT_AFFILIATE_TAG = 'onasafari04-20';

export function getAffiliateTag(): string {
  return process.env.AMAZON_AFFILIATE_TAG || DEFAULT_AFFILIATE_TAG;
}
export const AFFILIATES_JSON_PATH = path.join(process.cwd(), 'src/data/affiliates.json');
export const AMAZON_IMAGE_DIR = path.join(process.cwd(), 'public/images/gear/amazon');
export const GEAR_ASSET_DIR = path.join(process.cwd(), 'public/images/gear');

export interface AffiliateItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  draft?: boolean;
  gearSlug?: string;
  image?: string;
  imageMode?: string;
}

export function readAffiliates(): Record<string, AffiliateItem> {
  if (!fs.existsSync(AFFILIATES_JSON_PATH)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(AFFILIATES_JSON_PATH, 'utf-8'));
}

export function writeAffiliates(data: Record<string, AffiliateItem>) {
  fs.writeFileSync(AFFILIATES_JSON_PATH, JSON.stringify(data, null, 2) + '\n');
}

export function normalizeAmazonUrl(url: string, tag: string = getAffiliateTag()): string {
  try {
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes('amazon.')) {
      return url;
    }

    const asin = extractAsin(url);
    if (asin) {
      const normalized = new URL(`https://www.amazon.com/dp/${asin}`);
      normalized.searchParams.set('tag', tag);
      return normalized.toString();
    }

    // If it's another amazon page, just strip noise but keep the tag
    const cleanUrl = new URL(urlObj.origin + urlObj.pathname);
    cleanUrl.searchParams.set('tag', tag);
    return cleanUrl.toString();
  } catch {
    return url;
  }
}

export function extractAsin(url: string): string | null {
  const asinMatch = url.match(/\/(dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i);
  return asinMatch ? asinMatch[2].toUpperCase() : null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
