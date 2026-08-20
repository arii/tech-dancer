import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

describe('Impact Analysis Action Configuration', () => {
  const actionPath = path.resolve('mcp/actions/impact-analysis/action.yml');

  it('should exist and be readable', () => {
    expect(fs.existsSync(actionPath)).toBe(true);
  });

  it('should not contain deprecated github-models in EXPECTED_REVIEWS or action steps', () => {
    const content = fs.readFileSync(actionPath, 'utf8');

    // Ensure github-models is not referenced anywhere in impact-analysis/action.yml
    expect(content).not.toContain('github-models');
    expect(content).not.toContain('github-models-code-review');

    // Parse YAML to inspect steps
    const parsed = yaml.parse(content);
    expect(parsed?.runs?.steps).toBeDefined();

    const steps = parsed.runs.steps as Array<{ name?: string; run?: string }>;
    for (const step of steps) {
      if (step.name) {
        expect(step.name.toLowerCase()).not.toContain('github models');
        expect(step.name.toLowerCase()).not.toContain('github-models');
      }
      if (step.run) {
        expect(step.run).not.toContain('github-models');
      }
    }
  });
});
