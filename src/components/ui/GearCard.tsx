import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { motion } from 'motion/react';

interface GearCardProps extends Resource {
  basePath: string;
}

export function GearCard({
  slug,
  title,
  category,
  excerpt,
  basePath,
  rating,
  verdict,
}: GearCardProps) {
  return (
    <Box
      as={motion.create(NavLink)}
      to={`${basePath}/${slug}`}
      className="flex min-h-[280px] flex-col gap-4 rounded-2xl border border-line/80 bg-surface p-5 shadow-sm transition-colors hover:border-primary/30 group"
    >
      <Box display="flex" align="start" justify="between" gap={3}>
        <span className="inline-flex rounded-full border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-text-dim/70">
          {category}
        </span>
        <Box className="text-right">
          {verdict && (
            <Box className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-dim/75">{verdict}</Box>
          )}
          {rating && (
            <Box className="mt-1 font-mono text-xs text-text-dim/70">{rating}/5</Box>
          )}
        </Box>
      </Box>
      
      <Text as="h2" size="lg" weight="font-black" className="leading-snug group-hover:text-primary transition-colors">
        {title}
      </Text>
      
      <Text size="sm" className="leading-7 text-text-body/72 line-clamp-3">
        {excerpt}
      </Text>

      <Box display="flex" align="center" gap={2} marginTop="auto">
        <Text weight="font-bold" size="xs" className="uppercase tracking-[0.25em] text-primary">
          Read Review
        </Text>
        <Text size="micro" className="text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </Text>
      </Box>
    </Box>
  );
}
