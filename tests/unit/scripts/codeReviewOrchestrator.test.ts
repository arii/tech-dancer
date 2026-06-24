import { describe, it, expect } from 'vitest';
import { reconcileVerdict } from '../../../scripts/lib/codeReviewOrchestrator';

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
