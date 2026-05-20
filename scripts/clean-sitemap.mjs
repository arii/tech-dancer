import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve(process.cwd(), 'dist/sitemap.xml');

if (fs.existsSync(sitemapPath)) {
  console.log('Cleaning up sitemap.xml...');
  let content = fs.readFileSync(sitemapPath, 'utf-8');

  // Remove <changefreq>...</changefreq>
  content = content.replace(/<changefreq>.*?<\/changefreq>/g, '');
  // Remove <priority>...</priority>
  content = content.replace(/<priority>.*?<\/priority>/g, '');
  // Remove empty lines that might have been left behind
  content = content.split('\n').filter(line => line.trim() !== '').join('\n');

  fs.writeFileSync(sitemapPath, content);
  console.log('Sitemap cleanup complete.');
} else {
  console.warn('sitemap.xml not found at', sitemapPath);
}
