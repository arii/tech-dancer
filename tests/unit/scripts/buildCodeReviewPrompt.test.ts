import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '../../../scripts/lib/buildCodeReviewPrompt';

describe('buildCodeReviewPrompt', () => {
  it('injects CI/CD guidance when .github/workflows file is changed', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff',
      changedFiles: ['.github/workflows/ci.yml']
    });
    expect(prompt).toContain('REPOSITORY-SPECIFIC GUIDANCE:');
    expect(prompt).toContain('CI/CD Workflows:');
    expect(prompt).toContain('if: always()');
  });

  it('injects React guidance when .tsx file is changed', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff',
      changedFiles: ['src/components/Button.tsx']
    });
    expect(prompt).toContain('REPOSITORY-SPECIFIC GUIDANCE:');
    expect(prompt).toContain('React Components:');
    expect(prompt).toContain('Flag as blocking: conditional/early-return hook calls');
  });

  it('injects LLM integration guidance when CodeReviewClient is changed', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff',
      changedFiles: ['scripts/clients/githubModelsCodeReviewClient.ts']
    });
    expect(prompt).toContain('REPOSITORY-SPECIFIC GUIDANCE:');
    expect(prompt).toContain('LLM Client Integrations — READ BEFORE FLAGGING AUTH/MODEL ISSUES:');
    expect(prompt).toContain('Do NOT assume `ChatOpenAI` always means talking to OpenAI\'s own API');
  });

  it('concatenates multiple guidance blocks if multiple categories match', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff',
      changedFiles: ['src/components/Button.tsx', '.github/workflows/ci.yml']
    });
    expect(prompt).toContain('CI/CD Workflows:');
    expect(prompt).toContain('React Components:');
  });

  it('does not include category guidance section if no categories match', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff',
      changedFiles: ['README.md']
    });
    expect(prompt).not.toContain('REPOSITORY-SPECIFIC GUIDANCE:');
  });

  it('handles missing changedFiles gracefully', () => {
    const prompt = buildSystemPrompt({
      diffContext: 'some diff'
    });
    expect(prompt).not.toContain('REPOSITORY-SPECIFIC GUIDANCE:');
  });
});
