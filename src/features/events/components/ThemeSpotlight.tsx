import { ExternalLink } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { EventTheme } from "@/lib/content";
import { AffiliateLink } from "@/types";

interface ThemeSpotlightProps {
  id?: string;
  theme: EventTheme;
  outfits: AffiliateLink[];
  accessories: AffiliateLink[];
}

function GearItemCard({ item }: { item: AffiliateLink }) {
  return (
    <Box
      as="a"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      border
      radius="lg"
      padding={4}
      surface="surface"
      display="flex"
      flexDirection="col"
      gap={2}
      className="group hover:border-accent/40 transition-all"
    >
      {/* Placeholder image zone */}
      <Box
        height={32}
        radius="md"
        overflow="hidden"
        display="flex"
        align="center"
        justify="center"
        surface="surface-alt"
      >
        <Text size="xs" color="dim" className="opacity-40">
          IMG
        </Text>
      </Box>
      <Stack gap={1}>
        <Text
          size="xs"
          weight="font-bold"
          className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {item.name}
        </Text>
        <Text size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {item.description}
        </Text>
      </Stack>
      <Box
        display="flex"
        align="center"
        gap={1}
        color="accent"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Text variant="mono" size="micro">
          Shop
        </Text>
        <ExternalLink className="w-3 h-3" />
      </Box>
    </Box>
  );
}

export function ThemeSpotlight({
  id,
  theme,
  outfits,
  accessories,
}: ThemeSpotlightProps) {
  return (
    <Stack id={id} gap={8}>
      {/* Theme header */}
      <Stack gap={2}>
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
        >
          ✦ THEME SPOTLIGHT
        </Text>
        <Stack gap={1}>
          {theme.label && (
            <Text size="sm" color="dim">
              {theme.label}:
            </Text>
          )}
          <Text
            variant="headline"
            size="4xl"
            weight="font-black"
            color="accent"
          >
            {theme.name}
          </Text>
        </Stack>
        {/* Color swatches — purely decorative, swap hex values per theme */}
        <Box display="flex" gap={2} marginTop={2}>
          <Box width={5} height={5} radius="full" surface="accent" />
          <Box width={5} height={5} radius="full" surface="muted" />
          <Box width={5} height={5} radius="full" surface="accent" className="opacity-60" />
          <Box width={5} height={5} radius="full" surface="muted" className="opacity-60" />
        </Box>
      </Stack>

      {/* Outfit inspiration */}
      {outfits.length > 0 && (
        <Stack gap={4}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
          >
            Outfit Inspiration
          </Text>
          <Grid cols={{ base: 2, md: 3, lg: 4 }} gap={4}>
            {outfits.map((item) => (
              <GearItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Stack>
      )}

      {/* Accessory ideas */}
      {accessories.length > 0 && (
        <Stack gap={4}>
          <Text
            variant="mono"
            size="xs"
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
          >
            Accessory Ideas
          </Text>
          <Grid cols={{ base: 2, md: 3, lg: 4 }} gap={4}>
            {accessories.map((item) => (
              <GearItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
