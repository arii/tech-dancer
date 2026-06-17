import { orchestrateVisualReview } from './lib/visualReviewOrchestrator';
import { geminiVisualReviewClient } from './clients/geminiVisualReviewClient';

async function main(): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  Skipping agent review — GEMINI_API_KEY not set.');
    // The orchestrator handles missing visual summary gracefully,
    // but if the API key is strictly missing we should probably just exit or stub a file
    // to match original behavior.
    const fs = await import('fs');
    const path = await import('path');
    const { ARTIFACTS_DIR } = await import('./lib/visualReviewConstants');

    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, geminiVisualReviewClient.reportFileName),
      `## ${geminiVisualReviewClient.reportTitle}\n\nSkipped: No GEMINI_API_KEY provided.\n`
    );
    return;
  }

  await orchestrateVisualReview(geminiVisualReviewClient);
}

main().catch(error => {
  console.error(`❌ Agent review failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
