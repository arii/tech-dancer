# .agent Directory

**Purpose:** Central location for agent-runnable workflows, standards, and audit processes

---

## Contents

### Automation Configuration

- **audit.config.yaml** - Unified configuration defining all banned language categories, terms, and standard fixes.
- **docs/agent/issue-audit-rules.md** - Standards for GitHub issue auditing and closure.

### Workflows

Located in `.agent/workflows/`:

- **ai-slop-audit-[DATE].md** - Auto-generated audit results (latest run)
- Other workflows: review-pr, review-ux, etc.

### Scripts

Located in `.agent/scripts/`:

- **audit-ai-slop.py** - Automated auditor that searches codebase and generates action plan. Consumes `audit.config.yaml`.

---

## Quick Start

Before starting any work, ensure the agent environment is fully bootstrapped:

```bash
./setup-agent.sh
```

### Run Automated Audit

```bash
python3 .agent/scripts/audit-ai-slop.py
```

This generates a timestamped report in `.agent/workflows/ai-slop-audit-[DATE].md` with:

- All violations found (grouped by category and priority)
- Exact file paths and line numbers
- Context for each violation
- Action plan with next steps

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
3. Apply fixes per audit.config.yaml
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

- **Language**: All content must follow rules defined in `audit.config.yaml`. No weak intensifiers, corporate speak, credential crutch, passive voice, invented scar tissue, or AI clichés. Active voice only, specific terminology, direct language.
- **Issue Auditing**: All issue audits and PR linkages must follow `docs/agent/issue-audit-rules.md`.

---

## Owner

Quality Assurance - Language Standards

**Last Updated:** 2026-05-02
