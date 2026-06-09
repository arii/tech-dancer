# Actionable UX Storyboard: /research Redesign

## Goal
Optimize the DevAI Portfolio for high-signal recruiting.

## Baseline Checkpoints
The current `/research` visual baseline includes:
- **Hero**: Clear dark editorial style, large H1, and concise intro text.
- **First Flagship Row**: Prominent project preview cards immediately following the intro.
- **Mobile Stack**: Desktop elements flow into a vertical stack; mobile density remains the main risk as new modules are layered in.

## Accepted Changes

### Frame 1: Hero & Capability Alignment
- **Current Baseline**: Large H1 and intro text (see Baseline Checkpoints).
- **Problem**: Text-heavy intro delays "proof of work" on mobile.
- **Goal**: Establish technical stack and mission in first viewport without increasing mobile scroll depth.
- **Action**:
  - Reduce vertical padding by 20%.
  - Wrap skills into max 2 rows.
  - Add "Explore Projects" anchor CTA to skip to the first flagship row.
- **Responsive Priority**: Maximum (First Viewport). Mobile Note: Ensure the hero text and "Explore Projects" CTA fit entirely within the initial mobile screen.
- **Implementation**: PR-A (Layout Primitives)

### Frame 2: Flagship Proof (Featured Outputs)
- **Current Baseline**: 2-column grid of project cards (First Flagship Row).
- **Problem**: Problem/Solution/Outcome logic is buried in long descriptions.
- **Goal**: Surface ROI and scale metrics immediately for scannability.
- **Action**:
  - Implement 160-char blocks for Problem/Solution/Outcome.
  - Add visual "Proves" tags for specific skills (e.g., "RAG", "Multi-Agent").
- **Responsive Priority**: Maximum (Primary Proof). Mobile Note: The first project card must appear immediately below the hero on scroll, maintaining a clear visual hierarchy. Stack cards vertically on mobile.
- **Implementation**: PR-B (Content Configuration)

### Frame 3: Standardized Implementation Guides
- **Current Baseline**: Mixed-style article cards below the flagship row.
- **Problem**: Inconsistent metadata and infinite scrolling inflate mobile density.
- **Goal**: Direct traffic to technical deep-dives without extending the page length excessively.
- **Action**:
  - Limit to 3 items.
  - Card style: Large title + Mono metadata (Date · Category).
  - Add `See All Articles` ghost button linking to `/blog?category=research`.
- **Responsive Priority**: Medium (Mobile Order: 4). Mobile Note: Display as a compact vertical list to save space.
- **Implementation**: PR-B (Content Configuration)

### Frame 4: Engineering Systems Consolidation
- **Current Baseline**: Multi-card grid.
- **Problem**: "Wall of cards" pushes project proof too far down the page on mobile (1200px+ scroll depth).
- **Goal**: Scannable secondary proof that respects mobile density.
- **Action**:
  - Desktop: Keep grid.
  - Mobile: Transform cards into 48px rows with [Icon][Title][Status]. Tap row to expand description.
- **Responsive Priority**: High (Mobile Order: 5). Mobile Note: Must transform into dense, touch-friendly 48px rows to prevent the mobile page from feeling excessively long.
- **Implementation**: PR-A (Layout Primitives)

### Frame 5: Hardened Hiring CTA
- **Current Baseline**: Standard footer at the bottom of the stack.
- **Problem**: Weak "Contact" signals.
- **Goal**: Immediate conversion for hiring managers.
- **Action**:
  - Sticky mobile CTA (surface: accent) appearing after Frame 2.
  - Desktop: High-contrast "Open for Work" banner.
- **Responsive Priority**: High (Conversion). Mobile Note: Implement sticky mobile CTA immediately after the flagship proof to capture intent.
- **Implementation**: PR-A (Layout Primitives)

## Future Work

### Frame 6: System Orchestration Map
- **Baseline**: None.
- **Problem**: Users see isolated tools, not a cohesive DevAI system.
- **Goal**: Visualize how "Blog -> Audit -> Pipeline" connects.
- **Action**: Create `DevAIEcosystemMap` SVG component using the following node/edge data:
  ```json
  {"nodes": ["Platform", "Review Console", "Data ETL"], "edges": ["Audit Flow", "Sync"]}
  ```
- **Responsive Priority**: Medium (Deferred on mobile). Mobile Note: Hide or provide a simplified static version on mobile to prevent layout clutter.
- **Implementation**: PR-C (Visual Components)

### Frame 7: Ecommerce R&D Section
- **Baseline**: Hidden/Internal tools.
- **Problem**: Current automation work (Printful/SEO) is invisible to recruiters.
- **Goal**: Demonstrate current active research.
- **Action**: Add single "In-Progress: SEO-Safe Merch Automation" block.
- **Responsive Priority**: Low.
- **Implementation**: PR-D (R&D Showcase)
