import { Box, Stack, Grid, Text, Button } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceCardItem } from '@/lib/types/resources';
import { BoomTickMerchItem, AffiliateGearItem } from "@/lib/types/resources";
import { Post, Event } from "@/lib/types/content";
import { BOOMTICK_MERCH_PRODUCTS } from '@/data/boomtickMerch';
import { AFFILIATE_GEAR } from '@/data/affiliateGear';
import { getPosts, getEvents } from '@/lib/content';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Resources() {
  const posts = getPosts().slice(0, 3);
  const events = getEvents().slice(0, 3);
  const gear = AFFILIATE_GEAR.slice(0, 3);
  const merch = BOOMTICK_MERCH_PRODUCTS.slice(0, 3);

  const formatMerchItem = (item: BoomTickMerchItem): ResourceCardItem => ({
    id: item.id,
    title: item.title,
    description: item.description,
    href: item.printfulUrl,
    kind: 'boomtick-merch',
    source: 'printful',
    category: 'merch',
    image: item.imageUrl,
    tags: item.tags,
  });

  const formatGearItem = (item: AffiliateGearItem): ResourceCardItem => ({
    id: item.id,
    title: item.name,
    description: item.description,
    href: item.url,
    kind: 'affiliate-product',
    source: 'affiliate',
    category: 'gear',
    image: item.image,
  });

  const formatPostItem = (item: Post): ResourceCardItem => ({
    id: item.slug,
    title: item.title,
    description: item.excerpt,
    href: `/blog/${item.slug}`,
    kind: 'article',
    source: 'editorial',
    category: 'learn',
    image: item.image,
    tags: item.tags,
  });

  const formatEventItem = (item: Event): ResourceCardItem => ({
    id: item.slug,
    title: item.title,
    description: item.excerpt || `Event in ${item.city}`,
    href: `/resources/events/${item.slug}`,
    kind: 'event-guide',
    source: 'editorial',
    category: 'events',
    image: item.heroImage || item.image,
    tags: [item.city],
  });

  return (
    <Box>
      <SEO
        title="West Coast Swing Resources"
        description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
      />
      <Stack gap={8} width="full">
        <PageHeader
          label="DISCOVER"
          title="Resources"
          description="Explore practical resources for West Coast Swing dancers — from training guides and event travel tips to gear recommendations and BoomTick merch."
        />

        <Stack gap={12} marginTop={8}>
          {/* Learn & Improve */}
          <Box as="section">
            <Stack direction="row" align="center" justify="between" marginBottom={6}>
              <Text as="h2" variant="headline" size="2xl" weight="font-bold">Learn & Improve</Text>
              <Button as={NavLink} to="/blog" variant="ghost" display={{ base: "none", sm: "flex" }} className="group">
                All Guides <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Stack>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {posts.map(post => (
                <ResourceCard key={post.slug} item={formatPostItem(post)} />
              ))}
            </Grid>
          </Box>

          {/* Travel Better */}
          <Box as="section">
            <Stack direction="row" align="center" justify="between" marginBottom={6}>
              <Text as="h2" variant="headline" size="2xl" weight="font-bold">Event Guides</Text>
              <Button as={NavLink} to="/resources/events" variant="ghost" display={{ base: "none", sm: "flex" }} className="group">
                All Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Stack>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {events.map(event => (
                <ResourceCard key={event.slug} item={formatEventItem(event)} />
              ))}
            </Grid>
          </Box>

          {/* Gear Recommendations */}
          <Box as="section">
            <Stack direction="row" align="center" justify="between" marginBottom={6}>
              <Stack gap={1}>
                <Text as="h2" variant="headline" size="2xl" weight="font-bold">Gear Recommendations</Text>
                <Text variant="body" size="sm" color="dim">Useful gear for dance weekends, practice sessions, travel days, and long nights.</Text>
              </Stack>
              <Button as={NavLink} to="/resources/gear" variant="ghost" display={{ base: "none", sm: "flex" }} className="group">
                All Gear <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Stack>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {gear.map(item => (
                <ResourceCard key={item.id} item={formatGearItem(item)} />
              ))}
            </Grid>
          </Box>

          {/* BoomTick Merch */}
          <Box as="section">
            <Stack direction="row" align="center" justify="between" marginBottom={6}>
              <Stack gap={1}>
                <Text as="h2" variant="headline" size="2xl" weight="font-bold">BoomTick Merch</Text>
                <Text variant="body" size="sm" color="dim">Designed for West Coast Swing dancers, social dancers, Pride events, and NorCal.</Text>
              </Stack>
              <Button as={NavLink} to="/resources/merch" variant="ghost" display={{ base: "none", sm: "flex" }} className="group">
                Shop Merch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Stack>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {merch.map(item => (
                <ResourceCard key={item.id} item={formatMerchItem(item)} />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
