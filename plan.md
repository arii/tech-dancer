Desired website content:
Website format and content
Home page: 
The Roboticist's Guide to the West Coast Swing
Tools, travel hacks, and comp data to maximize your WCS weekends. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
Welcome to tech-dancer.   Enjoy the west coast swing content or dive into the technical details. (can use an asymmetrical feature grid to separate these paths transitions to color on hover with a "scanning" scanline effect)
Are you a dancer? 
→ Lifestyle blog posts
→ Gear reviews 
Are you looking to hire a roboticist or AI expert?
→ Tech blog posts 
→ Data and Development Lab
—> About/Contact page
Highlight some recent blog posts as cards
Blog Posts
The page is organized into a searchable, categorized "Folio" layout. It prioritizes high-contrast headers and a clean grid, removing non-functional decorative elements like "system status" widgets.
Global Search Hub: A prominent search box at the top of the page allowing users to filter by keywords across all categories.
Primary Navigation Sections
Gear reviews:  every gear review card expands to an actual blog post. This section is only for sharing products people can purchase (affiliate link items)
Travel/Lifestyle: mental health, financial literacy
Credit card analysis for different WCS events 
Post: Why I have the Amex Platninum and Hyatt card
Financial literacy
Note this a post for dancers to remove liability of financial feedback, make sure people use credit cards as debit cards.  Recommend signing up for a Roth IRA and get rid of FOMO. Dont attend events outside your means etc.  I don’t want to share any credit card referral links without adding this post 
All about west coast swing
Post: ignore competition scores and focus on your results – set granular measurable metrics for competitions, record comp videos, and objective analysis 
Post: the majority of above average dancers don’t make it to finals  (this likely lists to an item in the data and development section) 
Post: Why  I am attending Jack & Jill O’Rama 
Include links to gear reviews since Nor Cal competes as a team with a rainbow them
Post: Halloween costumes you can dance in
Pumpkin outf	it with links to gear reviews that includes the headband and jack o lantern stickers
Post: Make any shoe a dance shoe 
Suede your dance shoes 
Potential options and analysis:
split the sticker to  have some on the ball of foot and some on the heel
Just ball of the foot sticker placement
Entire sticker coverage  (I like this best)

Tech: portfolio posts that are for a technical audience .  These should inspire tech people to hire me for consultant or project based work.
Every data lab item will have a corresponding post that is layman description 
how I used github actions to power this site
May include a review of personal thoughts regarding some tech aspect of the industry
Eg the role of AI in Dance (could be cross listed in all about west coast swing)
Eg Pivoting to consulting and project based work (pun intended)
Ai powered content creation and development: 
 Data analytics, blog posts, etc are generated using AI with human feedback in the loop
How I use Jules
Gear Reviews
An easy searchable format for looking up products I recommend see Affiliate links to create 3 stock gear reviews posts
Card based grids (search item) with different rows
Dance equipment
Fashion
Travel Related
Other

Data & Development Lab
These are sophisticated pages for interactive data science, software development,  etc. You can add these initial pages:
[coming soon] SEO analysis and engagement of tech-dancer 
Drafter tool to generate blog posts
[coming soon] WCS prelim scoring data scraper
Flight finder for WCS events
About / Contact

About tech-dancer
Ariel Anders, PhD
MIT Roboticist // WCS Tech-Dancer
My Dance Journey
I started my journey into partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who loves the unique conversation and connection WCS offers.
Why My PhD Matters
I build reliable systems, both in tech and for my dance travel.
Why I Built This Site
People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems.
Financial Strategies for WCS
I love maximizing credit card perks and hotel benefits, which helps me make the convention circuit lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my 'bougie on a budget' travel philosophy.
View Full Professional Background
Contact Page
Have a burning analytical question regarding WCt? Want a lifestyle post about financial literacy or building community t? Or just have feedback on a gear review? I'd love to hear from you.



----

checklist:

Agent Guidelines: The Gold Standard Vite App

This document serves as the primary instruction set for building and maintaining projects within this ecosystem. All code generated or refactored must adhere to these standards.

1. Project Role & Architecture

You are the Coding partner for tech-dancer. Your goal is to produce high-quality, production-ready Vite + React + TypeScript applications that are performant, accessible, and aesthetically superior.

Feature-Based Structure

For apps larger than a few pages, use a feature-based folder structure:

src/assets/: Static files.

src/components/: Shared/reusable UI components.

src/features/: Feature modules (components, hooks, types per feature).

src/hooks/: Global custom hooks.

src/lib/: Utilities, API clients (TanStack Query setup).

src/pages/: Route-level page components.

src/store/: Global state (Zustand).

src/styles/: Global CSS and tokens.css.

src/types/: Shared TypeScript interfaces.

2. Styling & Design Standards (Prevention of "Tailwind Everywhere")

To prevent unmaintainable "class soup" and ensure visual consistency, follow this strict styling hierarchy:

Rule 1: Design Tokens First

Never use arbitrary values in Tailwind (e.g., bg-[#1a1a2e]).

All core design values (colors, spacing, shadows, typography) must be defined as CSS variables in src/styles/tokens.css.

Map these variables in tailwind.config.ts so they are accessible via semantic names (e.g., bg-primary, text-accent).

Rule 2: Componentize Repeated Styles

If a set of Tailwind classes is repeated more than twice, it must be extracted:

Small primitives: Create a dedicated UI component (e.g., Button.tsx, Badge.tsx).

Complex variants: Use cva (Class Variance Authority) to manage state-based styling (hover, active, disabled) instead of long conditional strings.

Rule 3: Tailwind vs. CSS Modules

Use Tailwind for: Layout (flex, grid), spacing (margin, padding), and simple atomic changes.

Use CSS Modules for: Complex animations, Complex CSS (::before, ::after), or when a component requires more than 10-15 utility classes.

Strict Prohibition: No more than 3 levels of nested divs with heavy Tailwind classes in a single file. Break them into sub-components.

Rule 4: Aesthetic Principles

Typography: Pair a high-character Display font with a neutral Body font.

Spatial Layout: Avoid rigid grids. Use intentional asymmetry and generous whitespace (min p-6 or p-8 for containers).

Refinement: Use subtle borders (border-white/10) and layered shadows over solid colors.

3. Technical Stack Standards

TypeScript

Strict Mode: Always enabled.

Typing: No any. Explicitly type props and API responses.

Pattern: Use satisfies for type safety; prefer interface for objects and type for unions.

State & Data

Global: Zustand.

Server: TanStack Query (React Query). Use lib/api/ for fetch functions.

URL: useSearchParams for shareable UI states (filters, tabs).

4. Component Design Patterns

Single Responsibility: One component = one job.

Logic Extraction: Side effects and complex logic belong in custom hooks, not the component body.

Performance: Use lazy + Suspense for routes. Avoid premature useMemo.

Assets: SVGs as React components; lazy load all images.

5. Deployment: GitHub Pages & Actions

Vite Config

// vite.config.ts
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/', // Must match repo name in prod
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})


Critical Files

public/.nojekyll: Mandatory.

Routing: Use Hash Routing (createHashRouter) for zero-config compatibility. If using History API, public/404.html is required.

CI/CD

ci.yml: Run on PRs. Steps: npm ci, lint, type-check (tsc --noEmit), test.

deploy.yml: Use actions/deploy-pages@v4.

6. Testing Protocol

Runner: Vitest.

Pattern: Test user behavior (roles/labels), not implementation details (classes).

Location: Co-locate .test.tsx files.

7. Clarification Protocol

Before starting, confirm:

Styling: Tailwind primitives or CSS Modules for this specific complexity?

Repo Name: For the Vite base path.

State: Is this local useState or should it be in the Zustand store?

Follow these rules strictly to maintain project integrity.

---

## Technical Audit & UX Roadmap (Updated 2026-04-21)

### 1. Aesthetic & Visual Polish
- [x] **Typography & Hierarchy**: Implemented Inter (Sans) and Fraunces (Serif) pairing.
- [x] **Optical Sizing**: Applied -0.02em tracking for display headings.
- [x] **Color & Depth**: Integrated layered shadows and glassmorphism.
- [x] **Consistency**: Standardized `rounded-xl` radii across the system.

### 2. Interaction & Motion
- [x] **Sticky Headers**: Scroll-aware transitions for mobile and desktop navigation.
- [x] **Micro-interactions**: Tactile button scaling and card lift effects.
- [x] **Staggered Reveals**: Entrance animations for grid items.
- [x] **Mobile Transitions**: Right-to-Left spring animation for menu.

### 3. Usability & Functional Excellence
- [x] **Global Search**: CMD+K support and results highlighting.
- [x] **Form Feedback**: Inline validation for email capture.
- [x] **Category Empty States**: "Coming soon" placeholders for empty content feeds.
- [x] **Large Viewport Optimization**: Max-width constraints for 4K displays.

### 4. Automation Suite
- [x] **Linter**: `npm run audit` for design system adherence.
- [x] **TODO Generator**: Automated task derivation from audit reports.
- [x] **AI Debugger**: Context-aware prompt generation for UI fixes.