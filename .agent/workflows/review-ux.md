---
description: Systematically review and test UI/UX changes interactively using playwright-cli
---

# Review UX Changes

0. **Prerequisites**:
Ensure project dependencies and Playwright are installed:
```bash
pnpm install
./dev-tools/setup-playwright.sh
./dev-tools/setup-python.sh
```

1. **Pre-flight validation**:
```bash
pnpm run audit
```

2. **Start the Application**:
```bash
pnpm run dev &
```

3. **Visual Audit (Desktop & Mobile)**:
```bash
python3 dev-tools/td_cli.py visual-audit
```
This unified command will capture desktop (1440x900) and mobile (390x844) screenshots of all core routes and the search modal, saving them to `design_audit/`.

Verify the generated screenshots for:
- Design consistency, typography, and Recharts rendering.
- ContentCard/GearCard 16:9 aspect ratio.
- Mobile navigation bar (`pb-[safe-area-inset-bottom]`).
- Mobile spacing and tap targets.
- Search modal overlay and Z-index collisions.

4. **Cleanup**:
```bash
npx kill-port 3000
```

5. **Evaluate Against Core Design Principles**:
Systematically review your screenshots and interactive sessions against these heuristics:
- **Spatial Design & Layout**: Grouping, whitespace, consistent padding.
- **Typography**: Visual hierarchy, line heights, font weights.
- **Color & Contrast**: Accessibility, interactive states, minimum 4.5:1 contrast ratio.
- **Interaction & Motion**: Hover/focus states, purposeful transitions.
- **Cognitive Load & UX Writing**: Choice architecture, action-oriented labels, empty states.

6. **Structure Your UX Feedback**:
When logging UX issues from your Playwright snapshots, always use a standardized format:
- **Observation**: What is currently happening in the UI?
- **Heuristic / Principle Violated**: Why is this a problem?
- **Impact**: How does this affect the user experience?
- **Recommendation**: Actionable steps to fix the issue.

*Example Feedback Format*:
> **[Medium] Contrast ratio failure on /blog read-more buttons**
> - **Observation**: The "Read More" text is `text-gray-400` on a `bg-gray-50` background.
> - **Principle**: Accessibility (Color & Contrast).
> - **Impact**: Fails WCAG AA standards; difficult for visually impaired users to read.
> - **Recommendation**: Change the text class to `text-gray-600` or darker.

7. **Assign Severity Scores**:
Categorize your UX feedback so the engineering team knows what to prioritize:
- **Critical (P0)**: Broken functionality, blocking overlap, severe accessibility failures.
- **High (P1)**: Major visual bugs, confusing navigation, high cognitive load.
- **Medium (P2)**: Inconsistent design tokens, missing hover states, minor responsive quirks.
- **Low/Polish (P3)**: Micro-interaction tweaks, slight spacing adjustments.

8. **Consolidate and Share Results**:
Compile the Playwright artifacts into a comprehensive UX report:
- Create a PR comment or markdown document titled `UX Audit: [Feature Name]`.
- Embed the relevant Playwright screenshots.
- List the structured feedback categorized by severity.
- Provide a checklist of actionable recommendations to address the findings.