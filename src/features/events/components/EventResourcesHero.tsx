import { motion } from 'motion/react';
import { Calendar, ShoppingBag, Map } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { motionTokens } from '@/styles/motion';
import { Link } from 'react-router-dom';

interface CTAProps {
  to?: string;
  onClick?: () => void;
  icon: React.ElementType;
  label: string;
  description: string;
}

function HeroCTA({ to, onClick, icon: Icon, label, description }: CTAProps) {
  const commonProps = {
    padding: 6,
    radius: "xl" as const,
    border: true,
    display: "flex" as const,
    direction: "col" as const,
    gap: 3,
    className: "bg-surface/50 border-line hover:border-accent hover:bg-surface transition-all group text-left w-full"
  };

  const content = (
    <>
      <Box color="accent" className="group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </Box>
      <Stack gap={1}>
        <Text variant="body" weight="font-bold" color="main">
          {label}
        </Text>
        <Text variant="body" size="xs" color="dim">
          {description}
        </Text>
      </Stack>
    </>
  );

  if (onClick) {
    return (
      <Box as="button" onClick={onClick} {...commonProps}>
        {content}
      </Box>
    );
  }

  return (
    <Box
      as={Link}
      to={to || '/'}
      {...commonProps}
    >
      {content}
    </Box>
  );
}

export function EventResourcesHero({ onExploreClick }: { onExploreClick?: () => void }) {
      padding={6}
      radius="xl"
      border
      display="flex"
      direction="col"
      gap={3}
      className="bg-surface/50 border-line hover:border-accent hover:bg-surface transition-all group"
    >
      <Box color="accent" className="group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </Box>
      <Stack gap={1}>
        <Text variant="body" weight="font-bold" color="main">
          {label}
        </Text>
        <Text variant="body" size="xs" color="dim">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}

export function EventResourcesHero() {
  return (
    <Stack
      gap={12}
      paddingY={{ base: 12, md: 20 }}
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTokens.page.transition}
    >
      <Stack gap={4} maxWidth="3xl">
        <Text
          variant="mono"
          size="xs"
          weight="font-bold"
          color="accent"
          uppercase
          tracking="widest"
        >
          Event Planning Hub
        </Text>
        <Text
          as="h1"
          variant="headline"
          size={{ base: "fluid-5", md: "fluid-7" }}
          weight="font-black"
          leading="tight"
        >
          Master Your Next <br />
          <Text as="span" color="accent">Event Journey</Text>
        </Text>
        <Text variant="body" size="lg" color="dim">
          From packing essentials to social etiquette, we provide the tools and guides you need for a seamless West Coast Swing weekend.
        </Text>
      </Stack>

      <Grid
        cols={{ base: 1, md: 3 }}
        gap={4}
        width="full"
      >
        <HeroCTA
          onClick={onExploreClick}
          icon={Map}
          label="Event Guides"
          description="Detailed planning for upcoming WCS weekends."
        />
        <HeroCTA
          to="/gear"
          icon={ShoppingBag}
          label="Gear Reviews"
          description="Tested footwear and travel essentials."
        />
        <HeroCTA
          to="/events?view=calendar"
          icon={Calendar}
          label="Event Calendar"
          description="Plan your season with our curated list."
        />
      </Grid>
    </Stack>
  );
}
