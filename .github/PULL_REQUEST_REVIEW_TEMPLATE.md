# PR Review: #{{NUMBER}} — {{TITLE}}

**Repo:** [arii/tech-dancer](https://github.com/arii/tech-dancer)
**PR:** [https://github.com/arii/tech-dancer/pull/{{NUMBER}}](https://github.com/arii/tech-dancer/pull/{{NUMBER}})
**Stats:** {{STATS}}

## Description

{{DESCRIPTION}}

---

## 📐 Review Standards (Anti-Bloat)

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. **Dead abstractions** — new class/context/hook that a simpler primitive already handles?
2. **Unnecessary indirection** — adds a layer where a direct call would do?
3. **Responsibility creep** — component taking on logic that belongs in a hook or parent?
4. **Import bloat** — `import React` added unnecessarily? (Not needed in React 17+)
5. **Token compliance** — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. **No arbitrary Tailwind** — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. **Audit ratio** — if additions > 100 lines, find 10+ lines to cut.

### Mandatory Response Sections
- `## ANTI-AI-SLOP` — verbose/over-engineered patterns found (or confirmed absent)
- `## FINDINGS` — per-file critical feedback with specific line numbers
- `## FINAL RECOMMENDATION` — `Approved` | `Approved with Minor Changes` | `Not Approved`

---

## 📂 Files Changed

{{FILES_CHANGES}}

---

## 🔍 Per-File Audit

{{FOR_EACH_FILE}}
---

### `{{FILENAME}}` `{{FILE_STATS}}` ({{FILE_STATUS}})

**Full diff:**
```diff
{{DIFF}}
```

**Audit checklist:**
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

**Proposed inline comment** _(fill in `line` and `body` before submitting)_:
```json
{
  "path": "{{FILENAME}}",
  "line": 1,
  "body": "<FILL IN: critical feedback for the most important line in this file>"
}
```
{{END_FOR_EACH}}

---

## 🚀 Submission Steps

1. Fill in every `Proposed inline comment` block above with real feedback.
2. Collect them into `/tmp/review_payload.json`:

```json
{
  "body": "## ANTI-AI-SLOP\n<slop findings>\n\n## FINDINGS\n<per-file summary>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Feedback here" }
  ]
}
```

3. Submit (link is printed on success):
```bash
python3 dev-tools/gh_collab.py review {{NUMBER}} --file /tmp/review_payload.json
```
