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

function inspectAmazonResponseBody(body: string, item: LinkItem): LinkIssue | null {
  if (body.includes('Robot Check') || body.includes('automated access') || body.includes('CAPTCHA')) {
    return {
      url: item.url,
      source: item.source,
      reason: 'Amazon Bot Detection (CAPTCHA) triggered',
      isWarning: true
    };
  }

  if (body.includes('Page Not Found') || body.includes('sorry.png') || body.includes('api-services-404')) {
    return {
      url: item.url,
      source: item.source,
      reason: 'Amazon Page Not Found (404 in content)',
      status: 404
    };
  }

  if (body.includes('Currently unavailable')) {
    return {
      url: item.url,
      source: item.source,
      reason: 'Product currently unavailable',
      isWarning: true
    };
  }

  return null;
}

function checkRedirectDomain(responseUrl: string, item: LinkItem): LinkIssue | null {
  try {
    const finalUrl = new URL(responseUrl);
    const finalHostname = finalUrl.hostname.toLowerCase();
    const isAmazon = finalHostname === 'amazon.com' || finalHostname.endsWith('.amazon.com');

    const originalUrl = new URL(item.url);
    const originalHostname = originalUrl.hostname.toLowerCase();
    const isShortLink = originalHostname === 'a.co' || originalHostname.endsWith('.a.co');

    if (isShortLink && !isAmazon) {
      return {
        url: item.url,
        source: item.source,
        reason: `Redirected to non-Amazon URL: ${responseUrl}`,
        isWarning: true
      };
    }
  } catch {
    // URL parsing errors handled elsewhere
  }
  return null;
}

async function attemptFetchLink(item: LinkItem): Promise<{ issue: LinkIssue | null; shouldRetry: boolean }> {
  try {
    const response = await fetch(item.url, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });

    if (!response.ok) {
      const issue: LinkIssue = {
        url: item.url,
        source: item.source,
        reason: 'HTTP Status Error',
        status: response.status
      };
      return {
        issue,
        shouldRetry: response.status >= 500
      };
    }

    const body = await response.text();
    const contentIssue = inspectAmazonResponseBody(body, item);
    if (contentIssue) {
      if (contentIssue.reason.includes('CAPTCHA')) {
        return { issue: contentIssue, shouldRetry: true };
      }
      return { issue: contentIssue, shouldRetry: false };
    }

    const redirectIssue = checkRedirectDomain(response.url, item);
    if (redirectIssue) {
      return { issue: redirectIssue, shouldRetry: false };
    }

    return { issue: null, shouldRetry: false };
  } catch (err) {
    return {
      issue: {
        url: item.url,
        source: item.source,
        reason: `Fetch error: ${err instanceof Error ? err.message : String(err)}`
      },
      shouldRetry: true
    };
  }
}

async function verifyLink(item: LinkItem, issues: LinkIssue[]) {
  console.log(`Checking: ${item.url} (from ${item.source})`);
  let retries = 2;

  while (retries >= 0) {
    const result = await attemptFetchLink(item);
    if (result.issue) {
      if (result.shouldRetry && retries > 0) {
        console.warn(`  [RETRY] Warning/Error for ${item.url}. Retrying...`);
        retries--;
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      issues.push(result.issue);
      break;
    }

    if (result.shouldRetry && retries > 0) {
      console.warn(`  [RETRY] Attempt failed for ${item.url}. Retrying...`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 3000));
      continue;
    }

    break;
  }

  // Adaptive delay after each request to respect rate limits
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
}

function extractLinksFromAffiliatesJson(issues: LinkIssue[]): LinkItem[] {
  const links: LinkItem[] = [];
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
              links.push({ url: item.url, source: `affiliates.json [${id}]` });
            }
          } catch {
            // Skip invalid URLs
          }
        }
      });
    } catch (err) {
      console.error(`Error parsing ${affiliatesPath}:`, err);
      issues.push({
        url: affiliatesPath,
        source: 'system',
        reason: `Failed to parse JSON: ${err instanceof Error ? err.message : String(err)}`
      });
    }
  }
  return links;
}

function extractLinksFromMarkdownFiles(): LinkItem[] {
  const links: LinkItem[] = [];
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
            links.push({ url: match[0], source: file });
          }
          return;
        }

        if (urlStr) {
          try {
            const url = new URL(urlStr);
            const hostname = url.hostname.toLowerCase();
            if (hostname === 'amazon.com' || hostname.endsWith('.amazon.com') || hostname === 'a.co' || hostname.endsWith('.a.co')) {
              links.push({ url: urlStr, source: file });
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
  return links;
}

async function main() {
  console.log('Starting Amazon Link Audit...');
  const issues: LinkIssue[] = [];

  const jsonLinks = extractLinksFromAffiliatesJson(issues);
  const mdLinks = extractLinksFromMarkdownFiles();
  const linksToVerify = [...jsonLinks, ...mdLinks];

  console.log(`Extracted ${linksToVerify.length} Amazon links to verify.`);

  // Deduplicate links
  const uniqueLinks = Array.from(new Map(linksToVerify.map(item => [item.url, item])).values());
  console.log(`Verifying ${uniqueLinks.length} unique Amazon links with concurrency ${CONCURRENCY}...`);

  // Verify links with concurrency
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
