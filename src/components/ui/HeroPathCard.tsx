import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Box, Stack } from '@/layouts/Primitives';

interface HeroPathCardProps {
  title: string;
  wrapperClass: string;
  image: string;
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
  image,
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
    <Box
      as="div"
      height="full"
      minHeight="300px"
      className={cn(
        wrapperClass,
        "relative group overflow-hidden cursor-pointer transition-all duration-700 ease-in-out",
        isOtherHovered ? "opacity-30 grayscale scale-[0.98]" : "opacity-100 grayscale-0 scale-100"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Background Image */}
      <Box position="absolute" inset={true} zIndex={0}>
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-in-out",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
      </Box>

      {/* Scanline */}
      <Box
        shadow="glow"
        className={`absolute left-0 top-0 w-full h-0.5 bg-accent z-10 pointer-events-none transition-opacity duration-500 ${
          scanlineDelay || ''
        } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
      ></Box>

      {/* Content Container */}
      <Stack
        position="relative"
        zIndex={20}
        padding={{ base: 8, md: 16, lg: 20 }}
        height="full"
        direction="col"
        justify="end"
        gap={0}
        className="bg-gradient-to-t from-black via-black/40 to-transparent"
      >
        <Box
          as="h2"
          marginBottom={8}
          className={`${titleClass} font-display font-black text-white transition-transform duration-500 group-hover:translate-x-2 leading-[0.9] tracking-tighter`}
        >
          {title}
        </Box>
        <Stack as="ul" direction="col" gap={5} marginBottom={6} className="font-sans text-lg tracking-tight text-white">
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
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
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
        </Stack>
      </Stack>
    </Box>
  );
}
