import { Box, Stack, Grid } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GearCard } from '@/components/ui/GearCard';
import { ResolvedGearSection } from '../useEventDetail';
import { NavLink } from 'react-router-dom';
import { Text } from '@/layouts/Primitives';

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
            <Box display="flex" justify="between" align="center" gap={4}>
              <SectionHeader
                title={section.label}
                size="sm"
              />
              <Box
                as={NavLink}
                to={section.ctaHref}
                aria-label={`${section.ctaLabel} from ${section.label}`}
              >
                <Text variant="mono" size="xs" color="accent" tracking="wide">
                  {section.ctaLabel}
                </Text>
              </Box>
            </Box>
            <Grid cols={{ base: 1, sm: 2 }} gap={6}>
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
