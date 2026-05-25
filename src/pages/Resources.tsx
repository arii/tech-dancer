import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { getResources, getEvents } from '@/lib/content';
import { MERCH_PRODUCTS } from '@/data/merch';
import { affiliateManager } from '@/lib/affiliateManager';

export default function Resources() {
  const allResources = getResources();
  const allEvents = getEvents();

  // Featured resources
  const educationalGuides = allResources.filter(r => r.category?.toLowerCase() === 'learn' || r.category?.toLowerCase() === 'general').slice(0, 3);

  // Gear previews (from affiliates)
  const affiliateGear = Object.values(affiliateManager.getAllLinks())
    .filter(link => !link.url.includes('printful.me'))
    .slice(0, 3);

  // Merch previews
  const featuredMerch = MERCH_PRODUCTS.slice(0, 3);

  return (
    <Box>
      <SEO
        title="Resources for West Coast Swing Dancers"
        description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
      />

      <Stack gap={16} width="full">
        <PageHeader
          label="RESOURCES HUB"
          title="Everything You Need to Dance Your Best"
          description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
        />

        {/* Featured Guides Section */}
        <Stack gap={8}>
          <Box display="flex" justify="between" align="end">
            <Stack gap={1}>
              <Text variant="mono" size="xs" color="accent" uppercase tracking="widest" weight="font-bold">
                Guides & Training
              </Text>
              <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
                Learn & Improve
              </Text>
            </Stack>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {educationalGuides.map((resource) => (
              <ResourceCard
                key={resource.slug}
                {...resource}
                kind="article"
                source="editorial"
              />
            ))}
          </Grid>
        </Stack>

        {/* Gear Preview Section */}
        <Stack gap={8}>
          <Box display="flex" justify="between" align="end">
            <Stack gap={1}>
              <Text variant="mono" size="xs" color="accent" uppercase tracking="widest" weight="font-bold">
                Honest Reviews
              </Text>
              <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
                Gear Recommendations
              </Text>
            </Stack>
            <Button as={NavLink} to="/gear" variant="ghost" gap={2} className="text-accent group">
              View all gear <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {affiliateGear.map((gear) => (
              <ResourceCard
                key={gear.id}
                id={gear.id}
                title={gear.name}
                category={gear.category}
                excerpt={gear.description}
                image={gear.image}
                kind="affiliate-product"
                source="affiliate"
                href={gear.url}
              />
            ))}
          </Grid>
        </Stack>

        {/* Merch Preview Section */}
        <Stack gap={8}>
          <Box display="flex" justify="between" align="end">
            <Stack gap={1}>
              <Text variant="mono" size="xs" color="accent" uppercase tracking="widest" weight="font-bold">
                Exclusive Designs
              </Text>
              <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
                BoomTick Merch
              </Text>
            </Stack>
            <Button as={NavLink} to="/merch" variant="ghost" gap={2} className="text-accent group">
              Shop all merch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {featuredMerch.map((product) => (
              <ResourceCard
                key={product.id}
                id={product.id}
                title={product.title}
                category="Apparel"
                excerpt={product.description}
                image={product.imageUrl}
                kind="boomtick-merch"
                source="printful"
                href={product.printfulUrl}
              />
            ))}
          </Grid>
        </Stack>

        {/* Event Guides Preview */}
        <Stack gap={8} marginBottom={12}>
          <Box display="flex" justify="between" align="end">
            <Stack gap={1}>
              <Text variant="mono" size="xs" color="accent" uppercase tracking="widest" weight="font-bold">
                Know Before You Go
              </Text>
              <Text variant="headline" size="2xl" weight="font-bold" uppercase tracking="tight">
                Event Resource Guides
              </Text>
            </Stack>
            <Button as={NavLink} to="/events" variant="ghost" gap={2} className="text-accent group">
              Explore event guides <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Box>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {allEvents.slice(0, 3).map((event) => (
              <ResourceCard
                key={event.slug}
                {...event}
                kind="event-guide"
                source="editorial"
                basePath="/events"
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
