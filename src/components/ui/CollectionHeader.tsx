import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

interface CollectionHeaderProps {
  /** The primary title of the collection or section */
  title: string;
  /** Optional secondary description text */
  description?: string;
  /** Optional destination for the "View all" link */
  href?: string;
  /** Custom label for the CTA link (defaults to "View all") */
  ctaLabel?: string;
  /** Semantic heading level for the title (defaults to h2) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Standardized header for content collections and editorial sections.
 * Features a title with font-size: 16px and font-weight: 500 (matches storyboard 'th' sizing),
 * with an optional description and CTA link styled with design system tokens.
 */
export function CollectionHeader({
  title,
  description,
  href,
  ctaLabel,
  headingLevel = 'h2'
}: CollectionHeaderProps) {
  return (
    <Stack gap={1} width="full">
      <Box display="flex" align="center" justify="between" gap={4} width="full">
        <Text
          as={headingLevel}
          size="base"
          weight="font-medium"
          color="main"
          tracking="tight"
        >
          {title}
        </Text>
        {href && (
          <Box
            as={NavLink}
            to={href}
            display="flex"
            align="center"
            gap={1}
            className="group shrink-0 transition-colors"
          >
            <Text
              variant="mono"
              size="xs"
              color="accent"
              weight="font-bold"
              className="uppercase tracking-widest"
            >
              {ctaLabel || 'View all'}
            </Text>
            <Icon
              icon={ArrowRight}
              size="sm"
              color="accent"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Box>
        )}
      </Box>
      {description && (
        <Text variant="body" size="sm" color="dim" className="max-w-prose">
          {description}
        </Text>
      )}
    </Stack>
  );
}
