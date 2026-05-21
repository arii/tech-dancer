import { NavLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Text } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { getResources } from '@/lib/content';
import { MERCH_PRODUCTS } from '@/data/merch';

const featuredLearn = getResources().filter((item) => item.category.toLowerCase().includes('gear')).slice(0, 3);
const featuredTravel = getResources().filter((item) => item.category.toLowerCase().includes('travel')).slice(0, 3);
const featuredMerch = MERCH_PRODUCTS.slice(0, 3);

export default function Resources() {
  return (
    <Stack gap={8}>
      <SEO
        title="Resources for West Coast Swing Dancers"
        description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
      />

      <PageHeader
        label="RESOURCES"
        title="Resources for West Coast Swing dancers"
        description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
      />

      <ResourceSection title="Learn & Improve" ctaTo="/gear" ctaLabel="View all gear guides">
        {featuredLearn.map((item) => (
          <PreviewCard key={item.slug} title={item.title} description={item.excerpt} to={`/gear/${item.slug}`} ctaLabel="Read guide" />
        ))}
      </ResourceSection>

      <ResourceSection title="Travel Better" ctaTo="/events" ctaLabel="Explore event guides">
        {featuredTravel.map((item) => (
          <PreviewCard key={item.slug} title={item.title} description={item.excerpt} to={`/gear/${item.slug}`} ctaLabel="Read travel tip" />
        ))}
      </ResourceSection>

      <ResourceSection title="Gear Recommendations" ctaTo="/gear" ctaLabel="View all recommendations">
        <Text variant="body" size="sm" color="dim">
          Some gear links may be affiliate links. BoomTick may earn a commission if you purchase through those links, at no extra cost to you.
        </Text>
      </ResourceSection>

      <ResourceSection title="BoomTick Merch" ctaTo="/merch" ctaLabel="Shop BoomTick merch">
        <Text variant="body" size="sm" color="dim">
          BoomTick merch links go to our Printful storefront. These are BoomTick-created products, not affiliate recommendations.
        </Text>
        <Grid cols={{ base: 1, md: 3 }} gap={4}>
          {featuredMerch.map((item) => (
            <Box key={item.id} padding={4} border radius="lg" surface="card">
              <Stack gap={2}>
                <Text as="h3" variant="headline" size="sm" weight="font-bold">{item.title}</Text>
                <Text variant="body" size="sm" color="dim" clamp={3}>{item.description}</Text>
                <Button as="a" href={item.printfulUrl} target="_blank" rel="noopener noreferrer" variant="outline">Shop merch</Button>
              </Stack>
            </Box>
          ))}
        </Grid>
      </ResourceSection>
    </Stack>
  );
}

function ResourceSection({ title, ctaTo, ctaLabel, children }: { title: string; ctaTo: string; ctaLabel: string; children: React.ReactNode }) {
  return (
    <Stack gap={4}>
      <Box display="flex" justify="between" align="center" wrap gap={3}>
        <Text as="h2" variant="headline" size="lg" weight="font-bold">{title}</Text>
        <Button as={NavLink} to={ctaTo} variant="ghost">{ctaLabel}</Button>
      </Box>
      {children}
    </Stack>
  );
}

function PreviewCard({ title, description, to, ctaLabel }: { title: string; description: string; to: string; ctaLabel: string }) {
  return (
    <Box padding={4} border radius="lg" surface="card">
      <Stack gap={2}>
        <Text as="h3" variant="headline" size="sm" weight="font-bold">{title}</Text>
        <Text variant="body" size="sm" color="dim" clamp={3}>{description}</Text>
        <Button as={NavLink} to={to} variant="outline">{ctaLabel}</Button>
      </Stack>
    </Box>
  );
}
