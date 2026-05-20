import { useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { Logo } from '@/components/ui/Logo';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';
import { EventNavigation } from './EventNavigation';

interface EventHeroProps {
  title: string;
  location: string;
  date: string;
  image?: string;
  eyebrow?: string;
  url?: string;
  whyAttending?: string;
  activeTab?: string;
  id?: string;
}

export function EventHero({
  title,
  location,
  date,
  image,
  url,
  eyebrow = "Event Resource Guide",
  whyAttending,
  activeTab,
  id
}: EventHeroProps) {
  const accentGradient = useMemo(() => ({
    background: 'radial-gradient(circle at top right, var(--hero-accent), transparent 70%)',
  }), []);

  return (
    <Box
      id={id}
      data-testid="hero"
      position="relative"
      width="full"
      minHeight={{ base: "30vh", md: "40vh" }}
      display="flex"
      direction="column"
      overflow="hidden"
      className="bg-bg"
    >
      {/* Background Image or Particle Fallback */}
      {image ? (
        <Box position="absolute" inset zIndex={0}>
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-40"
            aria-hidden="true"
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
        className="pointer-events-none opacity-20"
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
              variant="headline"
              size={{ base: "fluid-5", md: "fluid-7" }}
              weight="font-black"
              color="white"
              leading="tight"
              tracking="tight"
            >
              {title}
            </Text>
          </Stack>

          <Box display="flex" wrap gap={{ base: 4, md: 6 }} align="center">
            <Box display="flex" align="center" gap={2}>
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <Text variant="body" size={{ base: "sm", md: "lg" }} weight="font-medium">
                {date}
              </Text>
            </Box>
            <Box display="flex" align="center" gap={2}>
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <Text variant="body" size={{ base: "sm", md: "lg" }} weight="font-medium">
                {location}
              </Text>
            </Box>
            {url && (
              <Box as="a" href={url} target="_blank" rel="noopener noreferrer" display="flex" align="center" gap={2} className="group cursor-pointer">
                <Logo className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest" className="group-hover:text-accent transition-colors">
                  Official Site ↗
                </Text>
              </Box>
            )}
          </Box>
        </Stack>

        {whyAttending && (
          <Box
            data-testid="why-attending"
            padding={{ base: 4, md: 6 }}
            radius="lg"
            width={{ base: "full", md: "auto" }}
            className="glass-panel max-w-2xl border-l-4 border-l-accent"
          >
            <Stack gap={{ base: 3, md: 4 }}>
              <Box display="flex" align="center" gap={3}>
                <Logo className="h-3 md:h-4" />
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
              <Text
                variant="body"
                size="sm"
                leading="relaxed"
                className="italic text-white/90"
              >
                {whyAttending}
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>

      <Box relative zIndex={20} marginTop="auto">
        <EventNavigation activeTab={activeTab} />
      </Box>
    </Box>
  );
}
