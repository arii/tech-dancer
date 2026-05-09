import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import postcss from 'postcss';
import { fileURLToPath } from 'url';

const TOKENS_PATH = path.join(process.cwd(), 'src/styles/tokens.css');
const LOGO_SVG_PATH = path.join(process.cwd(), 'boomtick_logo.svg');
const FAVICON_SVG_PATH = path.join(process.cwd(), 'public/favicon.svg');
const PWA_192_PATH = path.join(process.cwd(), 'public/pwa-192x192.png');
const PWA_512_PATH = path.join(process.cwd(), 'public/pwa-512x512.png');

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
 */
function updateSVGContent(content: string, tokens: DesignTokens, specificMap: Record<string, string | null>) {
  let updatedContent = content;

  // 1. Inject or Replace the <style> block with shared variables
  const sharedStyles = getSharedSVGStyles(tokens);
  if (updatedContent.includes('<style>')) {
    updatedContent = updatedContent.replace(/<style>[\s\S]*?<\/style>/, sharedStyles.trim());
  } else {
    updatedContent = updatedContent.replace(/(<svg[^>]*>)/, `$1\n${sharedStyles}`);
  }

  // 2. Targeted replacement in attributes
  for (const [variableName, newValue] of Object.entries(specificMap)) {
    if (!newValue) continue;

    // Find the current value of the variable in the newly injected style block
    const varRegex = new RegExp(`${variableName}:\\s*([^;]+);`);
    const match = updatedContent.match(varRegex);

    if (match) {
      const oldValue = match[1].trim();
      const escapedOldValue = oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Update the variable itself in the style block (redundant if getSharedSVGStyles was just used, but safe)
      updatedContent = updatedContent.replace(varRegex, `${variableName}: ${newValue};`);

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
  const tokens = await getTokens();
  if (!tokens) return;

  console.log('Syncing assets with tokens:', tokens);

  await updateLogo(tokens);
  await updateFaviconAndPNGs(tokens);
}

// Only run main if this script is executed directly
const isMain = process.argv[1] && (process.argv[1] === fileURLToPath(import.meta.url) || process.argv[1].endsWith('generate-assets.ts'));
if (isMain) {
  main().catch(console.error);
}
