import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

interface WorkflowJob {
  name?: string;
  needs?: string | string[];
  if?: string;
  outputs?: Record<string, string>;
  steps?: Array<{
    id?: string;
    run?: string;
  }>;
}

interface WorkflowConfig {
  on?: {
    pull_request?: {
      branches?: string[];
      paths?: string[];
    };
  };
  jobs?: Record<string, WorkflowJob>;
}

describe('CI Workflow Gate and Required Status Checks', () => {
  const ciWorkflowPath = path.resolve('.github/workflows/ci.yml');

  it('should exist and parse as valid YAML', () => {
    expect(fs.existsSync(ciWorkflowPath)).toBe(true);
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;
    expect(parsed).toBeDefined();
    expect(parsed.jobs).toBeDefined();
  });

  it('should not restrict pull_request triggers with a paths filter', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    const pullRequestTrigger = parsed.on?.pull_request;
    expect(pullRequestTrigger).toBeDefined();
    // Paths filter must be absent so content-only PRs trigger the workflow
    expect(pullRequestTrigger?.paths).toBeUndefined();
  });

  it('should have a verify-changes gate job with has_code_changes output', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    const gateJob = parsed.jobs?.['verify-changes'];
    expect(gateJob).toBeDefined();
    expect(gateJob?.outputs?.has_code_changes).toBeDefined();
  });

  it('keeps lint and build fail-closed unless the classifier explicitly proves prose-only changes', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    for (const [jobKey, name] of [
      ['lint-typecheck', 'Lint & Type Check'],
      ['test-build', 'Build & E2E'],
    ] as const) {
      const job = parsed.jobs?.[jobKey];
      expect(job).toBeDefined();
      expect(job?.name).toBe(name);
      const needs = Array.isArray(job?.needs) ? job.needs : [job?.needs];
      expect(needs).toContain('verify-changes');
      expect(job?.if).toContain('always()');
      expect(job?.if).toContain("needs.verify-changes.outputs.has_code_changes != 'false'");
    }
  });

  it('keeps audit, security and workflow validation independent of the prose-only gate', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    expect(parsed.jobs?.audit?.name).toBe('Anti-Pattern Audit');
    for (const jobKey of ['audit', 'security-scan', 'validate-workflows']) {
      const job = parsed.jobs?.[jobKey];
      expect(job).toBeDefined();
      expect(job?.needs).toBeUndefined();
      expect(job?.if).toBeUndefined();
    }
  });
});
