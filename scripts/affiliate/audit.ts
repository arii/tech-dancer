import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import { parse } from 'yaml';
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

    // Use yaml parser for robust affiliateId detection
    const match = content.match(/^---\n([\s\S]+?)\n---\n/);
    if (match) {
      try {
        const frontmatter = parse(match[1]);
        if (frontmatter && frontmatter.affiliateIds) {
          const idsInFile = Array.isArray(frontmatter.affiliateIds)
            ? frontmatter.affiliateIds
            : [frontmatter.affiliateIds];

          idsInFile.forEach((id: string) => {
            if (id) {
              usedIds.add(id);
              if (!affiliates[id]) {
                console.error(`[ERROR] File ${file} references missing affiliate ID: ${id}`);
                errors++;
              }
            }
          });
        }
      } catch (e) {
        console.error(`[ERROR] Failed to parse frontmatter in ${file}:`, e);
        errors++;
      }
    }

    // Check for inline affiliate notices
    const noticeMatches = content.match(/<notice type="affiliate" id="(.*?)"/g);
    if (noticeMatches) {
      noticeMatches.forEach(m => {
        const idMatch = m.match(/id="(.*?)"/);
        if (idMatch && idMatch[1]) {
          const id = idMatch[1];
          usedIds.add(id);
          if (!affiliates[id]) {
            console.error(`[ERROR] File ${file} has notice for missing affiliate ID: ${id}`);
            errors++;
          }
        }
      });
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
