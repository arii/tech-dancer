import fs from 'fs';
import path from 'path';
import { MERCH_PRODUCTS } from '../src/data/merch';

const BASE_URL = 'https://boomtick.blog';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function resolveImageUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function generateGoogleMerchantXml(): string {
  const items = MERCH_PRODUCTS.map((product) => {
    const mainImage = resolveImageUrl(product.imageUrl);
    const additionalImages = (product.images || [])
      .map((img) => resolveImageUrl(img.src))
      .filter((imgUrl) => imgUrl !== mainImage);

    // Determine category
    const isMug = product.id.includes('mug');
    const isTote = product.id.includes('tote');
    const isHoodie = product.id.includes('hoodie');
    const isTank = product.id.includes('tank');
    
    let googleCategory = '1604'; // Apparel & Accessories > Clothing > Shirts & Tops
    let productType = 'Apparel > Shirts';
    let gender = 'unisex';

    if (isMug) {
      googleCategory = '6413'; // Home & Garden > Kitchen & Dining > Tableware > Drinkware > Mugs
      productType = 'Home & Living > Drinkware > Mugs';
    } else if (isTote) {
      googleCategory = '3032'; // Apparel & Accessories > Handbags, Wallets & Cases > Tote Bags
      productType = 'Accessories > Bags > Tote Bags';
    } else if (isHoodie) {
      productType = 'Apparel > Hoodies & Sweatshirts';
    } else if (isTank) {
      productType = 'Apparel > Tops > Tank Tops';
      if (product.id.includes('women') || product.id.includes('crop')) {
        gender = 'female';
      }
    }

    const additionalImageTags = additionalImages
      .map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`)
      .join('\n');

    const gearUrl = `${BASE_URL}/gear/${product.gearSlug || product.id}`;

    return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.title)}</title>
      <description>${escapeXml(product.description)}</description>
      <link>${escapeXml(gearUrl)}</link>
      <g:image_link>${escapeXml(mainImage)}</g:image_link>
${additionalImageTags ? `${additionalImageTags}\n` : ''}      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${product.price} USD</g:price>
      <g:brand>BoomTick</g:brand>
      <g:color>${escapeXml(product.color || 'Black')}</g:color>
      <g:size>${escapeXml(product.size || 'S/M/L/XL')}</g:size>
${product.material ? `      <g:material>${escapeXml(product.material)}</g:material>\n` : ''}      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type>${escapeXml(productType)}</g:product_type>
      <g:age_group>adult</g:age_group>
      <g:gender>${gender}</g:gender>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>4.99 USD</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>BoomTick Merch Store</title>
    <link>${BASE_URL}/merch</link>
    <description>Official BoomTick dance merchandise, role shirts, and apparel for West Coast Swing dancers.</description>
${items}
  </channel>
</rss>
`;
}

export function writeFeed(outputPath: string): void {
  const xml = generateGoogleMerchantXml();
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Generated Google Merchant feed at: ${outputPath}`);
}

// Execute when run directly as CLI
if (process.argv[1] && process.argv[1].endsWith('generate-merchant-feed.ts')) {
  const distPath = path.resolve(process.cwd(), 'dist/products.xml');
  const publicPath = path.resolve(process.cwd(), 'public/products.xml');

  // Write to public folder for dev/preview and dist if exists
  writeFeed(publicPath);
  if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
    writeFeed(distPath);
  }
}
