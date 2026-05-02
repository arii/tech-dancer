# AI Slop Audit Workflow Guide

**Quick Reference for Running & Repeating the Audit Process**

---

## Files Moved

✅ `APPROVEDLIST.md` → `.agent/APPROVEDLIST.md`  
✅ `BANLIST.md` → `.agent/BANLIST.md`  
✅ `AI_SLOP_CLEANUP_GUIDE.md` → `.agent/workflows/ai-slop-audit.md`

---

## Automated Workflow (Fastest)

Run this single command to generate an audit report:

```bash
python3 .agent/scripts/audit-ai-slop.py
```

**Output:** Timestamped report in `.agent/workflows/ai-slop-audit-[DATE].md`

**What it does:**
1. Searches codebase for all banned terms
2. Identifies violations with file paths and line numbers
3. Prioritizes violations (Critical → High → Normal)
4. Generates actionable plan with context

**Time:** ~30 seconds

---

## Manual Workflow (Detailed)

Follow `.agent/workflows/audit-ai-slop.md` for step-by-step grep commands.

**Structure:**
- Search for each banned category
- Document violations
- Plan fixes
- Execute fixes
- Verify with repeat searches

**Time:** ~45 minutes

---

## Fix Violations

After audit, fix in priority order:

### Priority 1: Critical
Files: `src/features/profile/useProfile.ts`, `src/features/dashboard/Dashboard.tsx`, home/landing pages

Examples of violations:
- "actually" (weak intensifier)
- "curated" (corporate speak)
- "fantastic" (AI filler)

### Priority 2: High
Files: `content/posts/*.md`

Examples:
- Passive voice ("can be")
- Weak intensifiers ("actually")

### Priority 3: Normal
Other files with violations

---

## Verification

After making fixes:

```bash
# Option 1: Re-run full audit
python3 .agent/scripts/audit-ai-slop.py

# Option 2: Manual spot-check (pick a term)
grep -r "actually\|curated\|fantastic" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md"

# Option 3: Build & test
pnpm build
pnpm run audit
```

---

## Standards Reference

### Banned Terms (from BANLIST.md)

| Category | Examples |
|----------|----------|
| Weak Intensifiers | actually, really, basically |
| Corporate Speak | curated, synergy, empower |
| Credential Crutch | As a PhD, In my research |
| Passive Voice | can be, will be, is seen |
| AI Clichés | tapestry, journey, vibrant |

### Approved Language (from APPROVEDLIST.md)

| Type | Examples |
|------|----------|
| Active Voice | "You will fix", "Test this", "Measure the result" |
| WCS Terms | WCS Events, WSDC Registry, Frame, Connection |
| Direct Language | Fix, Stop, Start, Test, Measure |
| Technical | "60fps from side profile", "2-foot spacing" |

---

## Commit Template

```bash
git commit -m "refactor: eliminate banned language per BANLIST.md

Ran AI slop audit and fixed violations:
- Removed weak intensifiers (actually, really, basically)
- Replaced corporate speak (curated → selected/tested)
- Converted passive voice to active
- Verified no false authority claims

Files changed: [list files]
See .agent/workflows/ai-slop-audit-[DATE].md for full audit
"
```

---

## Frequency

- **Before PR submission** with content changes
- **Before major releases**
- **Quarterly** as routine maintenance

---

## Questions?

See:
- `.agent/APPROVEDLIST.md` - What language is approved
- `.agent/BANLIST.md` - What language is banned
- `.agent/workflows/audit-ai-slop.md` - Manual audit steps
- `.agent/README.md` - Directory overview

---

**Last Updated:** 2026-05-02  
**Workflow Version:** 1.0
