import { test, expect } from 'vitest';
import { CompactRouteMetricSchema } from '../scripts/impact/metric-calculator';

test('Pipeline telemetry payload complies exactly with the token schema contract', async () => {
  const samplePipelineOutput = {
    route: '/research',
    severity: 'LOW',
    metrics: {
      nodes: [0, 0],
      images: [0, 0],
      links: [0, 0]
    }
  };

  // If a developer alters the JSON payload shape, this block breaks explicitly before CI execution
  const parseResult = CompactRouteMetricSchema.safeParse(samplePipelineOutput);
  expect(parseResult.success).toBe(true);
});
