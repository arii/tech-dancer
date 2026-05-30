# UX Storyboard & Visual Redesign Plan: /research

## Goal
Optimize the `/research` (DevAI Portfolio) page for hiring managers and recruiters to quickly evaluate DevAI and AI engineering capabilities.

## Desktop Storyboard

### Frame 1: Landing / First Viewport
- **Navigation**: DevAI Systems Portfolio (Label: `HIRE_ME`)
- **Main Heading**: AI-assisted software systems: GitHub review agents, data pipelines, scraping workflows, Vercel deployments, ecommerce automation, and production React apps.
- **Primary CTAs**:
  - `[View flagship projects]` (Anchor to Frame 2)
  - `[Read implementation articles]` (Anchor to Frame 5)
  - `[Contact]` (Anchor to Frame 7)
- **Skill Chips**: `React` · `Vite` · `TypeScript` · `GitHub Actions` · `Vercel` · `Playwright` · `Python` · `LLM workflows`

### Frame 2: Featured Outputs (Flagship Projects)
- **Section Heading**: Featured Outputs
- **Layout**: Two large, high-impact cards (side-by-side or stacked with distinct visual weight).
- **Cards**:
  1. **BoomTick.blog** (The system itself)
  2. **RepoAuditor AI**
- **Card Content Structure**:
  - **Problem**: What was the challenge?
  - **Solution**: How was AI used to solve it?
  - **Outcome**: Measurable result or system capability.
  - **Stack**: Key technologies.
  - **CTA**: `[View Project]` / `[Source Code]`

### Frame 3: DevAI Architecture Map
- **Section Heading**: How the systems fit together
- **Visual**: A simple, high-level diagram (SVG or styled CSS blocks) showing the flow:
  `Content Platform` <-> `PR Review Console` <-> `Data Pipelines` <-> `Quality Automation` <-> `Ecommerce Experiments`
- **Focus**: Connectivity and system orchestration rather than dense text.

### Frame 4: Supporting Systems
- **Section Heading**: Engineering Systems
- **Group 1: Infrastructure & QA**
  - AI PR Review Agent
  - PR Impact & Dependency Analyzer
  - Playwright Visual QA & UX Auditor
- **Group 2: Data & Content**
  - Data Pipeline & Telemetry ETL
  - AI Content Drafting Workflow
  - Event Calendar Automation
- **Visual Style**: Compact cards or list items. Less visual weight than Frame 2.

### Frame 5: Articles & Implementation Guides
- **Section Heading**: Implementation Guides
- **Content**:
  - Data scraper with GitHub Actions
  - Vercel + GitHub Actions deployment
  - AI PR review agent
  - Multi-agent prompt generators
  - Printful product metadata automation
- **Visual Style**: Clean list or grid of article cards with metadata (date, category).

### Frame 6: In-progress Ecommerce Automation
- **Section Heading**: Ecommerce automation experiments
- **Content**:
  - Printful API scripts
  - Product metadata packets
  - SEO-safe descriptions
  - Merch image QA
  - Human-in-the-loop review
- **Note**: Highlights current R&D and "under-the-hood" DevAI work.

### Frame 7: Hire / Contact CTA
- **Section Heading**: Looking for DevAI engineering work
- **Main Copy**: Currently open to roles focusing on AI orchestration, developer experience, and automated delivery pipelines.
- **CTAs**:
  - `[Contact Ariel]` (Email/Form)
  - `[GitHub Profile]`
  - `[LinkedIn]`

---

## Mobile Storyboard (Responsive Flow)

To maintain hierarchy and prevent "mobile wall-of-cards" fatigue, the responsive layout follows a strict consolidation strategy.

### Frame 1: Hero & Immediate Proof
- **Visual Stacking**: Heading -> Dek -> Skills -> Primary CTAs.
- **Design Note**: Reduce vertical padding by 25% compared to desktop. Skills are wrapped chips (max 2 rows) to ensure the first Flagship card is visible "above the fold" or within a single scroll.
- **Priority**: High. This frame must establish credibility immediately.

### Frame 2: Flagship Projects (Consolidated)
- **Layout**: 100% width vertical stack.
- **Card Interior**:
  - Image/Mockup (Optional, if used: aspect-ratio 16:9).
  - Title and **Outcome** are primary.
  - **Problem/Solution/Stack** are condensed into a single "Technical Breakdown" accordion or a tightly spaced metadata list.
- **Priority**: Maximum. These are the primary proof points for hiring.

### Frame 3: Architecture Diagram (Deferred/Simplified)
- **Behavior**: Replaced by a high-level summary text block or a single static "System Map" image that fits the viewport width.
- **Priority**: Medium. Deferred to allow users to reach specific projects faster.

### Frame 4: Engineering & Supporting Systems (Compact List)
- **Behavior**: Collapse from cards into a **single-column list of rows**.
- **Interaction**: Each row shows `[Icon] [Title] [Status]`. Tapping expands to show the description and `[View Assets]` CTA.
- **Goal**: Minimize vertical scroll depth from ~1200px to ~400px.
- **Priority**: Low. Secondary proof.

### Frame 5: Implementation Guides (Scrollable Row or List)
- **Layout**: Vertical list of clean, text-only cards (Title + Date).
- **Limit**: Show only the **3 most recent articles** with a `[See All Articles]` button to prevent infinite scrolling.
- **Priority**: Medium.

### Frame 6: Ecommerce Automation (Footer Teaser)
- **Layout**: Condensed into a single "Current R&D" text box.
- **Priority**: Low.

### Frame 7: Sticky Hire CTA
- **Behavior**: A prominent, high-contrast section at the bottom.
- **Interaction**: The `[Contact]` button remains distinct and large for "fat-finger" accessibility.

---

## Visual Design Plan

### 1. Hierarchy & Scanning
- **Dominance**: Flagship projects (BoomTick, RepoAuditor) must use larger typography and potentially background accents or thumbnails to stand out from secondary tools.
- **Density Control**: Use "compact rows" for secondary engineering systems on mobile to prevent the "wall of cards" fatigue.
- **Section Breaks**: Use subtle border-tops or background shifts to clearly demarcate the 7 frames.

### 2. Storytelling Components
- **Problem/Solution/Outcome Blocks**: Standardize these within the flagship cards to give recruiters quick, "at-a-glance" wins.
- **Architecture Diagram**: Use the `ArchitecturalAssetsList` style or a new minimalist SVG component to visualize the "DevAI Ecosystem".

### 3. Navigation
- **Table of Contents / Quick Links**: A sticky secondary nav or a well-placed hero list to allow jumping between "Projects", "Articles", and "Systems".

## Acceptance Criteria Check
- [x] UX storyboard exists in markdown.
- [x] Desktop and mobile layouts described.
- [x] Flagship projects are visually dominant.
- [x] Secondary tools are compact on mobile.
- [x] Page has clear hiring CTA.
- [x] Visual plan includes articles and ecommerce work.
- [x] Storyboard is ready for implementation agent.
