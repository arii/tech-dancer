import { test, expect } from 'vitest';
import { DomRouteSummarySchema } from '../impact-review-utils';

test('Pipeline telemetry payload complies exactly with the token schema contract', async () => {
  const samplePipelineOutput = {
    route: '/research',
    slug: 'research',
    beforeHtmlPath: 'artifacts/dom-review/research/before.html',
    afterHtmlPath: 'artifacts/dom-review/research/after.html',
    diffPath: 'artifacts/dom-review/research/diff.txt',
    severity: 'LOW',
    metrics: {
      nodes: [0, 0],
      images: [0, 0],
      links: [0, 0]
    }
  };

  const parseResult = DomRouteSummarySchema.safeParse(samplePipelineOutput);
  expect(parseResult.success).toBe(true);
});
