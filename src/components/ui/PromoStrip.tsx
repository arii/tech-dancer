import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

export interface PromoStripProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  isNew?: boolean;
  target?: string;
  rel?: string;
}

export function PromoStrip({
  imageSrc,
  title,
  subtitle,
  ctaLabel,
  href,
  isNew = false,
  target,
  rel,
}: PromoStripProps) {
  return (
    <Box
      as="a"
      href={href}
      target={target}
      rel={rel}
      display="block"
      padding={3}
      radius="md"
      border
      surface="card"
      position="relative"
      className={cn(
        "group transition-all duration-200",
        "hover:border-accent/40 hover:shadow-glow hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      )}
    >
      <Stack direction="row" align="center" gap={4} width="full" minWidth={0}>
        {/* Thumbnail */}
        <Box
          width={12}
          height={12}
          radius="md"
          overflow="hidden"
          shrink={0}
          border
          borderColor="line/20"
          surface="surface-alt"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain"
            loading="lazy"
            width={48}
            height={48}
          />
        </Box>

        {/* Content */}
        <Stack gap={0.5} flex={true} minWidth={0}>
          <Text
            variant="body"
            size="sm"
            weight="font-bold"
            color="main"
            leading="none"
          >
            {title}
          </Text>
          <Text
            variant="body"
            size="xs"
            color="dim"
            leading="none"
          >
            {subtitle}
          </Text>
        </Stack>

        {/* CTA */}
        <Stack direction="row" align="center" gap={2} shrink={0}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            uppercase
            tracking="wider"
            className="hidden sm:block"
          >
            {ctaLabel}
          </Text>
          <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
        </Stack>
      </Stack>

      {/* New Badge */}
      {isNew && (
        <Box
          position="absolute"
          top={-1.5}
          right={-1.5}
          paddingX={2}
          paddingY={0.5}
          radius="full"
          emphasis="primary"
          shadow="sm"
          className="pointer-events-none"
          zIndex={10}
        >
          <Text
            variant="mono"
            size="micro"
            weight="font-bold"
            color="white"
            uppercase
          >
            New
          </Text>
        </Box>
      )}
    </Box>
  );
}
