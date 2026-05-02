import fs from 'fs';
import path from 'path';

const APP_URL = process.env.VITE_APP_URL || 'https://boomtick.blog';
const hostname = APP_URL.replace(/\/$/, '');

const robotsContent = `User-agent: *
Allow: /
Disallow: /previews/
Disallow: /404.html

Sitemap: ${hostname}/sitemap.xml
`;

const publicDir = path.resolve(process.cwd(), 'public');
const distDir = path.resolve(process.cwd(), 'dist');

// Generate in public/ for development
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
console.log('✅ Generated public/robots.txt');

// Also generate in dist/ if it exists (for build time)
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
  console.log('✅ Generated dist/robots.txt');
}
