
import { LucideIcon, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isMobile?: boolean;
}

export function NavItem({ to, label, icon, onClick, isMobile }: NavItemProps) {
  if (!icon) {
    console.warn(`Navigation icon missing for route: ${label}. Falling back to Terminal icon.`);
  }
  const Icon = icon || Terminal;
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
          "transition-all duration-150 ease-in-out relative z-10 block",
          isMobile
            ? (isActive ? "text-accent border-l-2 border-accent bg-accent/10" : "text-text-dim hover:text-accent-sky hover:bg-accent-sky/8 border-l-2 border-transparent cursor-pointer")
            : (isActive ? "text-accent bg-accent/10 border-l-2 border-accent" : "text-text-dim hover:text-accent-sky cursor-pointer hover:bg-accent-sky/8 border-l-2 border-transparent")
        )}
      >
        {({ isActive }) => (
          <Box
            display="flex"
            align="center"
            gap={3}
            paddingY={3}
            paddingX={isMobile ? 4 : 6}
            border={isMobile ? "b" : undefined}
            className={cn(
              "transition-transform duration-200 group-hover:translate-x-1",
              isMobile ? "border-line/50 nav-item-mobile-height" : "nav-item-height",
              isMobile && isActive && "shadow-sm"
            )}
          >
            <Box shrink={false}>
              <Icon className={cn(`${stroke.thick}`, isMobile ? "w-5 h-5" : "w-4 h-4")} />
            </Box>
            <Text variant="sans" size={isMobile ? "lg" : "sm"} weight={isMobile ? "font-bold" : "font-medium"} className="leading-none">
              {label}
            </Text>
          </Box>
        )}
      </NavLink>
    </Box>
  );
}
