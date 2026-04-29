import { Grid, Stack, Text } from '@/layouts/Primitives';
import { ProfileStats } from './types';
import { cn } from '@/lib/utils';

interface StatsBarProps {
  stats: ProfileStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { value: stats.yearsDancing, label: "Years dancing" },
    { value: stats.eventsPerYear, label: "Events per year" },
    { value: stats.phdYear, label: "PhD, MIT CSAIL" },
    { value: stats.primaryStyle, label: "Primary style" },
  ];

  return (
    <Grid
      cols={{ base: 2, md: 4 }}
      border
      radius="lg"
      shadow="sm"
      overflow="hidden"
      marginBottom={8}
      className="bg-surface"
    >
      {items.map((item, idx) => (
        <Stack
          key={item.label}
          padding={6}
          direction="col"
          align="center"
          justify="center"
          gap={1}
          className={cn(
            "text-center transition-colors hover:bg-surface/50",
            "border-b border-line md:border-b-0",
            idx === 1 || idx === 3 ? "border-r-0 md:border-r" : "border-r md:border-r",
            idx === items.length - 1 ? "md:border-r-0" : "",
            idx > 1 ? "border-b-0" : ""
          )}
        >
          <Text variant="display" size="3xl" weight="font-bold" className="text-accent-navy leading-tight">
            {item.value}
          </Text>
          <Text variant="mono" size={{ base: "micro", md: "xs" }} color="dim" tracking="wide-editorial" weight="font-semibold">
            {item.label}
          </Text>
        </Stack>
      ))}
    </Grid>
  );
}
