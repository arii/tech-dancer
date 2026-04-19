import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Zap, ArrowRight, Shield, Calendar } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useHome } from './useHome';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import { HeroPathCard } from '@/components/ui/HeroPathCard';
import { ContentCard } from '@/components/ui/ContentCard';

export default function Home() {
  const { recentPosts, dancerPaths, hirePaths } = useHome();

  return (
    <Box as="section">
      <Stack gap={24}>
        <Stack gap={12} paddingTop={12}>
          <Stack gap={2}>
            <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">Exploring the Intersection of Technical Engineering and West Coast Swing</Text>
            <Text
              as={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              variant="headline"
              size="fluid-7"
              className="text-accent-navy leading-tight tracking-tight max-w-4xl"
            >
              The Roboticist's Guide to the <br />
              West Coast Swing
            </Text>
          </Stack>
        </Stack>

        <Grid cols={{ base: 1, md: 5 }} gap={8}>
          <HeroPathCard
            span={3}
            title="Blog Posts"
            tag="PATH_01 // LATEST_INSIGHTS"
            image=""
            paths={dancerPaths}
            icon={Zap}
            label={""}          />
          <HeroPathCard
            span={2}
            title="Gear Reviews"
            tag="PATH_02 // THE_TOOLBOX"
            image=""
            paths={hirePaths}
            icon={Shield}
            label={""}          />
        </Grid>

        <Stack gap={12}>
          <SectionHeader label="LATEST UPDATES" title="Recent Blog Posts">
            <Box
              as={NavLink}
              to="/blog"
              display="flex"
              align="center"
              gap={3}
              className="text-text-dim hover:text-accent transition-colors"
            >
              <Text variant="mono" size="xs" weight="font-bold">View full repository</Text>
              <ArrowRight className="w-4 h-4" />
            </Box>
          </SectionHeader>

          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {recentPosts.map((post) => (
              <ContentCard
                key={post.slug}
                {...post}
                basePath="/blog"
                aspect="video"
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

const dancerPaths = [
  { label: "Lifestyle blog posts", path: "/blog?category=lifestyle" },
  { label: "Gear reviews", path: "/gear" }
];

const hirePaths = [
  { label: "Tech blog posts", path: "/blog?category=tech" },
  { label: "Data and Development Lab", path: "/research" },
  { label: "About/Contact page", path: "/about" }
];
