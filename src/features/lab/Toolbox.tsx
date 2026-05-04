import { Box, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useToolbox } from './useToolbox';
import { NavLink } from 'react-router-dom';

export default function Toolbox() {
  const { gearItems, tagColors } = useToolbox();

  return (
    <Box as="section" className="bg-bg text-text-main">
      <SEO
        title="Toolbox"
        description="West Coast Swing gear reviews, travel essentials, and practical picks for dancers."
      />
      <Box paddingX={{ base: 4, sm: 6, md: 10 }} paddingY={{ base: 6, md: 14 }}>
        <Box as="section" className="max-w-6xl">
          <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">
            The Toolbox
          </Text>
          <Text as="h1" variant="display" size="5xl" weight="font-black" className="text-3xl 4xl 5xl">
            Gear Reviews
          </Text>
          <Text variant="body" size="base" className="max-w-3xl leading-7 text-text-dim">
            Honest reviews of the gear, travel essentials, and accessories that keep WCS dancers moving.
          </Text>

          <Box display="flex" wrap gap={2} padding={3} className="rounded-2xl border border-border/80 bg-surface shadow-sm">
            <Box as="span" display="inline-flex" align="center" className="rounded-full border border-primary/30 bg-surface text-xs font-semibold uppercase tracking-widest text-accent">
              Best for travel
            </Box>
            <Box as="span" display="inline-flex" align="center" className="rounded-full border border-secondary/30 bg-surface text-xs font-semibold uppercase tracking-widest text-accent">
              Highly recommended
            </Box>
            <Box as="span" display="inline-flex" align="center" className="rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold uppercase tracking-widest text-accent">
              Competition ready
            </Box>
          </Box>

          <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4}>
            {gearItems.map((item) => (
              <Box as="article" key={item.href} display="flex" className="min-h-64 -col rounded-2xl border border-border/80 bg-surface shadow-sm transition-colors hover:border-primary/30">
                <Box display="flex" align="start" justify="between" gap={3}>
                  <Text as="span" variant="sans" size="xs" weight="font-bold" uppercase className={`inline-flex rounded-full border px-2.5 py-1 text-xs tracking-widest ${tagColors[item.tag] ?? "text-text-dim border-border"}`}>
                    {item.tag}
                  </Text>
                  <Box className="text-right">
                    <Box className="text-xs font-bold uppercase tracking-widest text-text-dim">{item.label}</Box>
                    <Box className="font-mono text-xs text-text-dim">{item.rating}/5</Box>
                  </Box>
                </Box>
                <Text as="h2" variant="display" size="lg" weight="font-black" className="leading-snug">
                  {item.title}
                </Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">
                  {item.description}
                </Text>
                <Box as={NavLink} to={item.href} className="rounded-sm text-xs font-bold uppercase tracking-widest text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" aria-label={`Read review ${item.title}`}>
                  Read Review
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
