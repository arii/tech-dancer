# Issue: Migration Plan - Phase 1: Content & Data Structure Updates

**Objective**: Integrate new dynamic content, update existing content sections, and establish the necessary data fetching infrastructure. This phase focuses on changes that are primarily content-driven or impact content delivery, without introducing significant styling or layout refactoring.

## Detailed Changes:

### 1.1. Setup Dynamic Event Data

This involves enabling dynamic loading of event data for the "Where Dancers Go" section on the home page.

-   **Action**: Create new markdown files for event content.
    -   **File**: `content/events/mission-city-swing.md`
    ```markdown
    ---
    title: Mission City Swing
    date: 2026-05-01
    author: Ariel Anders
    category: Event
    excerpt: Weekly social dance in San Jose.
    location: San Jose, CA
    city: San Jose
    schedule: Every Wednesday
    description: Mission City Swing is a weekly social dance event in San Jose, California, featuring West Coast Swing. It's a great opportunity to practice, learn, and connect with the local dance community.
    ---
    # Mission City Swing
    Weekly social dance in San Jose.
    ```
    -   **File**: `content/events/us-open-swing-dance-championships.md`
    ```markdown
    ---
    title: US Open Swing Dance Championships
    date: 2026-11-01
    author: Ariel Anders
    category: Event
    excerpt: Annual WCS Championship.
    location: Burbank, CA
    city: Burbank
    schedule: November
    description: The US Open Swing Dance Championships is one of the most prestigious West Coast Swing events globally, attracting dancers from around the world to compete and learn.
    ---
    # US Open Swing Dance Championships
    Annual WCS Championship.
    ```
    -   **File**: `content/events/swing-diego.md`
    ```markdown
    ---
    title: Swing Diego
    date: 2027-01-01
    author: Ariel Anders
    category: Event
    excerpt: Annual WCS Convention.
    location: San Diego, CA
    city: San Diego
    schedule: January
    description: Swing Diego is a vibrant annual West Coast Swing convention held in San Diego, offering workshops, competitions, and social dancing for all levels.
    ---
    # Swing Diego
    Annual WCS Convention.
    ```
    -   *Why*: Provides dynamic event data for the home page, adhering to Jamstack content principles.

-   **Action**: Update content fetching utility to export events.
    -   **File**: `src/lib/content.ts`
    -   **Old Code**:
        ```typescript
        export const getPosts = () => items.posts;
        export const getResources = () => items.resources;
        export const getStudies = () => items.studies;
        ```
    -   **New Code**:
        ```typescript
        export const getPosts = () => items.posts;
        export const getResources = () => items.resources;
        export const getStudies = () => items.studies;
        export const getEvents = () => items.events;
        ```
    -   *Why*: Exposes event data for consumption by components.

-   **Action**: Update home page hook to fetch events dynamically.
    -   **File**: `src/features/dashboard/useHome.ts`
    -   **Old Code Snippet (part 1)**:
        ```typescript
        import { useNavigate } from 'react-router-dom';
        import { useQuery } from '@tanstack/react-query';
        import { getPosts } from '@/lib/content';
        import { Calendar, MapPin } from 'lucide-react';

        /** Matches `artifacts/boomtick/index.html` “Where Dancers Go” cards (venue + location + cadence). */
        export const upcomingEvents = [
          { name: 'Mission City Swing', date: 'San Jose, CA', status: 'Every Wednesday', icon: MapPin },
          { name: 'US Open Swing Dance Championships', date: 'Burbank, CA', status: 'November', icon: Calendar },
          { name: 'Swing Diego', date: 'San Diego, CA', status: 'January', icon: Calendar },
        ];

        export function useHome() {
          const navigate = useNavigate();
          const { data: recentPosts = [] } = useQuery({
            queryKey: ['posts', 'recent'],
            queryFn: () => getPosts().slice(0, 3),
          });
        ```
    -   **New Code Snippet (part 1)**:
        ```typescript
        import { useNavigate } from 'react-router-dom';
        import { useQuery } from '@tanstack/react-query';
        import { getPosts, getEvents } from '@/lib/content';
        import { MapPin } from 'lucide-react';

        /** Matches `artifacts/boomtick/index.html` “Where Dancers Go” cards (venue + location + cadence). */
        export function useHome() {
          const navigate = useNavigate();
          const { data: recentPosts = [] } = useQuery({
            queryKey: ['posts', 'recent'],
            queryFn: () => getPosts().slice(0, 3),
          });

          const { data: upcomingEvents = [] } = useQuery({
            queryKey: ['events', 'upcoming'],
            queryFn: () => getEvents().slice(0, 3), // Fetch first 3 events
          });
        ```
    -   **Old Code Snippet (part 2)**:
        ```typescript
          return { 
                recentPosts, 
                upcomingEvents,
                dancerPaths,
                hirePaths,
                handleNavigateToBlog,
                handleNavigateToPost,
                handleNavigate
              };
            }
            ```
    -   **New Code Snippet (part 2)**:
        ```typescript
          return { 
                recentPosts, 
                upcomingEvents: upcomingEvents.map(event => ({ // Map to original structure
                  name: event.title,
                  date: event.location,
                  status: event.schedule,
                  icon: MapPin, // Default icon, can be dynamic based on event data
                })),
                dancerPaths,
                hirePaths,
                handleNavigateToBlog,
                handleNavigateToPost,
                handleNavigate
              };
            }
            ```
        -   *Why*: Fetches events dynamically and maps them to the expected structure on the homepage.
    -   **Action**: Remove unused `Calendar` import.
        -   **File**: `src/features/dashboard/useHome.ts`
        -   **Old Code**: `import { Calendar, MapPin } from 'lucide-react';`
        -   **New Code**: `import { MapPin } from 'lucide-react';`
        -   *Why*: Clean up unused imports after `upcomingEvents` is dynamically fetched.

### 1.2. Update About Page Content (`src/features/profile/ArielProfile.tsx`)

Align content with `artifacts/boomtick/about.html`.

-   **Action**: Update `SERVICE_CARDS` content.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
        const SERVICE_CARDS = [
          {
            title: "Robotics & Engineering",
            text: "Building scalable, production-ready systems with focus on perception, motion planning, custom visualization, and AWS IoT telemetry.",
            icon: Terminal
          },
          {
            title: "AI Strategy",
            text: "Implementing generative AI to automate internal workflows, content management, and specialized systems like WebBluetooth fitness tracking.",
            icon: Zap
          },
          {
            title: "Digital Presence",
            text: "Handling the technical logistics for artists and niche brands — from functional websites and SEO to booking tools and merch infrastructure.",
            icon: Globe2
          }
        ];
        ```
    -   **New Code**:
        ```typescript
        const SERVICE_CARDS = [
          {
            title: "Robotics & Engineering",
            text: "My background is in robot software engineering and architecture, helping startups build scalable, production-ready systems. My specialized skillsets include perception, motion planning, custom visualization tools, AWS IoT telemetry, and robust CI/CD and DevOps pipelines to keep autonomous fleets reliable and mission-ready.",
            icon: Terminal
          },
          {
            title: "AI Strategy",
            text: "I implement generative AI tools to automate internal workflows and content management. Products built with these tools include boomtick.blog and a heartrate-monitoring WebBluetooth fitness system.",
            icon: Zap
          },
          {
            title: "Digital Presence & Management",
            text: "I help artists and niche brands build the infrastructure they need to grow — from functional websites and merch stores to SEO, booking tools, and content workflows. I handle the technical logistics from start to finish so you can stay focused on your craft.",
            icon: Globe2
          }
        ];
        ```
    -   *Why*: Reflects more detailed and accurate service descriptions.

-   **Action**: Add introductory paragraph to "What I Do Professionally" section.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">What I Do Professionally</Text>
                  <Grid cols={{ base: 1, md: 1 }} gap={4}>
        ```
    -   **New Code**:
        ```typescript
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">What I Do Professionally</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90" marginBottom={4}>I provide high-level technical consulting for startups and project-based digital execution for niche brands.</Text>
                  <Grid cols={{ base: 1, md: 1 }} gap={4}>
        ```
    -   *Why*: Adds introductory text from the artifact.

-   **Action**: Update "Why I Built This Site" section.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**: (This was "The Vision" section previously, which was a `Box` with `Stack` components)
        ```typescript
                {/* The Vision */}
                <section>
                   <Box padding={{ base: 6, md: 10 }} radius="3xl" surface="muted" border className="border-primary/20 bg-primary/5 relative overflow-hidden">
                      <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="primary" opacity={0.05} radius="full" className="blur-3xl" />
                      <Stack gap={8} position="relative" zIndex={10}>
                        <Stack gap={4}>
                          <Text as="h2" size="3xl" weight="font-black" className="text-white">The Vision</Text>
                          <Text className="text-lg leading-relaxed text-text-body/90">
                            <span className="text-primary font-bold">boomtick.blog</span> is where I share the systems behind a sustainable WCS lifestyle. 
                            From practical travel advice and gear selection to event analysis and performance optimization. 
                            It's about finding the small efficiencies that make a big difference over a lifetime of dancing.
                          </Text>
                        </Stack>
                        
                        <Box display="flex" gap={6} wrap className="pt-2">
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">DATA DRIVEN</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">ARTISTICALLY CENTERED</Text>
                           </Box>
                           <Box display="flex" align="center" gap={2}>
                              <Star size={14} className="text-primary fill-primary shrink-0" />
                              <Text variant="mono" size="micro" weight="font-bold" color="brand" className="uppercase tracking-widest whitespace-nowrap">SYSTEMS FOCUSED</Text>
                           </Box>
                        </Box>
                      </Stack>
                   </Box>
                </section>
        ```
    -   **New Code**:
        ```typescript
                {/* Why I Built This Site */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">Why I Built This Site</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90">
                    <span className="text-primary font-bold">boomtick.blog</span> is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that actually helps, event tips, and the small optimizations that make a big difference over a season of dancing.
                  </Text>
                </section>
        ```
    -   *Why*: Aligns with artifact content and simplifies the section.

-   **Action**: Add "What I Love About WCS" and "Financial Strategies for WCS" sections.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**: (The section before the sidebar)
        ```typescript
                </section>
              </Stack>
            </Box>

            {/* Sidebar */}
            <Box as="aside" className="lg:col-span-4">
              <Stack gap={6} className="lg:sticky lg:top-8">
        ```
    -   **New Code**:
        ```typescript
                </section>

                {/* What I Love About WCS */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">What I Love About WCS</Text>
                  <Grid cols={{ base: 1, sm: 3 }} gap={4}>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Star size={24} className="text-primary" />
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Style</Text>
                        <Text className="text-text-body/80">Bright outfits, clean lines, and personal expression.</Text>
                      </Stack>
                    </Box>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Zap size={24} className="text-primary" /> {/* Using Zap for Timing for now */}
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Timing</Text>
                        <Text className="text-text-body/80">Musicality and precision matter just as much as flash.</Text>
                      </Stack>
                    </Box>
                    <Box padding={4} border radius="2xl" surface="surface" className="border-line/40">
                      <Stack gap={2}>
                        <Globe size={24} className="text-primary" /> {/* Using Globe for Travel for now */}
                        <Text as="h3" size="lg" weight="font-bold" className="text-white">Travel</Text>
                        <Text className="text-text-body/80">Every weekend is a chance to see new floors, new people, and new ideas.</Text>
                      </Stack>
                    </Box>
                  </Grid>
                </section>

                {/* Financial Strategies for WCS */}
                <section>
                  <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">Financial Strategies for WCS</Text>
                  <Text className="text-lg leading-relaxed text-text-body/90">
                    I love maximizing credit card perks and hotel benefits, which helps me make the WCS event lifestyle both high-end and feasible. The goal is to spend more energy dancing and less energy stressing over the logistics.
                  </Text>
                </section>
              </Stack>
            </Box>

            {/* Sidebar */}
            <Box as="aside" className="lg:col-span-4">
              <Stack gap={6} className="lg:sticky lg:top-8">
        ```
    -   *Why*: Incorporates new content sections from the artifact.

-   **Action**: Update "At a Glance" section content.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50 shadow-xl">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>At a Glance</Text>
                  <Stack gap={6}>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Location</Text>
                       <Text as="div" weight="font-bold" className="text-white">San Francisco, CA</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Dance Focus</Text>
                       <Text as="div" weight="font-bold" className="text-white">West Coast Swing + Lindy Hop</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Dance Level</Text>
                       <Text as="div" weight="font-bold" className="text-white">Competitive Intermediate Follow</Text>
                    </Box>
                    <Box>
                       <Text as="div" variant="mono" size="micro" color="dim" uppercase tracking="widest" marginBottom={1}>Education</Text>
                       <Text as="div" weight="font-bold" className="text-white">PhD in Computer Science, MIT</Text>
                    </Box>
                  </Stack>
                </Box>
        ```
    -   **New Code**:
        ```typescript
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50 shadow-xl">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>At a Glance</Text>
                  <Text className="text-text-body/80 leading-relaxed">
                    San Francisco, CA<br/>West Coast Swing + Lindy Hop<br/>Competitive Intermediate Follow
                  </Text>
                </Box>
        ```
    -   *Why*: Matches the compact artifact content.

-   **Action**: Update "Connect & Networking" section.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>Connect</Text>
                  <Stack gap={3}>
                    {CONNECT_ITEMS.map((item) => (
                      <Box 
                        key={item.label} 
                        as="a" 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        display="inline-flex" align="center" gap={2} paddingX={4} paddingY={2}
                        className="rounded-full border border-line text-sm font-semibold text-text-body transition-colors hover:border-primary/40 hover:text-white"
                      >
                        {item.label}
                      </Box>
                    ))}
                  </Stack>
                </Box>
        ```
    -   **New Code**:
        ```typescript
                <Box padding={8} border radius="2xl" surface="surface" className="border-line/50">
                  <Text variant="mono" size="xs" weight="font-bold" color="brand" uppercase tracking="widest" marginBottom={6}>Connect & Networking</Text>
                  <Box display="flex" wrap gap={2}>
                    {CONNECT_ITEMS.map((item) => (
                      <Box 
                        key={item.label} 
                        as="a" 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        display="inline-flex" align="center" gap={2} paddingX={4} paddingY={2}
                        className="rounded-full border border-line text-sm font-semibold text-text-body transition-colors hover:border-primary/40 hover:text-white"
                      >
                        {item.label}
                      </Box>
                    ))}
                  </Box>
                </Box>
        ```
    -   *Why*: Renames the section and updates the layout to simple pills.

-   **Action**: Update `CONNECT_ITEMS` to remove icons.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
        const CONNECT_ITEMS = [
          { label: 'Instagram', href: 'https://instagram.com/arii', icon: Instagram },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/arianders', icon: Linkedin },
          { label: 'GitHub', href: 'https://github.com/arii', icon: Github },
          { label: 'Portfolio', href: 'https://arii.github.io', icon: Globe },
        ];
        ```
    -   **New Code**:
        ```typescript
        const CONNECT_ITEMS = [
          { label: 'Instagram', href: 'https://instagram.com/arii' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/arianders' },
          { label: 'GitHub', href: 'https://github.com/arii' },
          { label: 'Portfolio', href: 'https://arii.github.io' },
        ];
        ```
    -   *Why*: Icons are not used in the updated "Connect" section, aligning with artifact content.

-   **Action**: Update "Photo Gallery" title.
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Old Code**:
        ```typescript
          {/* Photo Gallery */}
          <Box paddingTop={12} border="t" className="border-line/30">
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" marginBottom={6}>Photo Gallery // Moments</Text>
            <Grid cols={{ base: 2, md: 3, lg: 6 }} gap={4}>
        ```
    -   **New Code**:
        ```typescript
          {/* Photo Gallery */}
          <Box paddingTop={12} border="t" className="border-line/30">
            <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" marginBottom={6}>Photo Gallery</Text>
            <Text as="h2" size="3xl" weight="font-black" tracking="tight" marginBottom={6} className="text-white">WCS Moments</Text>
            <Grid cols={{ base: 2, md: 3, lg: 6 }} gap={4}>
        ```
    -   *Why*: Aligns title with artifact.

#### Verification for Phase 1:

-   **Dependency Installation**: `pnpm install`.
-   **Code Consistency & Quality Checks**: Run `pnpm run lint`, `pnpm run type-check`, and `pnpm run audit` (ensure no errors or new anti-patterns).
-   **Build Verification**: `pnpm run build`.
-   **Local Development Server**: `pnpm run dev &`.
-   **Comprehensive Manual UX Audit**:
    -   Verify the "Where Dancers Go" section on the home page correctly displays dynamic events.
    -   Confirm all About page content (`SERVICE_CARDS`, new sections, "At a Glance", "Connect", "Photo Gallery") is correctly rendered and aligns with `artifacts/boomtick/about.html` where intended.
    -   Ensure no new layout regressions or console errors.

---

### Phase 2: Core Design System Adherence & Layout Refinements

**Objective**: Refactor components to strictly adhere to the design system's primitives and tokens for spacing, layout, and common styling, and refine general responsive behavior. This phase focuses on systematically replacing raw Tailwind classes with declarative `Box`, `Stack`, and `Grid` props, and utilizing defined design tokens.

**Estimated PRs**: 3-4 feature branches, merged sequentially.

#### Detailed Changes:

1.  **Refactor `ResearchAnalytics.tsx`**:
    -   **File**: `src/features/research/ResearchAnalytics.tsx`
    -   **Action**: Refactor `Text` status element.
        -   **Old Code**:
            ```typescript
                <Text size="micro" weight="font-bold" className="mb-3 uppercase tracking-[0.25em] text-text-dim/65">
                  {tool.status}
                </Text>
            ```
        -   **New Code**:
            ```typescript
                <Text size="micro" weight="font-bold" marginBottom={3} uppercase tracking="widest" color="dim">
                  {tool.status}
                </Text>
            ```
        -   *Why*: Replaces raw spacing and arbitrary tracking with primitive props and design tokens.
    -   **Action**: Refactor `Text` name element.
        -   **Old Code**:
            ```typescript
                <Text as="h2" size="lg" weight="font-bold" className="mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </Text>
            ```
        -   **New Code**:
            ```typescript
                <Text as="h2" size="lg" weight="font-bold" marginBottom={2} className="group-hover:text-primary transition-colors">
                  {tool.name}
                </Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor `Text` layman element.
        -   **Old Code**:
            ```typescript
                <Text size="sm" className="leading-7 text-text-body/72 mb-4">
                  {tool.layman}
                </Text>
            ```
        -   **New Code**:
            ```typescript
                <Text size="sm" marginBottom={4} className="leading-7 text-text-body/72">
                  {tool.layman}
                </Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor `Box` "Launch Console" element.
        -   **Old Code**:
            ```typescript
                <Box display="flex" align="center" gap={2} className="text-text-dim/60 group-hover:text-primary transition-colors mt-auto">
                  <Text weight="font-bold" size="xs" className="uppercase tracking-widest">Launch Console</Text>
                </Box>
            ```
        -   **New Code**:
            ```typescript
                <Box display="flex" align="center" gap={2} marginTop="auto" color="dim" className="group-hover:text-primary transition-colors">
                  <Text weight="font-bold" size="xs" className="uppercase tracking-widest">Launch Console</Text>
                </Box>
            ```
        -   *Why*: Replaces raw spacing and non-token color with primitive props.
    -   **Action**: Refactor `Box` wrapper element for ETL Pipeline Synchronizing.
        -   **Old Code**:
            ```typescript
            <Box className="rounded-2xl border border-dashed border-line/80 bg-surface/40 p-12 text-center shadow-xl relative overflow-hidden">
              <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="accent" opacity={0.03} radius="full" className="blur-3xl" />
            ```
        -   **New Code**:
            ```typescript
            <Box padding={12} className="rounded-2xl border border-dashed border-line/80 bg-surface/40 text-center shadow-xl relative overflow-hidden">
              <Box position="absolute" top={-12} right={-12} width={40} height={40} surface="accent" opacity={0.03} radius="full" className="blur-3xl" />
            ```
        -   *Why*: Replaces raw padding with primitive prop.
    -   **Action**: Refactor `Text` h2 for ETL Pipeline Synchronizing.
        -   **Old Code**:
            ```typescript
              <Text as="h2" size="2xl" weight="font-black" className="mb-3 text-accent uppercase tracking-tighter">ETL Pipeline Synchronizing...</Text>
            ```
        -   **New Code**:
            ```typescript
              <Text as="h2" size="2xl" weight="font-black" marginBottom={3} color="accent" uppercase tracking="tighter">ETL Pipeline Synchronizing...</Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor `Text` description for ETL Pipeline Synchronizing.
        -   **Old Code**:
            ```typescript
              <Text className="mx-auto max-w-2xl text-base leading-8 text-text-body/90">
                The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.
              </Text>
            ```
        -   **New Code**:
            ```typescript
              <Text marginX="auto" maxWidth="2xl" className="text-base leading-8 text-text-body/90">
                The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.
              </Text>
            ```
        -   *Why*: Replaces raw spacing and max-width with primitive props.

2.  **Refactor `ArielProfile.tsx`**:
    -   **File**: `src/features/profile/ArielProfile.tsx`
    -   **Action**: Refactor `Text` description for "What I Do Professionally".
        -   **Old Code**:
            ```typescript
                  <Text className="text-lg leading-relaxed text-text-body/90 mb-4">I provide high-level technical consulting for startups and project-based digital execution for niche brands.</Text>
            ```
        -   **New Code**:
            ```typescript
                  <Text className="text-lg leading-relaxed text-text-body/90" marginBottom={4}>I provide high-level technical consulting for startups and project-based digital execution for niche brands.</Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.

3.  **Refactor `Toolbox.tsx`**:
    -   **File**: `src/features/lab/Toolbox.tsx`
    -   **Action**: Refactor `Box` pills wrapper element.
        -   **Old Code**:
            ```typescript
            <Box className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-line/80 bg-surface/60 p-3 shadow-sm">
            ```
        -   **New Code**:
            ```typescript
            <Box marginBottom={8} display="flex" wrap gap={2} padding={3} className="rounded-2xl border border-line/80 bg-surface/60 shadow-sm">
            ```
        -   *Why*: Replaces raw layout classes with primitive props.
    -   **Action**: Refactor pill `span` element tracking value.
        -   **Old Code**:
            ```typescript
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer", 
                pill.color,
            ```
        -   **New Code**:
            ```typescript
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-emphasized cursor-pointer", 
                pill.color,
            ```
        -   *Why*: Replaces arbitrary tracking value with a design token.

4.  **Refactor `NewsletterBanner.tsx`**:
    -   **File**: `src/features/email-capture/NewsletterBanner.tsx`
    -   **Action**: Refactor `Box` shadow.
        -   **Old Code**:
            ```typescript
              className="bg-surface/95 backdrop-blur-2xl border-t border-line/50 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
              paddingX={{ base: 4, md: 8 }}
            ```
        -   **New Code**:
            ```typescript
              className="bg-surface/95 backdrop-blur-2xl border-t border-line/50"
              shadow="topOverlay"
              paddingX={{ base: 4, md: 8 }}
            ```
        -   *Why*: Replaces arbitrary shadow value with a design token.
    -   **Action**: Refactor `Button` padding.
        -   **Old Code**:
            ```typescript
                aria-label="Dismiss"
                className="text-text-dim/50 hover:text-primary transition-colors p-1 min-w-0"
              >
            ```
        -   **New Code**:
            ```typescript
                aria-label="Dismiss"
                className="text-text-dim/50 hover:text-primary transition-colors min-w-0"
                padding={1}
              >
            ```
        -   *Why*: Replaces raw padding with a primitive prop.
    -   **Action**: Refactor `Text` tracking.
        -   **Old Code**:
            ```typescript
              <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-[0.2em] text-primary">
                Dance Analytics // Gear Reviews // Community Updates
              </Text>
            ```
        -   **New Code**:
            ```typescript
              <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="emphasized" className="text-primary">
                Dance Analytics // Gear Reviews // Community Updates
              </Text>
            ```
        -   *Why*: Replaces arbitrary tracking value with a design token.

5.  **Refactor `Dashboard.tsx`**:
    -   **File**: `src/features/dashboard/Dashboard.tsx`
    -   **Action**: Refactor `Text` "Welcome to boomtick.blog".
        -   **Old Code**:
            ```typescript
            <Text 
              size="xs" 
              weight="font-bold" 
              className="tracking-[0.28em] uppercase text-text-dim mb-4"
            >
              Welcome to boomtick.blog
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text 
              size="xs" 
              weight="font-bold" 
              tracking="widest" uppercase color="dim" marginBottom={4}
            >
              Welcome to boomtick.blog
            </Text>
            ```
        -   *Why*: Replaces raw spacing and arbitrary tracking with primitive props and design tokens.
    -   **Action**: Refactor `Text` "The West Coast Swing Lifestyle Blog".
        -   **Old Code**:
            ```typescript
            <Text as="h1" variant="display" size="fluid-7" weight="font-black" className="leading-[0.96] mb-4 text-white">
              The West Coast Swing
              <br />
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text as="h1" variant="display" size="fluid-7" weight="font-black" leading="snug" marginBottom={4} className="text-white">
              The West Coast Swing
              <br />
            </Text>
            ```
        -   *Why*: Replaces arbitrary leading and raw spacing with primitive props.
    -   **Action**: Refactor "Train Smarter" `Box`.
        -   **Old Code**:
            ```typescript
            <Box 
              position="relative" 
              minHeight={{ base: 280, sm: 320 }} 
              padding={8} 
              justify="end" 
              className="flex flex-col bg-[#0a0c18] group overflow-hidden"
            >
            ```
        -   **New Code**:
            ```typescript
            <Box 
              position="relative" 
              minHeight={{ base: 280, sm: 320 }} 
              padding={8} 
              justify="end" 
              direction="col" surface="card" className="group overflow-hidden"
            >
            ```
        -   *Why*: Replaces raw layout classes and raw hex color with primitive props.
    -   **Action**: Refactor "Train Smarter" `Text` h2.
        -   **Old Code**:
            ```typescript
            <Text as="h2" weight="font-black" size="4xl" className="mb-2 uppercase tracking-tighter text-white drop-shadow-sm">
              Train smarter.
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text as="h2" weight="font-black" size="4xl" marginBottom={2} uppercase tracking="tighter" className="text-white drop-shadow-sm">
              Train smarter.
            </Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor "Train Smarter" `Text` description.
        -   **Old Code**:
            ```typescript
            <Text className="mb-4 max-w-xs text-sm leading-6 text-white/90">
              Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text marginBottom={4} maxWidth="xs" size="sm" className="leading-6 text-white/90">
              Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.
            </Text>
            ```
        -   *Why*: Replaces raw spacing and max-width with primitive props.
    -   **Action**: Refactor "Train Smarter" `NavLink` colors.
        -   **Old Code**: (for each of the 3 `NavLink` elements)
            ```typescript
            <NavLink
              to="/blog?category=Training"
              className="text-sm font-bold text-[#7df9ff] hover:text-white transition-colors drop-shadow-sm"
            >
              WCS Training →
            </NavLink>
            ```
        -   **New Code**:
            ```typescript
            <NavLink
              to="/blog?category=Training"
              color="primary" className="text-sm font-bold hover:text-white transition-colors drop-shadow-sm"
            >
              WCS Training →
            </NavLink>
            ```
        -   *Why*: Replaces arbitrary color with a design token.
    -   **Action**: Refactor "Travel Better" `Box`.
        -   **Old Code**:
            ```typescript
            <Box 
              position="relative" 
              minHeight={{ base: 280, sm: 320 }} 
              padding={8} 
              justify="end" 
              border={{ base: "t", lg: "l" }}
              className="flex flex-col bg-[#0a0c18] border-line group overflow-hidden"
            >
            ```
        -   **New Code**:
            ```typescript
            <Box 
              position="relative" 
              minHeight={{ base: 280, sm: 320 }} 
              padding={8} 
              justify="end" 
              border={{ base: "t", lg: "l" }}
              direction="col" surface="card" className="border-line group overflow-hidden"
            >
            ```
        -   *Why*: Replaces raw layout classes and raw hex color with primitive props.
    -   **Action**: Refactor "Travel Better" `Text` h2.
        -   **Old Code**:
            ```typescript
            <Text as="h2" weight="font-black" size="4xl" className="mb-2 uppercase tracking-tighter text-white drop-shadow-sm">
              Travel better.
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text as="h2" weight="font-black" size="4xl" marginBottom={2} uppercase tracking="tighter" className="text-white drop-shadow-sm">
              Travel better.
            </Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor "Travel Better" `Text` description.
        -   **Old Code**:
            ```typescript
            <Text className="mb-4 max-w-xs text-sm leading-6 text-white/90">
              Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text marginBottom={4} maxWidth="xs" size="sm" className="leading-6 text-white/90">
              Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.
            </Text>
            ```
        -   *Why*: Replaces raw spacing and max-width with primitive props.
    -   **Action**: Refactor "Travel Better" `NavLink` colors.
        -   **Old Code**: (for each of the 3 `NavLink` elements)
            ```typescript
            <NavLink
              to="/blog?category=Travel"
              className="text-sm font-bold text-[#e9d5ff] hover:text-white transition-colors drop-shadow-sm"
            >
              Travel guides →
            </NavLink>
            ```
        -   **New Code**:
            ```typescript
            <NavLink
              to="/blog?category=Travel"
              color="secondary" className="text-sm font-bold hover:text-white transition-colors drop-shadow-sm"
            >
              Travel guides →
            </NavLink>
            ```
        -   *Why*: Replaces arbitrary color with a design token.
    -   **Action**: Refactor "Data Lab CTA" `Box`.
        -   **Old Code**:
            ```typescript
            <Box 
              display="flex" 
              align={{ sm: 'center' }} 
              gap={4} 
              radius="2xl" 
              border 
              padding={6} 
              className="flex-col sm:flex-row border-line/80 bg-surface/60"
            >
            ```
        -   **New Code**:
            ```typescript
            <Box 
              direction={{ base: 'col', sm: 'row' }} 
              align={{ sm: 'center' }} 
              gap={4} 
              radius="2xl" 
              border 
              padding={6} 
              className="border-line/80 bg-surface/60"
            >
            ```
        -   *Why*: Replaces raw layout classes with primitive props.
    -   **Action**: Refactor "Data Lab CTA" label.
        -   **Old Code**:
            ```typescript
            <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-accent mb-2">Data Lab</Text>
            ```
        -   **New Code**:
            ```typescript
            <Text size="xs" weight="font-bold" tracking="widest" uppercase color="accent" marginBottom={2}>Data Lab</Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.
    -   **Action**: Refactor "Data Lab CTA" h3.
        -   **Old Code**:
            ```typescript
            <Text as="h3" size="lg" weight="font-black" className="mb-1 text-white">WCS Competition Analytics</Text>
            ```
        -   **New Code**:
            ```typescript
            <Text as="h3" size="lg" weight="font-black" marginBottom={1} className="text-white">WCS Competition Analytics</Text>
            ```
        -   *Why*: Replaces raw spacing with primitive prop.

6.  **Refactor `FormField.tsx`**:
    -   **File**: `src/features/contact/components/FormField.tsx`
    -   **Action**: Refactor `Text` label tracking.
        -   **Old Code**:
            ```typescript
            <Text as="label" htmlFor={id} variant="mono" size="micro" weight="font-black" className="uppercase tracking-[0.2em] text-primary">
              {label}
            </Text>
            ```
        -   **New Code**:
            ```typescript
            <Text as="label" htmlFor={id} variant="mono" size="micro" weight="font-black" uppercase tracking="emphasized" className="text-primary">
              {label}
            </Text>
            ```
        -   *Why*: Replaces arbitrary tracking value with a design token.

7.  **Refactor `ContactFormView.tsx`**:
    -   **File**: `src/features/contact/components/ContactFormView.tsx`
    -   **Action**: Refactor `Box` textarea `min-h`.
        -   **Old Code**:
            ```typescript
            className={cn(inputClasses, "resize-none min-h-[200px]", errors.message && "border-error/50")}
            ```
        -   **New Code**:
            ```typescript
            minHeight={200}
            className={cn(inputClasses, "resize-none", errors.message && "border-error/50")}
            ```
        -   *Why*: Replaces arbitrary `min-h` value with a primitive prop.

#### Verification for Phase 2:

-   **Dependency Installation**: `pnpm install`.
-   **Code Consistency & Quality Checks**: Run `pnpm run lint`, `pnpm run type-check`, and `pnpm run audit` (aim for zero `[Raw Layout/Spacing]`, `[Arbitrary Value]` errors).
-   **Build Verification**: `pnpm run build`.
-   **Local Development Server**: `pnpm run dev &`.
-   **Comprehensive Manual UX Audit**:
    -   Verify all affected components render correctly and responsively.
    -   Check for consistent spacing, fonts, and colors.
    -   Ensure no new layout regressions or console errors.

---

### Phase 3: Visual & Interactive Feature Enhancements

**Objective**: Implement specific visual tweaks, enhance interactive components, and finalize UX-related bug fixes. This phase focuses on the final polish and functionality of visual elements and user interactions.

**Estimated PRs**: 2-3 feature branches, merged sequentially.

#### Detailed Changes:

1.  **Enhance Equalizer Visuals**:
    -   **File**: `src/components/Equalizer.tsx`
    -   **Action**: Adjust `Equalizer` container padding and gap.
        -   **Old Code**:
            ```typescript
            return (
              <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[3px] overflow-hidden px-4">
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-50"
                />
            ```
        -   **New Code**:
            ```typescript
            return (
              <div className="pointer-events-none relative flex h-full w-full items-end justify-center gap-[4px] overflow-hidden px-4 pb-[18px]">
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/15 via-secondary/8 to-transparent blur-2xl opacity-[.22]"
                />
            ```
        -   *Why*: Matches artifact styling for gap, padding, and glow opacity, improving visual fidelity.
    -   **Action**: Use static gradient and box shadow for `Equalizer` bars.
        -   **Old Code**:
            ```typescript
            style={{
                backgroundColor: bar.color,
                boxShadow: `0 0 10px ${bar.color}`,
                opacity: bar.opacity,
            }}
            ```
        -   **New Code**:
            ```typescript
            style={{
                backgroundColor: 'transparent',
                background: `linear-gradient(180deg, #00CFFF, #8B2FFF, #FF00C8)`,
                boxShadow: `0 0 14px rgba(0,207,255,.2)`,
                opacity: bar.opacity,
            }}
            ```
        -   *Why*: Aligns equalizer bar appearance with artifact.
    -   **Action**: Remove color calculation from `useMemo` in `Equalizer.tsx`.
        -   **Old Code**: (inside `useMemo` -> `bars`)
            ```typescript
                  let color: string;
                  if (adjustedRatio < 0.5) {
                    const pct = Math.round(96 - adjustedRatio * 100);
                    color = `color-mix(in srgb, ${PRIMARY} ${pct}%, ${SECONDARY})`;
                  } else {
                    const pct = Math.round(96 - (adjustedRatio - 0.5) * 100);
                    color = `color-mix(in srgb, ${SECONDARY} ${pct}%, ${ACCENT})`;
                  }
            ```
        -   **New Code**:
            ```typescript
                  // Removed color calculation as we are now using a static linear gradient
                  // let color: string;
                  // if (adjustedRatio < 0.5) {
                  //   const pct = Math.round(96 - adjustedRatio * 100);
                  //   color = `color-mix(in srgb, ${PRIMARY} ${pct}%, ${SECONDARY})`;
                  // } else {
                  //   const pct = Math.round(96 - (adjustedRatio - 0.5) * 100);
                  //   color = `color-mix(in srgb, ${SECONDARY} ${pct}%, ${ACCENT})`;
                  // }
            ```
        -   *Why*: The `color` is no longer dynamically calculated since a static gradient is used.
    -   **Action**: Remove color constants `PRIMARY`, `SECONDARY`, `ACCENT` from `Equalizer.tsx`.
        -   **Old Code**:
            ```typescript
            const NUM_BARS = 28;

            /** HSL brand stops — same intent as `artifacts/boomtick/src/components/Equalizer.tsx` (color-mix across the row). */
            const PRIMARY = 'hsl(190 100% 50%)';
            const SECONDARY = 'hsl(258 90% 66%)';
            const ACCENT = 'hsl(313 100% 50%)';
            ```
        -   **New Code**:
            ```typescript
            const NUM_BARS = 28;
            ```
        -   *Why*: Constants are no longer needed after switching to static gradient.
    -   **Action**: Remove `color` from returned object in `useMemo` in `Equalizer.tsx`.
        -   **Old Code**: (inside `useMemo` -> `bars` -> `return`)
            ```typescript
                  return {
                    color,
                    minH,
                    maxH,
                    delay: i * 0.045,
                    duration: 2.8 + (i % 5) * 0.32,
                    opacity: 0.45 + wave * 0.3,
                  };
            ```
        -   **New Code**:
            ```typescript
                  return {
                    // color, // Removed as it's not used directly anymore
                    minH,
                    maxH,
                    delay: i * 0.045,
                    duration: 2.8 + (i % 5) * 0.32,
                    opacity: 0.45 + wave * 0.3,
                  };
            ```
        -   *Why*: The `color` property is no longer used after implementing static gradient.
    -   **Action**: Remove unused `adjustedRatio` variable from `Equalizer.tsx`.
        -   **Old Code**: `const adjustedRatio = reverse ? 1 - ratio : ratio;`
        -   **New Code**: `// const adjustedRatio = reverse ? 1 - ratio : ratio;`
        -   *Why*: Cleanup of an unused variable after `color` calculation was removed.

4.  **Enhance Interactive Filter Pills**:
    -   **File**: `src/features/lab/useToolbox.ts`
    -   **Action**: Add `selectedPill` state and filtering logic.
        -   **Old Code Snippet (part 1)**:
            ```typescript
            import { useQuery } from '@tanstack/react-query';
            import { useSearchParam } from '@/hooks/useSearchParam';
            import { safeSearch } from '@/lib/utils';
            import { ViewMode } from '@/components/ui/ViewToggle';
            ```
        -   **New Code Snippet (part 1)**:
            ```typescript
            import { useQuery } from '@tanstack/react-query';
            import { useSearchParam } from '@/hooks/useSearchParam';
            import { safeSearch } from '@/lib/utils';
            import { ViewMode } from '@/components/ui/ViewToggle';
            ```
        -   **Old Code Snippet (part 2 - `groupedResources`)**:
            ```typescript
              const groupedResources = useMemo(() => {
                return categories.map(cat => ({
                  ...cat,
                  items: resources.filter(r => safeSearch(r.category, cat.id))
                }));
              }, [resources]);
            ```
        -   **New Code Snippet (part 2 - `groupedResources`)**:
            ```typescript
              const [selectedPill, setSelectedPill] = useSearchParam('pill', 'all');

              const groupedResources = useMemo(() => {
                let filteredResources = resources;

                if (selectedPill && selectedPill !== 'all') {
                  filteredResources = resources.filter(resource => {
                    switch (selectedPill) {
                      case 'Best for travel':
                        return safeSearch(resource.category, 'travel') || resource.tags?.includes('travel');
                      case 'Highly recommended':
                        return resource.tags?.includes('highly recommended');
                      case 'Competition ready':
                        return resource.tags?.includes('competition ready');
                      default:
                        return true;
                    }
                  });
                }

                return categories.map(cat => ({
                  ...cat,
                  items: filteredResources.filter(r => safeSearch(r.category, cat.id))
                }));
              }, [resources, selectedPill]);
            ```
        -   **Old Code Snippet (part 3 - return statement)**:
            ```typescript
              return {
                searchTerm,
                setSearchTerm,
                filteredCategories,
                view,
                setView
              };
            }
            ```
        -   **New Code Snippet (part 3 - return statement)**:
            ```typescript
              return {
                searchTerm,
                setSearchTerm,
                filteredCategories,
                view,
                setView,
                selectedPill,
                setSelectedPill
              };
            }
            ```
        -   *Why*: Enables dynamic filtering of resources based on selected pill.
    -   **File**: `src/features/lab/Toolbox.tsx`
    -   **Action**: Make pills interactive filters.
        -   **Old Code**:
            ```typescript
            export default function Toolbox() {
              const { filteredCategories, searchTerm, setSearchTerm } = useToolbox();

              const allFilteredItems = useMemo(() =>
                filteredCategories.flatMap(cat => cat.items),
              [filteredCategories]);

              return (
                <Box as="section">
                  <SEO
                    title="Toolbox"
                    description="West Coast Swing gear reviews, travel essentials, and practical picks for dancers."
                  />
                  <Box as="header" marginBottom={8}>
                    <PageHeader
                      label="THE TOOLBOX"
                      title="Gear Reviews"
                      description="Honest reviews of the gear, travel essentials, and accessories that keep WCS dancers moving."
                    />

                    <Box className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-line/80 bg-surface/60 p-3 shadow-sm">
                      {[
                        { label: "Best for travel", color: "text-primary border-primary/30 bg-primary/10" },
                        { label: "Highly recommended", color: "text-secondary border-secondary/30 bg-secondary/10" },
                        { label: "Competition ready", color: "text-accent-vivid border-accent-vivid/30 bg-accent-vivid/10" }
                      ].map((badge) => (
                        <span key={badge.label} className={cn("inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]", badge.color)}>
                          {badge.label}
                        </span>
                      ))}
                    </Box>
            ```
        -   **New Code**:
            ```typescript
            export default function Toolbox() {
              const { filteredCategories, searchTerm, setSearchTerm, selectedPill, setSelectedPill } = useToolbox();

              const allFilteredItems = useMemo(() =>
                filteredCategories.flatMap(cat => cat.items),
              [filteredCategories]);

              const pills = [
                { label: "Best for travel", value: "Best for travel", color: "text-primary border-primary/30 bg-primary/10" },
                { label: "Highly recommended", value: "Highly recommended", color: "text-secondary border-secondary/30 bg-secondary/10" },
                { label: "Competition ready", value: "Competition ready", color: "text-accent-vivid border-accent-vivid/30 bg-accent-vivid/10" }
              ];

              return (
                <Box as="section">
                  <SEO
                    title="Toolbox"
                    description="West Coast Swing gear reviews, travel essentials, and practical picks for dancers."
                  />
                  <Box as="header" marginBottom={8}>
                    <PageHeader
                      label="THE TOOLBOX"
                      title="Gear Reviews"
                      description="Honest reviews of the gear, travel essentials, and accessories that keep WCS dancers moving."
                    />

                    <Box marginBottom={8} display="flex" wrap gap={2} padding={3} className="rounded-2xl border border-line/80 bg-surface/60 shadow-sm">
                      {pills.map((pill) => (
                        <span 
                          key={pill.label} 
                          onClick={() => setSelectedPill(pill.value)}
                          className={cn(
                            "inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-emphasized cursor-pointer", 
                            pill.color,
                            selectedPill === pill.value && "ring-2 ring-offset-2 ring-offset-bg ring-current"
                          )}
                        >
                          {pill.label}
                        </span>
                      ))}
                    </Box>
            ```
        -   *Why*: Provides interactive filter pills.

#### Verification for Phase 3:

-   **Dependency Installation**: `pnpm install`.
-   **Code Consistency & Quality Checks**: Run `pnpm run lint`, `pnpm run type-check`, and `pnpm run audit`.
-   **Build Verification**: `pnpm run build`.
-   **Local Development Server**: `pnpm run dev &`.
-   **Comprehensive Manual UX Audit**:
    -   Verify the `Equalizer` visual appearance matches artifacts.
    -   Test the interactive filter pills on the Gear/Toolbox page for correct filtering behavior.
    -   Confirm the UX Auditor page's description is responsive.
    -   Check for any regressions introduced by content changes.

---

## 4. General Verification Protocol (After Each Phase Merge)

After each phase is merged into `main`, and after the final full migration, execute the following to ensure stability and quality:

-   **Clean Installation**: `rm -rf node_modules && pnpm install`
-   **Full Test Suite**: `pnpm test` (unit and e2e tests)
-   **Lighthouse Audit**: `pnpm run lighthouse` (if configured, to check performance/accessibility regressions)
-   **Production Build & Preview**: `pnpm run build && pnpm run preview`
-   **Comprehensive Manual UX Audit**: As detailed in the original workflow document, focusing on responsiveness and visual fidelity across desktop, tablet, and mobile viewports.

This phased approach facilitates easier code review, reduces the risk of large-scale regressions, and allows for more granular progress tracking.