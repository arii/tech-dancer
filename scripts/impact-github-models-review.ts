import * as fs from 'fs';
import * as path from 'path';
import { ARTIFACTS_DIR } from './lib/visualReviewConstants';
import { orchestrateVisualReview } from './lib/visualReviewOrchestrator';
import { githubModelsVisualReviewClient } from './clients/githubModelsVisualReviewClient';

async function main(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  Skipping agent review — GITHUB_TOKEN not set.');
    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, githubModelsVisualReviewClient.reportFileName),
      `## ${githubModelsVisualReviewClient.reportTitle}\n\nSkipped: No GITHUB_TOKEN provided.\n`
    );
    return;
  }

  await orchestrateVisualReview(githubModelsVisualReviewClient);
}

main().catch(error => {
  console.error(`❌ Agent review failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
