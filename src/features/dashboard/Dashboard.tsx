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
          <Stack gap={4}>
            <Text 
              as={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              variant="headline" 
              size="fluid-7"
              className="text-accent-navy leading-tight tracking-tight max-w-4xl"
            >
              The Roboticist&apos;s Guide to the West Coast Swing
            </Text>
            <Text variant="sans" size="xl" color="dim" maxWidth="3xl" className="leading-relaxed">
              Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle.
            </Text>
            <Text variant="sans" size="base" color="dim" maxWidth="2xl" marginTop={2} className="leading-relaxed">
              Welcome to tech-dancer. You&apos;re looking at a living portfolio as a platform. Enjoy the west coast swing content or dive into the technical details.
            </Text>
          </Stack>
        </Stack>

        <Grid cols={{ base: 1, lg: 5 }} gap={8}>
          <HeroPathCard 
            span={3}
            title="Are you a dancer?"
            tag="PATH_01 // DANCER"
            image=""
            paths={dancerPaths}
            icon={Zap}
            label={""}          />
          <HeroPathCard 
            span={2}
            title="Looking to hire?"
            tag="PATH_02 // HIRE_ME"
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
  { label: "Lifestyle blog posts", path: "/blog?category=Travel/Lifestyle" },
  { label: "Gear reviews", path: "/gear" }
];

const hirePaths = [
  { label: "Tech blog posts", path: "/blog?category=Tech" },
  { label: "Data and Development Lab", path: "/research" },
  { label: "About/Contact page", path: "/about" }
];
