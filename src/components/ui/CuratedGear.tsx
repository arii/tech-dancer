import { Resource } from '@/lib/content';
import { Stack, Grid } from '@/layouts/Primitives';
import { SectionHeader } from './SectionHeader';
import { GearCard } from './GearCard';

interface CuratedGearProps {
  title?: string;
  items: Resource[];
}

export function CuratedGear({ title = "Recommended Gear", items }: CuratedGearProps) {
  if (!items || items.length === 0) return null;

  return (
    <Stack gap={8}>
      <SectionHeader eyebrow="TOOLS" title={title} />
      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {items.map((item) => (
          <GearCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            category={item.category}
            excerpt={item.excerpt}
            basePath="/gear"
            rating={item.rating}
            verdict={item.verdict}
            image={item.image}
          />
        ))}
      </Grid>
    </Stack>
  );
}
