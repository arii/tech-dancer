import { AffiliateLink } from "@/types";
import { ExternalLink } from "lucide-react";
import { Box, Stack, Text, Grid } from "@/layouts/Primitives";
import { ResolvedGearSection } from "../useEventDetail";

interface CuratedGearProps {
  id?: string;
  eventTitle: string;
  sections: ResolvedGearSection[];
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
      padding={3}
      surface="surface"
      className="group hover:border-accent/40 transition-all"
    >
      <Stack gap={2}>
        {/* Image placeholder */}
        <Box
          height={24}
          radius="md"
          display="flex"
          align="center"
          justify="center"
          surface="surface-alt"
        >
          <Text size="micro" color="dim" className="opacity-30">
            IMG
          </Text>
        </Box>
        <Text
          size="xs"
          weight="font-bold"
          className="group-hover:text-accent transition-colors line-clamp-snug"
        >
          {item.name}
        </Text>
        <Box display="flex" align="center" gap={1} color="accent">
          <Text variant="mono" size="micro">
            Shop
          </Text>
          <ExternalLink className="w-3 h-3" />
        </Box>
      </Stack>
    </Box>
  );
}

export function CuratedGear({ id, eventTitle, sections }: CuratedGearProps) {
  if (sections.length === 0) return null;

  return (
    <Stack id={id} gap={8}>
      <Stack gap={2}>
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-bold"
          uppercase
          tracking="widest"
        >
          🌈 CURATED GEAR
        </Text>
        <Text variant="headline" size="2xl" weight="font-black">
          Shop the {eventTitle.split(" ")[0]}
        </Text>
        <Text size="sm" color="dim" className="max-w-prose">
          Handpicked picks to help you shine on the dance floor.
        </Text>
      </Stack>

      {sections.map((section) => (
        <Stack key={section.label} gap={4}>
          <Box display="flex" align="center" justify="between">
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="dim"
              uppercase
              tracking="widest"
            >
              {section.label}
            </Text>
            {section.items.length > 4 && (
              <Text
                variant="mono"
                size="micro"
                color="accent"
                className="cursor-pointer hover:underline"
              >
                View all →
              </Text>
            )}
          </Box>
          <Grid cols={{ base: 2, md: 4, lg: 5 }} gap={4}>
            {section.items.slice(0, 5).map((item) => (
              <GearItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
