import { useState } from 'react';
import { HeroPathCard } from './HeroPathCard';
import dancerHero from '@/assets/dancer_hero.webp';
import roboticistHero from '@/assets/roboticist_hero.webp';

type PathID = 'dancer' | 'roboticist';

const PATH_DATA = [
  {
    id: 'dancer' as PathID,
    title: 'ARE YOU A DANCER?',
    wrapperClass: 'lg:col-span-7 bg-[#0a0a0a]',
    image: dancerHero,
    titleClass: 'text-4xl md:text-6xl',
    scanlineDelay: 'animation-delay-0',
    links: [
      { text: 'WCS blog posts', to: '/blog?category=Lifestyle' },
      { text: 'Travel & Lifestyle', to: '/blog?category=Travel' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'roboticist' as PathID,
    title: 'HIRING A ROBOTICIST?',
    wrapperClass: 'lg:col-span-5 bg-[#111111]',
    image: roboticistHero,
    titleClass: 'text-3xl md:text-5xl',
    scanlineDelay: 'animation-delay-500',
    links: [
      { text: 'Technical Portfolio', to: 'https://arii.github.io' },
      { text: 'Tech blog posts', to: '/blog?category=Tech' },
      { text: 'Data & Development Lab', to: '/research' },
    ],
  },
];

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-line border-y border-line min-h-[40vh] w-full">
      {PATH_DATA.map((path) => {
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
    </div>
  );
}
