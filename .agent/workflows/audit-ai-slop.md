# AI Slop Audit Workflow

**Purpose:** Detect and eliminate banned language per APPROVEDLIST.md and BANLIST.md

**Location:** `.agent/`  
**Reference:** `.agent/APPROVEDLIST.md`, `.agent/BANLIST.md`, `.agent/workflows/ai-slop-audit.md`

---

## Automated Audit Process

Run this to generate an action plan for your current codebase:

```bash
python3 .agent/scripts/audit-ai-slop.py
```

This script:
1. Searches entire codebase for banned terms
2. Identifies violations with file paths and line context
3. Generates an action plan with before/after fixes
4. Outputs to `.agent/workflows/ai-slop-audit-[DATE].md`

---

## Manual Audit (Step-by-Step)

### Step 1: Search for Weak Intensifiers

```bash
grep -r "\bactually\b\|\breally\b\|\bbasically\b\|kind of\|sort of" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Delete or replace with direct statement

---

### Step 2: Search for Corporate Speak

```bash
grep -r "\bcurated\b\|Synergy\|Next-level\|Cutting-edge\|Empower\|Industry-leading" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Replace with specific, active verbs

---

### Step 3: Search for Credential Crutch

```bash
grep -r "As a PhD\|In my research\|Given my robotics\|My analysis suggests" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Delete or provide specific examples instead

---

### Step 4: Search for Academic Scaffolding

```bash
grep -r "\bUtilize\b\|Facilitate\|Methodology\|Pedagogical\|It was observed" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Replace with active verbs (Use, Fix, Help, Method, Teaching, etc.)

---

### Step 5: Search for WCS Domain Conflicts

```bash
grep -r "The Circuit\|Circuit Points\|Point Chasing\|Registry" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Use approved terminology (WCS Events, WSDC Database, Registry Standing, etc.)

---

### Step 6: Search for Robotics Jargon in Dance Content

```bash
grep -r "\bKinetics\|Signal Latency\|Actuate\|Interface" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Use dance terminology (Momentum, Connection Delay, Move, Communication)

---

### Step 7: Search for Passive Voice

```bash
grep -r "can be\|will be\|is seen\|is applied\|is facilitated" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Convert to active voice

---

### Step 8: Search for False Authority

```bash
grep -r "Studies show\|Everyone agrees\|As we can see\|It's important to note" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Delete or provide specific evidence

---

### Step 9: Search for Invented Scar Tissue

```bash
grep -r "sticky floor\|18-month plateau\|2 AM dance\|Novice level" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Delete unless user verified it happened

---

### Step 10: Search for AI Clichés

```bash
grep -r "\bTapestry\|Vibrant\|Testament\|Unlock your potential\|Game-changing\|Unprecedented\|Journey\|Heartbeat\|Quintessential\|Strategic Vulnerability\|Narrative Grounding\|In the world of\|But the reality is\|Picture this\|Last night at the social" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v node_modules
```

**Fix:** Delete immediately

---

## Action Plan Generation

After finding violations, document each with:

1. **File path**
2. **Current text** (with violation highlighted)
3. **Violation type** (passive voice, weak intensifier, etc.)
4. **Fixed text** (approved alternative)
5. **Priority** (Critical = affects About page or prominent content)

Example:

```
### Violation: "actually"
**File:** src/features/profile/useProfile.ts
**Type:** Weak intensifier (banned)
**Current:** "I believe in building things that **actually** work."
**Fixed:** "I believe in building things that work."
**Priority:** Critical (About page)
```

---

## Verification & Testing

After making fixes:

```bash
# Rebuild
pnpm build

# Run audit
pnpm run audit

# Run audit commands again to verify no violations remain
for term in "actually" "curated" "utilize" "can be"; do
  echo "=== Checking for: $term ==="
  grep -r "$term" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" || echo "✅ None found"
done

# Commit
git add -A
git commit -m "refactor: eliminate banned language per BANLIST.md

Fixed violations:
- Removed weak intensifiers (actually, really, basically)
- Replaced corporate speak (curated → selected/tested)
- Converted passive voice to active
- Verified no false authority claims

See .agent/workflows/ai-slop-audit.md for full audit results."
```

---

## Approved Alternatives Quick Reference

| Banned | Use Instead |
|--------|------------|
| actually | Delete it |
| curated | selected, tested, chosen |
| fantastic | Delete it or be specific |
| can be | [verb directly] |
| utilize | use, do |
| facilitate | fix, help, enable |
| as a PhD | Delete it |
| studies show | [specific example] |
| in the world of | Delete it |
| journey | Delete it |
| tapestry | Delete it |
| leverage (buzzword) | use, apply (if technical) |

---

## Full Reference

- **APPROVEDLIST.md** - Approved words, active voice patterns, scar tissue format
- **BANLIST.md** - Complete list of banned phrases
- **ai-slop-audit.md** - Latest audit results and action plan

---

## Frequency

Run this audit:
- **Before submitting PR** with content changes
- **Before major releases** to catch drift
- **Quarterly** as routine maintenance

---

## Last Updated

2026-05-02

## Owner

Quality Assurance - Language Standards
