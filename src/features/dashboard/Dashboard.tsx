import { Link } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { SEO } from '@/components/SEO';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/ui/EventCard';
import { ListRow } from '@/components/ui/ListRow';
import PathSelector from '@/components/ui/PathSelector';
import { useHome } from './useHome';
import { STATIC_SCHEMAS } from '@/config/constants';

export default function Home() {
  const { recentPosts = [], upcomingEvents = [] } = useHome();

  return (
    <Box>
      <SEO
        title="Home"
        description="The West Coast Swing Lifestyle Blog - Training tips, travel guides, and data for dancers."
        schema={STATIC_SCHEMAS.HOME}
      />
      <Stack direction="col" gap={12}>
        {/* Hero Section */}
        <Box paddingBottom={8} border="b">
          <PageHeader
            label="Welcome to boomtick.blog"
            title="The West Coast Swing Lifestyle Blog"
            description="Training tips, travel guides, gear picks, and data — for dancers who want to get better and go further. Written by Tech Dancer."
          />
        </Box>

        {/* Path Selector */}
        <Box paddingTop={12} paddingBottom={1}>
          <PathSelector />
        </Box>

        {/* Recent Posts Section */}
        <Box>
          <SectionHeader
            eyebrow="Latest Updates"
            title="Recent Posts"
            link={{ text: "View all posts →", to: "/blog" }}
          />

          <Stack direction="col" border="t" className="border-line">
            {recentPosts.map((post) => (
              <ListRow
                key={post.slug}
                {...post}
                basePath="/blog"
              />
            ))}
          </Stack>
        </Box>

        {/* Event Grid Section */}
        <Box paddingTop={6}>
          <SectionHeader
            eyebrow="On the Circuit"
            title="Where Dancers Go"
          />

          <Grid cols={{ base: 1, md: 3 }} gap={4}>
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.name}
                name={event.name}
                location={event.location}
                date={event.date}
              />
            ))}
          </Grid>
        </Box>

        {/* Data Lab CTA */}
        <Stack
          direction={{ base: "col", md: "row" }}
          align={{ base: "start", md: "center" }}
          justify="between"
          gap={6}
          padding={8}
          radius="lg"
          border
          className="bg-surface-alt"
        >
          <Stack direction="col" gap={2}>
            <Text variant="mono" size="xs" uppercase tracking="widest" className="text-accent-magenta">
              Data Lab
            </Text>
            <Text as="h4" size="xl" weight="font-bold">
              WCS Competition Analytics
            </Text>
            <Text color="dim" size="sm">
              Objective data on competition trends, scoring patterns, and point progression — because the numbers tell a story too.
            </Text>
          </Stack>
          <Box
            as={Link}
            to="/research"
            className="text-accent-magenta font-black uppercase tracking-widest text-sm whitespace-nowrap"
          >
            Explore Data →
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
