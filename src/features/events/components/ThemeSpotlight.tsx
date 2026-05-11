import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { AffiliateCard } from '@/components/ui/AffiliateCard';

interface ThemeSpotlightProps {
  theme?: {
    name: string;
    description: string;
    label?: string;
    image?: string;
    outfitIds?: string[];
    accessoryIds?: string[];
  };
  accentColor?: string;
}

/**
 * Resolves a list of affiliate link objects from a list of IDs.
 */
function resolveAffiliateLinks(ids: string[] = []) {
  return ids
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);
}

export function ThemeSpotlight({
  theme,
  accentColor = 'var(--raw-color-accent)'
}: ThemeSpotlightProps) {
  // Always define hooks at the top level
  const accentStyle = useMemo(() => ({ background: accentColor }), [accentColor]);

  const outfitLinks = useMemo(() =>
    resolveAffiliateLinks(theme?.outfitIds),
    [theme?.outfitIds]
  );

  const accessoryLinks = useMemo(() =>
    resolveAffiliateLinks(theme?.accessoryIds),
    [theme?.accessoryIds]
  );

  if (!theme) return null;

  return (
    <Stack gap={8}>
      <Box
        border
        radius="xl"
        overflow="hidden"
        surface="surface"
        className="group hover:border-accent/30 transition-all duration-300"
      >
        <Box display="flex" direction={{ base: "col", md: "row" }} align="stretch">
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
              <Stack gap={1}>
                {theme.label && (
                  <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
                    {theme.label}
                  </Text>
                )}
                <Text
                  as="h3"
                  variant="display"
                  size="2xl"
                  weight="font-black"
                  color="white"
                  tracking="tight"
                >
                  {theme.name}
                </Text>
              </Stack>
            </Stack>
            <Text
              variant="body"
              size="base"
              color="dim"
              className="leading-relaxed"
            >
              {theme.description}
            </Text>
          </Stack>

          {/* Image Section */}
          {theme.image && (
            <Box
              width={{ base: "full", md: "2/5" }}
              minHeight={{ base: 48, md: "auto" }}
              position="relative"
              overflow="hidden"
              className="theme-spotlight-image-bg"
            >
              <img
                src={theme.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                aria-hidden="true"
              />
              <Box
                position="absolute"
                inset
                className="theme-spotlight-image-overlay hidden md:block"
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Outfits Section */}
      {outfitLinks.length > 0 && (
        <Stack gap={4}>
          <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
            Recommended Outfits
          </Text>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {outfitLinks.map(link => (
              <AffiliateCard key={link.id} link={link} />
            ))}
          </Grid>
        </Stack>
      )}

      {/* Accessories Section */}
      {accessoryLinks.length > 0 && (
        <Stack gap={4}>
          <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
            Suggested Accessories
          </Text>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {accessoryLinks.map(link => (
              <AffiliateCard key={link.id} link={link} />
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
