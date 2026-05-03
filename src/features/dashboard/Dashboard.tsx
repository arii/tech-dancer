import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Dumbbell, Luggage, ShoppingBag, BarChart2 } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { STATIC_SCHEMAS } from '@/config/constants';
import { SectionHeader } from '@/components/ui/PageHeader';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from '@/components/ui/EventCard';
import { motionTokens } from '@/styles/motion';
import { NeonEqualizer } from '@/components/ui/NeonEqualizer';

const FEATURE_ITEMS = [
  {
    icon: Dumbbell,
    label: 'TRAIN',
    accent: 'SMARTER',
    color: '#00e5ff',
    shadowColor: 'rgba(0,229,255,0.4)',
  },
  {
    icon: Luggage,
    label: 'TRAVEL',
    accent: 'BETTER',
    color: '#7c5de5',
    shadowColor: 'rgba(124,93,229,0.4)',
  },
  {
    icon: ShoppingBag,
    label: 'SHOP',
    accent: 'SMARTER',
    color: '#c74de5',
    shadowColor: 'rgba(199,77,229,0.4)',
  },
  {
    icon: BarChart2,
    label: 'USE',
    accent: 'DATA',
    color: '#7c5de5',
    shadowColor: 'rgba(124,93,229,0.4)',
  },
];

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <Box as="section">
      <SEO
        title="Home"
        description="Boom Tick blog for West Coast Swing dancers. Explore West Coast Swing travel, gear, research, and training insights."
        schema={STATIC_SCHEMAS.HOME}
      />

      {/* Hero */}
      <Box
        className="relative overflow-hidden grid-pattern"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* Ambient glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(155,93,229,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[calc(100vh-64px)] px-8 md:px-12 lg:px-16 pt-12 lg:pt-0 pb-8 max-w-[1400px] mx-auto w-full">

          {/* Left — Content */}
          <motion.div
            className="flex-1 flex flex-col justify-center py-8 lg:py-0 pr-0 lg:pr-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, #00e5ff, transparent)' }} />
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase neon-text-cyan">
                West Coast Swing
              </span>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h1 className="font-display font-bold leading-[1.05] tracking-tight">
                <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  Built for dancers.
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    background: 'linear-gradient(90deg, #00e5ff 0%, #9b5de5 60%, #e040fb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Train smarter.
                </span>
                <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  Dance better.
                </span>
              </h1>
              <div className="mt-4 w-12 h-0.5" style={{ background: 'linear-gradient(90deg, #00e5ff, #9b5de5)' }} />
            </div>

            {/* Description */}
            <p className="text-text-dim font-sans leading-relaxed mb-10 max-w-xs"
              style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
            >
              Training, travel, and data<br />
              for competitive West Coast Swing dancers.
            </p>

            {/* Feature icons */}
            <div className="grid grid-cols-4 gap-4 max-w-sm">
              {FEATURE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-start gap-2">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg border"
                      style={{
                        borderColor: item.color + '50',
                        background: item.color + '0f',
                        boxShadow: `0 0 12px ${item.shadowColor}`,
                      }}
                    >
                      <Icon size={18} style={{ color: item.color }} strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[10px] font-bold tracking-widest leading-tight">
                      <span className="text-white">{item.label}</span>
                      <br />
                      <span style={{ color: item.color }}>{item.accent}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Neon Equalizer */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-[52%] xl:w-[55%]"
            style={{ height: 'clamp(280px, 45vw, 520px)' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <NeonEqualizer />
          </motion.div>
        </div>
      </Box>

      {/* Recent posts section */}
      <Stack gap={6} paddingX={{ base: 4, md: 6, lg: 12 }} paddingTop={12} paddingBottom={4}
        className="max-w-[1400px] mx-auto w-full"
      >
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

        <Grid
          cols={{ base: 1, md: 2 }}
          gap={6}
          as={motion.div}
          variants={motionTokens.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {recentPosts.map((post) => (
            <ContentCard
              key={post.slug}
              {...post}
              basePath="/blog"
              aspect="video"
              variants={motionTokens.staggerItem}
              compact={true}
            />
          ))}
        </Grid>

        {/* Upcoming Events Mini-Grid */}
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {upcomingEvents.map((event) => (
            <Box
              key={event.name}
              as={motion.div}
              variants={motionTokens.staggerItem}
              border
              className="border-line h-full"
            >
              <EventCard {...event} />
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
