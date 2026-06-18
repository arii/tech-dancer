import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { ASSET_PREFIX } from '@/config/constants';

interface PromoStripProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${ASSET_PREFIX}${src}`;
  return `${ASSET_PREFIX}/${src}`;
}

export function PromoStrip({ imageSrc, title, subtitle, ctaLabel, href }: PromoStripProps) {
  return (
    <Box
      as="a"
      href={href}
      display="flex"
      align="center"
      justify="between"
      padding={3}
      radius="md"
      className={cn(
        "bg-surface-alt/40 border border-line/20 transition-all duration-200",
        "hover:bg-surface-alt/60 hover:border-accent/40 hover:shadow-sm group"
      )}
    >
      <Stack direction="row" align="center" gap={4} minWidth={0} flex={1}>
        <Box
          width={12}
          height={12}
          radius="md"
          overflow="hidden"
          shrink={0}
          className="bg-muted border border-line/10"
        >
          <img
            src={resolveImageSrc(imageSrc)}
            alt=""
            className="w-full h-full object-cover"
          />
        </Box>
        <Stack gap={0.5} minWidth={0}>
          <Text variant="body" size="sm" weight="font-bold" color="main" truncate>
            {title}
          </Text>
          <Text variant="body" size="xs" color="dim" truncate>
            {subtitle}
          </Text>
        </Stack>
      </Stack>

      <Stack direction="row" align="center" gap={2} shrink={0} marginLeft={4}>
        <Text
          variant="mono"
          size="micro"
          weight="font-bold"
          color="accent"
          uppercase
          tracking="widest"
          className="hidden sm:block group-hover:translate-x-[-4px] transition-transform"
        >
          {ctaLabel}
        </Text>
        <ArrowRight className="w-4 h-4 text-accent" />
      </Stack>
    </Box>
  );
}
