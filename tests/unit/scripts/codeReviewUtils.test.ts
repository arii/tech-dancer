import { describe, it, expect } from 'vitest';
import {
  extractFeedbackText,
  cleanupFeedback,
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

  describe('cleanupFeedback', () => {
    it('strips findings and verdict tags', () => {
      const feedback = 'Review here.\n<findings>{"f":[]}</findings>\n[VERDICT: PASS]\nFooter.';
      expect(cleanupFeedback(feedback)).toBe('Review here.\n\nFooter.');
    });

    it('is case-insensitive and handles multiline findings', () => {
      const feedback = 'Start\n<FINDINGS>\nline1\nline2\n</FINDINGS>\n[verdict: FAIL]\nEnd';
      expect(cleanupFeedback(feedback)).toBe('Start\n\nEnd');
    });
  });

  describe('extractFeedbackText', () => {
    it('returns string content as is, stripping markdown code blocks if present', () => {
      expect(extractFeedbackText('Plain text')).toBe('Plain text');
      expect(extractFeedbackText('```json\n{ "test": 1 }\n```')).toBe('{ "test": 1 }');
    });

    it('joins text parts from an array, skipping thoughts', () => {
      const content = [
        { thought: 'Thinking...' },
        { text: 'Part 1 ' },
        { text: 'Part 2' }
      ];
      expect(extractFeedbackText(content)).toBe('Part 1 Part 2');
    });

    it('stringifies object content that is not an array', () => {
      const content = { unexpected: 'format' };
      expect(extractFeedbackText(content)).toBe(JSON.stringify(content));
    });

    it('stringifies array if no text content is found', () => {
      const content = [{ other: 'data' }];
      expect(extractFeedbackText(content)).toBe(JSON.stringify(content));
    });

    it('returns empty string for null/undefined content', () => {
      expect(extractFeedbackText(null)).toBe('');
      expect(extractFeedbackText(undefined)).toBe('');
    });
  });

  describe('estimateMaxOutputTokens', () => {
    it('returns base budget for empty diff and no findings', () => {
      // estimatedOutput = 0
      // thinkingBudget = 2048
      // outputPadding = 256
      // priorFindingsBudget = 0
      expect(estimateMaxOutputTokens({ diffContext: '' })).toBe(2304);
    });

    it('scales up based on prior findings count', () => {
      const withFindings = estimateMaxOutputTokens({
        diffContext: '',
        previousState: {
          findings: Array.from({ length: 5 }, (_, i) => ({ id: `f-${i}`, file: 'f', issue: 'i', status: 'open' }))
        }
      });
      // 2304 + (5 * 200) = 3304
      expect(withFindings).toBe(3304);
    });

    it('adds tokens for large diffs capped at 2000', () => {
      // 4000 tokens * 4 chars = 16000 chars -> diffTokens = 4000
      // 4000 * 0.4 = 1600 estimatedOutput
      // 1600 + 2048 + 256 = 3904
      const largeDiff = 'a'.repeat(16001);
      expect(estimateMaxOutputTokens({ diffContext: largeDiff })).toBe(3905);
    });

    it('caps at 8192', () => {
      const hugeDiff = 'a'.repeat(16001);
      const manyFindings = estimateMaxOutputTokens({
        diffContext: hugeDiff,
        previousState: {
          findings: Array.from({ length: 40 }, (_, i) => ({ id: `f-${i}`, file: 'f', issue: 'i', status: 'open' }))
        }
      });
      // estimatedOutput = 1600 (capped at 2000)
      // priorFindingsBudget = 40 * 200 = 8000
      // total > 8192
      expect(manyFindings).toBe(8192);
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
    it('applies prefixes and combines system prompts', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', 'External content');
      expect(payload[0]).toEqual({
        role: 'system',
        content: 'Prompt\n\nEXTERNAL CONTEXT (Types/Interfaces/Constants referenced in the diff):\n\nExternal content'
      });
      expect(payload[1]).toEqual({ role: 'user', content: 'DIFF:\n\nDiff content' });
    });

    it('applies custom prefixes and combines system prompts', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', 'External content', {
        diffPrefix: 'CustomDiff:\n',
        externalPrefix: 'CustomExt:\n',
      });
      expect(payload[0]).toEqual({
        role: 'system',
        content: 'Prompt\n\nCustomExt:\nExternal content'
      });
      expect(payload[1]).toEqual({ role: 'user', content: 'CustomDiff:\nDiff content' });
    });

    it('handles truncated external text by combining it into system prompt', () => {
      const payload = buildReviewPayload('Prompt', 'Diff content', EXTERNAL_CONTEXT_TRUNCATED_MESSAGE);
      expect(payload[0]).toEqual({
        role: 'system',
        content: `Prompt\n\n${EXTERNAL_CONTEXT_TRUNCATED_MESSAGE}`
      });
      expect(payload[1]).toEqual({ role: 'user', content: 'DIFF:\n\nDiff content' });
    });
  });
});
