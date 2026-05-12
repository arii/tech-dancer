import { Stack, Grid, Box, Text } from '../../../layouts/Primitives';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { AffiliateCard } from '../../../components/ui/AffiliateCard';
import { affiliateManager } from '../../../lib/affiliateManager';
import { Event } from '../../../lib/content';
import { GEAR_CATEGORIES } from '../constants';

interface CuratedGearProps {
  event: Event;
}

export function CuratedGear({ event }: CuratedGearProps) {
  const { curatedGear } = event;

  if (!curatedGear) return null;

  const sections = GEAR_CATEGORIES
    .map(cat => ({
      ...cat,
      links: (curatedGear[cat.id]?.map(id => affiliateManager.getLink(id)) ?? [])
        .filter((link): link is NonNullable<typeof link> => !!link)
    }))
    .filter(section => section.links.length > 0);

  if (sections.length === 0) return null;

  return (
    <Stack gap={12}>
      <SectionHeader eyebrow="PACKING LIST" title="Curated Gear" />

      <Stack gap={10}>
        {sections.map(section => (
          <Stack key={section.id} gap={4}>
            <Box borderBottom className="border-line/30" paddingBottom={2}>
              <Text variant="mono" size="xs" weight="font-black" color="dim" uppercase tracking="widest">
                {section.label}
              </Text>
            </Box>
            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {section.links.map((link) => (
                <AffiliateCard key={link.id} link={link} />
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
