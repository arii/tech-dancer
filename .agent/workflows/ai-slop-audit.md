# AI Slop Audit & Action Plan

**Audit Date:** 2026-05-02T03:41:09Z  
**Based on:** APPROVEDLIST.md & BANLIST.md

---

## Violations Found

### 1. Weak Intensifiers (2 instances)

**File:** `src/features/profile/useProfile.ts`
**Issue:** "actually" (banned as overused weak intensifier)
**Line:** "I believe in building things that **actually** work."
**Action:** Replace with direct statement
**Fix:** "I believe in building things that work."

**File:** `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`
**Issue:** "actually" 
**Line:** "Is your timing **actually** on beat, or is your build failing?"
**Action:** Replace with direct question
**Fix:** "Is your timing on beat, or is your build failing?"

---

### 2. Corporate Speak: "Curated" (2 instances)

**File:** `src/features/lab/useToolbox.ts`
**Issue:** "curated" (banned corporate speak)
**Line:** "Bright, fun outfits **curated** for movement, comfort, and style on the dance floor."
**Action:** Replace with active verb
**Fix:** "Bright, fun outfits selected for movement, comfort, and style on the dance floor."

**File:** `src/features/profile/useProfile.ts`
**Issue:** "curated"
**Line:** "everything from **curated** gear reviews to my travel-hacking systems."
**Action:** Replace with specific verb
**Fix:** "everything from tested gear reviews to my travel-hacking systems."

---

### 3. Weak Adjectives: "Fantastic"

**File:** `src/features/profile/useProfile.ts`
**Issue:** "fantastic" (AI filler, imprecise)
**Line:** "Attending West Coast Swing (WCS) events became a **fantastic** way for me to travel again after the pandemic."
**Action:** Delete or replace with specific statement
**Fix:** "Attending WCS events enabled me to travel again after the pandemic."

---

### 4. Passive Voice (2 instances)

**File:** `content/posts/2026-04-18-make-shoe-dance.md`
**Issue:** Passive voice "can be"
**Line:** "Buying dedicated dance shoes **can be** expensive and often limited in style."
**Action:** Convert to active voice
**Fix:** "Dedicated dance shoes cost more and offer limited styles."

**File:** `content/posts/2026-04-18-ai-role-dance.md`
**Issue:** Passive voice "is often seen"
**Line:** "Artificial Intelligence **is often seen as** a cold, analytical tool, but in the context of dance, it **can be** deeply clarifying."
**Action:** Convert to active voice with specific statement
**Fix:** "Most people view AI as cold and analytical. In dance, it clarifies movement patterns."

---

## Action Plan

### Priority 1 (Critical - Fix Immediately)

#### 1.1 File: `src/features/profile/useProfile.ts`

**Changes needed:** 4 fixes

**Current (lines in "Why My PhD Matters"):**
```typescript
content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
```

**Fixed:**
```typescript
content: "I believe in building things that work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
```

**Current (lines in "Why I Built This Site"):**
```typescript
content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems."
```

**Fixed:**
```typescript
content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from tested gear reviews to my travel-hacking systems."
```

**Current (lines in "My Dance Background"):**
```typescript
content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
```

**Fixed:**
```typescript
content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and resumed partner dancing at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing and discovered West Coast Swing. The music and style resonated with me. I started dancing both WCS and Lindy Hop. Attending WCS events enabled me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
```

---

#### 1.2 File: `src/features/lab/useToolbox.ts`

**Current:**
```typescript
{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits curated for movement, comfort, and style on the dance floor.' }
```

**Fixed:**
```typescript
{ id: 'fashion', label: 'Row 2: Fashion', description: 'Bright, fun outfits selected for movement, comfort, and style on the dance floor.' }
```

---

### Priority 2 (High - Fix Next)

#### 2.1 File: `content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md`

**Current (in "Next Step" section):**
```markdown
**Next Step:** Check your workflow logs. Is your timing actually on beat, or is your build failing?
```

**Fixed:**
```markdown
**Next Step:** Check your workflow logs. Is your timing on beat, or is your build failing?
```

---

#### 2.2 File: `content/posts/2026-04-18-make-shoe-dance.md`

**Current:**
```markdown
Buying dedicated dance shoes can be expensive and often limited in style. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
```

**Fixed:**
```markdown
Dedicated dance shoes cost more and offer limited styles. My preferred system is to "upgrade" high-comfort sneakers or flats using adhesive suede.
```

---

#### 2.3 File: `content/posts/2026-04-18-ai-role-dance.md`

**Current:**
```markdown
Artificial Intelligence is often seen as a cold, analytical tool, but in the context of dance, it can be deeply clarifying.
```

**Fixed:**
```markdown
Most people view AI as cold and analytical. In dance, it clarifies movement patterns.
```

---

## Execution Steps

### Step 1: Update useProfile.ts
```bash
# File: src/features/profile/useProfile.ts
# Changes: 
# - Remove "actually" from "Why My PhD Matters"
# - Replace "curated" with "tested" in "Why I Built This Site"
# - Replace "fantastic" with direct statement in "My Dance Background"
# - Remove "got back into the swing of things" (cliché phrasing)
```

### Step 2: Update useToolbox.ts
```bash
# File: src/features/lab/useToolbox.ts
# Changes:
# - Replace "curated" with "selected"
```

### Step 3: Update Blog Post - Vercel
```bash
# File: content/posts/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages.md
# Changes:
# - Remove "actually" from "Next Step" section
```

### Step 4: Update Blog Post - Shoe DIY
```bash
# File: content/posts/2026-04-18-make-shoe-dance.md
# Changes:
# - Convert passive voice to active in opening sentence
```

### Step 5: Update Blog Post - AI in Dance
```bash
# File: content/posts/2026-04-18-ai-role-dance.md
# Changes:
# - Convert passive voice to active in opening paragraph
```

### Step 6: Verify No New Violations
```bash
# Run audit commands
for term in "actually" "curated" "fantastic" "can be" "is often seen"; do
  echo "=== Checking for: $term ==="
  grep -r "$term" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md" || echo "✅ None found"
done
```

### Step 7: Build and Test
```bash
pnpm build
pnpm run audit
git status
```

---

## Summary

**Total Violations Found:** 7
**Files Affected:** 5
**Priority 1 (Critical):** 5 violations in 2 files
**Priority 2 (High):** 2 violations in 3 files

**Estimated Time:** 30-45 minutes to fix all violations

---

## Verification Checklist

- [ ] useProfile.ts: Remove "actually"
- [ ] useProfile.ts: Replace "curated" with "tested"
- [ ] useProfile.ts: Replace "fantastic" with direct statement
- [ ] useToolbox.ts: Replace "curated" with "selected"
- [ ] Vercel post: Remove "actually"
- [ ] Shoe DIY post: Convert passive voice
- [ ] AI in Dance post: Convert passive voice
- [ ] Run grep audit for all banned terms
- [ ] Build successfully
- [ ] Commit with clear message

