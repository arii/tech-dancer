import { Box, Stack, Grid, Text } from '@/layouts/Primitives';
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
    <Box id={id} as="section" data-testid="gear">
      <Stack gap={12}>
        <SectionHeader eyebrow="TOOLS" title={title} />

        {sections.map((section) => (
          <Stack key={section.label} gap={8}>
            <Stack gap={2}>
              <SectionHeader
                data-testid={`gear-section-${section.label.toLowerCase().replace(/\s+/g, '-')}`}
                title={section.label}
                size="sm"
              />
              {section.description && (
                <Text variant="body" size="sm" color="dim" className="leading-relaxed italic">
                  {section.description}
                </Text>
              )}
            </Stack>
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
              {section.items.map((item) => (
                <AffiliateCard
                  key={item.id}
                  link={{
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    url: item.url,
                    image: item.image,
                    imageMode: item.imageMode
                  }}
                />
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
