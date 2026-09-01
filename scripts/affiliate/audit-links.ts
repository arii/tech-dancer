import fs from 'node:fs';
import { globSync } from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Link, Image, Definition, Html } from 'mdast';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const CONCURRENCY = 5;

interface LinkIssue {
  url: string;
  source: string;
  reason: string;
  status?: number;
  isWarning?: boolean;
}

interface AffiliateData {
  url?: string;
}

interface LinkItem {
  url: string;
  source: string;
}

async function verifyLink(item: LinkItem, issues: LinkIssue[]) {
  console.log(`Checking: ${item.url} (from ${item.source})`);
  let retries = 2;
  let success = false;

  while (retries >= 0 && !success) {
    try {
      const response = await fetch(item.url, {
        method: 'GET',
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'follow',
      });

      if (!response.ok) {
        if (response.status >= 500 && retries > 0) {
          console.warn(`  [RETRY] Received ${response.status} for ${item.url}. Retrying...`);
          retries--;
          await new Promise(resolve => setTimeout(resolve, 3000));
          continue;
        }
        issues.push({
          url: item.url,
          source: item.source,
          reason: 'HTTP Status Error',
          status: response.status
        });
        break;
      }

      const body = await response.text();

      // Check for Amazon's bot detection / CAPTCHA pages
      if (body.includes('Robot Check') || body.includes('automated access') || body.includes('CAPTCHA')) {
        if (retries > 0) {
          console.warn(`  [RETRY] Bot detection triggered for ${item.url}. Retrying...`);
          retries--;
          await new Promise(resolve => setTimeout(resolve, 5000));
          continue;
        }
        issues.push({
          url: item.url,
          source: item.source,
          reason: 'Amazon Bot Detection (CAPTCHA) triggered',
          isWarning: true
        });
        break;
      }

      // Final URL after redirects validation
      const finalUrl = new URL(response.url);
      const finalHostname = finalUrl.hostname.toLowerCase();
      const isAmazon = finalHostname === 'amazon.com' || finalHostname.endsWith('.amazon.com');

      try {
        const originalUrl = new URL(item.url);
        const originalHostname = originalUrl.hostname.toLowerCase();
        const isShortLink = originalHostname === 'a.co' || originalHostname.endsWith('.a.co');

        if (isShortLink && !isAmazon) {
          issues.push({
            url: item.url,
            source: item.source,
            reason: `Redirected to non-Amazon URL: ${response.url}`,
            isWarning: true
          });
        }
      } catch {
        // Original URL was already verified to be valid
      }

      // Check for specific Amazon "Page Not Found" indicators
      if (body.includes('Page Not Found') || body.includes('sorry.png') || body.includes('api-services-404')) {
        issues.push({
          url: item.url,
          source: item.source,
          reason: 'Amazon Page Not Found (404 in content)',
          status: 404
        });
      } else if (body.includes('Currently unavailable')) {
        issues.push({
          url: item.url,
          source: item.source,
          reason: 'Product currently unavailable',
          isWarning: true
        });
      }

      success = true;
    } catch (err) {
      if (retries > 0) {
        console.warn(`  [RETRY] Fetch error for ${item.url}: ${err instanceof Error ? err.message : String(err)}. Retrying...`);
        retries--;
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      issues.push({
        url: item.url,
        source: item.source,
        reason: `Fetch error: ${err instanceof Error ? err.message : String(err)}`
      });
      break;
    }
  }

  // Adaptive delay after each request to respect rate limits
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
}

async function main() {
  console.log('Starting Amazon Link Audit...');
  const issues: LinkIssue[] = [];
  const linksToVerify: LinkItem[] = [];

  // 1. Extract from affiliates.json
  const affiliatesPath = 'src/data/affiliates.json';
  if (fs.existsSync(affiliatesPath)) {
    try {
      const affiliates = JSON.parse(fs.readFileSync(affiliatesPath, 'utf-8')) as Record<string, AffiliateData>;
      Object.entries(affiliates).forEach(([id, item]) => {
        if (item.url) {
          try {
            const url = new URL(item.url);
            const hostname = url.hostname.toLowerCase();
            if (hostname === 'amazon.com' || hostname.endsWith('.amazon.com') || hostname === 'a.co' || hostname.endsWith('.a.co')) {
              linksToVerify.push({ url: item.url, source: `affiliates.json [${id}]` });
            }
          } catch {
            // Skip invalid URLs
          }
        }
      });
    } catch (err) {
      console.error(`Error parsing ${affiliatesPath}:`, err);
      issues.push({ url: affiliatesPath, source: 'system', reason: `Failed to parse JSON: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  // 2. Extract from markdown files using AST traversal
  const mdFiles = globSync('content/**/*.md');
  const processor = unified().use(remarkParse);

  for (const file of mdFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const tree = processor.parse(content);

      visit(tree, (node) => {
        let urlStr = '';
        if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
          urlStr = (node as Link | Image | Definition).url;
        } else if (node.type === 'html') {
          const { value } = node as Html;
          const amazonUrlRegex = /https?:\/\/(www\.)?(amazon\.com|a\.co)\/[^\s"'>]+/g;
          let match;
          while ((match = amazonUrlRegex.exec(value)) !== null) {
            linksToVerify.push({ url: match[0], source: file });
          }
          return;
        }

        if (urlStr) {
          try {
            const url = new URL(urlStr);
            const hostname = url.hostname.toLowerCase();
            if (hostname === 'amazon.com' || hostname.endsWith('.amazon.com') || hostname === 'a.co' || hostname.endsWith('.a.co')) {
              linksToVerify.push({ url: urlStr, source: file });
            }
          } catch {
            // Skip relative or invalid URLs
          }
        }
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(`Extracted ${linksToVerify.length} Amazon links to verify.`);

  // Deduplicate links
  const uniqueLinks = Array.from(new Map(linksToVerify.map(item => [item.url, item])).values());
  console.log(`Verifying ${uniqueLinks.length} unique Amazon links with concurrency ${CONCURRENCY}...`);

  // 3. Verify links with concurrency
  let currentIndex = 0;
  const workers = Array.from({ length: CONCURRENCY }).map(async () => {
    while (currentIndex < uniqueLinks.length) {
      const item = uniqueLinks[currentIndex++];
      if (item) {
        await verifyLink(item, issues);
      }
    }
  });

  await Promise.all(workers);

  if (issues.length > 0) {
    const reportPath = 'amazon-link-audit-report.md';
    let report = '# Amazon Link Audit Report\n\n';
    report += `Found ${issues.length} issues:\n\n`;

    console.error(`\nFound ${issues.length} issues:`);
    issues.forEach(issue => {
      const prefix = issue.isWarning ? '[WARN]' : '[ERROR]';
      const msg = `${prefix} ${issue.url} in ${issue.source}: ${issue.reason} ${issue.status ? `(Status: ${issue.status})` : ''}`;
      console.error(msg);
      report += `- ${msg}\n`;
    });

    fs.writeFileSync(reportPath, report);
    console.log(`\nDetailed report written to ${reportPath}`);

    const errorCount = issues.filter(i => !i.isWarning).length;
    if (errorCount > 0) {
      process.exit(1);
    }
  } else {
    console.log('\nNo issues found! All Amazon links are valid.');
  }
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
