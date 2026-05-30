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

1. **Hero + Hiring CTA**: Compact version of Frame 1.
2. **Skill Chips**: Horizontally scrollable or wrapped chips.
3. **Featured Outputs**: 2 large cards (vertical stack), prioritized as the main proof of work.
4. **Implementation Articles**: Compact cards for easier scrolling.
5. **Supporting Systems**: Compact rows (icon + title), minimizing vertical "wall of cards" effect.
6. **Ecommerce Experiments**: Brief summary section.
7. **Contact CTA**: Large, sticky-ready button or prominent final section.

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
