# AI Slop Audit - Start Here

**Purpose:** Eliminate AI-generated language and enforce approved standards across the codebase

---

## 🚀 Quick Start (30 seconds)

```bash
python3 .agent/scripts/audit-ai-slop.py
```

This generates a timestamped report with violations, priorities, and fixes.

---

## 📂 Files & Structure

### Standards Documents
- `.agent/APPROVEDLIST.md` - What language IS approved (active voice, specific terms)
- `.agent/BANLIST.md` - What language is BANNED (corporate speak, weak intensifiers, etc.)

### Automation
- `.agent/scripts/audit-ai-slop.py` - Automated auditor (generates report in 30 sec)
- `.agent/workflows/ai-slop-audit-[DATE].md` - Latest audit results (auto-generated)

### Workflows & Guides
- `.agent/WORKFLOW_GUIDE.md` - How to run audits and fix violations
- `.agent/workflows/audit-ai-slop.md` - Manual audit with grep commands
- `.agent/README.md` - Directory overview

---

## 🔍 What Gets Audited

### Banned Categories (From BANLIST.md)

1. **Weak Intensifiers** - actually, really, basically, kind of, sort of
2. **Corporate Speak** - curated, synergy, empower, cutting-edge
3. **Credential Crutch** - "As a PhD", "In my research"
4. **Academic Scaffolding** - utilize, facilitate, methodology
5. **WCS Domain Conflicts** - "The Circuit", "Point Chasing"
6. **Robotics Jargon** (in dance) - kinetics, actuate, interface
7. **Passive Voice** - can be, will be, is seen
8. **False Authority** - "Studies show", "Everyone agrees"
9. **Invented Scar Tissue** - unverified personal stories
10. **AI Clichés** - tapestry, journey, vibrant, "unlock potential"

### Approved Language (From APPROVEDLIST.md)

1. **Active Voice** - "You will fix", "Test this", "Measure the result"
2. **Specific WCS Terms** - Frame, Connection, WSDC Registry
3. **Direct Language** - Fix, Stop, Start, Test, Measure
4. **Technical Precision** - "60fps from side profile", measurements
5. **User-Provided Scar Tissue** - Real experiences only

---

## 📋 Process

### Option A: Automated (Fast)
```bash
python3 .agent/scripts/audit-ai-slop.py
# ~30 seconds, generates timestamped report
# Shows violations by priority (Critical → High → Normal)
```

### Option B: Manual (Detailed)
Follow `.agent/workflows/audit-ai-slop.md` for:
- Step-by-step grep commands per category
- Document each violation
- Plan fixes
- Execute fixes
- Verify with repeat searches

---

## 🎯 Next Steps

1. **Run audit:** `python3 .agent/scripts/audit-ai-slop.py`
2. **Review results:** Check `.agent/workflows/ai-slop-audit-[DATE].md`
3. **Fix violations:** Priority 1 (Critical) first
4. **Verify:** Re-run audit or spot-check with grep
5. **Commit:** Use template in `.agent/WORKFLOW_GUIDE.md`

---

## 📚 Reference

| Need | See |
|------|-----|
| What's approved? | `.agent/APPROVEDLIST.md` |
| What's banned? | `.agent/BANLIST.md` |
| How to run audit? | `.agent/WORKFLOW_GUIDE.md` |
| Manual steps? | `.agent/workflows/audit-ai-slop.md` |
| Latest results? | `.agent/workflows/ai-slop-audit-[DATE].md` |

---

## ✅ Checklist

Before submitting PR with content changes:
- [ ] Run audit: `python3 .agent/scripts/audit-ai-slop.py`
- [ ] Fix all critical violations
- [ ] Fix high-priority violations
- [ ] Run `pnpm build` to verify
- [ ] Commit with clear message
- [ ] Push PR

---

## 🔄 Frequency

- **Before submitting PR** with content/copy changes
- **Before major releases**
- **Quarterly** as routine maintenance

---

## 💡 Examples

### ❌ Banned
```
"This vibrant journey will unlock your potential and facilitate a game-changing approach to understanding the tapestry of lead-follow communication."
```

### ✅ Approved
```
"Test this approach to improve your connection. Film yourself at 60fps from side profile. Measure your progress."
```

---

**Version:** 1.0  
**Last Updated:** 2026-05-02  
**Owner:** Quality Assurance - Language Standards
