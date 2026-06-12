import { useMemo } from 'react';
import { MapPin, Calendar, Palette, Building2, Target, Bell, Package } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';
import { Hero } from '@/components/ui/Hero';
import { MetadataPill } from '@/components/ui/MetadataPill';

interface EventHeroProps {
  title: string;
  location: string;
  date: string;
  image?: string;
  eyebrow?: string;
  theme?: string;
  venue?: string;
  bestFor?: string;
  deadline?: string;
  packingCue?: string;
  id?: string;
}

export function EventHero({
  title,
  location,
  date,
  image,
  eyebrow = "Event Resource Guide",
  theme,
  venue,
  bestFor,
  deadline,
  packingCue,
  id
}: EventHeroProps) {
  const accentGradient = useMemo(() => ({
    background: 'radial-gradient(circle at top right, var(--hero-accent), transparent 70%)',
  }), []);

  return (
    <Hero
      id={id}
      variant="event"
      background={
        <>
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

          <Box
            position="absolute"
            top={0}
            right={0}
            width={{ base: "full", md: "1/2" }}
            height="full"
            pointerEvents="none"
            opacityVariant="low"
            style={accentGradient}
          />
        </>
      }
      eyebrow={eyebrow}
      title={title}
      metadata={
        <Stack gap={4}>
          <Box display="flex" wrap gap={{ base: 3, md: 5 }} align="center">
            <Box display="flex" align="center" gap={2}>
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <Text variant="body" size={{ base: "xs", md: "sm" }} weight="font-medium">
                {date}
              </Text>
            </Box>
            <Box display="flex" align="center" gap={2}>
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
              <Text variant="body" size={{ base: "xs", md: "sm" }} weight="font-medium">
                {location}
              </Text>
            </Box>
          </Box>


          <Box
            display="flex"
            gap={3}
            overflowX="auto"
            className="no-scrollbar"
            marginX={{ base: -6, md: 0 }}
            paddingX={{ base: 6, md: 0 }}
            paddingY={2}
          >
            {theme && (
              <MetadataPill icon={Palette} label="Theme" value={theme} />
            )}
            {venue && (
              <MetadataPill icon={Building2} label="Venue" value={venue} />
            )}
            {bestFor && (
              <MetadataPill icon={Target} label="Best for" value={bestFor} />
            )}
            {deadline && (
              <MetadataPill icon={Bell} label="Deadline" value={deadline} />
            )}
            {packingCue && (
              <MetadataPill icon={Package} label="Packing" value={packingCue} />
            )}
          </Box>
        </Stack>
      }
    />
  );
}
