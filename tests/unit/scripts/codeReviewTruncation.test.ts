import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCodeDiffSummary } from '../../../scripts/lib/codeReviewOrchestrator';
import { promisify } from 'util';
import * as child_process from 'child_process';

const mockExecFile = vi.fn();
const mockSpawn = vi.fn();

vi.mock('child_process', () => ({
  default: {
    execFile: (...args: any[]) => mockExecFile(...args),
    spawn: (...args: any[]) => mockSpawn(...args),
  },
  execFile: (...args: any[]) => mockExecFile(...args),
  spawn: (...args: any[]) => mockSpawn(...args),
}));

vi.mock('util', () => ({
  default: {
    promisify: (fn: any) => fn
  },
  promisify: (fn: any) => fn
}));

describe('getCodeDiffSummary truncation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GITHUB_BASE_REF = 'main';
  });

  it('truncates large diffs and appends stat summary', async () => {
    const largeDiff = 'a'.repeat(50000);
    const mockStat = ' file1.ts | 1 +';

    mockExecFile.mockImplementation((cmd: string, args: string[]) => {
      if (args.includes('rev-parse')) {
        return Promise.resolve({ stdout: 'hash' });
      }
      if (args.includes('--stat')) {
        return Promise.resolve({ stdout: mockStat });
      }
      if (args.includes('-U10')) {
        return Promise.resolve({ stdout: largeDiff });
      }
      if (args.includes('--name-only')) {
        return Promise.resolve({ stdout: 'file1.ts' });
      }
      return Promise.resolve({ stdout: '' });
    });

    const summary = await getCodeDiffSummary();

    expect(summary.isTruncated).toBe(true);
    expect(summary.diffContext.length).toBeLessThan(largeDiff.length);
    expect(summary.diffContext).toContain('...[TRUNCATED FOR LLM]');
    expect(summary.diffContext).toContain('DIFF STAT SUMMARY:');
    expect(summary.diffContext).toContain(mockStat);
    expect(summary.fullDiff).toBe(largeDiff);
  });

  it('does not truncate small diffs', async () => {
    const smallDiff = 'small diff';

    mockExecFile.mockImplementation((cmd: string, args: string[]) => {
      if (args.includes('rev-parse')) {
        return Promise.resolve({ stdout: 'hash' });
      }
      if (args.includes('-U10')) {
        return Promise.resolve({ stdout: smallDiff });
      }
      if (args.includes('--name-only')) {
        return Promise.resolve({ stdout: 'file1.ts' });
      }
      return Promise.resolve({ stdout: '' });
    });

    const summary = await getCodeDiffSummary();

    expect(summary.isTruncated).toBe(false);
    expect(summary.diffContext).toBe(smallDiff);
    expect(summary.diffContext).not.toContain('...[TRUNCATED FOR LLM]');
  });
});
