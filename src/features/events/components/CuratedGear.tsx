import { Stack, Grid, Box, Text } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { ResolvedGearSection } from '@/features/events/useEventDetail';

interface CuratedGearProps {
  title?: string;
  sections?: ResolvedGearSection[];
}

export function CuratedGear({ title = "Recommended Gear", sections = [] }: CuratedGearProps) {
  if (sections.length === 0) return null;

  return (
    <Stack gap={12}>
      <SectionHeader eyebrow="TOOLS" title={title} />

      {sections.map((section, idx) => (
        <Stack key={idx} gap={6}>
          <Box border="b" paddingBottom={2} className="border-line/20">
            <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
              {section.label}
            </Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {section.items.map((item) => (
              <AffiliateCard
                key={item.id}
                link={item}
              />
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
