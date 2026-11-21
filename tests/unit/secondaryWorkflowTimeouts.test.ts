import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import YAML from 'yaml';

describe('secondary deployment and release job timeouts', () => {
  it.each([
    ['deploy-image.yml', 'push-to-registry', 60],
    ['release-please.yml', 'release-please', 30],
    ['reusable-gate.yml', 'verify-changes', 10],
  ] as const)('bounds %s runner job %s at %i minutes', (file, job, minutes) => {
    const workflow = YAML.parse(readFileSync(`.github/workflows/${file}`, 'utf8'));
    expect(workflow.jobs[job]['runs-on']).toBe('ubuntu-latest');
    expect(workflow.jobs[job]['timeout-minutes']).toBe(minutes);
  });

  it('keeps the reusable gate timeout on the runner, not the caller', () => {
    const workflow = YAML.parse(readFileSync('.github/workflows/deploy.yml', 'utf8'));
    expect(workflow.jobs['verify-changes'].uses).toBe('./.github/workflows/reusable-gate.yml');
    expect(workflow.jobs['verify-changes']['timeout-minutes']).toBeUndefined();
  });
});
