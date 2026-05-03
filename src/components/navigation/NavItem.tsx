import { LucideIcon, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
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
  
  if (isMobile) {
    return (
      <Box as="li" position="relative" className="group">
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) => cn(
            "transition-all relative z-10 block",
            isActive
              ? "text-accent bg-accent/10 shadow-[inset_0_0_20px_rgba(0,123,255,0.05)]"
              : "text-text-dim hover:text-accent hover:bg-surface cursor-pointer"
          )}
        >
          <Box
            display="flex"
            align="center"
            gap={4}
            paddingY={6}
            paddingX={4}
            border="b"
            className="border-line/50 min-h-[44px]"
          >
            <Icon className="w-6 h-6 flex-shrink-0" />
            <Text variant="sans" size="lg" weight="font-bold" className="leading-none">
              {label}
            </Text>
          </Box>
        </NavLink>
      </Box>
    );
  }

  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        className={({ isActive }) => cn(
          "group flex min-h-11 items-center gap-3 px-6 py-3 text-sm transition-colors",
          isActive
            ? "bg-muted/50 text-text-main font-medium"
            : "text-text-dim hover:bg-muted/50 hover:text-text-main"
        )}
      >
        <Icon size={16} className={cn(
          "shrink-0 transition-colors",
          "group-hover:text-primary group-focus-visible:text-primary",
          "data-[active=true]:text-primary"
        )} data-active={true} />
        <span>{label}</span>
      </NavLink>
    </Box>
  );
}
