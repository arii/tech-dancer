import React, { useState } from 'react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PackingItem } from '../types';
import { Footprints, Shirt, Sparkles, Laptop, Backpack, Info, Check } from 'lucide-react';

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
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const packedCount = items.filter(item => checkedIds[item.id]).length;

  return (
    <Stack gap={4} className={className}>
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main">
            Smart Packing Checklist
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Helpful essentials suggested based on your workshops, competitions, and late-night dancing
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-accent font-semibold">
          {packedCount} / {items.length} Packed
        </Box>
      </Box>

      {/* Grid of Styled Packing Cards */}
      <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap={4}>
        {items.map((item) => {
          const isPacked = !!checkedIds[item.id];
          const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.essentials;
          const CategoryIcon = style.icon;

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border bg-surface/80 transition-all cursor-pointer select-none flex flex-col justify-between space-y-3 ${
                isPacked
                  ? 'border-brand-emerald/50 bg-brand-emerald/5 opacity-80'
                  : 'border-line/70 hover:border-accent/40 shadow-sm'
              }`}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border ${style.badge} shrink-0`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>

                  {/* Interactive Checkbox */}
                  <div
                    aria-label={`Mark ${item.name} as packed`}
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      isPacked
                        ? 'bg-brand-emerald border-brand-emerald text-black'
                        : 'border-line/80 bg-muted/60 hover:border-accent'
                    }`}
                  >
                    {isPacked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm font-bold leading-snug transition-colors ${
                    isPacked ? 'text-text-dim line-through' : 'text-text-main'
                  }`}>
                    {item.name}
                  </h4>
                  {item.quantity && item.quantity > 1 && (
                    <span className="text-xs font-mono text-accent font-semibold shrink-0">
                      x{item.quantity}
                    </span>
                  )}
                </div>

                {/* Explicit Rationale Section */}
                <div className="p-2.5 rounded-lg bg-muted/50 border border-line/40 text-xs text-text-dim leading-relaxed flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-text-main font-semibold">Why pack this:</strong>{' '}
                    {item.rationale}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Grid>
    </Stack>
  );
}

