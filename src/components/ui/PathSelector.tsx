import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@/layouts/Primitives';
import { HeroPathCard } from './HeroPathCard';
import { getSiteConfig } from '@/lib/content';
import dancerHero from '@/assets/dancer_hero.webp';
import roboticistHero from '@/assets/roboticist_hero.webp';

type PathID = 'dancer' | 'roboticist';

const PATH_ASSETS = {
  dancer: {
    image: dancerHero,
    wrapperClass: 'lg:col-span-7 bg-black',
    titleClass: 'text-4xl md:text-6xl',
    scanlineDelay: 'animation-delay-0',
  },
  roboticist: {
    image: roboticistHero,
    wrapperClass: 'lg:col-span-5 bg-zinc-900',
    titleClass: 'text-3xl md:text-5xl',
    scanlineDelay: 'animation-delay-500',
  }
};

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);
  const { data: siteConfig } = useQuery({
    queryKey: ['site-config'],
    queryFn: getSiteConfig,
  });

  const pathData = ((siteConfig?.pathSelector as Record<string, unknown>[]) || []).map((path) => ({
    ...path,
    ...PATH_ASSETS[path.id as PathID],
  }));

  return (
    <Grid
      cols={{ base: 1, lg: 12 }}
      gap="px"
      surface="muted"
      border="y"
      minHeight="[40vh]"
      width="full"
      className="bg-line"
    >
      {pathData.map((path) => {
        const isHovered = hoveredPath === path.id;
        const isOtherHovered = hoveredPath !== null && !isHovered;

        return (
          <HeroPathCard
            key={path.id}
            {...path}
            isHovered={isHovered}
            isOtherHovered={isOtherHovered}
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => setHoveredPath(isHovered ? null : path.id)}
          />
        );
      })}
    </Grid>
  );
}
