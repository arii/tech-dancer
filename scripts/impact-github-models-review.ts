import { orchestrateVisualReview } from './lib/visualReviewOrchestrator';
import { githubModelsVisualReviewClient } from './clients/githubModelsVisualReviewClient';

async function main(): Promise<void> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  Skipping agent review — GITHUB_TOKEN not set.');
    const fs = await import('fs');
    const path = await import('path');
    const { ARTIFACTS_DIR } = await import('./lib/visualReviewConstants');

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
