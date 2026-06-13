import { CheckCircle2, Zap, RotateCcw, ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';

interface JourneyStepProps {
  icon: React.ElementType;
  title: string;
  items: { label: string; to: string }[];
  color: string;
}

function JourneyStep({ icon: Icon, title, items, color }: JourneyStepProps) {
  const colorMap: Record<string, { bg: string; text: string; lightBg: string }> = {
    'accent': {
      bg: 'bg-accent',
      text: 'text-accent',
      lightBg: 'bg-accent/10'
    },
    'brand-green-status': {
      bg: 'bg-brand-green-status',
      text: 'text-brand-green-status',
      lightBg: 'bg-brand-green-status/10'
    },
    'brand-amber-text': {
      bg: 'bg-brand-amber-text',
      text: 'text-brand-amber-text',
      lightBg: 'bg-brand-amber-text/10'
    }
  };

  const colors = colorMap[color] || colorMap['accent'];

  return (
    <Stack
      gap={6}
      padding={8}
      radius="2xl"
      border
      className="border-line bg-surface/30 hover:bg-surface/50 transition-colors relative overflow-hidden"
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        width={32}
        height={32}
        opacityVariant="ghost"
        className={`${colors.bg} blur-3xl rounded-full -mr-16 -mt-16`}
      />

      <Box display="flex" align="center" gap={3}>
        <Box
          padding={3}
          radius="lg"
          className={`${colors.lightBg} ${colors.text}`}
        >
          <Icon className="w-6 h-6" />
        </Box>
        <Text variant="body" size="xl" weight="font-bold">
          {title}
        </Text>
      </Box>

      <Stack gap={3}>
        {items.map((item, idx) => (
          <Box
            key={idx}
            as={Link}
            to={item.to}
            display="flex"
            align="center"
            justify="between"
            paddingY={2}
            className="group/item border-b border-line/50 last:border-0"
          >
            <Text size="sm" color="dim" className="group-hover/item:text-main transition-colors">
              {item.label}
            </Text>
            <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export function PreparationJourney() {
  const steps = [
    {
      icon: CheckCircle2,
      title: "1. Before the Event",
      color: "accent",
      items: [
        { label: "Ultimate Packing Checklist", to: "/blog/gear-essentials" },
        { label: "Hotel & Flight Strategy", to: "/blog/financial-literacy-dancers" },
        { label: "Shoe Prep & Maintenance", to: "/blog/make-shoe-dance" },
        { label: "Goal Setting for Success", to: "/blog/why-finals-are-hard" }
      ]
    },
    {
      icon: Zap,
      title: "2. During the Event",
      color: "brand-green-status",
      items: [
        { label: "Social Dance Etiquette", to: "/blog/competition-metrics" },
        { label: "Hydration & Fueling Guide", to: "/blog/gear-essentials" },
        { label: "Recovery & Injury Prevention", to: "/blog/make-shoe-dance" },
        { label: "The Competition Mindset", to: "/blog/why-finals-are-hard" }
      ]
    },
    {
      icon: RotateCcw,
      title: "3. After the Event",
      color: "brand-amber-text",
      items: [
        { label: "Video Review Process", to: "/blog/competition-metrics" },
        { label: "Networking & Connections", to: "/blog/boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing" },
        { label: "Post-Event Training Plan", to: "/blog/github-actions" },
        { label: "Rest & Decompression", to: "/blog/financial-literacy-dancers" }
      ]
    }
  ];

  return (
    <Stack gap={10}>
      <Stack gap={2}>
        <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
          The Roadmap
        </Text>
        <Text as="h2" variant="headline" size="3xl" weight="font-black">
          Event Preparation Journey
        </Text>
        <Text variant="body" color="dim" className="max-w-2xl">
          A structured guide through every phase of your dance weekend, from the first bag packed to the final video review.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 3 }} gap={6}>
        {steps.map((step, idx) => (
          <JourneyStep key={idx} {...step} />
        ))}
      </Grid>
    </Stack>
  );
}
