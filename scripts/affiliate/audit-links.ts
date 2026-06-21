import fs from 'fs';
import { globSync } from 'glob';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

interface LinkIssue {
  url: string;
  source: string;
  reason: string;
  status?: number;
  isWarning?: boolean;
}

async function main() {
  console.log('Starting Amazon Link Audit...');
  const issues: LinkIssue[] = [];
  const linksToVerify: { url: string; source: string }[] = [];

  // 1. Extract from affiliates.json
  const affiliatesPath = 'src/data/affiliates.json';
  if (fs.existsSync(affiliatesPath)) {
    const affiliates = JSON.parse(fs.readFileSync(affiliatesPath, 'utf-8'));
    Object.entries(affiliates).forEach(([id, item]: [string, any]) => {
      if (item.url && (item.url.includes('amazon.com') || item.url.includes('a.co'))) {
        linksToVerify.push({ url: item.url, source: `affiliates.json [${id}]` });
      }
    });
  }

  // 2. Extract from markdown files
  const mdFiles = globSync('content/**/*.md');
  const amazonUrlRegex = /https?:\/\/(www\.)?(amazon\.com|a\.co)\/[^\s)]+/g;

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    let match;
    while ((match = amazonUrlRegex.exec(content)) !== null) {
      linksToVerify.push({ url: match[0], source: file });
    }
  });

  console.log(`Extracted ${linksToVerify.length} Amazon links to verify.`);

  // Deduplicate links
  const uniqueLinks = Array.from(new Map(linksToVerify.map(item => [item.url, item])).values());
  console.log(`Verifying ${uniqueLinks.length} unique Amazon links...`);

  // 3. Verify links
  for (const item of uniqueLinks) {
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          issues.push({
            url: item.url,
            source: item.source,
            reason: 'HTTP Status Error',
            status: response.status
          });
          break; // Stop retrying on non-retryable error
        }

        // Final URL after redirects
        const finalUrl = response.url;
        if (item.url.includes('a.co') && !finalUrl.includes('amazon.com')) {
          issues.push({
            url: item.url,
            source: item.source,
            reason: `Redirected to non-Amazon URL: ${finalUrl}`,
            isWarning: true
          });
        }

        const body = await response.text();
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
          await new Promise(resolve => setTimeout(resolve, 2000));
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

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

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

    // Exit with error only if there are actual errors (not just warnings)
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
