import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const TOKENS_PATH = path.join(process.cwd(), 'src/styles/tokens.css');
const LOGO_SVG_PATH = path.join(process.cwd(), 'public/boomtick_logo.svg');
const FAVICON_SVG_PATH = path.join(process.cwd(), 'public/favicon.svg');
const PWA_192_PATH = path.join(process.cwd(), 'public/pwa-192x192.png');
const PWA_512_PATH = path.join(process.cwd(), 'public/pwa-512x512.png');
const CACHE_DIR = path.join(process.cwd(), 'node_modules/.cache');
const HASH_FILE = path.join(CACHE_DIR, 'generate-assets.hash');

interface DesignTokens {
  heroAccent: string | null;
  accentPurple: string | null;
  rawColorBg: string | null;
}

/**
 * Shared SVG variable template to ensure a single source of truth for brand colors.
 */
function getSharedSVGStyles(tokens: DesignTokens) {
  return `
  <style>
    .brand-stop-accent { stop-color: ${tokens.heroAccent}; }
    .brand-stop-purple { stop-color: ${tokens.accentPurple}; }
    .brand-text-accent { fill: ${tokens.heroAccent}; }
    .brand-text-muted { fill: rgba(241, 245, 249, 0.6); }
    .brand-wordmark {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 800;
    }
  </style>`;
}

function getTokensHash(): string | null {
  if (!fs.existsSync(TOKENS_PATH)) return null;
  const content = fs.readFileSync(TOKENS_PATH);
  return crypto.createHash('md5').update(content).digest('hex');
}

export function getTokens(): DesignTokens | null {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.warn(`Warning: Tokens file not found at ${TOKENS_PATH}`);
    return null;
  }

  const content = fs.readFileSync(TOKENS_PATH, 'utf-8');
  const tokens: Record<string, string> = {};

  // Simple Regex-based CSS variable extraction
  const declRegex = /(--[\w-]+):\s*([^;]+);/g; // impeccable-ignore
  let match;
  while ((match = declRegex.exec(content)) !== null) {
    tokens[match[1]] = match[2].trim();
  }

  const resolve = (value: string | undefined): string | null => {
    if (!value) return null;
    const varMatch = value.match(/var\((--[\w-]+)\)/); // impeccable-ignore
    if (varMatch) {
      return resolve(tokens[varMatch[1]]);
    }
    return value;
  };

  return {
    heroAccent: resolve(tokens['--hero-accent']),
    accentPurple: resolve(tokens['--raw-color-accent-purple']),
    rawColorBg: resolve(tokens['--raw-color-bg']),
  };
}

/**
 * Updates SVG content with latest tokens while preserving utility class structure.
 */
function updateSVGContent(content: string, tokens: DesignTokens) {
  let updatedContent = content;

  // 1. Extract old hex values from the first matching .brand-stop-accent or similar
  const oldAccentMatch = content.match(/\.brand-stop-accent\s*{\s*stop-color:\s*([^;]+);/);
  const oldPurpleMatch = content.match(/\.brand-stop-purple\s*{\s*stop-color:\s*([^;]+);/);

  // 2. Replace the entire <style> block
  const sharedStyles = getSharedSVGStyles(tokens);
  updatedContent = updatedContent.replace(/<style>[\s\S]*?<\/style>/i, sharedStyles.trim());

  // 3. Targeted replacement of hex values in attributes for maximum compatibility
  if (oldAccentMatch && tokens.heroAccent) {
    const oldAccent = oldAccentMatch[1].trim();
    const attrRegex = new RegExp(`(fill|stop-color|stroke)="(${oldAccent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})"`, 'gi');
    updatedContent = updatedContent.replace(attrRegex, `$1="${tokens.heroAccent}"`);
  }
  if (oldPurpleMatch && tokens.accentPurple) {
    const oldPurple = oldPurpleMatch[1].trim();
    const attrRegex = new RegExp(`(fill|stop-color|stroke)="(${oldPurple.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})"`, 'gi');
    updatedContent = updatedContent.replace(attrRegex, `$1="${tokens.accentPurple}"`);
  }

  return updatedContent;
}

async function updateLogo(tokens: DesignTokens) {
  if (!fs.existsSync(LOGO_SVG_PATH)) return;
  const content = fs.readFileSync(LOGO_SVG_PATH, 'utf-8');
  const updatedContent = updateSVGContent(content, tokens);
  fs.writeFileSync(LOGO_SVG_PATH, updatedContent);
  console.log(`Updated ${LOGO_SVG_PATH}`);
}

async function updateFaviconAndPNGs(tokens: DesignTokens) {
  if (!fs.existsSync(FAVICON_SVG_PATH)) return;
  const content = fs.readFileSync(FAVICON_SVG_PATH, 'utf-8');
  const updatedContent = updateSVGContent(content, tokens);
  fs.writeFileSync(FAVICON_SVG_PATH, updatedContent);
  console.log(`Updated ${FAVICON_SVG_PATH}`);

  // Generate PNGs
  try {
    const svgBuffer = Buffer.from(updatedContent);
    await sharp(svgBuffer).resize(192, 192).png().toFile(PWA_192_PATH);
    console.log(`Generated ${PWA_192_PATH}`);
    await sharp(svgBuffer).resize(512, 512).png().toFile(PWA_512_PATH);
    console.log(`Generated ${PWA_512_PATH}`);
  } catch (error) {
    console.error('Error generating PNGs:', error);
  }
}

async function main() {
  const currentHash = getTokensHash();
  if (currentHash && fs.existsSync(HASH_FILE)) {
    const savedHash = fs.readFileSync(HASH_FILE, 'utf-8');
    if (currentHash === savedHash) {
      console.log('Tokens unchanged, skipping asset generation.');
      return;
    }
  }

  const tokens = getTokens();
  if (!tokens) return;

  console.log('Syncing assets with tokens:', tokens);

  await updateLogo(tokens);
  await updateFaviconAndPNGs(tokens);

  if (currentHash) {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(HASH_FILE, currentHash);
  }
}

const isMain = process.argv[1] && (process.argv[1] === fileURLToPath(import.meta.url) || process.argv[1].endsWith('generate-assets.ts'));
if (isMain) {
  main().catch(console.error);
}
