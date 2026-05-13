import { Stack, Grid, Text } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { ResolvedGearSection } from '../useEventDetail';

interface CuratedGearProps {
  id?: string;
  title?: string;
  sections: ResolvedGearSection[];
}

export function CuratedGear({ id, title = "Recommended Gear", sections }: CuratedGearProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <Stack id={id} gap={12}>
      <SectionHeader eyebrow="TOOLS" title={title} />

      {sections.map((section) => (
        <Stack key={section.label} gap={6}>
          <Text
            as="h4"
            variant="mono"
            size="xs"
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
          >
            {section.label}
          </Text>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {section.items.map((item) => (
              <AffiliateCard key={item.id} link={item} />
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
