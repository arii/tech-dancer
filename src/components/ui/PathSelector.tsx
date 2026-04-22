import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

        return (
          <div
            key={path.id}
            className={`${path.wrapperClass} relative group overflow-hidden cursor-pointer`}
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => setHoveredPath(isHovered ? null : path.id)}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 ${path.bgGradient} from-accent/30 to-black transition-all duration-700 ease-in-out ${
                isOtherHovered ? 'grayscale opacity-60' : 'opacity-100'
              }`}
            ></div>

            {/* Scanline */}
            <div
              className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none transition-opacity duration-500 ${
                path.scanlineDelay || ''
              } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
            ></div>

            {/* Content Container */}
            <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <h2
                className={`${path.titleClass} font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2`}
              >
                {path.title}
              </h2>
              <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {path.links.map((link) => (
                  <li key={link.text}>
                    <NavLink
                      className="hover:text-accent transition-colors flex items-center gap-2"
                      to={link.to}
                    >
                      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{' '}
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
