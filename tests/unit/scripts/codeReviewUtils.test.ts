import { describe, it, expect } from 'vitest';
import {
  parseCodeReviewVerdict,
  parseCodeReviewStateDetailed,
  parseCodeReviewState,
  estimateMaxOutputTokens,
  budgetInputContext,
  buildReviewPayload,
  EXTERNAL_CONTEXT_TRUNCATED_MESSAGE,
  EXTERNAL_CONTEXT_MINIMUM_BUDGET
} from '../../../scripts/lib/codeReviewUtils';
import { buildSystemPrompt } from '../../../scripts/lib/buildCodeReviewPrompt';

describe('codeReviewUtils', () => {
  describe('buildSystemPrompt', () => {
    it('includes goal section if provided', () => {
      const prompt = buildSystemPrompt({
        prGoal: 'Fix a bug',
        diffContext: '',
      });
      expect(prompt).toContain("This PR's stated goal:\n\"Fix a bug\"");
    });

    it('does not include goal section if not provided', () => {
      const prompt = buildSystemPrompt({
        diffContext: '',
      });
      expect(prompt).not.toContain("This PR's stated goal");
    });

    it('includes previous findings if provided', () => {
      const prompt = buildSystemPrompt({
        diffContext: '',
        previousState: {
          findings: [
            { id: 'f-1', file: 'a.js', issue: 'Bad code', status: 'open' }
          ]
        }
      });
      expect(prompt).toContain('PREVIOUS REVIEW ROUND FINDINGS:');
      expect(prompt).toContain('- [f-1] a.js: Bad code (Status: open)');
    });
  });

  describe('parseCodeReviewVerdict', () => {
    it('parses PASS correctly', () => {
      expect(parseCodeReviewVerdict('Some feedback. [VERDICT: PASS]')).toBe('pass');
    });

    it('parses WARN correctly', () => {
      expect(parseCodeReviewVerdict('Some feedback. [VERDICT: WARN]')).toBe('warn');
    });

    it('parses FAIL correctly', () => {
      expect(parseCodeReviewVerdict('Some feedback. [VERDICT: FAIL]')).toBe('fail');
    });

    it('defaults to PASS if no valid verdict is found', () => {
      expect(parseCodeReviewVerdict('Some feedback without verdict.')).toBe('pass');
    });

    it('uses the last verdict if multiple are found', () => {
      expect(parseCodeReviewVerdict('Some feedback. [VERDICT: FAIL] But wait, [VERDICT: PASS]')).toBe('pass');
    });
  });

  describe('parseCodeReviewStateDetailed and parseCodeReviewState', () => {
    it('parses valid JSON findings', () => {
      const json = JSON.stringify({ findings: [{ id: '1', issue: 'test' }] });
      const feedback = `Some text\n<findings>\n${json}\n</findings>\nMore text`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state?.findings.length).toBe(1);
      expect(result.state?.findings[0].id).toBe('1');
      expect(result.parseError).toBeUndefined();

      expect(parseCodeReviewState(feedback)?.findings.length).toBe(1);
    });

    it('handles missing closing tag', () => {
      const feedback = `Some text\n<findings>\n{"findings": []}`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('missing_closing_tag');
    });

    it('handles invalid JSON', () => {
      const feedback = `Some text\n<findings>\nbad json\n</findings>`;
      const result = parseCodeReviewStateDetailed(feedback);
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBe('invalid_json');
    });

    it('handles no findings tags', () => {
      const result = parseCodeReviewStateDetailed('No findings tag here');
      expect(result.state).toBeUndefined();
      expect(result.parseError).toBeUndefined();
    });
  });

  describe('estimateMaxOutputTokens', () => {
    it('returns base budget for empty diff and no findings', () => {
      expect(estimateMaxOutputTokens({ diffContext: '' })).toBe(1500);
    });

    it('scales up based on prior findings count', () => {
      const withFindings = estimateMaxOutputTokens({
        diffContext: '',
        previousState: {
          findings: Array.from({ length: 5 }, (_, i) => ({ id: `f-${i}`, file: 'f', issue: 'i', status: 'open' }))
        }
      });
      // 1500 + (5 * 200) = 2500
      expect(withFindings).toBe(2500);
    });

    it('adds 1000 for large diffs', () => {
      // 4000 tokens * 4 chars = 16000 chars
      const largeDiff = 'a'.repeat(16001);
      expect(estimateMaxOutputTokens({ diffContext: largeDiff })).toBe(2500);
    });

    it('caps at 8192', () => {
      const hugeDiff = 'a'.repeat(16001);
      const manyFindings = estimateMaxOutputTokens({
        diffContext: hugeDiff,
        previousState: {
          findings: Array.from({ length: 40 }, (_, i) => ({ id: `f-${i}`, file: 'f', issue: 'i', status: 'open' }))
        }
      });
      // 1500 + 1000 + (40 * 200) = 10500, capped to 8192
      expect(manyFindings).toBe(8192);
    });

    it('scales up based on system prompt length', () => {
      const smallDiff = 'diff';
      const normalSystemPrompt = 400; // 100 tokens
      const largeSystemPrompt = 2800; // 700 tokens
      const hugeSystemPrompt = 5000;  // 1250 tokens

      const base = estimateMaxOutputTokens({ diffContext: smallDiff }, normalSystemPrompt);
      const large = estimateMaxOutputTokens({ diffContext: smallDiff }, largeSystemPrompt);
      const huge = estimateMaxOutputTokens({ diffContext: smallDiff }, hugeSystemPrompt);

      expect(base).toBe(1500);
      expect(large).toBe(3000); // 1500 + 1500
      expect(huge).toBe(4500);  // 1500 + 1500 + 1500
    });
  });

  describe('budgetInputContext', () => {
    const defaultMaxChars = 24000;

    it('returns untouched strings if within budget', () => {
      const systemPrompt = 'Prompt';
      const diffText = 'Diff';
      const externalText = 'External';
      const result = budgetInputContext(systemPrompt, { diffContext: diffText, externalContext: externalText }, defaultMaxChars);

      expect(result.diffText).toBe(diffText);
      expect(result.externalText).toBe(externalText);
    });

    it('truncates diff string if exceeding 16000 chars when budgeting', () => {
      const systemPrompt = 'Prompt';
      const diffText = 'a'.repeat(20000);
      const result = budgetInputContext(systemPrompt, { diffContext: diffText }, 16000);

      expect(result.diffText.length).toBeLessThan(16000 + 100);
      expect(result.diffText).toContain('...[TRUNCATED TO FIT TOKEN LIMIT]');
    });

    it('allocates remaining budget to external text', () => {
      const systemPrompt = 'Prompt';
      const diffText = 'a'.repeat(16000); // Uses 16k max for diff
      const externalText = 'b'.repeat(10000); // Would exceed 24k total
      const result = budgetInputContext(systemPrompt, { diffContext: diffText, externalContext: externalText }, defaultMaxChars);

      expect(result.externalText).toContain('...[TRUNCATED TO FIT TOKEN LIMIT]');
    });

    it(`hard truncates external context if budget remaining is extremely small (<= ${EXTERNAL_CONTEXT_MINIMUM_BUDGET})`, () => {
        const systemPrompt = 'Prompt';
        const diffText = 'a'.repeat(16000);
        const externalText = 'External context that should be dropped';
        const result = budgetInputContext(systemPrompt, { diffContext: diffText, externalContext: externalText }, 16000);

        expect(result.externalText).toBe(EXTERNAL_CONTEXT_TRUNCATED_MESSAGE);
    });
  });

  describe('buildReviewPayload', () => {
    it('applies prefixes to payload texts', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', 'External content');
      expect(payload[1].text).toBe('DIFF:\n\nDiff content');
      expect(payload[2].text).toBe('EXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\nExternal content');
    });

    it('applies custom prefixes to payload texts', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', 'External content', {
        diffPrefix: 'CustomDiff:\n',
        externalPrefix: 'CustomExt:\n',
      });
      expect(payload[1].text).toBe('CustomDiff:\nDiff content');
      expect(payload[2].text).toBe('CustomExt:\nExternal content');
    });

    it('does not apply prefix if external text is fully truncated', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', EXTERNAL_CONTEXT_TRUNCATED_MESSAGE);
      expect(payload[2].text).toBe(EXTERNAL_CONTEXT_TRUNCATED_MESSAGE);
    });
  });
});
