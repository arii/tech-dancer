# .agent Directory

**Purpose:** Central location for agent-runnable workflows, standards, and audit processes

---

## Contents

### Standards & References

- **APPROVEDLIST.md** - Approved language, active voice patterns, specific terminology, scar tissue format
- **BANLIST.md** - Prohibited words, phrases, and writing patterns

### Workflows

Located in `.agent/workflows/`:

- **audit-ai-slop.md** - Step-by-step manual audit process + approved alternatives reference
- **ai-slop-audit-[DATE].md** - Auto-generated audit results (latest run)
- Other workflows: mass-audit-issues, review-pr, review-ux, etc.

### Scripts

Located in `.agent/scripts/`:

- **audit-ai-slop.py** - Automated auditor that searches codebase and generates action plan

---

## Quick Start

### Run Automated Audit

```bash
python3 .agent/scripts/audit-ai-slop.py
```

This generates a timestamped report in `.agent/workflows/ai-slop-audit-[DATE].md` with:
- All violations found (grouped by category and priority)
- Exact file paths and line numbers
- Context for each violation
- Action plan with next steps

### Manual Audit

See `.agent/workflows/audit-ai-slop.md` for step-by-step grep commands to search for each category of banned language.

### Apply Fixes

Follow the audit report to fix violations in priority order:
1. Critical (About page, home page)
2. High (Content/blog posts)
3. Normal (Other files)

---

## Process Flow

```
1. Run automated audit
   ↓
2. Review violations by priority
   ↓
3. Apply fixes per APPROVEDLIST.md
   ↓
4. Run pnpm build to verify
   ↓
5. Commit with clear message
```

---

## When to Run

- **Before submitting PR** with content changes
- **Before major releases** to catch language drift
- **Quarterly** as routine maintenance

---

## Standards

All content must follow:

**BANLIST.md:**
- ❌ No weak intensifiers (actually, really, basically)
- ❌ No corporate speak (curated, synergy, empower)
- ❌ No credential crutch (As a PhD, In my research)
- ❌ No passive voice
- ❌ No invented scar tissue
- ❌ No AI clichés

**APPROVEDLIST.md:**
- ✅ Active voice only
- ✅ Specific terminology (WCS domain)
- ✅ Technical precision (measurements, specific examples)
- ✅ Direct language (Fix, Stop, Test, Measure)
- ✅ User-provided scar tissue only

---

## Owner

Quality Assurance - Language Standards

**Last Updated:** 2026-05-02
