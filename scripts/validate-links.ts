/**
 * Link and Affiliate Validator
 *
 * 1. Crawls internal and external links.
 * 2. Validates Amazon affiliate links.
 * 3. Validates image sources.
 * 4. Reports broken links.
 */

import fs from 'fs';
import path from 'path';
import { CONTENT_DIR_MAP, getContentSlugs } from './content-loader';

async function main() {
  console.log('Starting link validation...');

  // 1. Extract valid routes and slugs
  const validRoutes = new Set<string>(['/', '/about', '/contact', '/ux-auditor']);

  Object.entries(CONTENT_DIR_MAP).forEach(([prefix, dir]) => {
    const slugs = getContentSlugs(dir, prefix);
    slugs.forEach(slug => validRoutes.add(slug));
    validRoutes.add(prefix); // The index page for the category
  });

  // Also include /research which might be in CONTENT_DIR_MAP but maybe empty
  validRoutes.add('/research');
  validRoutes.add('/blog');
  validRoutes.add('/gear');

  console.log(`Discovered ${validRoutes.size} valid internal routes.`);

  // 2. Scan markdown files for links and images
  const markdownFiles = getMarkdownFiles('content');
  const extractedLinks: { file: string, type: 'internal' | 'external' | 'image', url: string }[] = [];

  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');

    // Extract standard markdown links [text](url) - handles potential titles in quotes
    const linkRegex = /\[.*?\]\((.*?)(\s+".*?")?\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const url = match[1].trim();
      if (url.startsWith('http')) {
        extractedLinks.push({ file, type: 'external', url });
      } else if (url.startsWith('/')) {
        extractedLinks.push({ file, type: 'internal', url });
      }
    }

    // Extract images ![alt](url) or <img src="url" /> - handles potential titles in quotes
    const imgRegex = /!\[.*?\]\((.*?)(\s+".*?")?\)/g;
    while ((match = imgRegex.exec(content)) !== null) {
      extractedLinks.push({ file, type: 'image', url: match[1].trim() });
    }

    const htmlImgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    while ((match = htmlImgRegex.exec(content)) !== null) {
      extractedLinks.push({ file, type: 'image', url: match[1] });
    }

    // Extract image from frontmatter
    const frontmatterImgMatch = /image:\s*["']?(.*?)["']?\s*\n/m.exec(content);
    if (frontmatterImgMatch && frontmatterImgMatch[1]) {
      extractedLinks.push({ file, type: 'image', url: frontmatterImgMatch[1] });
    }
  });

  console.log(`Extracted ${extractedLinks.length} links/images from markdown.`);

  // 3. Scan affiliate links
  const affiliateLinks: { id: string, url: string }[] = [];
  try {
    const affiliateContent = fs.readFileSync('src/lib/affiliateManager.ts', 'utf-8');
    const affRegex = /'([^']+)': \{\s+id: '([^']+)',\s+name: '([^']+)',\s+url: '([^']+)'/g;
    let affMatch;
    while ((affMatch = affRegex.exec(affiliateContent)) !== null) {
      affiliateLinks.push({ id: affMatch[2], url: affMatch[4] });
    }
  } catch (err) {
    console.error('Failed to parse affiliate links:', err);
  }

  console.log(`Discovered ${affiliateLinks.length} affiliate links.`);

  // 4. Validate everything
  const brokenLinks: { file: string, type: string, url: string, reason: string }[] = [];

  // Validate internal links
  extractedLinks.filter(l => l.type === 'internal').forEach(link => {
    // Remove anchors and query params for validation
    const pathOnly = link.url.split('#')[0].split('?')[0];
    if (!validRoutes.has(pathOnly)) {
      brokenLinks.push({ ...link, reason: 'Internal route not found' });
    }
  });

  // Validate external links and images
  const externalToValidate = [
    ...extractedLinks.filter(l => l.type === 'external' || (l.type === 'image' && l.url.startsWith('http'))),
    ...affiliateLinks.map(al => ({ file: 'src/lib/affiliateManager.ts', type: 'affiliate', url: al.url }))
  ];

  const localImagesToValidate = extractedLinks.filter(l => l.type === 'image' && !l.url.startsWith('http'));

  console.log(`Validating ${localImagesToValidate.length} local images...`);
  localImagesToValidate.forEach(link => {
    const filePath = path.join('public', link.url);
    if (!fs.existsSync(filePath)) {
      brokenLinks.push({ ...link, reason: 'Local image file not found in public/' });
    }
  });

  console.log(`Validating ${externalToValidate.length} external/affiliate links...`);

  for (const link of externalToValidate) {
    // Amazon specific check
    if (link.url.includes('amazon.com')) {
      const urlObj = new URL(link.url);
      if (urlObj.pathname === '/' || urlObj.pathname === '') {
        brokenLinks.push({ ...link, reason: 'Generic Amazon placeholder URL' });
        continue;
      }
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      let response = await fetch(link.url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: controller.signal
      });

      if (!response.ok) {
        // Retry with GET if HEAD fails (some sites block HEAD)
        response = await fetch(link.url, {
          method: 'GET',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
          signal: controller.signal
        });
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Special handling for Amazon which often blocks bots
        if (link.url.includes('amazon.com') && (response.status === 403 || response.status === 503)) {
          console.warn(`[Warning] Amazon might be blocking our bot for ${link.url} (Status ${response.status})`);
          // We don't mark it as broken if it's just a bot block for a likely valid product URL
          continue;
        }
        brokenLinks.push({ ...link, reason: `HTTP Status ${response.status}` });
      }
    } catch (err) {
      brokenLinks.push({ ...link, reason: `Fetch error: ${err instanceof Error ? err.name === 'AbortError' ? 'Timeout' : err.message : String(err)}` });
    }
  }

  // 5. Generate report
  if (brokenLinks.length > 0) {
    console.error(`Found ${brokenLinks.length} broken links:`);
    const report = brokenLinks.map(l => `- [${l.type}] ${l.url} in ${l.file}: ${l.reason}`).join('\n');
    console.error(report);

    // Save report for GitHub Action
    fs.writeFileSync('link-validation-report.md', `### Link Integrity Report\n\nDetected ${brokenLinks.length} broken links:\n\n${report}`);
    process.exit(1);
  } else {
    console.log('No broken links found!');
  }

  console.log('Link validation complete.');
}

function getMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(file));
    } else if (file.endsWith('.md')) {
      results.push(file);
    }
  });
  return results;
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
