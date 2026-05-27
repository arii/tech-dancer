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
  whyAttending?: string;
  id?: string;
}

export function EventHero({
  title,
  location,
  date,
  image,
  eyebrow = "Event Resource Guide",
  whyAttending,
  id
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
      minHeight={{ base: "auto", md: "40vh" }}
      direction="col"
      gap={0}
      overflow="hidden"
      className="bg-slate-950 border-b border-white/10"
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
        pointerEvents="none"
        opacity={20}
        style={accentGradient}
      />

      <Stack
        relative
        zIndex={10}
        gap={{ base: 6, md: 10 }}
        paddingX={{ base: 4, sm: 6, lg: 8 }}
        paddingTop={{ base: 24, md: 24 }}
        paddingBottom={10}
        maxWidth="screen-xl"
        marginX="auto"
        width="full"
        flex="1 1 auto"
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTokens.page.transition}
      >
        <Stack gap={6} maxWidth="720px">
          <Stack gap={2}>
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="accent"
              uppercase
              tracking="widest"
              className="text-[11px] sm:text-xs"
            >
              {eyebrow}
            </Text>
            <Text
              as="h1"
              variant="headline"
              size={{ base: "3xl", sm: "4xl", md: "5xl" }}
              weight="font-black"
              color="white"
              leading="tight"
              tracking="tight"
            >
              {title}
            </Text>
          </Stack>

          <Box display="flex" wrap gap={{ base: 4, md: 6 }} align="center" className="flex-col sm:flex-row items-start sm:items-center">
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
          </Box>
        </Stack>

        {whyAttending && (
          <Box
            data-testid="why-attending"
            padding={{ base: 4, md: 6 }}
            radius="lg"
            width={{ base: "full", md: "auto" }}
            maxWidth="2xl"
            className="glass-panel border-l-4 border-l-accent"
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
        <EventNavigation />
      </Box>
    </Stack>
  );
}
