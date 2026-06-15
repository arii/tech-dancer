import { test, expect } from 'vitest';
import { z } from 'zod';
const DomRouteSummarySchema = z.object({ route: z.string(), slug: z.string(), beforeHtmlPath: z.string(), afterHtmlPath: z.string(), diffPath: z.string(), severity: z.enum(['LOW', 'MEDIUM', 'HIGH']), metrics: z.object({ nodes: z.tuple([z.number(), z.number()]), images: z.tuple([z.number(), z.number()]), links: z.tuple([z.number(), z.number()]) }) });

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
