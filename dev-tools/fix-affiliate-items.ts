#!/usr/bin/env node

/**
 * Affiliate Item Fixer Script
 * 
 * Interactive CLI to:
 * 1. Review items flagged by validate-affiliate-urls.ts
 * 2. Update titles and descriptions
 * 3. Mark items as draft
 * 4. Suggest ASIN corrections
 * 
 * Usage:
 *   pnpm tsx dev-tools/fix-affiliate-items.ts
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface AffiliateItem {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  image?: string;
  draft?: boolean;
  gearSlug?: string;
}

interface ValidationResult {
  id: string;
  name: string;
  url: string;
  status: 'valid' | 'invalid' | 'error' | 'mismatch' | 'draft' | 'placeholder';
  amazonTitle?: string;
  issue?: string;
  suggestion?: string;
  ourDescription: string;
}

const AFFILIATES_FILE = path.join(process.cwd(), 'src/data/affiliates.json');
const REPORT_FILE = path.join(process.cwd(), 'dev-tools/affiliate-validation-report.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function interactivelyFixItem(
  item: AffiliateItem,
  result: ValidationResult
): Promise<Partial<AffiliateItem>> {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`\n📦 Item: ${result.id}`);
  console.log(`Current Name:        ${result.name}`);
  console.log(`URL:                 ${result.url}`);
  console.log(`Our Description:     ${result.ourDescription}`);
  console.log(`Status:              ${result.status}`);
  if (result.issue) console.log(`Issue:               ${result.issue}`);
  if (result.amazonTitle) console.log(`Amazon Title:        ${result.amazonTitle}`);
  if (result.suggestion) console.log(`Suggestion:          ${result.suggestion}`);

  const update: Partial<AffiliateItem> = {};

  const action = await ask(
    '\nWhat would you like to do? (update-name/update-desc/mark-draft/skip): '
  );

  switch (action.toLowerCase()) {
    case 'update-name':
      const newName = await ask('Enter new name: ');
      if (newName) {
        update.name = newName;
        console.log(`✓ Name updated to: "${newName}"`);
      }
      break;

    case 'update-desc':
      const newDesc = await ask('Enter new description: ');
      if (newDesc) {
        update.description = newDesc;
        console.log(`✓ Description updated`);
      }
      break;

    case 'mark-draft':
      update.draft = true;
      console.log(`✓ Item marked as draft`);
      break;

    case 'skip':
      console.log(`⊘ Skipped`);
      break;

    default:
      console.log(`? Unknown action`);
  }

  return update;
}

async function main() {
  try {
    if (!fs.existsSync(REPORT_FILE)) {
      console.log(`\n⚠️  Run validation first:\n  pnpm tsx dev-tools/validate-affiliate-urls.ts\n`);
      process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf-8'));
    const affiliatesData = JSON.parse(fs.readFileSync(AFFILIATES_FILE, 'utf-8'));

    const issueItems = report.items.filter(
      (r: ValidationResult) =>
        r.status === 'mismatch' || r.status === 'placeholder' || r.status === 'error'
    );

    if (issueItems.length === 0) {
      console.log('\n✓ No issues found!\n');
      process.exit(0);
    }

    console.log(`\n🔧 Found ${issueItems.length} items to review\n`);

    const updates: Record<string, Partial<AffiliateItem>> = {};

    for (const result of issueItems) {
      const item = affiliatesData[result.id];
      if (!item) continue;

      const update = await interactivelyFixItem(item, result);
      if (Object.keys(update).length > 0) {
        updates[result.id] = update;
      }
    }

    // Apply updates
    if (Object.keys(updates).length > 0) {
      const confirm = await ask(
        `\n${Object.keys(updates).length} items will be updated. Continue? (y/n): `
      );

      if (confirm.toLowerCase() === 'y') {
        Object.entries(updates).forEach(([id, update]) => {
          affiliatesData[id] = { ...affiliatesData[id], ...update };
        });

        fs.writeFileSync(AFFILIATES_FILE, JSON.stringify(affiliatesData, null, 4));
        console.log(`\n✓ Updates saved to affiliates.json\n`);
      }
    }

    rl.close();
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    process.exit(1);
  }
}

main();
