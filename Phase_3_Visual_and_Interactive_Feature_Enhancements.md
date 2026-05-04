# Issue: Migration Plan - Phase 3: Visual & Interactive Feature Enhancements

This issue covers Phase 3 of the style migration plan, focusing on implementing specific visual tweaks, enhancing interactive components, and finalizing UX-related bug fixes. This phase ensures the final polish and functionality of visual elements and user interactions.

**Objective**: Implement specific visual tweaks, enhance interactive components, and finalize UX-related bug fixes. This phase focuses on the final polish and functionality of visual elements and user interactions.

## Detailed Changes:

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

5.  **Enhance Interactive Filter Pills**:
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

              const pills = [
                { label: "Best for travel", color: "text-primary border-primary/30 bg-primary/10" },
                { label: "Highly recommended", color: "text-secondary border-secondary/30 bg-secondary/10" },
                { label: "Competition ready", color: "text-accent-vivid border-accent-vivid/30 bg-accent-vivid/10" }
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

### 3.2. Enhance UX Auditor Page

-   **File**: `src/pages/UXAuditor.tsx`
    -   **Action**: Set `descriptionMaxWidth="full"` for `PageHeader`.
        -   **Old Code**:
            ```typescript
                      <PageHeader
                        label="Visual UX Auditor"
                        title="Multimodal AI Analysis"
                        description="Automated visual regression and UX improvement suggestions across viewports."
                      />
            ```
        -   **New Code**:
            ```typescript
                      <PageHeader
                        label="Visual UX Auditor"
                        title="Multimodal AI Analysis"
                        description="Automated visual regression and UX improvement suggestions across viewports."
                        descriptionMaxWidth="full"
                      />
            ```
        -   *Why*: Ensures the description text is fully responsive and prevents horizontal overflow in narrow viewports.

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

## General Verification Protocol (After Each Phase Merge)

After each phase is merged into `main`, and after the final full migration, execute the following to ensure stability and quality:

-   **Clean Installation**: `rm -rf node_modules && pnpm install`
-   **Full Test Suite**: `pnpm test` (unit and e2e tests)
-   **Lighthouse Audit**: `pnpm run lighthouse` (if configured, to check performance/accessibility regressions)
-   **Production Build & Preview**: `pnpm run build && pnpm run preview`
-   **Comprehensive Manual UX Audit**: As detailed in the original workflow document, focusing on responsiveness and visual fidelity across desktop, tablet, and mobile viewports.

This phased approach facilitates easier code review, reduces the risk of large-scale regressions, and allows for more granular progress tracking.