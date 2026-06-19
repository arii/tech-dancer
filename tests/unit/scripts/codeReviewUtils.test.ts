import { describe, it, expect } from 'vitest';
import {
  buildSystemPrompt,
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  estimateMaxOutputTokens,
  budgetInputContext
} from '../../../scripts/lib/codeReviewUtils';
import type { CodeReviewSummary, ReviewFinding } from '../../../scripts/lib/codeReviewTypes';

describe('codeReviewUtils', () => {
  describe('buildSystemPrompt', () => {
    it('should include the PR goal if provided', () => {
      const summary: CodeReviewSummary = {
        diffContext: 'test diff',
        prGoal: 'Test PR Goal'
      };
      const prompt = buildSystemPrompt(summary);
      expect(prompt).toContain('This PR\'s stated goal:\n"Test PR Goal"');
    });

    it('should include previous findings if provided', () => {
      const summary: CodeReviewSummary = {
        diffContext: 'test diff',
        previousState: {
          findings: [
            {
              id: 'finding-1',
              file: 'src/App.tsx',
              line: 10,
              issue: 'Old bug',
              status: 'open'
            }
          ]
        }
      };
      const prompt = buildSystemPrompt(summary);
      expect(prompt).toContain('PREVIOUS REVIEW ROUND FINDINGS:');
      expect(prompt).toContain('- [finding-1] src/App.tsx:10: Old bug (Status: open)');
    });
  });

  describe('parseCodeReviewVerdict', () => {
    it('should parse PASS verdict', () => {
      expect(parseCodeReviewVerdict('Overall looks good. [VERDICT: PASS]')).toBe('pass');
    });

    it('should parse WARN verdict', () => {
      expect(parseCodeReviewVerdict('Some minor issues. [VERDICT: WARN]')).toBe('warn');
    });

    it('should parse FAIL verdict', () => {
      expect(parseCodeReviewVerdict('Blocking bugs found. [VERDICT: FAIL]')).toBe('fail');
    });

    it('should default to PASS if no verdict found', () => {
      expect(parseCodeReviewVerdict('No verdict here.')).toBe('pass');
    });
  });

  describe('parseCodeReviewStateDetailed', () => {
    it('should parse valid findings JSON', () => {
      const feedback = 'Some prose. <findings>{"findings": [{"id": "f1", "file": "a.ts", "issue": "i", "status": "resolved"}]}</findings>';
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state?.findings[0].id).toBe('f1');
      expect(result.parseError).toBeUndefined();
    });

    it('should return missing_closing_tag if </findings> is missing', () => {
      const feedback = 'Some prose. <findings>{"findings": []}';
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('missing_closing_tag');
    });

    it('should return invalid_json if JSON is malformed', () => {
      const feedback = 'Some prose. <findings>{invalid json}</findings>';
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('invalid_json');
    });
  });

  describe('estimateMaxOutputTokens', () => {
    it('should have a base budget', () => {
      const summary: CodeReviewSummary = { diffContext: '' };
      expect(estimateMaxOutputTokens(summary)).toBe(1500);
    });

    it('should scale with previous findings', () => {
      const summary: CodeReviewSummary = {
        diffContext: '',
        previousState: {
          findings: Array.from({ length: 5 }).fill({ id: 'f', file: 'f.ts', issue: 'i', status: 'open' }) as ReviewFinding[]
        }
      };
      // 1500 + 5 * 200 = 2500
      expect(estimateMaxOutputTokens(summary)).toBe(2500);
    });

    it('should cap at 4096', () => {
      const summary: CodeReviewSummary = {
        diffContext: '',
        previousState: {
          findings: Array.from({ length: 20 }).fill({ id: 'f', file: 'f.ts', issue: 'i', status: 'open' }) as ReviewFinding[]
        }
      };
      expect(estimateMaxOutputTokens(summary)).toBe(4096);
    });
  });

  describe('budgetInputContext', () => {
    it('should not truncate if within budget', () => {
      const summary: CodeReviewSummary = {
        diffContext: 'short diff',
        externalContext: 'short external'
      };
      const systemPrompt = 'short prompt';
      const { diffText, externalText } = budgetInputContext(summary, systemPrompt);
      expect(diffText).toBe('DIFF:\n\nshort diff');
      expect(externalText).toBe('EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\nshort external');
    });

    it('should truncate diff if it exceeds 16000 and total budget is exceeded', () => {
      const longDiff = 'a'.repeat(20000);
      const summary: CodeReviewSummary = {
        diffContext: longDiff,
        externalContext: 'short external'
      };
      // Make system prompt long enough to exceed the 24000 total budget
      const systemPrompt = 'c'.repeat(5000);
      // remainingBudget = 24000 - 5000 = 19000
      // diffText.length = 20000 + 7 = 20007
      // 20007 + 87 > 19000 is TRUE
      // maxDiffChars = min(20007, 16000, 19000) = 16000

      const { diffText } = budgetInputContext(summary, systemPrompt);
      expect(diffText.length).toBeLessThanOrEqual(16000 + 50); // + 50 for the TRUNCATED message
      expect(diffText).toContain('[TRUNCATED TO FIT TOKEN LIMIT]');
    });

    it('should truncate external context if total budget is exceeded', () => {
      const summary: CodeReviewSummary = {
        diffContext: 'a'.repeat(10000),
        externalContext: 'b'.repeat(20000)
      };
      const systemPrompt = 'c'.repeat(4000);
      // remainingBudget = 24000 - 4000 = 20000
      // diffText.length = 10000 + 7 = 10007
      // remainingForExternal = 20000 - 10007 = 9993

      const { externalText } = budgetInputContext(summary, systemPrompt);
      expect(externalText.length).toBeLessThanOrEqual(10000);
      expect(externalText).toContain('[TRUNCATED TO FIT TOKEN LIMIT]');
    });
  });
});
