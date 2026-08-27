import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PackingItem } from '../types';
import { Footprints, Shirt, Sparkles, Laptop, Backpack, Info } from 'lucide-react';

export interface PackingManifestCardProps {
  items?: PackingItem[];
  className?: string;
}

const DEFAULT_ITEMS: PackingItem[] = [
  {
    id: 'p1',
    name: 'Suede-soled WCS Shoes (2 Pairs)',
    category: 'footwear',
    rationale: 'Schedule contains 8+ hours of intensive social dancing & prelims across fast wood floors.',
    quantity: 2,
  },
  {
    id: 'p2',
    name: 'Breathable Workshop & Competition Shirts',
    category: 'attire',
    rationale: 'Calculated 4 daytime workshops + Novice J&J Prelims requiring fresh layer changes.',
    quantity: 5,
  },
  {
    id: 'p3',
    name: 'Electrolyte Packets & Portable Water Bottle',
    category: 'essentials',
    rationale: 'Buffer calculation highlights back-to-back late-night social sessions past 1:00 AM.',
    quantity: 6,
  },
  {
    id: 'p4',
    name: 'Microfiber Towels & Mini Deodorant',
    category: 'toiletries',
    rationale: 'Fast 60-minute warmup buffer between registration and Marshalling.',
    quantity: 2,
  },
  {
    id: 'p5',
    name: 'High-Speed Portable Power Bank',
    category: 'tech',
    rationale: 'Schedules and real-time division callouts streamed via event portal throughout the day.',
    quantity: 1,
  },
  {
    id: 'p6',
    name: 'Compact Shoe Brush & Sole Cleaner',
    category: 'footwear',
    rationale: 'Ballroom floor condition note indicates high-traffic wax coating.',
    quantity: 1,
  },
];

const CATEGORY_STYLES = {
  footwear: {
    label: 'Footwear',
    icon: Footprints,
    badge: 'bg-accent/10 text-accent border-accent/20',
  },
  attire: {
    label: 'Attire',
    icon: Shirt,
    badge: 'bg-surface text-text-main border-line',
  },
  toiletries: {
    label: 'Toiletries',
    icon: Sparkles,
    badge: 'bg-surface text-text-main border-line',
  },
  tech: {
    label: 'Tech & Gear',
    icon: Laptop,
    badge: 'bg-surface text-text-main border-line',
  },
  essentials: {
    label: 'Essentials',
    icon: Backpack,
    badge: 'bg-accent/10 text-accent border-accent/20',
  },
};

export function PackingManifestCard({ items = DEFAULT_ITEMS, className }: PackingManifestCardProps) {
  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Context-Backed Packing Manifest
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Smart items auto-suggested based on schedule observations & travel buffer
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-text-dim">
          {items.length} Items Calculated
        </Box>
      </Box>

      {/* Grid of Styled Packing Cards */}
      <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap={4}>
        {items.map((item) => {
          const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.essentials;
          const CategoryIcon = style.icon;

          return (
            <Box
              key={item.id}
              padding={4}
              radius="md"
              surface="card"
              border
              className="group transition-all hover:border-accent/40 relative"
            >
              <Stack gap={3} justify="between" height="full">
                <Stack gap={3}>
                  <Box display="flex" align="start" justify="between" gap={2}>
                    <Box padding={2} radius="md" className={`border ${style.badge} shrink-0`}>
                      <CategoryIcon className="w-4 h-4" />
                    </Box>
                    <Box paddingX={2} paddingY={1} radius="md" className={`text-xs font-mono font-semibold border ${style.badge}`}>
                      {style.label}
                    </Box>
                  </Box>

                  <Stack gap={1}>
                    <Box display="flex" align="center" justify="between" gap={2}>
                      <Box as="h4" className="text-sm font-bold text-text-main leading-snug">
                        {item.name}
                      </Box>
                      {item.quantity && item.quantity > 1 && (
                        <Box as="span" className="text-xs font-mono text-accent font-semibold shrink-0">
                          x{item.quantity}
                        </Box>
                      )}
                    </Box>
                  </Stack>

                  {/* Explicit Rationale Section */}
                  <Box padding={3} radius="md" surface="subtle" border className="border-line/60">
                    <Box display="flex" align="start" gap={2}>
                      <Info className="w-3.5 h-3.5 text-accent shrink-0" />
                      <Box as="p" className="text-xs text-text-dim leading-relaxed">
                        <strong className="text-text-main font-semibold">Schedule Rationale:</strong>{' '}
                        {item.rationale}
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
}
