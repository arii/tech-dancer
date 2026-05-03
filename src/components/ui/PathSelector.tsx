import { useState } from 'react';
import { Grid } from '@/layouts/Primitives';
import { HeroPathCard } from './HeroPathCard';

type PathID = 'train' | 'travel';

const PATH_DATA = [
  {
    id: 'train' as PathID,
    title: 'Train smarter.',
    description: 'Drills, breakdowns, and mindset for competitive West Coast Swing dancers at every level.',
    links: [
      { text: 'WCS Training', to: '/blog?category=Lifestyle' },
      { text: 'Competition tips', to: '/blog?category=Strategy' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'travel' as PathID,
    title: 'Travel better.',
    description: 'Make the most of every dance weekend — what to pack, where to stay, and how to arrive ready to move.',
    links: [
      { text: 'Travel guides', to: '/blog?category=Travel', color: 'accent-purple' },
      { text: 'Event calendar', to: '/blog?category=Events', color: 'accent-purple' },
      { text: 'Packing lists', to: '/blog?category=Gear', color: 'accent-purple' },
    ],
  },
];

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);

  return (
    <Grid
      cols={{ base: 1, lg: 2 }}
      gap="none"
      border="y"
      width="full"
      className="bg-line"
    >
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id;

        return (
          <HeroPathCard
            key={path.id}
            {...path}
            isHovered={isHovered}
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => setHoveredPath(isHovered ? null : path.id)}
          />
        );
      })}
    </Grid>
  );
}
