import fs from 'fs';
import { VISUAL_SUMMARY_PATH, type VisualRouteSummary } from './impact-review-utils';

/**
 * Checks the visual summary for routes with a difference percent greater than 1.5.
 * Outputs the count of such routes in GitHub Actions output format.
 */
function main() {
  let count = 0;

  if (fs.existsSync(VISUAL_SUMMARY_PATH)) {
    try {
      const summary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8')) as {
        routes: VisualRouteSummary[];
      };
      count = summary.routes.filter((route) => route.differencePercent > 1.5).length;
    } catch (error) {
      console.error(`Error reading or parsing visual summary: ${error instanceof Error ? error.message : String(error)}`);
      // Default to 0 on error to avoid breaking CI, or could exit 1 if preferred.
      count = 0;
    }
  }

  process.stdout.write(`changed_routes=${count}\n`);
}

main();
