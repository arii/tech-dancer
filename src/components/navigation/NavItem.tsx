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
          "transition-all relative z-10 rounded-md block",
          isActive
            ? "text-accent bg-accent/10 border-l-4 border-accent shadow-[inset_0_0_20px_rgba(0,123,255,0.05)] underline underline-offset-4"
            : "text-text-dim hover:text-accent hover:bg-surface border-l-4 border-transparent hover:border-accent/20 cursor-pointer"
        )}
      >
        {({ isActive }) => (
          <Box
            display="flex"
            align="center"
            gap={4}
            paddingY={6}
            paddingX={isMobile ? undefined : 4}
            border={isMobile ? "b" : undefined}
            surface={isMobile && isActive ? "accent" : undefined}
            emphasis={isMobile && isActive ? "high" : undefined}
            className={cn(
              isMobile ? "border-line/50" : undefined,
              "min-h-[44px]",
              isMobile && isActive && "shadow-sm"
            )}
          >
            <Icon className={cn(`w-5 h-5 ${stroke.thick} flex-shrink-0`, isMobile ? "w-6 h-6" : "")} />
            <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
              {label}
            </Text>
          </Box>
        )}
      </NavLink>
    </Box>
  );
}
