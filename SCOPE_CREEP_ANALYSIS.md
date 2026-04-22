# PR Scope Creep Analysis

**Generated:** 2026-04-21 23:22 UTC

## Purpose

This document identifies PRs with scope creep—where multiple unrelated features or concerns have been bundled together—and provides actionable recommendations for splitting them into focused, single-purpose PRs.

---

## 🔴 HIGH PRIORITY: Confirmed Scope Creep

### PR #137 — Three Separate Tools (+754/-137, 35 files)

**Current Status:** Being split by maintainer into 3 PRs

**Identified Scope Creep:**
1. **Linting Tool** (`detect-antipatterns.mjs`) - Scans for raw Tailwind violations
2. **AI Debugger** (`ai-debugger.mjs`, `capture-screenshots.mjs`) - Screenshot + prompt generation
3. **UX Changes** (`GlobalSearch.tsx` +68/-32, `Navigation.tsx` +41/-11, `ContentCard.tsx` +6/-2)

**Why This is Problematic:**
- Three completely unrelated concerns bundled together
- Linting tool could merge immediately but is blocked by unrelated features
- AI debugger has architectural concerns (snapshot collection methodology)
- UX changes should be reviewed separately from dev tooling
- Makes review/testing/rollback significantly harder

**Recommendation:** ✅ **Already being split** - Maintainer is creating 3 separate PRs
1. PR-A: Linting tool only (detection + CI integration)
2. PR-B: AI debugger tool (after snapshot methodology debate resolved)
3. PR-C: UX improvements (after design system compliance verified)

---

## 🟡 MEDIUM PRIORITY: Potential Scope Creep

### PR #148 — Contact Page + PageHeader + Animations (+343/-178, 15 files)

**Primary Scope:** Contact page refactor (stated in title)

**Identified Scope Creep:**
1. **Core Feature:** Contact page UX improvements (`ContactConsole.tsx` +190/-146)
2. **Shared Component Changes:**
   - `PageHeader.tsx` +42/-6 (affects ALL pages using this component)
   - `Box.tsx`, `Footer.tsx`, `Text.tsx` (layout primitive changes)
3. **New Animation System:** `src/lib/animations.ts` +57/-0 (brand new utility module)
4. **Design Token Additions:** `design-tokens.ts` +11/-0
5. **Variant System Changes:** `variants.ts` +1/-0
6. **Unrelated Component Updates:**
   - `ContentCard.tsx`, `HeroPathCard.tsx`, `EventCard.tsx` (why are these in a contact page PR?)
   - `ArielProfile.tsx`, `ResearchAnalytics.tsx`

**Why This is Concerning:**
- PageHeader changes affect 10+ pages but are buried in a "Contact Page" PR
- New animation system should be its own infrastructure PR
- Changes to Box/Text/Footer are foundational and affect entire app
- Unrelated component updates suggest drift from original goal

**Conflicts With:** PR #106 (both modify contact page - #148 is broader but less focused)

**Recommendation:** 
1. **Option A (Conservative):** Split into 3 PRs
   - PR-148a: Contact page only (ContactConsole + use-contact-form)
   - PR-148b: PageHeader standardization (affects all pages - needs separate review)
   - PR-148c: Animation utility system (infrastructure PR)

2. **Option B (Pragmatic):** If #106 merges first
   - Close #148 with thanks
   - Cherry-pick PageHeader improvements into new PR-148b
   - Cherry-pick animations.ts into new PR-148c

---

### PR #154 — Page Component Issues (+519/-346, 14 files)

**Primary Scope:** "Address Page-Specific Component Issues"

**Identified Scope Creep:**
1. **Dashboard Changes:** Dashboard.tsx, RecentPosts, UpcomingEvents
2. **Blog System Changes:** BlogFeed, BlogPost, BlogPostContent, useBlog
3. **Resource System Changes:** ResourceGallery, useResources
4. **Contact System Changes:** ContactConsole refactor, ContactForm, ContactSuccess

**Why This is Concerning:**
- Title says "page-specific" but changes 4 major feature areas
- 507 net additions across diverse functionality
- Each subsystem (Dashboard/Blog/Resources/Contact) could be its own PR
- Testing/review burden is very high
- Rollback complexity if one subsystem has issues

**Recommendation:**
1. **Split by Feature Area:**
   - PR-154a: Dashboard lazy loading (Dashboard + RecentPosts + UpcomingEvents)
   - PR-154b: Blog hooks refactor (BlogFeed + BlogPost + useBlog)
   - PR-154c: Resource improvements (ResourceGallery + useResources)
   - PR-154d: Contact refactor (ContactConsole + ContactForm + ContactSuccess)

2. **Merge Order:** Dashboard → Blog → Resources → Contact (least to most complex)

---

### PR #166 — UX Auditor + Plan.md Cleanup (+1285/-222, 9 files)

**Primary Scope:** "Add Visual UX Auditor page and capture script"

**Identified Scope Creep:**
1. **Core Feature:** UX Auditor page + hook + script (+630 lines)
2. **Large Deletion:** `plan.md` -221 lines (why is this in a feature PR?)
3. **Unrelated Changes:** 
   - `ResearchAnalytics.tsx` +1/-1 (unrelated bug fix?)
   - `useResearch.ts` +7/-0 (research feature changes)
4. **Massive Lock File:** `pnpm-lock.yaml` +637/-0 (Playwright dependencies)

**Why This is Concerning:**
- Deleting 221 lines from plan.md is a separate maintenance task
- Research feature changes unrelated to UX auditing
- Could split into: (1) UX auditor feature, (2) plan.md cleanup

**Recommendation:**
1. **Option A:** Split into 2 PRs
   - PR-166a: UX Auditor feature only
   - PR-166b: Project cleanup (plan.md deletion + stale doc cleanup)

2. **Option B:** Remove plan.md changes from #166, merge as-is for UX auditor
   - Handle plan.md cleanup in separate housekeeping PR

---

## 🟢 LOW PRIORITY: Minor Scope Questions

### PR #106 vs #148 — Contact Page Overlap

**Analysis:**
- Both PRs refactor `ContactConsole.tsx`
- #106: Focused, smaller (+282/-230, 7 files)
- #148: Broader, more ambitious (+343/-178, 15 files)

**Not Scope Creep Per Se**, but creates conflict/redundancy

**Recommendation:** 
- Merge #106 first (more focused)
- Re-evaluate #148 afterward (may be superseded, or just extract PageHeader/animations)

---

### PR #165 — GitHub Collab Tool (+1020/-0, 8 files)

**Scope:** "Add GitHub Collaborative Dev Tool"

**Files:**
- Core tool: `gh_collab.py` +408, `fetch_pr_review_data.py` +124, `submit_pr_review_data.py` +208
- Documentation: `AGENTS.md` +43, `dev-tools/README.md` +73
- Templates: `.agent/workflows/review-pr.md` +30, `.github/PULL_REQUEST_REVIEW_TEMPLATE.md` +128

**Analysis:** ✅ **No scope creep detected**
- All changes directly support the stated goal
- Documentation additions are appropriate
- High line count is justified (it's a complete collaborative toolset)

**Recommendation:** ✅ Approve as-is (once reviewed)

---

## 📋 Summary: Scope Creep by PR

| PR | Size | Scope Creep Level | Action Required |
|----|------|-------------------|-----------------|
| **137** | 754+ | 🔴 HIGH | ✅ Being split into 3 PRs |
| **148** | 343+ | 🟡 MEDIUM | Split into contact/header/animations |
| **154** | 519+ | 🟡 MEDIUM | Split into 4 feature-specific PRs |
| **166** | 1285+ | 🟡 LOW-MEDIUM | Remove plan.md cleanup |
| **165** | 1020+ | ✅ NONE | No action needed |
| **106** | 282+ | ✅ NONE | Focused, no creep |
| **163** | 153+ | ✅ NONE | Issue planner only |
| **164** | 155+ | ✅ NONE | vdev tool only |
| **158** | N/A | ✅ NONE | Backend ETL only |
| **157** | N/A | ✅ NONE | Vite config only |

---

## 🎯 Recommended Actions

### Immediate (Request PR Author to Split)

1. **PR #148** - Request split into:
   - Contact page changes only
   - PageHeader standardization (separate PR)
   - Animation system (separate PR)

2. **PR #154** - Request split into:
   - Dashboard improvements
   - Blog refactor
   - Resource improvements
   - Contact refactor

### Monitor (Review for Unnecessary Changes)

3. **PR #166** - Request removal of:
   - plan.md deletion (-221 lines)
   - Unrelated ResearchAnalytics fix
   - Consider keeping only UX auditor feature

### Already Addressed

4. **PR #137** ✅ - Maintainer already splitting into 3 PRs

---

## 🔍 How to Prevent Scope Creep

### For PR Authors
1. **One Goal per PR** - If you can't describe the PR in one sentence, it's too broad
2. **Resist "While I'm Here" Changes** - File separate issues for unrelated improvements
3. **Infrastructure Changes = Separate PRs** - New utilities, design tokens, animations should be standalone
4. **Shared Component Changes** - If it affects 5+ pages, it deserves its own PR

### For Reviewers
1. **Check File Count** - If >15 files changed, look for unrelated changes
2. **Check Line Count** - If >500 additions, verify all changes support ONE goal
3. **Check "Why"** - If you can't explain why every file is in this PR, flag it
4. **Use This Checklist:**
   - [ ] Does every changed file directly support the PR title/description?
   - [ ] Are there infrastructure/shared component changes that should be separate?
   - [ ] Could this PR be split into 2+ independent PRs?
   - [ ] Would splitting make review/testing/rollback easier?

---

## 📊 Impact Assessment

### Benefits of Splitting PRs
- ✅ Faster review cycles (small PRs review 3-5x faster)
- ✅ Easier testing (focused test scope)
- ✅ Safer merges (smaller blast radius)
- ✅ Better git history (clear, atomic changes)
- ✅ Easier rollback (can revert one feature without affecting others)

### Cost of NOT Splitting
- ❌ Review bottleneck (reviewers overwhelmed by scope)
- ❌ Higher bug risk (too much to test thoroughly)
- ❌ Merge conflicts (more files = more conflict surface area)
- ❌ Rollback nightmares (can't revert part of a PR)
- ❌ Lost context (hard to understand "why" 6 months later)

---

**Next Update:** After maintainer responds to split requests
