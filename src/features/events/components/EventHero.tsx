import { useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { Logo } from '@/components/ui/Logo';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';
import { EventNavigation } from './EventNavigation';

interface EventHeroProps {
  title: string;
  location: string;
  city?: string;
  date: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  eyebrow?: string;
  whyAttending?: string;
  id?: string;
  activeTabIds?: string[];
}

export function EventHero({
  title,
  location,
  city,
  date,
  startDate,
  endDate,
  image,
  eyebrow = "Event Resource Guide",
  whyAttending,
  id,
  activeTabIds
}: EventHeroProps) {
  const accentGradient = useMemo(() => ({
    background: 'radial-gradient(circle at top right, var(--hero-accent), transparent 70%)',
  }), []);

  return (
    <Stack
      id={id}
      data-testid="hero"
      position="relative"
      width="full"
      minHeight={{ base: "30vh", md: "40vh" }}
      direction="col"
      gap={0}
      overflow="hidden"
      surface="bg"
    >
      {/* Background Image or Particle Fallback */}
      {image ? (
        <Box
          position="absolute"
          inset
          zIndex={0}
          height={{ base: "60vh", md: "full" }}
          maxHeight={{ base: 80, md: "none" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-40"
          />
          <Box
            position="absolute"
            inset
            className="event-hero-overlay"
          />
        </Box>
      ) : (
        <HeroParticleCanvas />
      )}

      {/* Decorative accent */}
      <Box
        position="absolute"
        top={0}
        right={0}
        width={{ base: "full", md: "1/2" }}
        height="full"
        pointerEvents="none"
        opacity={20}
        style={accentGradient}
      />

      <Stack
        relative
        zIndex={10}
        gap={{ base: 6, md: 10 }}
        paddingX={{ base: 6, md: 12, lg: 24 }}
        paddingTop={{ base: 8, md: 12 }}
        paddingBottom={{ base: 6, md: 8 }}
        maxWidth="screen-xl"
        marginX="auto"
        width="full"
        flex="1 1 auto"
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTokens.page.transition}
      >
        <Stack gap={6}>
          {/* Back Navigation & Breadcrumbs */}
          <Stack gap={4}>
            <Stack
              as={Link}
              to="/events"
              direction="row"
              align="center"
              gap={1.5}
              color="dim"
              className="hover:text-accent transition-colors group w-fit"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wider">
                Back to Events
              </Text>
            </Stack>

            <Box display="flex" align="center" gap={2} color="dim" className="opacity-60">
              <Link to="/" className="hover:text-accent-sky transition-colors">
                <Text variant="mono" size="tiny" weight="font-bold" uppercase>Home</Text>
              </Link>
              <ChevronRight size={10} />
              <Link to="/events" className="hover:text-accent-sky transition-colors">
                <Text variant="mono" size="tiny" weight="font-bold" uppercase>Event Resource Guides</Text>
              </Link>
              <ChevronRight size={10} />
              <Text variant="mono" size="tiny" weight="font-bold" uppercase color="accent">{title}</Text>
            </Box>
          </Stack>

          <Stack gap={2}>
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="accent"
              uppercase
              tracking="widest"
            >
              {eyebrow}
            </Text>
            <Text
              as="h1"
              variant="display"
              size={{ base: "3xl", md: "5xl", lg: "7xl" }}
              weight="font-black"
              color="white"
              leading="none"
              tracking="tighter"
              className="uppercase italic"
            >
              {title}
            </Text>
          </Stack>

          <Text
            variant="mono"
            size={{ base: "tiny", md: "xs" }}
            weight="font-bold"
            color="dim"
            uppercase
            tracking="widest"
            className="opacity-80"
          >
            Plan smarter. Pack lighter. Dance more.
          </Text>

          <Box display="flex" wrap gap={{ base: 4, md: 8 }} align="center">
            <Box display="flex" align="center" gap={3}>
              <Calendar className="w-5 h-5 text-accent" />
              <Stack gap={0}>
                <Text variant="body" size={{ base: "sm", md: "md" }} weight="font-bold" color="white">
                  {startDate && endDate ? `${startDate} — ${endDate}` : date}
                </Text>
                <Text variant="mono" size="tiny" color="dim" uppercase tracking="wider">
                  Event Dates
                </Text>
              </Stack>
            </Box>
            <Box display="flex" align="center" gap={3}>
              <MapPin className="w-5 h-5 text-accent" />
              <Stack gap={0}>
                <Text variant="body" size={{ base: "sm", md: "md" }} weight="font-bold" color="white">
                  {city ? `${city}` : location}
                </Text>
                <Text variant="mono" size="tiny" color="dim" uppercase tracking="wider">
                  {city ? location : 'Location'}
                </Text>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {whyAttending && (
          <Box
            data-testid="why-attending"
            padding={{ base: 6, md: 8 }}
            radius="xl"
            width="full"
            maxWidth="3xl"
            className="glass-panel border-l-4 border-l-accent shadow-2xl"
          >
            <Stack gap={{ base: 4, md: 6 }}>
              <Box display="flex" align="center" justify="between">
                <Box display="flex" align="center" gap={3}>
                  <Logo className="h-4 md:h-5" />
                  <Text
                    variant="mono"
                    size="tiny"
                    weight="font-bold"
                    uppercase
                    tracking="widest"
                    color="dim"
                  >
                    Why I'm Attending
                  </Text>
                </Box>
                <Box
                  as="a"
                  href="#notes"
                  display={{ base: "none", md: "flex" }}
                  align="center"
                  gap={2}
                  color="accent"
                  className="hover:text-white transition-colors"
                >
                  <Text variant="mono" size="tiny" weight="font-bold" uppercase>Full Preview</Text>
                  <ChevronRight size={12} />
                </Box>
              </Box>
              <Text
                variant="body"
                size={{ base: "sm", md: "md" }}
                leading="relaxed"
                className="italic text-white/90 line-clamp-3 md:line-clamp-none"
              >
                {whyAttending}
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>

      <Box relative zIndex={20} marginTop="auto">
        <EventNavigation activeTabIds={activeTabIds} />
      </Box>
    </Stack>
  );
}
