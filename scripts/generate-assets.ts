import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

function getTokens(): DesignTokens | null {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.warn(`Warning: Tokens file not found at ${TOKENS_PATH}`);
    return null;
  }

  const content = fs.readFileSync(TOKENS_PATH, 'utf-8');

  const tokens: Record<string, string> = {};
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*(--[\w-]+):\s*([^;]+);/);
    if (match) {
      tokens[match[1].trim()] = match[2].trim();
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
 * Safely updates SVG content by targeting specific color attributes and style variables.
 */
function updateSVGContent(content: string, tokenMap: Record<string, string | null>) {
  let updatedContent = content;

  for (const [variableName, newValue] of Object.entries(tokenMap)) {
    if (!newValue) continue;

    // Find the current value of the variable in the SVG's <style> block
    const varRegex = new RegExp(`${variableName}:\\s*([^;]+);`);
    const match = updatedContent.match(varRegex);

    if (match) {
      const oldValue = match[1].trim();
      const escapedOldValue = oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Update the variable itself in the style block
      updatedContent = updatedContent.replace(varRegex, `${variableName}: ${newValue};`);

      // Targeted replacement in attributes to avoid corrupting path data or other non-color strings
      // Matches fill="#OLD", stop-color="#OLD", stroke="#OLD"
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
  const updatedContent = updateSVGContent(content, {
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
  const updatedContent = updateSVGContent(content, {
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
  const tokens = getTokens();
  if (!tokens) return;

  console.log('Syncing assets with tokens:', tokens);

  await updateLogo(tokens);
  await updateFaviconAndPNGs(tokens);
}

main().catch(console.error);
