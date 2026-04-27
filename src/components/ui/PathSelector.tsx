import { useState } from 'react';
import { HeroPathCard } from './HeroPathCard';

type PathID = 'dancer' | 'roboticist';

const PATH_DATA = [
  {
    id: 'dancer' as PathID,
    title: 'ARE YOU A DANCER?',
    wrapperClass: 'lg:col-span-7 border-r border-line/20',
    bgGradient: 'bg-gradient-to-br',
    titleClass: 'text-4xl md:text-6xl',
    links: [
      { text: 'Lifestyle blog posts', to: '/blog?category=Lifestyle' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'roboticist' as PathID,
    title: 'HIRING A ROBOTICIST?',
    wrapperClass: 'lg:col-span-5',
    bgGradient: 'bg-gradient-to-bl',
    titleClass: 'text-3xl md:text-5xl',
    scanlineDelay: 'delay-100',
    links: [
      { text: 'Tech blog posts', to: '/blog?category=Tech' },
      { text: 'Data & Development Lab', to: '/research' },
    ],
  },
];

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-y border-line min-h-[60vh] w-full bg-black">
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id;
        const isOtherHovered = hoveredPath !== null && !isHovered;

        const { id, ...pathProps } = path;

        return (
          <HeroPathCard
            key={id}
            {...pathProps}
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
