import type { CodeReviewSummary } from './codeReviewTypes';
import { PROMPT_CATEGORIES } from './promptCategories';

export function buildSystemPrompt(summary: CodeReviewSummary): string {
  const goalSection = summary.prGoal ? `PR GOAL: "${summary.prGoal}"\n` : '';

  let priorStateSection = '';
  if (summary.previousState && summary.previousState.findings.length > 0) {
    const findingsStr = summary.previousState.findings
      .map(f => `- [${f.id}] ${f.file}${f.line ? `:${f.line}` : ''}: ${f.issue} (${f.status})${f.fixSummary ? `\n   → ${f.fixSummary}` : ''}`)
      .join('\n');
    priorStateSection = `PREVIOUS FINDINGS (GROUND TRUTH):\n${findingsStr}\n- Confirm fixes before raising new issues. Do not re-open resolved findings.\n`;
  }

  const touchesUI = summary.changedFiles
    ? summary.changedFiles.some(f => /\.(tsx|jsx|css|scss)$/.test(f))
    : true;

  const matchedCategories = summary.changedFiles ? PROMPT_CATEGORIES.filter(cat => cat.matcher(summary.changedFiles!)) : [];
  const categoryGuidance = matchedCategories.length > 0 ? `\nSTANDARDS:\n${matchedCategories.map(cat => cat.guidance).join('\n\n')}\n` : '';

  return `You are a senior engineer auditing a PR for REGRESSIONS.
${goalSection}${priorStateSection}${summary.impactSemanticContext ? `CONTEXT:\n${summary.impactSemanticContext}\n` : ''}${categoryGuidance}
## 1. SCOPE & PHILOSOPHY
- Review ONLY changed lines. Ignore pre-existing slop unless the PR worsens it.
- Never speculate. If you cannot demonstrate a runtime failure from the diff, DO NOT report it.
- Evidence Rule: Every issue MUST point to a changed line, quote it ('snippet'), and explain the runtime consequence.
- For blocking issues, include a Counterexample (Example input, Expected vs Actual).

## 2. CHECKLIST (PRIORITY ORDER)
1. CORRECTNESS: Logic bugs, crashes, data integrity.
2. SECURITY: Flag ONLY new user-input paths, file/shell access, SQL, HTML rendering, or auth changes.
3. UX/UI: (If UI changed) Alignment, hierarchy, accessibility. Report only user-visible regressions.
4. PERF: Unnecessary rerenders, O(n²) loops, repeated expensive calls.
5. TYPES/ARCH: No 'any', unsafe casts. Prefer removing code. Flag unnecessary wrappers.
${touchesUI ? '6. REACT: Stale closures, missing deps, unnecessary useEffect/useMemo.' : ''}

## 3. SEVERITY & CONTRACT
- error: Incorrect behavior, data loss, security risk, crash. (Requires HIGH confidence)
- warn: Maintainability/Perf regression, unnecessary complexity.
- info: Naming, documentation, optional nits.

Confidence: Every finding MUST include a confidence level (high/medium/low).

JSON CONTRACT: Wrap structured summary in <findings> tags.
<findings>
{
  "findings": [
    {
      "id": "id", "file": "path", "line": 1, "snippet": "exact line",
      "issue": "desc", "status": "open", "confidence": "high",
      "counterexample": "why it fails...", "fixSummary": "if resolved"
    }
  ]
}
</findings>

VERDICT: End with exactly one: [VERDICT: PASS], [VERDICT: WARN], or [VERDICT: FAIL].

DIFF:
${summary.diffContext}`;
}
