import { useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';
import { motionTokens } from '@/styles/motion';
import { EVENT_TABS } from '../constants';

interface EventHeroProps {
  title: string;
  location: string;
  date: string;
  whyAttending?: string;
  image?: string;
  eyebrow?: string;
}

export function EventHero({ title, location, date, whyAttending, image, eyebrow = "Event Guide" }: EventHeroProps) {
  const accentGradient = useMemo(() => ({
    background: 'radial-gradient(circle at top right, var(--hero-accent), transparent 70%)',
  }), []);

  return (
    <Box
      position="relative"
      width="full"
      minHeight={{ base: "40vh", md: "50vh" }}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      surface="bg"
    >
      {/* Background Image with Overlay */}
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

      <Box flex={1} display="flex" align="center" width="full" relative>
        <Stack
          relative
          zIndex={10}
          gap={6}
          paddingX={{ base: 6, md: 12, lg: 24 }}
          paddingY={12}
          maxWidth="screen-xl"
          marginX="auto"
          width="full"
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTokens.page.transition}
        >
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
              size="fluid-9"
              weight="font-black"
              color="white"
              leading="tight"
              tracking="tighter"
            >
              {title}
            </Text>
          </Stack>

          <Stack gap={4}>
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

            {whyAttending && (
              <Box maxWidth="2xl">
                <Text variant="body" size="lg" color="dim" italic>
                  &quot;{whyAttending}&quot;
                </Text>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Hero Navigation */}
      <Box
        position="relative"
        zIndex={20}
        className="border-t border-line/10 bg-bg/50 backdrop-blur-sm"
      >
        <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 6, md: 12, lg: 24 }}>
          <Box display="flex" gap={8} overflowX="auto" className="scrollbar-hide">
            {EVENT_TABS.map((tab) => (
              <Box
                key={tab.id}
                as="a"
                href={`#${tab.id}`}
                paddingY={4}
                className="group relative cursor-pointer whitespace-nowrap"
              >
                <Box display="flex" align="center" gap={2} color="dim" className="group-hover:text-accent transition-colors">
                  <tab.icon size={14} />
                  <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="widest">
                    {tab.label}
                  </Text>
                </Box>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  height={0.5}
                  className="bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
