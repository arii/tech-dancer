import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import {
  readAffiliates,
  writeAffiliates,
  normalizeAmazonUrl,
} from './utils';

async function main() {
  const { values } = parseArgs({
    options: {
      'fix-safe': { type: 'boolean', default: false },
    }
  });

  const fixSafe = !!values['fix-safe'];
  const affiliates = readAffiliates();
  const ids = Object.keys(affiliates);

  let errors = 0;
  let warnings = 0;
  let fixedCount = 0;

  console.log(`Auditing ${ids.length} affiliate items...\n`);

  const usedIds = new Set<string>();
  const contentFiles = findMarkdownFiles('content');
  for (const file of contentFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(/affiliateIds:\s*\[(.*?)\]/g);
    if (matches) {
      matches.forEach(m => {
        const idsInFile = m.match(/\[(.*?)\]/)?.[1].split(',').map(s => s.trim().replace(/['"]/g, '')) || [];
        idsInFile.forEach(id => {
          if (id) {
            usedIds.add(id);
            if (!affiliates[id]) {
              console.error(`[ERROR] File ${file} references missing affiliate ID: ${id}`);
              errors++;
            }
          }
        });
      });
    }

    // Also check for event recommendations
    // const _eventMatches = content.match(/-\s+([a-zA-Z0-9-]+)/g);
    if (file.includes('events/')) {
        // This is a bit broad, but let's see if we can narrow it down if needed.
        // For now, let's just use the affiliateIds check as it is more explicit.
    }
  }

  for (const id of ids) {
    const item = affiliates[id];
    console.log(`Checking [${id}] - ${item.name}`);

    // URL Checks
    if (!item.url) {
      console.error(`  [ERROR] Missing URL`);
      errors++;
    } else if (item.url.includes('amazon.')) {
      const normalized = normalizeAmazonUrl(item.url);
      if (item.url !== normalized) {
        if (fixSafe) {
          console.log(`  [FIX] Normalizing Amazon URL and applying tag`);
          item.url = normalized;
          fixedCount++;
        } else {
          console.warn(`  [WARN] Amazon URL not normalized or missing tag. Expected: ${normalized}`);
          warnings++;
        }
      }
    }

    // Image Checks
    if (item.image) {
      const imagePath = path.join(process.cwd(), 'public', item.image);
      if (!fs.existsSync(imagePath) && !item.image.startsWith('http')) {
        console.error(`  [ERROR] Image not found: ${item.image}`);
        errors++;
      } else if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        if (stats.size === 0) {
          console.error(`  [ERROR] Image is 0 bytes: ${item.image}`);
          errors++;
        }

        // Localization candidate check
        if (item.image.includes('/sketches/')) {
            const sketchBase = path.basename(item.image, path.extname(item.image));
            const amazonDir = path.join(process.cwd(), 'public/images/gear/amazon');
            if (fs.existsSync(amazonDir)) {
                const amazonFiles = fs.readdirSync(amazonDir);
                const match = amazonFiles.find(f => f.includes(sketchBase) && f.endsWith('.jpg'));
                if (match) {
                    console.warn(`  [WARN] Sketch used but localized Amazon image available: /images/gear/amazon/${match}`);
                    warnings++;
                }
            }
        }
      }
    } else if (!item.draft) {
      console.warn(`  [WARN] Missing image for non-draft item`);
      warnings++;
    }

    // Metadata Checks
    if (item.name === id) {
      console.warn(`  [WARN] Product name matches ID, might be a raw slug`);
      warnings++;
    }

    if (!usedIds.has(id)) {
      console.log(`  [INFO] Affiliate item is not used in any content files.`);
    }
  }

  if (fixSafe && fixedCount > 0) {
    writeAffiliates(affiliates);
    console.log(`\nApplied ${fixedCount} safe fixes.`);
  }

  console.log(`\nAudit complete: ${errors} errors, ${warnings} warnings.`);

  if (errors > 0) {
    process.exit(1);
  }
}

function findMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(file));
    } else if (file.endsWith('.md')) {
      results.push(file);
    }
  });
  return results;
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
