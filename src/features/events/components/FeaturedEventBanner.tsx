import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { Link } from 'react-router-dom';
import { Event } from '@/lib/content';

interface FeaturedEventBannerProps {
  event: Event;
}

export function FeaturedEventBanner({ event }: FeaturedEventBannerProps) {
  if (!event) return null;

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={motionTokens.page.transition}
      position="relative"
      radius="2xl"
      overflow="hidden"
      border
      className="border-line group"
    >
      <Box
        display="grid"
        gridCols={{ base: 1, lg: 2 }}
        gap={0}
        minHeight={{ base: "auto", lg: 96 }}
      >
        {/* Content Side */}
        <Stack
          padding={{ base: 8, md: 12 }}
          gap={8}
          justify="center"
          className="bg-surface relative z-10"
        >
          <Stack gap={2}>
            <Box display="flex" align="center" gap={2}>
              <Box
                paddingX={2}
                paddingY={0.5}
                radius="sm"
                className="bg-accent/10 border border-accent/20"
              >
                <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase>
                  Featured Guide
                </Text>
              </Box>
            </Box>
            <Text
              as="h2"
              variant="headline"
              size={{ base: "3xl", md: "5xl" }}
              weight="font-black"
            >
              {event.title}
            </Text>
            <Text variant="body" size="lg" color="dim" className="max-w-md">
              {event.excerpt || "Get ready for one of the most anticipated events on the calendar. Check our guide for packing lists, schedules, and more."}
            </Text>
          </Stack>

          <Box display="flex" wrap gap={6}>
            <Box display="flex" align="center" gap={2}>
              <Calendar className="w-5 h-5 text-accent" />
              <Text weight="font-medium">{event.date || event.schedule}</Text>
            </Box>
            <Box display="flex" align="center" gap={2}>
              <MapPin className="w-5 h-5 text-accent" />
              <Text weight="font-medium">{event.location}</Text>
            </Box>
          </Box>

          <Box
            as={Link}
            to={`/events/${event.slug}`}
            display="flex"
            align="center"
            gap={2}
            className="text-accent font-bold"
          >
            <Text as="span">Explore the Guide</Text> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Box>
        </Stack>

        {/* Image Side */}
        <Box position="relative" height={{ base: 60, lg: "auto" }} className="bg-surface-alt">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <Box inset display="flex" align="center" justify="center" className="bg-gradient-to-br from-accent/5 to-accent/20">
              <Calendar className="w-20 h-20 text-accent/20" />
            </Box>
          )}
          <Box
            position="absolute"
            inset
            className="bg-gradient-to-r from-surface via-surface/50 to-transparent hidden lg:block"
          />
          <Box
            position="absolute"
            inset
            className="bg-gradient-to-t from-surface via-transparent to-transparent lg:hidden"
          />
        </Box>
      </Box>
    </Box>
  );
}
