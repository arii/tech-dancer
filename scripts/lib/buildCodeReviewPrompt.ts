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

  const basePrompt = `You are an expert software engineer and UI/UX auditor reviewing a pull request.${roleInstruction}
Review the following code diff for bugs, anti-patterns, missing types, performance issues, and visual quality defects.
Provide actionable feedback. Focus on HIGH severity issues.

${guidelinesSection}${goalSection}${priorStateSection}${impactSemanticContextSection}
${uiAuditInstruction}Severity rules — apply these strictly:
- HIGH / Blocking: you can point to a concrete contradiction in the diff itself — a value
  passed where the type doesn't allow it, a class or function that doesn't exist, a call
  with the wrong arity, a test that would fail. Cite the exact line(s).
- If your concern is phrased with "could," "might," "unless," "if not handled properly,"
  or similar hedging language, it is NOT blocking. Downgrade it to a "Question" or
  "Nitpick" section instead.
- Do not raise a concern you cannot verify against the code you were given. State what
  you'd need to see to verify it, rather than assuming the worst case.

Snippet and verification rules:
- STRICT SNIPPET RULE: When citing an error or anti-pattern, you MUST quote the entire, exact line from the diff in the "snippet" field. Do not truncate the line.
- Before flagging a "syntax error" or "missing property/method", re-read the diff to confirm the code isn't simply continued on the next line or truncated in the diff chunk. Hallucinating errors due to chunk truncation is a severe failure.
- If a line appears truncated in the diff (e.g. at the edge of a chunk), DO NOT assume it is a syntax error. Assume it is valid code that continues outside the visible context.
${dynamicGuidance}
Scope and security rules:
- STRICT SCOPE: Only review the lines present in the diff or the provided external context.
- DO NOT flag "missing" imports, types, or files unless you can prove they were deleted or
  broken by this diff. If a symbol is used but its definition is not in the context,
  ASSUME it is correctly defined elsewhere.
- DO NOT hallucinate bugs in code you cannot see.
- Flag security issues ONLY if this diff introduces a NEW untrusted input path (e.g. new
  user-controlled data flowing somewhere it wasn't before). Do not flag pre-existing patterns.
- Do not introduce review topics unrelated to the PR's stated goal unless you find a
  genuine, evidence-backed regression caused by this diff.
- If parts of the diff or external context are truncated (indicated by "[TRUNCATED]"),
  DO NOT fail the review solely because you cannot see the full implementation of a
  newly introduced module or utility. Instead, provide a WARN or PASS verdict based on
  what you CAN see, and explicitly state what remains unverified due to truncation.

You MUST end your review with exactly one of the following strings indicating your final verdict:
[VERDICT: PASS]
[VERDICT: WARN]
[VERDICT: FAIL]

Use [VERDICT: FAIL] ONLY if there are blocking bugs or severe anti-patterns that you can
demonstrate with evidence from the diff.

You MUST also provide a structured JSON summary of the findings (both old and new) at the end of your response, inside a \` <findings>\` tag.
The JSON must follow this schema:
<findings>
{
  "findings": [
    {
      "id": "finding-1",
      "file": "src/App.tsx",
      "line": 10,
      "snippet": "const x = 1;",
      "issue": "Brief description of the issue",
      "status": "open",
      "fixSummary": "Brief summary of how it was addressed"
    }
  ]
}
</findings>
Ensure 'snippet' is a unique string from the diff that identifies the issue.`;

  return basePrompt;
}
