import { describe, it, expect } from 'vitest';
import { reconcileVerdict } from '../../../scripts/lib/codeReviewOrchestrator';

import { IMPACT_CONFIG } from '../../../scripts/impact-analysis.config';
import { filterLowImpactFiles } from '../../../scripts/lib/codeReviewUtils';

describe('filtering logic', () => {
  function filterFiles(files: string[]) {
    return filterLowImpactFiles(files, IMPACT_CONFIG.LOW_IMPACT_PATHS);
  }

  it('filters out exact file matches', () => {
    const files = ['pnpm-lock.yaml', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });

  it('filters out directory prefix matches', () => {
    const files = ['dist/index.js', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });

  it('filters out files in nested directories', () => {
    const files = ['dist/subdir/index.js', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });

  it('does not filter out partial name matches that are not directory matches', () => {
    const files = ['distribute.ts', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['distribute.ts', 'src/App.tsx']);
  });

  it('filters out files with directory name matches inside other directories', () => {
    const files = ['src/dist/index.js', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });

  it('handles empty or malformed low impact paths gracefully', () => {
    const files = ['dist/index.js', 'src/App.tsx'];
    expect(filterLowImpactFiles(files, [])).toEqual(files);

    // Test validation
    expect(() => filterLowImpactFiles(files, null as unknown as string[])).toThrow(TypeError);
    expect(() => filterLowImpactFiles(undefined as unknown as string[], [])).toThrow(TypeError);
  });

  it('does not filter out exact file matches with suffixes', () => {
    const files = ['pnpm-lock.yaml.bak', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['pnpm-lock.yaml.bak', 'src/App.tsx']);
  });

  it('filters out nested directory prefix matches', () => {
    const files = ['packages/web/dist/index.js', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });

  it('filters out nested file matches', () => {
    const files = ['packages/web/pnpm-lock.yaml', 'src/App.tsx'];
    const filtered = filterFiles(files);
    expect(filtered).toEqual(['src/App.tsx']);
  });
});

describe('reconcileVerdict', () => {
  it('downgrades fail to warn if no parseable findings', () => {
    const result = reconcileVerdict({ feedback: '', llmVerdict: 'fail', tokens: 0, cost: 0 }, '');
    expect(result.llmVerdict).toBe('warn');
  });

  it('verifies valid full line snippets', () => {
    const diff = `+ const a = 1;
- const b = 2;`;
    const result = reconcileVerdict(
      {
        feedback: '', llmVerdict: 'fail', tokens: 0, cost: 0,
        state: {
          findings: [
            { id: '1', file: 'f', issue: 'test', snippet: 'const a = 1;', status: 'open' }
          ]
        }
      },
      diff
    );
    expect(result.state?.findings[0].issue).toBe('test');
    expect(result.state?.findings[0].status).toBe('open');
  });

  it('invalidates hallucinated snippets', () => {
    const diff = `+ const a = 1;`;
    const result = reconcileVerdict(
      {
        feedback: '', llmVerdict: 'fail', tokens: 0, cost: 0,
        state: {
          findings: [
            { id: '1', file: 'f', issue: 'test', snippet: 'const b = 2;', status: 'open' }
          ]
        }
      },
      diff
    );
    expect(result.state?.findings[0].issue).toContain('[UNVERIFIED]');
    expect(result.state?.findings[0].status).toBe('resolved');
    expect(result.llmVerdict).toBe('warn');
  });

  it('invalidates partial matching syntax error claims (truncation)', () => {
    const diff = `+ const a = {`; // Diff line
    const result = reconcileVerdict(
      {
        feedback: '', llmVerdict: 'fail', tokens: 0, cost: 0,
        state: {
          findings: [
            { id: '1', file: 'f', issue: 'syntax error', snippet: 'const a =', status: 'open' }
          ]
        }
      },
      diff
    );
    expect(result.state?.findings[0].issue).toContain('[SUSPECTED TRUNCATION]');
    expect(result.state?.findings[0].status).toBe('resolved');
    expect(result.llmVerdict).toBe('warn');
  });

  it('invalidates partial matching missing property claims (truncation)', () => {
    const diff = `+ const obj = {`; // Diff line
    const result = reconcileVerdict(
      {
        feedback: '', llmVerdict: 'fail', tokens: 0, cost: 0,
        state: {
          findings: [
            { id: '1', file: 'f', issue: 'missing property', snippet: 'const obj =', status: 'open' }
          ]
        }
      },
      diff
    );
    expect(result.state?.findings[0].issue).toContain('[SUSPECTED TRUNCATION]');
    expect(result.state?.findings[0].status).toBe('resolved');
    expect(result.llmVerdict).toBe('warn');
  });
});
