import { useMemo, ComponentType } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Palette, Building2, Target, Bell, Package } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { HeroParticleCanvas } from '@/components/ui/HeroParticleCanvas';

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

function MetadataPill({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>, label: string, value: string }) {
  return (
    <Box
      display="flex"
      align="baseline"
      gap={2}
      paddingX={3}
      paddingY={1.5}
      radius="full"
      className="bg-white/5 border border-white/10 whitespace-nowrap shrink-0"
    >
      <Icon className="w-3 h-3 text-accent/80 self-center" />
      <Stack gap={0}>
        <Text variant="mono" size="micro" color="dim" uppercase tracking="tighter">
          {label}
        </Text>
        <Text variant="body" size="xs" weight="font-medium">
          {value}
        </Text>
      </Stack>
    </Box>
  );
}

export function EventHero({
  title,
  location,
  date,
  image,
  eyebrow = "Event Insight",
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
    <Stack
      id={id}
      data-testid="hero"
      position="relative"
      width="full"
      minHeight={{ base: "20vh", md: "25vh" }}
      direction="col"
      gap={0}
      overflow="hidden"
      surface="bg"
    >

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

      <Stack
        relative
        zIndex={10}
        gap={{ base: 4, md: 6 }}
        paddingX={{ base: 6, md: 12, lg: 24 }}
        paddingTop={{ base: 6, md: 10 }}
        paddingBottom={{ base: 4, md: 6 }}
        maxWidth="screen-xl"
        marginX="auto"
        width="full"
        flex="1 1 auto"
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTokens.page.transition}
      >
        <Stack gap={4}>
          <Stack gap={1}>
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
              size={{ base: "fluid-4", md: "fluid-6" }}
              weight="font-black"
              color="white"
              leading="tight"
              tracking="tight"
            >
              {title}
            </Text>
          </Stack>

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
      </Stack>
    </Stack>
  );
}
