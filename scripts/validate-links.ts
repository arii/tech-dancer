/**
 * Link Validator
 *
 * 1. Crawls internal and external links using AST traversal.
 * 2. Validates image sources.
 * 3. Reports broken links.
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { CONTENT_DIR_MAP, getContentSlugs } from './content-loader';

async function main() {
  console.log('Starting link validation...');

  // 1. Extract valid routes and slugs
  const validRoutes = new Set<string>(['/', '/about', '/ux-auditor']);

  Object.entries(CONTENT_DIR_MAP).forEach(([prefix, dir]) => {
    const slugs = getContentSlugs(dir, prefix);
    slugs.forEach(item => validRoutes.add(item.slug));
    validRoutes.add(prefix); // The index page for the category
  });

  validRoutes.add('/blog');
  validRoutes.add('/gear');

  console.log(`Discovered ${validRoutes.size} valid internal routes.`);

  // Validate gearSlug mapping in affiliates.json
  console.log('Validating affiliates.json gearSlug mappings...');
  const affiliates = JSON.parse(fs.readFileSync('src/data/affiliates.json', 'utf-8')) as Record<string, { gearSlug?: string }>;
  const brokenSlugs: string[] = [];

  Object.entries(affiliates).forEach(([id, data]) => {
     if (data.gearSlug) {
      const fullPath = `/gear/${data.gearSlug}`;
      if (!validRoutes.has(fullPath)) {
        brokenSlugs.push(`${id}: ${fullPath}`);
      }
    }
  });

  if (brokenSlugs.length > 0) {
    console.error(`Found ${brokenSlugs.length} broken gearSlug mappings in affiliates.json:`);
    brokenSlugs.forEach(s => console.error(`- ${s}`));
    process.exit(1);
  } else {
    console.log('All gearSlug mappings are valid.');
  }

  // 2. Scan markdown files for links and images using unified/remark AST
  const markdownFiles = globSync('content/**/*.md');
  const extractedLinks: { file: string, type: 'internal' | 'external' | 'image', url: string }[] = [];

  const processor = unified().use(remarkParse);

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const tree = processor.parse(content);

    visit(tree, (node) => {
      if (node.type === 'link') {
        const url = node.url;
        if (url.startsWith('http')) {
          extractedLinks.push({ file, type: 'external', url });
        } else if (url.startsWith('/')) {
          extractedLinks.push({ file, type: 'internal', url });
        }
      } else if (node.type === 'image') {
        extractedLinks.push({ file, type: 'image', url: node.url });
      } else if (node.type === 'html') {
        // Fallback for HTML images since remark-parse doesn't parse HTML tags into AST by default
        const htmlImgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
        let match;
        while ((match = htmlImgRegex.exec(node.value)) !== null) {
          extractedLinks.push({ file, type: 'image', url: match[1] });
        }
      }
    });

    // Extract image from frontmatter (not part of AST)
    const frontmatterImgMatch = /image:\s*["']?(.*?)["']?\s*\n/m.exec(content);
    if (frontmatterImgMatch && frontmatterImgMatch[1]) {
      extractedLinks.push({ file, type: 'image', url: frontmatterImgMatch[1] });
    }
  }

  console.log(`Extracted ${extractedLinks.length} links/images from markdown.`);

  // 3. Validate everything
  const brokenLinks: { file: string, type: string, url: string, reason: string }[] = [];

  // Validate internal links
  extractedLinks.filter(l => l.type === 'internal').forEach(link => {
    const pathOnly = link.url.split('#')[0].split('?')[0];
    if (!validRoutes.has(pathOnly)) {
      brokenLinks.push({ ...link, reason: 'Internal route not found' });
    }
  });

  // Validate external links and images
  const externalToValidate = extractedLinks.filter(l => l.type === 'external' || (l.type === 'image' && l.url.startsWith('http')));

  const localImagesToValidate = extractedLinks.filter(l => l.type === 'image' && !l.url.startsWith('http'));

  console.log(`Validating ${localImagesToValidate.length} local images...`);
  localImagesToValidate.forEach(link => {
    const filePath = path.join('public', link.url);
    if (!fs.existsSync(filePath)) {
      brokenLinks.push({ ...link, reason: 'Local image file not found in public/' });
    }
  });

  console.log(`Validating ${externalToValidate.length} external links...`);

  for (const link of externalToValidate) {
    try {
      new URL(link.url);
    } catch (err) {
      brokenLinks.push({ ...link, reason: `Invalid URL: ${err instanceof Error ? err.message : String(err)}` });
      continue;
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
        response = await fetch(link.url, {
          method: 'GET',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
          signal: controller.signal
        });
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Whitelist Printful 403s which are common in bot-like CI environments
        const isPrintful = link.url.includes('printful.me');
        if (isPrintful && response.status === 403) {
          console.log(`- [whitelisted] Ignoring 403 for ${link.url}`);
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

    fs.writeFileSync('link-validation-report.md', `### Link Integrity Report\n\nDetected ${brokenLinks.length} broken links:\n\n${report}`);
    process.exit(1);
  } else {
    console.log('No broken links found!');
  }

  console.log('Link validation complete.');
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
