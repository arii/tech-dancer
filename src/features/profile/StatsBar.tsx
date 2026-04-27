// impeccable-ignore-file
import { Box, Text } from '@/layouts/Primitives';
import { ProfileStats } from './types';

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
    <Box
      display="grid"
      cols={{ base: 2, md: 4 }}
      border
      radius="md"
      overflow="hidden"
      marginBottom={8}
      className="bg-surface"
    >
      {items.map((item, idx) => (
        <Box
          key={item.label}
          padding={4}
          display="flex"
          direction="col"
          align="center"
          justify="center"
          border={idx % 2 === 0 ? "r" : false}
          mdBorder={idx < items.length - 1 ? "r" : false}
          className="text-center"
        >
          <Text variant="display" size="2xl" weight="font-medium" className="text-accent-navy leading-none">
            {item.value}
          </Text>
          <Text variant="mono" size="micro" color="dim" marginTop={1} tracking="emphasized">
            {item.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
