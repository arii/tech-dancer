import { describe, it, expect } from 'vitest';
import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  parseCodeReviewState,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildSystemPrompt
} from '../../../scripts/lib/codeReviewUtils';

describe('codeReviewUtils', () => {
  describe('parseCodeReviewVerdict', () => {
    it('parses PASS', () => {
      expect(parseCodeReviewVerdict('[VERDICT: PASS]')).toBe('pass');
      expect(parseCodeReviewVerdict('Some text [VERDICT: pass]')).toBe('pass');
    });

    it('parses WARN', () => {
      expect(parseCodeReviewVerdict('[VERDICT: WARN]')).toBe('warn');
    });

    it('parses FAIL', () => {
      expect(parseCodeReviewVerdict('[VERDICT: FAIL]')).toBe('fail');
    });

    it('defaults to pass if no verdict is found', () => {
      expect(parseCodeReviewVerdict('No verdict here')).toBe('pass');
    });

    it('takes the last verdict if multiple are present', () => {
      expect(parseCodeReviewVerdict('[VERDICT: FAIL] then [VERDICT: PASS]')).toBe('pass');
    });
  });

  describe('parseCodeReviewStateDetailed', () => {
    it('parses valid findings JSON', () => {
      const feedback = `Some text\n<findings>\n{"findings": [{"id": "1", "file": "a.ts", "issue": "bug", "status": "open"}]}\n</findings>`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeDefined();
      expect(result.state?.findings).toHaveLength(1);
      expect(result.parseError).toBeUndefined();
    });

    it('returns missing_closing_tag error when truncated', () => {
      const feedback = `Some text\n<findings>\n{"findings": []}`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('missing_closing_tag');
    });

    it('returns invalid_json error when JSON is malformed', () => {
      const feedback = `Some text\n<findings>\nnot json\n</findings>`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('invalid_json');
    });
  });

  describe('parseCodeReviewState', () => {
    it('returns state directly', () => {
      const feedback = `<findings>{"findings": []}</findings>`;
      const result = parseCodeReviewState(feedback);
      expect(result?.findings).toEqual([]);
    });
  });

  describe('estimateMaxOutputTokens', () => {
    it('calculates tokens based on summary size', () => {
      const smallSummary = { diffContext: 'a' };
      expect(estimateMaxOutputTokens(smallSummary)).toBe(1500);

      const largeSummary = { diffContext: 'a'.repeat(20000) };
      expect(estimateMaxOutputTokens(largeSummary)).toBe(2500);

      const summaryWithFindings = { diffContext: 'a', previousState: { findings: [
        { id: '1', file: 'a.ts', issue: 'a', status: 'open' },
        { id: '2', file: 'a.ts', issue: 'a', status: 'open' }
      ] } as any };
      expect(estimateMaxOutputTokens(summaryWithFindings)).toBe(1900);
    });
  });

  describe('budgetInputContext', () => {
    it('does not truncate if under budget', () => {
      const result = budgetInputContext('diff', 'external', { systemPromptLength: 100, maxInputChars: 1000 });
      expect(result.diffText).toContain('diff');
      expect(result.externalText).toContain('external');
      expect(result.diffText).not.toContain('TRUNCATED');
      expect(result.externalText).not.toContain('TRUNCATED');
    });

    it('truncates diff and drops external context if budget is tight', () => {
      const result = budgetInputContext('a'.repeat(100), 'b'.repeat(100), { systemPromptLength: 10, maxInputChars: 30 });
      expect(result.diffText).toContain('TRUNCATED');
      // external text gets dropped because remaining budget is < 200
      expect(result.externalText).toBe('');
    });
  });

  describe('buildSystemPrompt', () => {
    it('includes goal and previous state', () => {
      const summary = {
        diffContext: 'a',
        prGoal: 'Fix bug',
        previousState: {
          findings: [
            { id: '1', file: 'a.ts', issue: 'bug', status: 'open', fixSummary: 'fixed' } as any
          ]
        }
      };
      const prompt = buildSystemPrompt(summary);
      expect(prompt).toContain('Fix bug');
      expect(prompt).toContain('PREVIOUS REVIEW ROUND FINDINGS');
      expect(prompt).toContain('- [1] a.ts: bug (Status: open)');
      expect(prompt).toContain('→ fixed');
    });
  });
});
