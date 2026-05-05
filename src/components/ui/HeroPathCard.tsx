import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface HeroPathCardProps {
  id: string;
  title: string;
  description?: string;
  links: { text: string; to: string; color?: string }[];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function HeroPathCard({
  id,
  title,
  description,
  links,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}: HeroPathCardProps) {
  const isSecond = id === 'travel';

  return (
    <Box
      position="relative"
      overflow="hidden"
      cursor="pointer"
      height="full"
      minHeight="[320px]"
      className={cn(
        "group transition-all duration-700 ease-in-out bg-surface-alt",
        isSecond && "lg:border-l lg:border-line"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <Box
        position="absolute"
        inset={true}
        zIndex={1}
        className={cn(
          "opacity-25 pointer-events-none transition-opacity duration-500",
          isHovered ? "opacity-40" : "opacity-20"
        )}
        style={{
          background: `radial-gradient(circle at 50% 100%, var(--raw-color-accent-shadow), transparent 40%), linear-gradient(135deg, rgba(0, 207, 255, 0.08), rgba(139, 47, 255, 0.05) 40%, rgba(255, 0, 200, 0.06))`
        }}
      />

      {/* Animated Bars */}
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height="[170px]"
        display="flex"
        align="end"
        gap={1}
        paddingX={4}
        paddingBottom={4}
        zIndex={2}
        className="opacity-20 pointer-events-none"
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <Box
            key={i}
            flex={1}
            height="full"
            radius="none"
            className={cn(
              "animate-wave",
              "bg-gradient-to-t from-accent-magenta via-accent-purple to-accent shadow-[0_0_14px_rgba(0,207,255,0.2)]",
              isSecond && "animation-reverse",
              i >= 14 && "hidden sm:block" // Limit bars on mobile for performance
            )}
            style={{
              animationDelay: `${(i % 5) * 0.2}s`,
              animationDuration: `${3.5 + (i % 3) * 0.8}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </Box>

      {/* Content Container */}
      <Stack
        position="relative"
        zIndex={10}
        padding={{ base: 8, md: 10, lg: 12 }}
        height="full"
        direction="col"
        justify="end"
      >
        <Text
          as="h2"
          variant="display"
          size="4xl"
          weight="font-black"
          uppercase
          className={cn(
            "mb-3 text-white transition-transform duration-500 group-hover:translate-x-2 leading-none"
          )}
        >
          {title}
        </Text>

        {description && (
          <Text size="base" color="dim" className="mb-6 max-w-[360px]">
            {description}
          </Text>
        )}

        <Stack gap={2} className="font-sans text-sm tracking-tight">
          {links.map((link) => {
            const isExternal = link.to.startsWith('http') || link.to.startsWith('//');
            
            const commonProps = {
              className: cn(
                "group/link flex items-center gap-2 transition-all duration-300 font-bold",
                link.color ? `text-${link.color}` : "text-accent"
              )
            };

            const linkContent = (
              <>
                <span>{link.text}</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                  →
                </span>
              </>
            );

            return (
              <Box key={link.text} as="div">
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
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}
