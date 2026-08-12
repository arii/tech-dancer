// tests/unit/workflow-validation.test.ts
import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'yaml';

describe('Workflow Permissions and Secrets Inheritance', () => {
  it('should include permissions and secrets: inherit when calling remote reusable workflows', () => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
    const content = fs.readFileSync(workflowPath, 'utf-8');
    const parsed = yaml.parse(content);

    const callJob = parsed.jobs['run-boomtick-ci'];
    expect(callJob).toBeDefined();
    expect(callJob.uses).toContain('arii/boomtick/.github/workflows/ci.yml');
    expect(callJob.secrets).toBe('inherit');
    expect(callJob.permissions.issues).toBe('write');
  });
});
