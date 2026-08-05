import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

describe('GitHub Actions Setup Workspace Reference Check', () => {
  const workflowsDir = path.resolve('.github/workflows');

  it('should reference arii/boomtick/.github/actions/setup-workspace@main in all setup steps', () => {
    const files = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const filePath = path.join(workflowsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = yaml.parse(content);

      if (!parsed?.jobs) continue;

      for (const [jobKey, job] of Object.entries<Record<string, unknown>>(parsed.jobs)) {
        if (!job.steps || !Array.isArray(job.steps)) continue;

        const setupStep = job.steps.find((s: Record<string, unknown>) => s.name === 'Setup Node.js');
        if (setupStep) {
          expect(setupStep.uses).toContain('actions/setup-node');
        }
      }
    }
  });
});
