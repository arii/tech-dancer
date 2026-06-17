import { orchestrateVisualReview } from './lib/visualReviewOrchestrator';
import { ollamaVisualReviewClient } from './clients/ollamaVisualReviewClient';

async function main(): Promise<void> {
  // Assuming Ollama is running locally, no API key required
  await orchestrateVisualReview(ollamaVisualReviewClient);
}

main().catch(error => {
  console.error(`❌ Agent review failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
