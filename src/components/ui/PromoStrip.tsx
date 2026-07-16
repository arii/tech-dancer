
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';

interface PromoStripProps {
  imageSrc: string;
  title: string;       // e.g. "Shop NorCal pride merch"
  subtitle: string;    // e.g. "Tees, hoodies, and tanks for the dance floor"
  ctaLabel: string;    // e.g. "Shop now"
  href: string;        // "/merch"
}

export function PromoStrip({
  imageSrc,
  title,
  subtitle,
  ctaLabel,
  href,
}: PromoStripProps) {
  const fullImageSrc = imageSrc;
  const resolvedHref = href;

  return (
    <Box
      as={NavLink}
      to={resolvedHref}
      position="relative"
      width="full"
      padding={{ base: 4, sm: 6 }}
      radius="md"
      border="line"
      bg="surface"
      display="block"
      className="group transition-all hover:bg-white/5"
    >
      <Stack direction="row" align="center" gap={{ base: 3, sm: 4 }}>
        <Box
          width={{ base: 10, sm: 12 }}
          height={{ base: 10, sm: 12 }}
          radius="md"
          overflow="hidden"
          className="shrink-0 bg-white/10"
        >
          <img
            loading="lazy"
            src={fullImageSrc}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide image container on error to prevent broken icon
              const img = e.currentTarget;
              img.style.display = 'none';
              if (img.parentElement) {
                img.parentElement.style.display = 'none';
              }
            }}
          />
        </Box>

        <Stack gap={0} grow={1} className="min-w-0">
          <Text weight="font-bold" size={{ base: 'sm', sm: 'base' }} className="leading-tight">{title}</Text>
          <Text size={{ base: 'tiny', sm: 'sm' }} color="text-dim" className="leading-snug line-clamp-2">{subtitle}</Text>
        </Stack>

        <Stack
          direction="row"
          align="center"
          gap={1.5}
          className="shrink-0"
        >
          <Text
            variant="mono"
            size={{ base: 'xs', sm: 'sm' }}
            weight="font-black"
            color="accent"
            className="group-hover:underline underline-offset-4 uppercase transition-all"
          >
            {ctaLabel}
          </Text>
          <Icon icon={ArrowRight} size="xs" className="sm:w-4 sm:h-4" color="accent" />
        </Stack>
      </Stack>
    </Box>
  );
}
