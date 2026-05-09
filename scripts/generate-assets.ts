import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import postcss from 'postcss';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const TOKENS_PATH = path.join(process.cwd(), 'src/styles/tokens.css');
const LOGO_SVG_PATH = path.join(process.cwd(), 'boomtick_logo.svg');
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
    :root {
      --brand-bg: ${tokens.rawColorBg};
      --brand-accent: ${tokens.heroAccent};
      --brand-accent-hero: ${tokens.heroAccent};
      --brand-accent-purple: ${tokens.accentPurple};
    }
  </style>`;
}

function getTokensHash(): string | null {
  if (!fs.existsSync(TOKENS_PATH)) return null;
  const content = fs.readFileSync(TOKENS_PATH);
  return crypto.createHash('md5').update(content).digest('hex');
}

export async function getTokens(): Promise<DesignTokens | null> {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.warn(`Warning: Tokens file not found at ${TOKENS_PATH}`);
    return null;
  }

  const content = fs.readFileSync(TOKENS_PATH, 'utf-8');
  const tokens: Record<string, string> = {};

  const root = postcss.parse(content);
  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      tokens[decl.prop] = decl.value;
    }
  });

  const resolve = (value: string | undefined): string | null => {
    if (!value) return null;
    const varMatch = value.match(/var\((--[\w-]+)\)/);
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
 * Safely updates SVG content by injecting shared styles and targeting specific color attributes.
 * Strictly replaces the entire <style> tag contents based on the generated template.
 */
function updateSVGContent(content: string, tokens: DesignTokens, specificMap: Record<string, string | null>) {
  let updatedContent = content;
  const oldValues: Record<string, string> = {};

  // 1. Extract old values using PostCSS from the existing style block if it exists
  const styleMatch = updatedContent.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    try {
      const root = postcss.parse(styleMatch[1]);
      root.walkDecls(decl => {
        oldValues[decl.prop] = decl.value.trim();
      });
  } catch (_e) {
      console.warn('Warning: Failed to parse existing SVG style block with PostCSS. Falling back to attribute replacement only.');
    }
  }

  // 2. Strictly replace the entire <style> tag contents with the shared template
  const sharedStyles = getSharedSVGStyles(tokens);
  if (styleMatch) {
    updatedContent = updatedContent.replace(/<style>[\s\S]*?<\/style>/, sharedStyles.trim());
  } else {
    updatedContent = updatedContent.replace(/(<svg[^>]*>)/, `$1\n${sharedStyles}`);
  }

  // 3. Targeted replacement in attributes based on extracted old values
  for (const [variableName, newValue] of Object.entries(specificMap)) {
    const oldValue = oldValues[variableName];
    if (oldValue && newValue && oldValue !== newValue) {
      const escapedOldValue = oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Targeted replacement in attributes to avoid corrupting path data or other non-color strings
      const attrRegex = new RegExp(`(fill|stop-color|stroke)="(${escapedOldValue})"`, 'gi');
      updatedContent = updatedContent.replace(attrRegex, `$1="${newValue}"`);
    }
  }

  return updatedContent;
}

async function updateLogo(tokens: DesignTokens) {
  if (!fs.existsSync(LOGO_SVG_PATH)) {
    console.warn(`Warning: Logo SVG not found at ${LOGO_SVG_PATH}`);
    return;
  }

  const content = fs.readFileSync(LOGO_SVG_PATH, 'utf-8');
  const updatedContent = updateSVGContent(content, tokens, {
    '--brand-accent-hero': tokens.heroAccent,
    '--brand-accent-purple': tokens.accentPurple
  });

  fs.writeFileSync(LOGO_SVG_PATH, updatedContent);
  console.log(`Updated ${LOGO_SVG_PATH}`);
}

async function updateFaviconAndPNGs(tokens: DesignTokens) {
  if (!fs.existsSync(FAVICON_SVG_PATH)) {
    console.warn(`Warning: Favicon SVG not found at ${FAVICON_SVG_PATH}`);
    return;
  }

  const content = fs.readFileSync(FAVICON_SVG_PATH, 'utf-8');
  const updatedContent = updateSVGContent(content, tokens, {
    '--brand-bg': tokens.rawColorBg,
    '--brand-accent': tokens.heroAccent,
    '--brand-accent-purple': tokens.accentPurple
  });

  fs.writeFileSync(FAVICON_SVG_PATH, updatedContent);
  console.log(`Updated ${FAVICON_SVG_PATH}`);

  // Generate PNGs
  try {
    const svgBuffer = Buffer.from(updatedContent);

    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(PWA_192_PATH);
    console.log(`Generated ${PWA_192_PATH}`);

    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(PWA_512_PATH);
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

  const tokens = await getTokens();
  if (!tokens) return;

  console.log('Syncing assets with tokens:', tokens);

  await updateLogo(tokens);
  await updateFaviconAndPNGs(tokens);

  if (currentHash) {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(HASH_FILE, currentHash);
  }
}

// Only run main if this script is executed directly
const isMain = process.argv[1] && (process.argv[1] === fileURLToPath(import.meta.url) || process.argv[1].endsWith('generate-assets.ts'));
if (isMain) {
  main().catch(console.error);
}
