import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeroPathCardProps {
  title: string;
  wrapperClass: string;
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
  title,
  wrapperClass,
  titleClass,
  scanlineDelay,
  links,
  isHovered,
  isOtherHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}: HeroPathCardProps) {
  return (
    <div
      className={cn(
        wrapperClass,
        "relative group overflow-hidden cursor-pointer h-full min-h-[300px] transition-all duration-700 ease-in-out",
        isOtherHovered ? "opacity-30 grayscale scale-[0.98]" : "opacity-100 grayscale-0 scale-100"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Scanline */}
      <div
        className={`absolute left-0 top-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF7F50] z-10 pointer-events-none transition-opacity duration-500 ${
          scanlineDelay || ''
        } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
      ></div>

      {/* Content Container */}
      <div className="relative z-20 p-8 md:p-16 lg:p-20 h-full flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
        <h2
          className={`${titleClass} font-display font-black mb-8 text-white transition-transform duration-500 group-hover:translate-x-2 leading-[0.9] tracking-tighter`}
        >
          {title}
        </h2>
        <ul className="flex flex-col gap-5 mb-6 font-sans text-lg tracking-tight text-white">
          {links.map((link, index) => {
            const isExternal = link.to.startsWith('http') || link.to.startsWith('//');
            const isPrimary = index === 0;
            
            const commonProps = {
              className: cn(
                "group/link flex items-center gap-3 transition-all duration-300",
                isPrimary ? "text-white font-bold" : "text-white/60 hover:text-white"
              )
            };

            const linkContent = (
              <>
                <span className="relative">
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full" />
                </span>
                <span className="text-accent opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">
                  →
                </span>
              </>
            );

            return (
              <li key={link.text}>
                {isExternal ? (
                  <a
                    {...commonProps}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkContent}
                  </a>
                ) : (
                  <NavLink
                    {...commonProps}
                    to={link.to}
                  >
                    {linkContent}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
