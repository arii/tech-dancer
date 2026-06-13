import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { ClipboardCheck, Footprints, Calendar, ShieldCheck, Map, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolkitItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
}

function ToolkitItem({ icon: Icon, title, description, to, onClick }: ToolkitItemProps) {
  const commonProps = {
    padding: 6,
    radius: "xl" as const,
    border: true,
    display: "flex" as const,
    direction: "col" as const,
    gap: 4,
    className: "border-line bg-surface/50 hover:border-accent hover:shadow-glow transition-all group text-left w-full"
  };

  const content = (
    <>
      <Box
        padding={3}
        radius="lg"
        className="bg-accent/5 text-accent group-hover:bg-accent group-hover:text-bg transition-colors self-start"
      >
        <Icon className="w-5 h-5" />
      </Box>
      <Stack gap={1}>
        <Text variant="body" weight="font-bold" color="main">
          {title}
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

export function ResourceToolkit({ onGuidesClick }: { onGuidesClick?: () => void }) {
  const tools = [
    {
      icon: ClipboardCheck,
      title: "Essential Checklists",
      description: "Don't leave home without checking these boxes.",
      to: "/blog/gear-essentials"
    },
    {
      icon: Footprints,
      title: "Shoe Prep Kit",
      description: "Maintain your soles for optimal floor connection.",
      to: "/blog/make-shoe-dance"
    },
    {
      icon: Calendar,
      title: "Event Calendar",
      description: "Yearly view of major WCS conventions.",
      to: "/events?view=calendar"
    },
    {
      icon: ShieldCheck,
      title: "Travel Insurance Tips",
      description: "Protect your trip against unexpected changes.",
      to: "/blog/financial-literacy-dancers"
    },
    {
      icon: Map,
      title: "City Guides",
      description: "Best local eats and spots near event venues.",
      onClick: onGuidesClick
    },
    {
      icon: HelpCircle,
      title: "First-Timer FAQ",
      description: "Everything you need to know about your first convention.",
      to: "/about"
    }
  ];

  return (
    <Stack gap={10}>
      <Stack gap={2}>
        <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
          Toolkit
        </Text>
        <Text as="h2" variant="headline" size="3xl" weight="font-black">
          Event Resources Toolkit
        </Text>
        <Text variant="body" color="dim" className="max-w-2xl">
          A collection of specialized tools and templates designed to make your event experience as smooth as possible.
        </Text>
      </Stack>

      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {tools.map((tool, idx) => (
          <ToolkitItem key={idx} {...tool} />
        ))}
      </Grid>
    </Stack>
  );
}
