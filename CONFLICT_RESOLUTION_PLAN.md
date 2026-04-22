# PR Conflict Resolution Plan

**Created:** 2026-04-21 21:48 UTC  
**Status:** 18 of 19 PRs reviewed, conflicts identified

---

## 🚨 CRITICAL CONFLICTS IDENTIFIED

### 1. STRUCTURAL CONFLICT: PR #160 (Must Reject)

**PR #160:** "Remove Over-Abstracted UI Primitives"  
**Impact:** 38 files, +816/-1487 lines  
**Decision:** 🚨 **REJECT AND CLOSE**

**Why it must be rejected:**
- Removes design system foundation (primitives)
- Violates AGENTS.md Rules #3, #20
- Conflicts with PR #137 (linting tools)
- Enables arbitrary Tailwind values
- Net negative for maintainability

**Alternative:** Simplify primitives, don't remove them

---

### 2. FEATURE CONFLICT: PR #106 vs #148 (Contact Page)

**Decision:** HYBRID APPROACH

**Step 1:** Merge #106 (base)
- Better component extraction
- Fewer violations
- Fix `text-[10px]`, React imports first

**Step 2:** Cherry-pick from #148
- PageHeader improvements
- Environment config
- Staggered animations

**Step 3:** Close #148
- Document incorporated features

---

### 3. COMPONENT OVERLAP: UI Refactors

**Sequential merge order:**
1. #161 (Design Standards) - Most isolated
2. #147 (Home Page) - Rebase on #161
3. #154 (Component Refactor) - Rebase on #147, #161
4. #159 (List View) - Rebase on all above

**Common conflict files:**
- `ContentCard.tsx` - Modified by #154, #159, #161
- `Navigation.tsx` - Modified by 5+ PRs
- `GlobalSearch.tsx` - Modified by 4+ PRs

---

## 📊 4-WEEK MERGE TIMELINE

### Week 1: Foundation
- #137 - Linting tools ⭐ FIRST
- #164 - vdev tool
- #163 - Python tooling
- #158 - ETL/backend

### Week 2: Clean + Contact Resolution
- #145, #153, #157, #146
- #106 (fix violations)
- PageHeader from #148
- Close #148

### Week 3: UI Refactors (Sequential)
- #161 → #147 → #154 → #159
- Rebase between each

### Week 4: Cleanup
- #162, #165, #166
- Reject #160

---

## 🔧 DESIGN TOKEN CONSOLIDATION

**Create PR:** "Consolidate Arbitrary Values to Tokens"

**Changes needed:**
- `text-[10px]` → `size='micro'` (5 PRs use this)
- `text-[8px]` → `size='nano'` (1 PR)
- `tracking-[0.2em]` → `tracking='wider'` (7+ files)
- `min-h-[48px]` → `minHeight='touch'`
- `max-w-[1400px]` → `maxWidth='content'`

---

## ✅ PRE-MERGE CHECKLIST

For every PR:
- [ ] No arbitrary Tailwind
- [ ] No React import bloat
- [ ] Primitives used for layout
- [ ] `npm run audit` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] Rebased on main

---

**See `REVIEW_TRACKING.md` for detailed status.**
