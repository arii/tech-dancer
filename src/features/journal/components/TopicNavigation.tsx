import { Calendar, ShoppingBag, BookOpen, Cpu } from 'lucide-react';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { useSearchParam } from '@/hooks/useSearchParam';

const TOPICS = [
  {
    icon: BookOpen,
    label: 'WCS',
    description: 'Dance concepts and rhythmic architecture.',
    category: 'WCS',
  },
  {
    icon: ShoppingBag,
    label: 'GEAR',
    description: 'Practical tools and reviews for dancers.',
    category: 'Gear',
  },
  {
    icon: Calendar,
    label: 'EVENTS',
    description: 'Planning guides for the WCS circuit.',
    category: 'Events',
  },
  {
    icon: Cpu,
    label: 'DEVAI',
    description: 'Engineering insights and automation.',
    category: 'DevAI',
  },
];

export function TopicNavigation() {
  const [, setCategory] = useSearchParam('category', 'All');

  return (
    <Box id="categories" as="section" paddingY={12}>
      <Text as="h2" variant="headline" size="lg" weight="font-black" marginBottom={6} uppercase tracking="widest">
        Browse by Topic
      </Text>
      <Grid cols={{ base: 2, md: 4 }} gap={4}>
        {TOPICS.map(({ icon: Icon, label, description, category }) => (
          <Stack
            key={label}
            as="button"
            onClick={() => {
              setCategory(category);
              document.getElementById('latest-articles')?.scrollIntoView({ behavior: 'smooth' });
            }}
            gap={3}
            padding={6}
            border
            radius="lg"
            align="start"
            textAlign="left"
            className="group transition-all duration-200 hover:border-accent/40 hover:bg-surface/60 active:scale-[0.98]"
          >
            <Box className="w-10 h-10 flex items-center justify-center rounded-md bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </Box>
            <Stack gap={1}>
              <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
                {label}
              </Text>
              <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-snug">
                {description}
              </Text>
            </Stack>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
