import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { VISUAL_SUMMARY_PATH } from './impact-review-utils';

/**
 * Validates the structure of the visual summary and counts routes with
 * a difference percent greater than the 1.5% threshold.
 */
async function getSignificantVisualChangeCount(): Promise<number> {
  if (!existsSync(VISUAL_SUMMARY_PATH)) {
    console.warn(`[check-visual-changes] Warning: Visual summary file not found at ${VISUAL_SUMMARY_PATH}. Defaulting to 0.`);
    return 0;
  }

  try {
    const content = await readFile(VISUAL_SUMMARY_PATH, 'utf-8');
    const summary = JSON.parse(content);

    if (!summary || typeof summary !== 'object' || !Array.isArray(summary.routes)) {
      console.error('[check-visual-changes] Error: Invalid visual summary format. Expected { routes: [...] }');
      return 0;
    }

    const threshold = 1.5;
    const significantChanges = summary.routes.filter((route: any) => {
      if (typeof route?.differencePercent !== 'number') {
        console.warn(`[check-visual-changes] Warning: Route entry missing numeric differencePercent: ${JSON.stringify(route)}`);
        return false;
      }
      return route.differencePercent > threshold;
    });

    return significantChanges.length;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[check-visual-changes] Error processing visual summary: ${message}`);
    return 0;
  }
}

async function main() {
  const count = await getSignificantVisualChangeCount();
  process.stdout.write(`changed_routes=${count}\n`);
}

main().catch((error) => {
  console.error(`[check-visual-changes] Fatal error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
