import { NavLink } from 'react-router-dom';
import dancerHero from '@/assets/dancer_hero.webp';
import roboticistHero from '@/assets/roboticist_hero.webp';

type PathID = 'dancer' | 'roboticist';

interface HeroPathCardProps {
  id: PathID;
  title: string;
  wrapperClass: string;
  bgGradient: string;
  titleClass: string;
  scanlineDelay?: string;
  links: { text: string; to: string }[];
  isHovered: boolean;
  isOtherHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function HeroPathCard({
  id,
  title,
  wrapperClass,
  bgGradient,
  titleClass,
  scanlineDelay,
  links,
  isHovered,
  isOtherHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}: HeroPathCardProps) {
  const heroImage = id === 'dancer' ? dancerHero : roboticistHero;

  return (
    <div
      className={`${wrapperClass} relative group overflow-hidden cursor-pointer h-full min-h-[400px]`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isOtherHovered ? 'grayscale opacity-30 scale-100' : 'opacity-60 scale-105'
          } ${isHovered ? 'opacity-80 scale-110' : ''}`}
        />
      </div>

      {/* Background Gradient Overlay */}
      <div
        className={`absolute inset-0 z-1 ${bgGradient} from-accent/30 to-black transition-all duration-700 ease-in-out ${
          isOtherHovered ? 'grayscale opacity-60' : 'opacity-100'
        }`}
      ></div>

      {/* Scanline */}
      <div
        className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none transition-opacity duration-500 ${
          scanlineDelay || ''
        } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
      ></div>

      {/* Content Container */}
      <div className="relative z-20 p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <h2
          className={`${titleClass} font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2`}
        >
          {title}
        </h2>
        <ul className="space-y-4 mb-6 font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
          {links.map((link) => (
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
}
