import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TOKENS_PATH = path.join(process.cwd(), 'src/styles/tokens.css');
const FAVICON_SVG_PATH = path.join(process.cwd(), 'public/favicon.svg');
const PWA_192_PATH = path.join(process.cwd(), 'public/pwa-192x192.png');
const PWA_512_PATH = path.join(process.cwd(), 'public/pwa-512x512.png');

interface DesignTokens {
  heroAccent: string | null;
  accentPurple: string | null;
  rawColorBg: string | null;
  mutedText: string | null;
  brandLogoSize: string | null;
  brandLogoSmSize: string | null;
  brandWordmarkSize: string | null;
}

function getTokens(): DesignTokens | null {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.warn(`Warning: Tokens file not found at ${TOKENS_PATH}`);
    return null;
  }

  const content = fs.readFileSync(TOKENS_PATH, 'utf-8');

  const extract = (key: string) => {
    const match = content.match(new RegExp(`${key}:\\s*([^;]+);`));
    return match ? match[1].trim() : null;
  };

  // Note: --logo-muted-text is defined in tokens.css under a different :root block or computed.
  // We'll use a fallback if not found directly.
  return {
    heroAccent: extract('--raw-color-accent-brand'),
    accentPurple: extract('--raw-color-accent-purple'),
    rawColorBg: extract('--raw-color-bg'),
    mutedText: 'rgba(255,255,255,0.6)', // Fallback for sharp generation
    brandLogoSize: extract('--text-brand-logo'),
    brandLogoSmSize: extract('--text-brand-logo-sm'),
    brandWordmarkSize: extract('--text-brand-wordmark'),
  };
}

/**
 * Injects a temporary <style> block into the SVG content for PNG rendering.
 * This allows Sharp to render the SVG with the correct brand colors without
 * needing the styles to be present in the source SVG file.
 */
function prepareSVGForRendering(content: string, tokens: DesignTokens) {
  const styleBlock = `
    <style>
      .brand-stop-accent { stop-color: ${tokens.heroAccent}; }
      .brand-stop-purple { stop-color: ${tokens.accentPurple}; }
      .brand-text-white { fill: white; }
      .brand-text-accent { fill: ${tokens.heroAccent}; }
      .brand-text-muted { fill: ${tokens.mutedText}; }
      .brand-bg-rect { fill: ${tokens.rawColorBg}; }
      .brand-b-mark {
        fill: white;
        font-family: 'Playfair Display', serif;
        font-style: italic;
        font-weight: 900;
        font-size: ${tokens.brandLogoSize || '85px'};
      }
      .brand-b-mark-sm {
        fill: white;
        font-family: 'Playfair Display', serif;
        font-style: italic;
        font-weight: 900;
        font-size: ${tokens.brandLogoSmSize || '44px'};
      }
      .brand-wordmark-text {
        font-family: 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: ${tokens.brandWordmarkSize || '52px'};
      }
    </style>
  `;

  if (content.includes('</defs>')) {
    return content.replace('</defs>', `${styleBlock}</defs>`);
  }

  // Fallback: Inject after the opening <svg> tag
  return content.replace(/(<svg[^>]*>)/i, `$1${styleBlock}`);
}

async function generatePNGs(tokens: DesignTokens) {
  if (!fs.existsSync(FAVICON_SVG_PATH)) {
    console.warn(`Warning: Favicon SVG not found at ${FAVICON_SVG_PATH}`);
    return;
  }

  console.log('Generating PNG assets from favicon.svg...');
  const content = fs.readFileSync(FAVICON_SVG_PATH, 'utf-8');
  const renderableContent = prepareSVGForRendering(content, tokens);

  try {
    const svgBuffer = Buffer.from(renderableContent);

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

  // Since SVGs now use global CSS classes, we no longer need to update
  // the SVG files themselves on disk when tokens change.
  // They will inherit colors from index.css in the app.
  // We only need to ensure PNGs are regenerated with the new token values.

  await generatePNGs(tokens);
}

main().catch(console.error);
