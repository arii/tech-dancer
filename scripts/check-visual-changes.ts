import fs from 'fs';
import { VISUAL_SUMMARY_PATH, type VisualRouteSummary } from './impact-review-utils';

interface VisualSummary {
  routes: VisualRouteSummary[];
}

function getChangedRoutesCount(): number {
  if (!fs.existsSync(VISUAL_SUMMARY_PATH)) {
    return 0;
  }

  try {
    const summary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf8')) as VisualSummary;
    return summary.routes.filter((route) => route.differencePercent > 1.5).length;
  } catch (error) {
    console.error(`Failed to process visual summary: ${error instanceof Error ? error.message : String(error)}`);
    return 0;
  }
}

process.stdout.write(`changed_routes=${getChangedRoutesCount()}\n`);
