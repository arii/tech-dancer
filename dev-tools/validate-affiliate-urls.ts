#!/usr/bin/env node

/**
 * Affiliate URL Validation Script
 * 
 * Verifies that:
 * 1. Affiliate URLs resolve to valid Amazon product pages
 * 2. Product titles match what we've stored
 * 3. Product descriptions align with our content
 * 4. Flags mismatches for manual review
 * 
 * Usage:
 *   pnpm tsx dev-tools/validate-affiliate-urls.ts
 *   pnpm tsx dev-tools/validate-affiliate-urls.ts --fix
 * 
 * Output:
 *   - Report in dev-tools/affiliate-validation-report.json
 *   - Console summary of issues
 *   - Suggested fixes for mismatches
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

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
  amazonASIN?: string;
  issue?: string;
  suggestion?: string;
  ourDescription: string;
  timestamp: string;
}

interface ValidationReport {
  generatedAt: string;
  totalItems: number;
  results: {
    valid: number;
    invalid: number;
    mismatched: number;
    errors: number;
    drafted: number;
    placeholders: number;
  };
  items: ValidationResult[];
  recommendations: string[];
}

const AFFILIATES_FILE = path.join(
  process.cwd(),
  'src/data/affiliates.json'
);

const OUTPUT_FILE = path.join(
  process.cwd(),
  'dev-tools/affiliate-validation-report.json'
);

// Placeholders to skip
const PLACEHOLDER_URLS = ['https://amazon.com/'];

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function extractASIN(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]+)/);
  return match ? match[1] : null;
}

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Remove affiliate tags for cleaner fetching
    const cleanUrl = url.split('?')[0];
    
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, 5000);

    https
      .get(cleanUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        clearTimeout(timeout);
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
          if (data.length > 100000) res.destroy();
        });
        res.on('end', () => resolve(data));
      })
      .on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
  });
}

function extractProductTitle(html: string): string | null {
  // Try multiple title extraction patterns
  const patterns = [
    /<span id="productTitle"[^>]*>([^<]+)<\/span>/,
    /<h1[^>]*>([^<]+)<\/h1>/,
    /<title>([^|]+)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1]
        .trim()
        .replace(/\s+/g, ' ')
        .substring(0, 100);
    }
  }
  return null;
}

function extractProductDescription(html: string): string | null {
  const patterns = [
    /<div[^>]*id="feature-bullets"[^>]*>([\s\S]*?)<\/div>/,
    /<div[^>]*class="a-expander-content"[^>]*>([\s\S]*?)<\/div>/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const desc = match[1]
        .replace(/<[^>]+>/g, '')
        .trim()
        .substring(0, 200);
      if (desc.length > 20) {
        return desc;
      }
    }
  }
  return null;
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  // Extract key words (length > 3)
  const words1 = new Set(
    s1
      .split(/\s+/)
      .filter((w) => w.length > 3 && !/[^a-z0-9]/.test(w))
  );
  const words2 = new Set(
    s2
      .split(/\s+/)
      .filter((w) => w.length > 3 && !/[^a-z0-9]/.test(w))
  );

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = [...words1].filter((w) => words2.has(w)).length;
  const union = new Set([...words1, ...words2]).size;

  return intersection / union;
}

async function validateAffiliateItem(
  item: AffiliateItem
): Promise<ValidationResult> {
  const result: ValidationResult = {
    id: item.id,
    name: item.name,
    url: item.url,
    status: 'valid',
    ourDescription: item.description,
    timestamp: new Date().toISOString(),
  };

  // Check for draft
  if (item.draft === true) {
    result.status = 'draft';
    result.issue = 'Item marked as draft';
    return result;
  }

  // Check for placeholders
  if (PLACEHOLDER_URLS.some((p) => item.url.startsWith(p))) {
    result.status = 'placeholder';
    result.issue = 'Placeholder URL (needs real Amazon link)';
    result.suggestion = 'Find actual ASIN for this item and update URL';
    return result;
  }

  // Extract ASIN
  const asin = extractASIN(item.url);
  if (!asin) {
    result.status = 'invalid';
    result.issue = 'Could not extract ASIN from URL';
    return result;
  }

  result.amazonASIN = asin;

  // Try to fetch and validate
  try {
    const html = await fetchPage(item.url);
    const title = extractProductTitle(html);
    const desc = extractProductDescription(html);

    if (!title) {
      result.status = 'error';
      result.issue = 'Could not extract product title from Amazon page';
      result.suggestion = 'Verify URL is correct and ASIN is valid';
      return result;
    }

    result.amazonTitle = title;

    // Check title similarity
    const titleSimilarity = calculateSimilarity(item.name, title);
    if (titleSimilarity < 0.3) {
      result.status = 'mismatch';
      result.issue = `Title mismatch. Our: "${item.name}" vs Amazon: "${title}"`;
      result.suggestion = `Consider updating our title to better match Amazon's product listing`;
      return result;
    }

    // Check description alignment
    if (desc) {
      const descSimilarity = calculateSimilarity(item.description, desc);
      if (descSimilarity < 0.2) {
        // Check if our description is specific/contextual (vs generic Amazon desc)
        if (item.description.length < 20) {
          result.status = 'valid'; // Short context descriptions are OK
        } else {
          result.status = 'mismatch';
          result.issue = `Description may not match product. Our desc emphasizes different aspects.`;
          result.suggestion = `Review if our description ("${item.description}") matches actual product ("${desc?.substring(0, 60)}...")`;
        }
      }
    }

    result.status = 'valid';
  } catch (error) {
    result.status = 'error';
    result.issue = `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    result.suggestion = 'Retry later or verify URL manually';
  }

  return result;
}

async function main() {
  console.log(`\n${colors.cyan}🔍 Validating Affiliate URLs${colors.reset}\n`);

  try {
    const affiliatesData = JSON.parse(fs.readFileSync(AFFILIATES_FILE, 'utf-8'));
    const items = Object.values(affiliatesData) as AffiliateItem[];

    console.log(`Found ${colors.cyan}${items.length}${colors.reset} affiliate items\n`);

    const results: ValidationResult[] = [];
    const stats = {
      valid: 0,
      invalid: 0,
      mismatched: 0,
      errors: 0,
      drafted: 0,
      placeholders: 0,
    };

    // Validate each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      process.stdout.write(
        `${colors.gray}[${i + 1}/${items.length}]${colors.reset} Checking ${colors.cyan}${item.id}${colors.reset}... `
      );

      const result = await validateAffiliateItem(item);
      results.push(result);

      stats[result.status as keyof typeof stats]++;

      switch (result.status) {
        case 'valid':
          console.log(`${colors.green}✓ Valid${colors.reset}`);
          break;
        case 'draft':
          console.log(`${colors.yellow}⊘ Draft${colors.reset}`);
          break;
        case 'placeholder':
          console.log(`${colors.yellow}⚠ Placeholder${colors.reset}`);
          break;
        case 'mismatch':
          console.log(`${colors.red}✗ Mismatch${colors.reset}`);
          break;
        case 'invalid':
          console.log(`${colors.red}✗ Invalid${colors.reset}`);
          break;
        case 'error':
          console.log(`${colors.red}✗ Error${colors.reset}`);
          break;
      }

      // Add small delay between requests to avoid rate limiting
      if (i < items.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    // Generate recommendations
    const recommendations: string[] = [];
    const _issues = results.filter((r) => r.status !== 'valid');

    if (stats.drafted > 0) {
      recommendations.push(
        `Remove ${stats.drafted} draft items from public product grids`
      );
    }

    if (stats.placeholders > 0) {
      recommendations.push(
        `Update ${stats.placeholders} placeholder URLs with real Amazon ASINs`
      );
    }

    const mismatches = results.filter((r) => r.status === 'mismatch');
    if (mismatches.length > 0) {
      recommendations.push(
        `Review ${mismatches.length} title/description mismatches:`
      );
      mismatches.forEach((m) => {
        recommendations.push(`  - ${m.id}: ${m.suggestion}`);
      });
    }

    const errors = results.filter((r) => r.status === 'error');
    if (errors.length > 0) {
      recommendations.push(
        `Investigate ${errors.length} items with fetch errors:`
      );
      errors.forEach((e) => {
        recommendations.push(`  - ${e.id}: ${e.issue}`);
      });
    }

    // Write report
    const report: ValidationReport = {
      generatedAt: new Date().toISOString(),
      totalItems: items.length,
      results: stats,
      items: results.sort((a, b) => {
        const priority = { error: 0, mismatch: 1, invalid: 2, placeholder: 3, draft: 4, valid: 5 };
        return priority[a.status as keyof typeof priority] - priority[b.status as keyof typeof priority];
      }),
      recommendations,
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));

    // Print summary
    console.log(`\n${colors.cyan}📊 Validation Summary${colors.reset}`);
    console.log(`${'─'.repeat(50)}`);
    console.log(`${colors.green}✓ Valid${colors.reset}:        ${stats.valid}/${items.length}`);
    console.log(`${colors.yellow}⊘ Draft${colors.reset}:        ${stats.drafted}`);
    console.log(`${colors.yellow}⚠ Placeholder${colors.reset}:  ${stats.placeholders}`);
    console.log(`${colors.red}✗ Mismatch${colors.reset}:      ${stats.mismatched}`);
    console.log(`${colors.red}✗ Invalid${colors.reset}:       ${stats.invalid}`);
    console.log(`${colors.red}✗ Error${colors.reset}:         ${stats.errors}`);
    console.log(`${'─'.repeat(50)}\n`);

    if (recommendations.length > 0) {
      console.log(`${colors.cyan}💡 Recommendations:${colors.reset}\n`);
      recommendations.forEach((rec) => {
        console.log(`  ${rec}`);
      });
      console.log();
    }

    console.log(
      `${colors.gray}📄 Full report saved to: ${OUTPUT_FILE}${colors.reset}\n`
    );

    process.exit(recommendations.length > 0 ? 1 : 0);
  } catch (error) {
    console.error(
      `${colors.red}Error: ${error instanceof Error ? error.message : 'Unknown error'}${colors.reset}`
    );
    process.exit(1);
  }
}

main();
