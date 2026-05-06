import { LucideIcon, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
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

const MotionNavLink = motion.create(NavLink);

export function NavItem({ to, label, icon, onClick, isMobile }: NavItemProps) {
  if (!icon) {
    console.warn(`Navigation icon missing for route: ${label}. Falling back to Terminal icon.`);
  }
  const Icon = icon || Terminal;
  return (
    <Box as="li" position="relative" className="group">
      <MotionNavLink
        to={to}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        className={({ isActive }) => cn(
          "transition-all relative z-10 block",
          isMobile
            ? (isActive ? "text-accent border-l-4 border-accent bg-surface-alt" : "text-text-dim border-l-4 border-transparent")
            : (isActive ? "text-accent bg-surface-alt" : "text-text-dim hover:text-accent cursor-pointer hover:bg-surface-alt")
        )}
      >
        {({ isActive }) => (
          <Box
            display="flex"
            align="center"
            gap={3}
            paddingY={isMobile ? 4 : 4}
            paddingX={isMobile ? 4 : 6}
            border={isMobile ? "b" : undefined}
            className={cn(
              isMobile ? "border-line/50 min-h-[56px]" : "min-h-[44px]",
              isMobile && isActive && "shadow-sm"
            )}
          >
            <Icon className={cn(`w-5 h-5 ${stroke.thick} flex-shrink-0`, isMobile ? "w-6 h-6" : "")} />
            <Text variant="sans" size={isMobile ? "lg" : "sm"} weight="font-bold" className="leading-none">
              {label}
            </Text>
          </Box>
        )}
      </MotionNavLink>
    </Box>
  );
}
