import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

describe('CI Workflow Validation', () => {
  const ciWorkflowPath = path.resolve('.github/workflows/ci.yml');

  it('should declare run-boomtick-ci calling arii/boomtick/.github/workflows/ci.yml@main with secrets: inherit and issues: write permission', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content);

    expect(parsed?.jobs, 'ci.yml must contain jobs').toBeDefined();
    expect(parsed.jobs['run-boomtick-ci'], 'ci.yml must declare run-boomtick-ci job').toBeDefined();

    const runBoomtickCiJob = parsed.jobs['run-boomtick-ci'];

    expect(runBoomtickCiJob.uses).toBe('arii/boomtick/.github/workflows/ci.yml@main');
    expect(runBoomtickCiJob.secrets).toBe('inherit');
    expect(runBoomtickCiJob.permissions).toBeDefined();
    expect(runBoomtickCiJob.permissions.issues).toBe('write');
  });
});
