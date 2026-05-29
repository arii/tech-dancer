import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import {
  readAffiliates,
  writeAffiliates,
  normalizeAmazonUrl,
  slugify,
  AffiliateItem,
  DEFAULT_AFFILIATE_TAG
} from './utils';
import { captureImage } from './image-helper';

async function main() {
  const { values } = parseArgs({
    options: {
      'amazon-url': { type: 'string' },
      'image-url': { type: 'string' },
      'title': { type: 'string' },
      'category': { type: 'string', default: 'gear' },
      'description': { type: 'string', default: '' },
      'id': { type: 'string' },
      'target-content': { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      'force': { type: 'boolean', default: false },
      'tag': { type: 'string', default: DEFAULT_AFFILIATE_TAG },
    }
  });

  const amazonUrl = values['amazon-url'];
  const title = values['title'];
  const imageUrl = values['image-url'];
  const category = values['category']!;
  const description = values['description']!;
  const targetContent = values['target-content'];
  const dryRun = !!values['dry-run'];
  const force = !!values['force'];
  const tag = values['tag']!;

  if (!amazonUrl || !title) {
    console.error('Error: --amazon-url and --title are required.');
    process.exit(1);
  }

  const normalizedUrl = normalizeAmazonUrl(amazonUrl, tag);
  const id = values['id'] || slugify(title);

  console.log(`Processing item: ${title} (${id})`);
  console.log(`URL: ${normalizedUrl}`);

  let imagePath: string | undefined;
  if (imageUrl) {
    const captured = await captureImage({
      imageUrl,
      slug: id,
      isAmazon: amazonUrl.includes('amazon.'),
      force,
      dryRun
    });
    if (captured) {
      imagePath = captured;
    }
  }

  const affiliates = readAffiliates();
  const existing = affiliates[id];

  const newItem: AffiliateItem = {
    ...existing,
    id,
    name: title,
    url: normalizedUrl,
    category,
    description: description || existing?.description || '',
  };

  if (imagePath) {
    newItem.image = imagePath;
    newItem.imageMode = 'contain';
  }

  if (dryRun) {
    console.log('[Dry Run] Would update affiliates.json with:', JSON.stringify(newItem, null, 2));
  } else {
    affiliates[id] = newItem;
    writeAffiliates(affiliates);
    console.log(`Updated affiliates.json with item: ${id}`);
  }

  if (targetContent) {
    updateContentFile(targetContent, id, dryRun);
  }
}

function updateContentFile(filePath: string, affiliateId: string, dryRun: boolean) {
  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Error: Target content file not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');

  // Try to find affiliateIds in frontmatter
  const match = content.match(/affiliateIds:\s*\[(.*?)\]/);
  if (match) {
    const existingIds = match[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    if (!existingIds.includes(affiliateId)) {
      existingIds.push(affiliateId);
      const newAffiliateLine = `affiliateIds: [${existingIds.map(id => `"${id}"`).join(', ')}]`;
      if (dryRun) {
        console.log(`[Dry Run] Would update affiliateIds in ${filePath} to: ${newAffiliateLine}`);
      } else {
        content = content.replace(/affiliateIds:\s*\[.*?\]/, newAffiliateLine);
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${filePath} with affiliateId: ${affiliateId}`);
      }
    } else {
      console.log(`AffiliateId ${affiliateId} already present in ${filePath}`);
    }
  } else {
    // If affiliateIds doesn't exist, try to insert it after title or at the beginning of frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (content.startsWith('---') && frontmatterEnd !== -1) {
      const newAffiliateLine = `affiliateIds: ["${affiliateId}"]\n`;
      if (dryRun) {
        console.log(`[Dry Run] Would add affiliateIds to ${filePath} frontmatter.`);
      } else {
        content = content.slice(0, frontmatterEnd) + newAffiliateLine + content.slice(frontmatterEnd);
        fs.writeFileSync(fullPath, content);
        console.log(`Added affiliateIds to ${filePath}`);
      }
    } else {
      console.error(`Error: Could not find frontmatter in ${filePath}`);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
