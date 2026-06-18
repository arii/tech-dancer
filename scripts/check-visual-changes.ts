import fs from 'node:fs';
import { VISUAL_SUMMARY_PATH, type VisualSummary } from './impact-review-utils';

function getSignificantVisualChangeCount(): number {
  try {
    const summary: VisualSummary = JSON.parse(fs.readFileSync(VISUAL_SUMMARY_PATH, 'utf-8'));
    return summary.routes.filter(r => r.differencePercent > 1.5).length;
  } catch {
    return 0;
  }
}

process.stdout.write(`changed_routes=${getSignificantVisualChangeCount()}\n`);
