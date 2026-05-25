import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Star, ArrowRight, Package } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { CategoryPlaceholder } from '@/components/ui/CategoryPlaceholder';
import type { Resource } from '@/lib/content';

interface GearCarouselProps {
  gearItems: Resource[];
}

export function GearCarousel({ gearItems }: GearCarouselProps) {
  return (
    <Stack gap={8} paddingX={{ base: 4, md: 6, lg: 12 }} as={motion.div} variants={motionTokens.staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }}>
      <Stack gap={2}>
        <Text as="h2" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
          Essential Guides
        </Text>
        <Text as="h3" size="fluid-5" weight="font-black" leading="tight">
          Gear Reviews
        </Text>
      </Stack>

      {/* Horizontal scrolling container */}
      <Box
        display="flex"
        overflow="x-auto"
        gap={4}
        paddingY={2}
        className="scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {gearItems.map((gear) => (
          <Box
            key={gear.slug}
            as={motion.div}
            variants={motionTokens.staggerItem}
            flex="0 0 auto"
            width={{ base: "280px", sm: "320px" }}
            className="snap-start"
          >
            <Box
              as={NavLink}
              to={`/gear/${gear.slug}`}
              className="group flex flex-col h-full rounded-lg overflow-hidden bg-surface border border-line transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Image Container */}
              <Box
                position="relative"
                aspect="square"
                overflow="hidden"
                className="bg-surface-alt/20"
              >
                {gear.image ? (
                  <img
                    src={gear.image}
                    alt={gear.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <CategoryPlaceholder category={gear.category} size="lg" />
                )}
                {/* Category + Type Badge */}
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                  paddingX={2}
                  paddingY={1}
                  radius="full"
                  className="bg-accent/90 backdrop-blur-sm text-white shadow-sm flex items-center gap-1"
                >
                  <Package size={12} className="text-white" />
                  <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="wide">
                    Gear
                  </Text>
                </Box>
              </Box>

              {/* Content */}
              <Stack gap={3} padding={4} height="full">
                {gear.verdict && (
                  <Text variant="mono" size="xs" color="accent" weight="font-bold" className="line-clamp-2">
                    Best for: {gear.verdict}
                  </Text>
                )}
                <Stack gap={1} flex={1}>
                  <Text
                    size="sm"
                    weight="font-bold"
                    color="main"
                    leading="tight"
                    className="group-hover:text-accent transition-colors line-clamp-2"
                  >
                    {gear.title}
                  </Text>
                  <Text size="xs" color="dim" className="line-clamp-1">
                    {gear.category}
                  </Text>
                </Stack>

                {/* Footer */}
                <Box
                  display="flex"
                  align="center"
                  justify="between"
                  paddingTop={2}
                  border="t"
                  className="border-line/30"
                >
                  {gear.rating !== undefined && (
                    <Box display="flex" align="center" gap={1}>
                      <Star size={14} className="text-accent fill-accent" />
                      <Text variant="mono" size="xs" weight="font-bold">
                        {gear.rating.toFixed(1)}/5
                      </Text>
                    </Box>
                  )}
                  <Box display="flex" align="center" gap={1} className="text-accent group-hover:text-accent/80 transition-colors">
                    <Text variant="mono" size="xs" weight="font-bold">
                      Read
                    </Text>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
