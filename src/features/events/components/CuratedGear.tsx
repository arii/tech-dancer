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

        <Box border radius="xl" paddingX={4} paddingY={3} className="border-line/80 bg-surface/70">
          <Text variant="body" size="sm" color="dim" className="leading-relaxed">
            <Text as="span" variant="body" size="sm" weight="font-bold" color="main">Affiliate disclosure:</Text> As an Amazon Associate, BoomTick earns from qualifying purchases. Some gear links in this guide are affiliate links, which may earn a small commission at no extra cost to you.
          </Text>
        </Box>

        {sections.map((section) => (
          <Stack key={section.label} gap={8}>
            <Stack gap={2}>
              <SectionHeader
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
                <GearCard
                  key={item.id}
                  affiliateIds={[item.id]}
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
