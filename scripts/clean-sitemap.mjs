import fs from 'fs';
import path from 'path';

const APP_URL = process.env.VITE_APP_URL || 'https://boomtick.blog';
const canonicalDomain = APP_URL.replace(/\/$/, '');

const sitemapDistPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
const sitemapPublicPath = path.resolve(process.cwd(), 'public/sitemap.xml');

const targetPath = fs.existsSync(sitemapDistPath) ? sitemapDistPath : sitemapPublicPath;

if (fs.existsSync(targetPath)) {
  console.log('Cleaning up and standardizing sitemap.xml...');
  let content = fs.readFileSync(targetPath, 'utf-8');

  // Remove <changefreq>...</changefreq>
  content = content.replace(/<changefreq>.*?<\/changefreq>/g, '');
  // Remove <priority>...</priority>
  content = content.replace(/<priority>.*?<\/priority>/g, '');
  // Normalize localhost/preview domains to canonical production domain
  content = content.replace(/https?:\/\/localhost(:\d+)?/g, canonicalDomain);
  // Remove empty lines that might have been left behind
  content = content.split('\n').filter(line => line.trim() !== '').join('\n');

  if (fs.existsSync(path.dirname(sitemapDistPath))) {
    fs.writeFileSync(sitemapDistPath, content);
  }
  fs.writeFileSync(sitemapPublicPath, content);
  console.log('Sitemap cleanup complete: standardized to', canonicalDomain);
} else {
  console.warn('sitemap.xml not found');
}
