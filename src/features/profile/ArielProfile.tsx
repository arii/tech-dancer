import { Box, Stack } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/ui/Reveal';
import { useProfile } from './useProfile';

import AboutHero from './AboutHero';
import StatsBar from './StatsBar';
import IdentityCards from './IdentityCards';
import Timeline from './Timeline';
import TechStack from './TechStack';
import CompetitionCard from './CompetitionCard';
import FeaturedPosts from './FeaturedPosts';
import ContactCTARow from './ContactCTARow';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" maxWidth="4xl" marginX="auto" paddingY={8} paddingX={{ base: 4, md: 8 }}>
      <SEO
        title="About"
        description="Learn more about tech-dancer, the roboticist's guide to the West Coast Swing. Exploring the intersection of dance, physics, and engineering."
        type="profile"
      />

      <Stack gap={0}>
        <Reveal direction="up">
          <AboutHero data={bio} />
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <StatsBar stats={bio.stats} />
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <IdentityCards />
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <Timeline items={bio.timeline} />
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <TechStack groups={bio.skills} />
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <CompetitionCard profile={bio.competitions} />
        </Reveal>

        {bio.featuredPosts && bio.featuredPosts.length > 0 && (
          <Reveal direction="up" delay={0.6}>
            <FeaturedPosts posts={bio.featuredPosts} />
          </Reveal>
        )}

        <Reveal direction="up" delay={0.7}>
          <ContactCTARow />
        </Reveal>
      </Stack>
    </Box>
  );
}
