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

  it('should require verify-changes and check has_code_changes on Build & E2E and Anti-Pattern Audit', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    const auditJob = parsed.jobs?.audit;
    const testBuildJob = parsed.jobs?.['test-build'];

    expect(auditJob).toBeDefined();
    expect(auditJob?.name).toBe('Anti-Pattern Audit');
    const auditNeeds = Array.isArray(auditJob?.needs) ? auditJob?.needs : [auditJob?.needs];
    expect(auditNeeds).toContain('verify-changes');
    expect(auditJob?.if).toContain('has_code_changes');

    expect(testBuildJob).toBeDefined();
    expect(testBuildJob?.name).toBe('Build & E2E');
    const testBuildNeeds = Array.isArray(testBuildJob?.needs) ? testBuildJob?.needs : [testBuildJob?.needs];
    expect(testBuildNeeds).toContain('verify-changes');
    expect(testBuildJob?.if).toContain('has_code_changes');
  });

  it('should gate lint-typecheck, security-scan, and validate-workflows on code changes', () => {
    const content = fs.readFileSync(ciWorkflowPath, 'utf8');
    const parsed = yaml.parse(content) as WorkflowConfig;

    for (const jobKey of ['lint-typecheck', 'security-scan', 'validate-workflows']) {
      const job = parsed.jobs?.[jobKey];
      expect(job).toBeDefined();
      const needs = Array.isArray(job?.needs) ? job?.needs : [job?.needs];
      expect(needs).toContain('verify-changes');
      expect(job?.if).toContain('has_code_changes');
    }
  });
});
