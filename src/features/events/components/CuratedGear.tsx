import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GearCard } from '@/components/ui/GearCard';
import { ResolvedGearSection } from '../useEventDetail';

interface CuratedGearProps {
  id?: string;
  title?: string;
  sections: ResolvedGearSection[];
}

export function CuratedGear({ id, title = "Recommended Gear", sections }: CuratedGearProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <Box id={id} as="section" data-testid="gear">
      <Stack gap={12}>
        <SectionHeader eyebrow="TOOLS" title={title} />

        {sections.map((section) => (
          <Stack key={section.key} gap={8}>
            <Text as="h3" variant="headline" size="2xl" weight="font-black" color="brand">
              {section.label}
            </Text>
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
              {section.items.map((item) => (
                <GearCard
                  key={item.id}
                  slug={item.id}
                  title={item.name}
                  category={item.category}
                  excerpt={item.description}
                  basePath="/gear"
                />
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
