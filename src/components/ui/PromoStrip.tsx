import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface PromoStripProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  isNew?: boolean;
}

export function PromoStrip({
  imageSrc,
  title,
  subtitle,
  ctaLabel,
  href,
  isNew
}: PromoStripProps) {
  return (
    <Box
      as={NavLink}
      to={href}
      display="block"
      position="relative"
      border
      radius="lg"
      padding={3}
      surface="surface"
      className="group transition-all duration-200 hover:border-accent/40 hover:-translate-y-0.5"
    >
      {isNew && (
        <Box
          position="absolute"
          top={-2.5}
          right={8}
          zIndex={10}
          surface="accent"
          radius="full"
          paddingX={2.5}
          paddingY={0.5}
          className="bg-accent shadow-sm"
        >
          <Text variant="mono" size="micro" color="white" weight="font-bold">NEW</Text>
        </Box>
      )}

      <Stack direction="row" align="center" gap={4}>
        {/* Thumbnail */}
        <Box
          width={12}
          height={12}
          minWidth={12}
          radius="md"
          overflow="hidden"
          border
          borderColor="accent/10"
        >
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        </Box>

        {/* Content */}
        <Stack gap={0} flex={1} minWidth={0}>
          <Text
            variant="headline"
            size="sm"
            weight="font-bold"
            truncate
          >
            {title}
          </Text>
          <Text
            variant="body"
            size="xs"
            color="dim"
            truncate
          >
            {subtitle}
          </Text>
        </Stack>

        {/* CTA */}
        <Stack direction="row" align="center" gap={1} shrink={0}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="accent"
            className="hidden sm:block"
          >
            {ctaLabel}
          </Text>
          <Icon icon={ArrowRight} size="sm" color="accent" />
        </Stack>
      </Stack>
    </Box>
  );
}
