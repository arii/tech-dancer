# Actionable UX Storyboard: /research Redesign

## Goal
Optimize the DevAI Portfolio for high-signal recruiting.

## Implementation Roadmap

### Frame 1: Hero & Capability Alignment
- **Current Baseline**: Large H1 and intro text.
- **Problem**: Text-heavy intro delays "proof of work" on mobile.
- **Goal**: Establish technical stack and mission in first viewport.
- **Action**:
  - Reduce vertical padding by 20%.
  - Wrap skills into max 2 rows.
  - Add "Explore Projects" anchor CTA.
- **Responsive Priority**: Maximum (First Viewport).
- **Implementation**: PR-A (Layout Primitives)

### Frame 2: Flagship Proof (Featured Outputs)
- **Current Baseline**: 2-column grid of project cards.
- **Problem**: Problem/Solution/Outcome logic is buried in long descriptions.
- **Goal**: Surface ROI and scale metrics immediately.
- **Action**:
  - Implement 160-char blocks for Problem/Solution/Outcome.
  - Add visual "Proves" tags for specific skills (e.g., "RAG", "Multi-Agent").
- **Responsive Priority**: Maximum (Primary Proof).
- **Implementation**: PR-B (Content Configuration)

### Frame 3: System Orchestration Map (Future Work)
- **Baseline**: None.
- **Problem**: Users see isolated tools, not a cohesive DevAI system.
- **Goal**: Visualize how "Blog -> Audit -> Pipeline" connects.
- **Action**: Create `DevAIEcosystemMap` SVG component using the following node/edge data:
  ```json
  {"nodes": ["Platform", "Review Console", "Data ETL"], "edges": ["Audit Flow", "Sync"]}
  ```
- **Responsive Priority**: Medium (Deferred on mobile).
- **Implementation**: PR-C (Visual Components)

### Frame 4: Standardized Implementation Guides
- **Current Baseline**: Mixed-style article cards.
- **Problem**: Inconsistent metadata and infinite scrolling.
- **Goal**: Direct traffic to technical deep-dives.
- **Action**:
  - Limit to 3 items.
  - Card style: Large title + Mono metadata (Date · Category).
  - Add `See All Articles` ghost button linking to `/blog?category=research`.
- **Responsive Priority**: Medium (Mobile Order: 4).
- **Implementation**: PR-B (Content Configuration)

### Frame 5: Engineering Systems Consolidation
- **Current Baseline**: Multi-card grid.
- **Problem**: "Wall of cards" on mobile (1200px+ scroll depth).
- **Goal**: Scannable secondary proof.
- **Action**:
  - Desktop: Keep grid.
  - Mobile: Transform cards into 48px rows with [Icon][Title][Status].
  - Tap row to expand description.
- **Responsive Priority**: High (Mobile Order: 5).
- **Implementation**: PR-A (Layout Primitives)

### Frame 6: Ecommerce R&D Section (Future Work)
- **Baseline**: Hidden/Internal tools.
- **Problem**: Current automation work (Printful/SEO) is invisible to recruiters.
- **Goal**: Demonstrate current active research.
- **Action**: Add single "In-Progress: SEO-Safe Merch Automation" block.
- **Responsive Priority**: Low.
- **Implementation**: PR-D (R&D Showcase)

### Frame 7: Hardened Hiring CTA
- **Current Baseline**: Standard footer.
- **Problem**: Weak "Contact" signals.
- **Goal**: Immediate conversion for hiring managers.
- **Action**:
  - Sticky mobile CTA (surface: accent) appearing after Frame 2.
  - Desktop: High-contrast "Open for Work" banner.
- **Responsive Priority**: High (Conversion).
- **Implementation**: PR-A (Layout Primitives)

---

## Visual Baseline Checkpoints (Do Not Break)
- **Style**: Dark editorial system (Background: `muted/surface`, Accent: `cyan`).
- **Typography**: Display H1 for hero, Mono micro for metadata.
- **Interactivity**: 200ms `motion-quick` transitions on all CTAs.
