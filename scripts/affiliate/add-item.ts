import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import { spawnSync } from 'child_process';
import {
  readAffiliates,
  writeAffiliates,
  normalizeAmazonUrl,
  slugify,
  AffiliateItem,
  getAffiliateTag,
  AFFILIATES_JSON_PATH
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
      'apply': { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
      'force': { type: 'boolean', default: false },
      'tag': { type: 'string' },
      'create-pr': { type: 'boolean', default: false },
      'force-branch': { type: 'boolean', default: false },
    }
  });

  const amazonUrl = values['amazon-url'];
  const title = values['title'];
  const imageUrl = values['image-url'];
  const category = values['category']!;
  const description = values['description']!;
  const targetContent = values['target-content'];
  const apply = !!values['apply'];
  const dryRun = !!values['dry-run'] || !apply;
  const force = !!values['force'];
  const tag = values['tag'] || getAffiliateTag();
  const createPr = !!values['create-pr'];

  if (createPr && !dryRun) {
    const status = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf-8' }).stdout.trim();
    if (status) {
      console.error('Error: Working tree is dirty. Please commit or stash changes before starting PR automation.');
      console.error(status);
      process.exit(1);
    }
  }

  if (!amazonUrl || !title) {
    console.error('Error: --amazon-url and --title are required.');
    process.exit(1);
  }

  const normalizedUrl = normalizeAmazonUrl(amazonUrl, tag);
  const isAmazon = amazonUrl.includes('amazon.');

  if (isAmazon && !normalizedUrl.includes('/dp/')) {
    if (!force) {
      console.error('Error: Amazon URL does not contain a recognizable ASIN. Use --force to proceed anyway.');
      process.exit(1);
    }
    console.warn('Warning: Proceeding with Amazon URL without recognizable ASIN (--force used).');
  }

  const id = values['id'] || slugify(title);

  console.log(`Processing item: ${title} (${id})`);
  console.log(`URL: ${normalizedUrl}`);

  let imagePath: string | undefined;
  if (imageUrl) {
    const captured = await captureImage({
      imageUrl,
      slug: id,
      isAmazon,
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
    draft: existing?.draft ?? true,
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

  if (createPr && !dryRun) {
    handlePullRequest(id, title, !!values['force-branch'], imagePath, targetContent);
  }
}

function handlePullRequest(slug: string, title: string, forceBranch: boolean, imagePath?: string, targetContentPath?: string) {
  const branchName = `feat/add-amazon-affiliate-${slug}`;
  const git = (args: string[], capture = false) => {
    const res = spawnSync('git', args, { stdio: capture ? 'pipe' : 'inherit', encoding: 'utf-8' });
    if (res.status !== 0) throw new Error(`Git command failed: git ${args.join(' ')}`);
    return res;
  };

  try {
    console.log(`Creating branch: ${branchName}...`);
    // Use -B to overwrite if exists
    git(['checkout', '-B', branchName]);

    console.log('Committing changes...');
    const filesToAdd = [AFFILIATES_JSON_PATH];
    if (imagePath) {
      // imagePath is relative (e.g. /images/gear/amazon/...)
      filesToAdd.push(path.join(process.cwd(), 'public', imagePath));
    }
    if (targetContentPath) {
      filesToAdd.push(path.resolve(process.cwd(), targetContentPath));
    }

    git(['add', ...filesToAdd]);

    git(['commit', '-m', `feat: add Amazon affiliate item - ${title}`]);

    console.log('Pushing branch...');
    const pushArgs = ['push', '-u', 'origin', branchName];
    if (forceBranch) {
      pushArgs.push('--force');
    }
    git(pushArgs);

    console.log('Creating pull request...');
    const prBody = `
## Summary
Added a new Amazon affiliate item: **${title}**

## Checklist
- [x] Normalized Amazon URL with tracking tag
- [x] Downloaded and validated product image
- [x] Updated \`src/data/affiliates.json\`
- [ ] Verified affiliate disclosure presence
- [ ] Verified sponsored-link attribute verification
- [ ] Verified display on relevant content pages

Generated by BoomTick Affiliate Tooling.
    `.trim();

    const prRes = spawnSync('gh', [
      'pr', 'create',
      '--title', `feat: add Amazon affiliate item - ${title}`,
      '--body', prBody,
      '--label', 'merch catalog'
    ], { stdio: 'inherit' });

    if (prRes.status !== 0) {
      console.error('Error: PR creation failed.');
      process.exit(1);
    } else {
      console.log('Successfully created PR!');
    }
  } catch (error) {
    console.error(`Error during PR creation: ${(error as Error).message}`);
  }
}

function updateContentFile(filePath: string, affiliateId: string, dryRun: boolean) {
  const repoRoot = process.cwd();
  const fullPath = path.resolve(repoRoot, filePath);
  const allowedRoots = [
    path.join(repoRoot, 'content/posts'),
    path.join(repoRoot, 'content/resources'),
    path.join(repoRoot, 'content/events'),
    path.join(repoRoot, 'src/content/posts'),
    path.join(repoRoot, 'src/content/resources'),
    path.join(repoRoot, 'src/content/events'),
  ];

  if (!allowedRoots.some(root => fullPath.startsWith(root + path.sep))) {
    throw new Error(`--target-content must be inside content roots (posts, resources, events). Got: ${filePath}`);
  }

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
