import React from 'react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { ThemeDressCode } from '../types';
import { Sparkles, Shirt, PartyPopper, Award, Tag, CheckCircle2 } from 'lucide-react';

export interface ThemeDressCodeCardProps {
  themes?: ThemeDressCode[];
  className?: string;
}

const DEFAULT_THEMES: ThemeDressCode[] = [
  {
    id: 'theme-fri',
    day: 'Friday Night',
    themeTitle: 'Neon / UV Glow Late Night Party',
    category: 'social_theme',
    description: 'The ballroom turns on blacklights for the midnight social. Dancers wear bright neon shades and UV-reactive apparel.',
    recommendedAttire: ['Neon Yellow/Pink/Green Tops', 'White Accents / UV-glow shoes', 'Glow bracelets & accessories'],
    vibe: 'High Energy & Vibrant',
  },
  {
    id: 'theme-sat',
    day: 'Saturday Evening',
    themeTitle: 'Pro Showcase Gala & Dressy Glam',
    category: 'showcase_formal',
    description: 'The marquee evening featuring Champions Strictly Finals and Pro Routine Showcases. Elevated dancewear and cocktail chic.',
    recommendedAttire: ['Fitted dress shirts / vests', 'Cocktail dresses & dance jumpsuits', 'Polished suede dance shoes'],
    vibe: 'Elegant & Sophisticated',
  },
  {
    id: 'theme-comp',
    day: 'Sat / Sun Prelims',
    themeTitle: 'WSDC Competition Dress Code',
    category: 'competition_attire',
    description: 'Clean, smart casual dancewear adhering to WSDC guidelines. Form-fitting lines with freedom of motion for partnering.',
    recommendedAttire: ['Breathable dance trousers / dark denim', 'Neat fitted shirts / tops', 'Secure bib placement'],
    vibe: 'Professional & Clean',
  },
  {
    id: 'theme-sun',
    day: 'Sunday Night',
    themeTitle: 'Survivor Social & Studio Athleisure',
    category: 'casual_sunday',
    description: 'Late-night chill survivors party until sunrise. Relaxed dance t-shirts, oversized hoodies, and maximum comfort.',
    recommendedAttire: ['Event / Studio t-shirts', 'Stretch joggers / leggings', 'Flat dance sneakers / socks'],
    vibe: 'Cozy & Laid Back',
  },
];

const CATEGORY_CONFIG = {
  social_theme: {
    label: 'Social Theme',
    badge: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40',
    icon: PartyPopper,
    accentBorder: 'hover:border-brand-cyan/60',
  },
  showcase_formal: {
    label: 'Gala & Showcase',
    badge: 'bg-brand-amber/20 text-brand-amber border-brand-amber/40',
    icon: Sparkles,
    accentBorder: 'hover:border-brand-amber/60',
  },
  competition_attire: {
    label: 'WSDC Official',
    badge: 'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/40',
    icon: Award,
    accentBorder: 'hover:border-brand-emerald/60',
  },
  casual_sunday: {
    label: 'Survivor Social',
    badge: 'bg-surface text-text-main border-line',
    icon: Shirt,
    accentBorder: 'hover:border-accent/60',
  },
};

export const ThemeDressCodeCard = ({ themes = DEFAULT_THEMES, className }: ThemeDressCodeCardProps) => {
  return (
    <Stack gap={4} className={className}>
      {/* Header Banner */}
      <Box display="flex" align="center" justify="between" wrap gap={2}>
        <Stack gap={1}>
          <Box as="h3" className="text-lg font-bold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span>Event Themes &amp; Dress Codes</span>
          </Box>
          <Box as="p" className="text-xs text-text-dim">
            Official party themes, gala dress codes, and competition attire expectations
          </Box>
        </Stack>
        <Box paddingX={3} paddingY={1} radius="md" surface="card" border className="text-xs font-mono text-accent font-semibold">
          {themes.length} Key Themes Identified
        </Box>
      </Box>

      {/* Grid of Theme & Dress Code Cards */}
      <Grid cols={{ default: 1, sm: 2 }} gap={4}>
        {themes.map((item) => {
          const config = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.social_theme;
          const CategoryIcon = config.icon;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-surface/90 border border-line/80 shadow-md transition-all flex flex-col justify-between space-y-4 ${config.accentBorder}`}
            >
              <div className="flex flex-col space-y-3">
                {/* Top Row: Day & Category Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl border ${config.badge} shrink-0`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                      {item.day}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border ${config.badge}`}>
                    {config.label}
                  </span>
                </div>

                {/* Theme Title & Vibe */}
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-text-main leading-snug">
                    {item.themeTitle}
                  </h4>
                  <p className="text-xs text-text-dim leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Recommended Attire Checklist Pills */}
                <div className="p-3 rounded-xl bg-muted/40 border border-line/50 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-text-main">
                    <Tag className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Recommended Outfits:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommendedAttire.map((attire, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-line/60 text-xs text-text-dim"
                      >
                        <CheckCircle2 className="w-3 h-3 text-brand-emerald shrink-0" />
                        <span>{attire}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vibe Tag Footer */}
              <div className="pt-2 border-t border-line/40 flex items-center justify-between text-xs text-text-dim">
                <span className="text-[11px] font-mono">Atmosphere:</span>
                <span className="font-mono text-accent font-semibold text-xs">
                  ✨ {item.vibe}
                </span>
              </div>
            </div>
          );
        })}
      </Grid>
    </Stack>
  );
};
