import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { AffiliateLink } from '@/types';

// Simple mockup of a resolver since we don't have a backend or affiliate links DB.
function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  return ids.map(id => ({
    id,
    name: `Recommended ${id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    url: '#',
    category: 'gear',
    description: `Highly recommended ${id.replace('-', ' ')} for this theme.`
  }));
}

interface ThemeSpotlightProps {
  title: string;
  description: string;
  image?: string;
  outfitIds?: string[];
  accessoryIds?: string[];
  accentColor?: string;
}

export function ThemeSpotlight({
  title,
  description,
  image,
  outfitIds = [],
  accessoryIds = [],
  accentColor = 'var(--raw-color-accent)'
}: ThemeSpotlightProps) {
  const accentStyle = useMemo(() => ({ backgroundColor: accentColor } as React.CSSProperties), [accentColor]);

  const resolvedOutfits = useMemo(() => resolveAffiliateLinks(outfitIds), [outfitIds]);
  const resolvedAccessories = useMemo(() => resolveAffiliateLinks(accessoryIds), [accessoryIds]);

  return (
    <Box
      border
      radius="xl"
      overflow="hidden"
      surface="surface"
      className="group hover:border-accent/30 transition-all duration-300"
    >
      <Stack direction={{ base: "col", md: "row" }} align="stretch">
        {/* Content Section */}
        <Stack gap={6} padding={8} flex={1} justify="center">
          <Stack gap={2}>
            <Box
              width={12}
              height={1}
              radius="full"
              marginBottom={2}
              style={accentStyle}
            />
            <Text
              as="h3"
              variant="display"
              size="2xl"
              weight="font-black"
              color="white"
              tracking="tight"
            >
              {title}
            </Text>
          </Stack>
          <Text
            variant="body"
            size="base"
            color="dim"
            className="leading-relaxed"
          >
            {description}
          </Text>

          {/* Outfit Recommendations */}
          {resolvedOutfits.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Recommended Outfits
              </Text>
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                {resolvedOutfits.map(link => (
                  <AffiliateCard key={link.id} link={link} />
                ))}
              </Grid>
            </Stack>
          )}

          {/* Accessory Recommendations */}
          {resolvedAccessories.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Recommended Accessories
              </Text>
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                {resolvedAccessories.map(link => (
                  <AffiliateCard key={link.id} link={link} />
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>

        {/* Image Section */}
        {image && (
          <Box
            width={{ base: "full", md: "2/5" }}
            minHeight={{ base: 48, md: "auto" }}
            position="relative"
            overflow="hidden"
            className="theme-spotlight-image-bg"
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />
            <Box
              position="absolute"
              inset
              display={{ base: "none", md: "block" }}
              className="theme-spotlight-image-overlay"
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
