# PR Context: #428 — feat: add workflow for UX review using playwright-cli
**Author:** @arii

## Description
This PR adds a new agent workflow guide `.agent/workflows/review-ux.md`. It explains how to systematically review and test UI/UX changes interactively using `playwright-cli`, ensuring compliance with the project's anti-patterns via `pnpm run audit`, running the app locally, taking screenshots, and cleaning up background tasks properly.

---
*PR created automatically by Jules for task [814945780026614993](https://jules.google.com/task/814945780026614993) started by @arii*

## Files Changed
- 🟢 `.agent/workflows/review-ux.md`

## Diffs

### `.agent/workflows/review-ux.md` (added)
```diff
@@ -0,0 +1,95 @@
   1 |+---
   2 |+description: Systematically review and test UI/UX changes interactively using playwright-cli
   3 |+---
   4 |+
   5 |+# Review UX Changes
   6 |+
   7 |+0. **Prerequisites**:
   8 |+Ensure project dependencies and `playwright-cli` are installed, and its skills are available.
   9 |+```bash
  10 |+pnpm install
  11 |+npm install -g @playwright/cli@latest
  12 |+playwright-cli install --skills
  13 |+```
  14 |+
  15 |+1. **Pre-flight validation**:
  16 |+```bash
  17 |+pnpm run audit
  18 |+```
  19 |+
  20 |+2. **Start the Application**:
  21 |+```bash
  22 |+pnpm run dev &
  23 |+```
  24 |+
  25 |+3. **Desktop Visual Audit (1440x900)**:
  26 |+```bash
  27 |+playwright-cli open http://localhost:3000/ --headed --viewport-size=1440,900
  28 |+```
  29 |+Verify the following routes and features:
  30 |+- `/`
  31 |+- `/about`
  32 |+- `/blog`
  33 |+- `/gear`
  34 |+- `/research`
  35 |+- Search modal
  36 |+Verify: Design consistency, typography, Recharts rendering, and ContentCard/GearCard 16:9 aspect ratio.
  37 |+```bash
  38 |+playwright-cli snapshot
  39 |+playwright-cli screenshot --filename=desktop-home.png
  40 |+```
  41 |+
  42 |+4. **Mobile Visual Audit (390x844)**:
  43 |+```bash
  44 |+playwright-cli open http://localhost:3000/ --headed --viewport-size=390,844
  45 |+```
  46 |+Verify the same routes and features, plus:
  47 |+- Mobile navigation bar (`pb-[safe-area-inset-bottom]`)
  48 |+- Mobile spacing and tap targets
  49 |+- Search modal overlay and Z-index collisions (ensure no overlap with header/hamburger menu)
  50 |+```bash
  51 |+playwright-cli snapshot
  52 |+playwright-cli screenshot --filename=mobile-home.png
  53 |+```
  54 |+
  55 |+5. **Cleanup**:
  56 |+```bash
  57 |+playwright-cli close-all
  58 |+npx kill-port 3000
  59 |+```
  60 |+
  61 |+6. **Evaluate Against Core Design Principles**:
  62 |+Systematically review your screenshots and interactive sessions against these heuristics:
  63 |+- **Spatial Design & Layout**: Grouping, whitespace, consistent padding.
  64 |+- **Typography**: Visual hierarchy, line heights, font weights.
  65 |+- **Color & Contrast**: Accessibility, interactive states, minimum 4.5:1 contrast ratio.
  66 |+- **Interaction & Motion**: Hover/focus states, purposeful transitions.
  67 |+- **Cognitive Load & UX Writing**: Choice architecture, action-oriented labels, empty states.
  68 |+
  69 |+7. **Structure Your UX Feedback**:
  70 |+When logging UX issues from your Playwright snapshots, always use a standardized format:
  71 |+- **Observation**: What is currently happening in the UI?
  72 |+- **Heuristic / Principle Violated**: Why is this a problem?
  73 |+- **Impact**: How does this affect the user experience?
  74 |+- **Recommendation**: Actionable steps to fix the issue.
  75 |+
  76 |+*Example Feedback Format*:
  77 |+> **[Medium] Contrast ratio failure on /blog read-more buttons**
  78 |+> - **Observation**: The "Read More" text is `text-gray-400` on a `bg-gray-50` background.
  79 |+> - **Principle**: Accessibility (Color & Contrast).
  80 |+> - **Impact**: Fails WCAG AA standards; difficult for visually impaired users to read.
  81 |+> - **Recommendation**: Change the text class to `text-gray-600` or darker.
  82 |+
  83 |+8. **Assign Severity Scores**:
  84 |+Categorize your UX feedback so the engineering team knows what to prioritize:
  85 |+- **Critical (P0)**: Broken functionality, blocking overlap, severe accessibility failures.
  86 |+- **High (P1)**: Major visual bugs, confusing navigation, high cognitive load.
  87 |+- **Medium (P2)**: Inconsistent design tokens, missing hover states, minor responsive quirks.
  88 |+- **Low/Polish (P3)**: Micro-interaction tweaks, slight spacing adjustments.
  89 |+
  90 |+9. **Consolidate and Share Results**:
  91 |+Compile the Playwright artifacts into a comprehensive UX report:
  92 |+- Create a PR comment or markdown document titled `UX Audit: [Feature Name]`.
  93 |+- Embed the relevant Playwright screenshots.
  94 |+- List the structured feedback categorized by severity.
  95 |+- Provide a checklist of actionable recommendations to address the findings.
  96 |\ No newline at end of file
```