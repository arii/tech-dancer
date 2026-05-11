import { useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Quote } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { theme } from '@/styles/design-tokens';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';

interface EventHeroProps {
  title: string;
  location: string;
  date: string;
  image?: string;
  whyAttending?: string;
  eyebrow?: string;
}

export function EventHero({
  title,
  location,
  date,
  image,
  whyAttending,
  eyebrow = "Event Resource Guide"
}: EventHeroProps) {
  const accentGradient = useMemo(() => ({
    background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
  }), []);

  return (
    <Box
      position="relative"
      width="full"
      minHeight={{ base: theme.height.hero.mobile, md: theme.height.hero.desktop }}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      className="bg-bg"
    >
        {/* Background Layer */}
        <Box position="absolute" inset zIndex={0}>
          {image ? (
            <>
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover opacity-60"
                aria-hidden="true"
              />
              <Box
                position="absolute"
                inset
                style={accentGradient}
              />
            </>
          ) : (
            <HeroParticleCanvas />
          )}
        </Box>

        {/* Spacer to push content to bottom */}
        <Box flex={1} />

        {/* Content Layer */}
        <Box
          position="relative"
          zIndex={10}
          paddingX={{ base: 6, md: 12, lg: 24 }}
          paddingBottom={12}
          maxWidth="screen-xl"
          marginX="auto"
          width="full"
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTokens.page.transition}
        >
          <Grid cols={{ base: 1, lg: 12 }} gap={8} align="end">
            <Box className="lg:col-span-8">
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
                    size="fluid-8"
                    weight="font-black"
                    color="white"
                    leading="tight"
                    tracking="tighter"
                  >
                    {title}
                  </Text>
                </Stack>

                <Box display="flex" wrap gap={6} align="center">
                  <Box display="flex" align="center" gap={2}>
                    <Calendar className="w-5 h-5 text-accent" />
                    <Text variant="body" size="lg" weight="font-medium">
                      {date}
                    </Text>
                  </Box>
                  <Box display="flex" align="center" gap={2}>
                    <MapPin className="w-5 h-5 text-accent" />
                    <Text variant="body" size="lg" weight="font-medium">
                      {location}
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {whyAttending && (
              <Box className="lg:col-span-4">
                <Stack
                  gap={4}
                  padding={6}
                  radius="xl"
                  className="hero-glass-card"
                >
                  <Quote className="w-8 h-8 text-accent/50" />
                  <Text variant="body" size="lg" className="italic leading-relaxed">
                    {whyAttending}
                  </Text>
                  <Text variant="mono" size="xs" color="dim" uppercase tracking="wider">
                    Why Attend
                  </Text>
                </Stack>
              </Box>
            )}
          </Grid>
        </Box>
    </Box>
  );
}
