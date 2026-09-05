import fs from 'fs';
import path from 'path';

const APP_URL = process.env.VITE_APP_URL || 'https://boomtick.blog';
const canonicalDomain = APP_URL.replace(/\/$/, '');

const sitemapDistPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
const sitemapPublicPath = path.resolve(process.cwd(), 'public/sitemap.xml');

const targetPath = fs.existsSync(sitemapDistPath) ? sitemapDistPath : sitemapPublicPath;

if (fs.existsSync(targetPath)) {
  console.log('Cleaning up and standardizing sitemap.xml with Google Image Extension...');
  let content = fs.readFileSync(targetPath, 'utf-8');

  // Ensure xmlns:image is present in <urlset>
  if (!content.includes('xmlns:image=')) {
    content = content.replace(
      /<urlset([^>]*)>/,
      '<urlset$1 xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    );
  }

  // Remove <changefreq>...</changefreq>
  content = content.replace(/<changefreq>.*?<\/changefreq>/g, '');
  // Remove <priority>...</priority>
  content = content.replace(/<priority>.*?<\/priority>/g, '');
  // Normalize localhost/preview domains to canonical production domain
  content = content.replace(/https?:\/\/localhost(:\d+)?/g, canonicalDomain);

  // Build image map for routes
  const routeImagesMap = new Map();

  function addRouteImage(routePath, imgLoc, title, caption) {
    if (!imgLoc) return;
    const fullImgUrl = imgLoc.startsWith('http')
      ? imgLoc
      : `${canonicalDomain}/${imgLoc.replace(/^\/+/, '')}`;

    const routeKey = routePath.startsWith('http')
      ? routePath
      : `${canonicalDomain}${routePath.startsWith('/') ? '' : '/'}${routePath}`;

    if (!routeImagesMap.has(routeKey)) {
      routeImagesMap.set(routeKey, []);
    }

    const list = routeImagesMap.get(routeKey);
    if (!list.some(item => item.loc === fullImgUrl)) {
      list.push({
        loc: fullImgUrl,
        title: title || 'BoomTick Image',
        caption: caption || title || 'BoomTick West Coast Swing & AI Content',
        license: `${canonicalDomain}/about#terms`
      });
    }
  }

  // Home Route Imagery
  addRouteImage('/', '/assets/dancer_hero.webp', 'West Coast Swing Social Dancer', 'Hero illustration of West Coast Swing dancers on the floor.');
  addRouteImage('/', '/assets/roboticist_hero.webp', 'Ariel Anders PhD Roboticist', 'Hero illustration of Ariel Anders in robotics engineering laboratory.');

  // About / Profile Page Imagery
  addRouteImage('/about', '/assets/comp_analysis_hero.webp', 'Ariel Anders Profile Photo', 'Ariel Anders, PhD - Roboticist & WCS Dancer');
  addRouteImage('/about', '/assets/first_comp.jpg', 'First WCS Competition', 'Ariel Anders performing a West Coast Swing extension during a competition');
  addRouteImage('/about', '/assets/glow_bunny.jpg', 'Late Night Social LED Bunny', 'Ariel Anders wearing a creative LED light-up bunny costume');
  addRouteImage('/about', '/assets/mad_jam_ari.jpg', 'MADjam Precision & Groove', 'Ariel Anders social dancing at the MADjam West Coast Swing convention');
  addRouteImage('/about', '/assets/monterey.jpg', 'Monterey Swingfest', 'Ariel Anders on stage at a West Coast Swing event in Monterey');
  addRouteImage('/about', '/assets/www_ari.jpg', 'Weekend Social Dance', 'Ariel Anders demonstrating athletic connection in a high-energy social dance session');

  // Memes Page Imagery
  const memesPath = path.resolve(process.cwd(), 'src/data/memes.ts');
  if (fs.existsSync(memesPath)) {
    const memesContent = fs.readFileSync(memesPath, 'utf-8');
    const memeMatches = [...memesContent.matchAll(/imageSrc:\s*['"](.*?)['"][\s\S]*?altText:\s*['"](.*?)['"]/g)];
    memeMatches.forEach(m => {
      addRouteImage('/memes', m[1], 'West Coast Swing Meme', m[2]);
    });
  }

  // Helper to parse frontmatter and markdown images from content files
  function processContentDirectory(dirPath, routePrefix) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      if (!file.endsWith('.md')) return;
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const rawSlug = file.replace(/\.md$/, '');
      const strippedSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');

      const routePaths = Array.from(new Set([
        `${routePrefix}/${rawSlug}`,
        `${routePrefix}/${strippedSlug}`
      ]));

      // Title
      const titleMatch = fileContent.match(/^title:\s*["']?(.*?)["']?$/m);
      const title = titleMatch ? titleMatch[1] : strippedSlug;

      // Excerpt
      const excerptMatch = fileContent.match(/^excerpt:\s*["']?(.*?)["']?$/m);
      const excerpt = excerptMatch ? excerptMatch[1] : title;

      // Hero Image
      const heroImageMatch = fileContent.match(/^image:\s*["']?(.*?)["']?$/m);
      if (heroImageMatch && heroImageMatch[1]) {
        routePaths.forEach(rp => addRouteImage(rp, heroImageMatch[1], title, excerpt));
      }

      // Inline Images / SVG Diagrams
      const inlineImages = [...fileContent.matchAll(/!\[(.*?)\]\((.*?)\)/g)];
      inlineImages.forEach(img => {
        routePaths.forEach(rp => addRouteImage(rp, img[2], img[1] || title, excerpt));
      });
    });
  }

  processContentDirectory(path.resolve(process.cwd(), 'content/posts'), '/blog');
  processContentDirectory(path.resolve(process.cwd(), 'content/resources'), '/gear');
  processContentDirectory(path.resolve(process.cwd(), 'content/studies'), '/research');

  // Inject <image:image> blocks into each <url>...</url> node
  content = content.replace(/<url>([\s\S]*?)<\/url>/g, (match, urlInner) => {
    const locMatch = urlInner.match(/<loc>(.*?)<\/loc>/);
    const currentLoc = locMatch ? locMatch[1] : null;

    let imageBlocks = '';
    if (currentLoc && routeImagesMap.has(currentLoc)) {
      const images = routeImagesMap.get(currentLoc);
      images.forEach(img => {
        const titleTag = img.title ? `\n      <image:title>${img.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>` : '';
        const captionTag = img.caption ? `\n      <image:caption>${img.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>` : '';
        const licenseTag = img.license ? `\n      <image:license>${img.license}</image:license>` : '';

        imageBlocks += `\n    <image:image>\n      <image:loc>${img.loc}</image:loc>${titleTag}${captionTag}${licenseTag}\n    </image:image>`;
      });
    }

    return `\n  <url>${urlInner}${imageBlocks}\n  </url>`;
  });

  if (fs.existsSync(path.dirname(sitemapDistPath))) {
    fs.writeFileSync(sitemapDistPath, content);
  }
  fs.writeFileSync(sitemapPublicPath, content);
  console.log('Sitemap cleanup complete: Google Image Extension generated for canonical domain', canonicalDomain);
} else {
  console.warn('sitemap.xml not found');
}
