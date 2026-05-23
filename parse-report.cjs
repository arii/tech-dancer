const fs = require('fs');

const content = fs.readFileSync('playwright-report/index.html', 'utf-8');
const base64Match = content.match(/window\.playwrightReportBase64 = "([^"]+)"/);

if (base64Match) {
  const base64Data = base64Match[1];
  const buffer = Buffer.from(base64Data.replace(/^data:application\/zip;base64,/, ''), 'base64');
  fs.writeFileSync('report.zip', buffer);
  console.log('Report saved as report.zip');
} else {
  console.log('Base64 report not found.');
}
