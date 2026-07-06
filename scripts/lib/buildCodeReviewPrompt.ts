import type { CodeReviewSummary } from './codeReviewTypes';
import { PROMPT_CATEGORIES } from './promptCategories';
import { VISUAL_DESIGN_GUIDELINES } from './visualGuidelines';

export function buildSystemPrompt(summary: CodeReviewSummary): string {
  const goalSection = summary.prGoal
    ? `This PR's stated goal:\n"${summary.prGoal}"\n\n`
    : '';

  let priorStateSection = '';
  if (summary.previousState && summary.previousState.findings.length > 0) {
    const findingsStr = summary.previousState.findings
      .map(f => {
        let line = `- [${f.id}] ${f.file}${f.line ? `:${f.line}` : ''}: ${f.issue} (Status: ${f.status})`;
        if (f.fixSummary) {
          line += `\n   → ${f.fixSummary}`;
        }
        return line;
      })
      .join('\n');
    priorStateSection = `
PREVIOUS REVIEW ROUND FINDINGS:
${findingsStr}

Your job:
- Confirm THIS issue is resolved before raising anything new.
- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.
- Do not re-open a resolved issue under a different framing.
`;
  }

  // Matching categories based on changed files
  const matchedCategories = summary.changedFiles
    ? PROMPT_CATEGORIES.filter(cat => cat.matcher(summary.changedFiles!))
    : [];

  let dynamicGuidance = '';
  if (matchedCategories.length > 0) {
    dynamicGuidance = `
CATEGORY-SPECIFIC GUIDANCE:
${matchedCategories.map(cat => cat.guidance).join('\n\n')}
`;
  }

  // NEW: only pull in the (large) visual design rulebook when the diff can
  // plausibly contain UI files. Previously this was injected unconditionally
  // on every PR — including pure backend/CI/infra diffs with zero .tsx/.css
  // files — which inflated prompt complexity and reasoning-token usage for
  // no benefit. If changedFiles is unknown/undefined, default to INCLUDING
  // the guidelines (fail safe, not fail open) since we can't rule UI out.
  const touchesUI = summary.changedFiles
    ? summary.changedFiles.some(f =>
        f.endsWith('.tsx') || f.endsWith('.jsx') || f.endsWith('.css') || f.endsWith('.scss')
      )
    : true;

  const guidelinesSection = touchesUI
    ? `${VISUAL_DESIGN_GUIDELINES}\n\n`
    : '';

  const impactSemanticContextSection = summary.impactSemanticContext
    ? `IMPACT & SEMANTIC CONTEXT (Dependency relationships and semantically similar code):\n${summary.impactSemanticContext}\n\n`
    : '';

  const uiAuditInstruction = touchesUI
    ? 'This diff contains UI files (.tsx, .css, .scss) — you MUST audit them against the VISUAL & DESIGN GUIDELINES above.\n\n'
    : '';

  let roleInstruction = '';
  if (summary.role === 'SECURITY') {
    roleInstruction = '\nROLE: SECURITY EXPERT. Focus on OWASP Top 10, data validation, sanitization, and secure communication. Flag any new untrusted input paths.';
  } else if (summary.role === 'PERFORMANCE') {
    roleInstruction = '\nROLE: PERFORMANCE ENGINEER. Focus on expensive computations, redundant re-renders, large bundle impacts, and inefficient data structures.';
  } else if (summary.role === 'STYLE') {
    roleInstruction = '\nROLE: STYLE & MAINTAINABILITY CRITIC. Focus on code readability, consistency with existing patterns, naming clarity, and adherence to design tokens.';
  } else if (summary.role === 'ARCHITECTURE') {
    roleInstruction = '\nROLE: SOFTWARE ARCHITECT. Focus on separation of concerns, feature isolation, dependency directions, and proper use of hooks vs. components.';
  }

  const reviewPhilosophy = `## 1. Philosophy
- EVIDENCE RULE: Points to exact line + explain runtime consequence + explain why previous code was better. No speculation.
- SCOPE: Review ONLY PR changes. Ignore pre-existing issues. Assume original code worked.
- FALSE POSITIVE FILTER: Verify if it occurs at runtime. Design choices are NOT bugs.`;

  const repositoryRules = `## 2. Standards
- SIMPLICITY: Prefer removal. Flag unnecessary wrappers/hooks/helpers. Reward simpler solutions.
- DESIGN SYSTEM: BANNED: raw Tailwind layout (flex, grid, px-*, etc) in TSX. Use <Stack>, <Grid>, <Box>.
- REPO PATTERNS: Use existing utilities/tokens. Avoid duplicate GitHub/MCP functionality.`;

  const reviewChecklist = `## 3. Checklist
ORDER: 1. Correctness, 2. Security (new inputs/auth only), 3. Crashes, 4. Data Integrity, 5. Performance (O(n²)), 6. Maintainability.

Positive Findings: Mention improved tests, removed duplication, or reduced complexity.

${dynamicGuidance}`;

  const severityAndConfidence = `## 4. Severity
- error: Blocking, high confidence only. Bugs, crashes, security.
- warn: Non-blocking. Maintainability, performance regressions.
- info: Style, naming, docs.

Include Confidence (high/medium/low) for every issue.`;

  const outputContract = `## 5. Output
- STRICT SNIPPET: Quote entire line from diff.
- COUNTEREXAMPLES: Required for errors (Why it fails, Example input, Expected vs Actual).
- JSON: End with <findings> JSON block (id, file, line, snippet, issue, status). No truncation.

[VERDICT: PASS | WARN | FAIL]`;

  const basePrompt = `You are an expert software engineer and UI/UX auditor reviewing a pull request.${roleInstruction}

${goalSection}${priorStateSection}${impactSemanticContextSection}${guidelinesSection}${uiAuditInstruction}

${reviewPhilosophy}

${repositoryRules}

${reviewChecklist}

${severityAndConfidence}

${outputContract}`;

  return basePrompt;
}
