import { Search, LucideIcon, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Box, Text } from '@/layouts/Primitives';
import { stroke } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';

interface NavItemProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isMobile?: boolean;
}

function NavItem({ to, label, icon, onClick, isMobile }: NavItemProps) {
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
            ? "text-accent bg-accent/10 border-l-4 border-accent"
            : "text-text-dim hover:text-accent hover:bg-bg/50 border-l-4 border-transparent"
        )}
      >
        <Box
          display="flex"
          align="center"
          gap={4}
          paddingY={6}
          paddingX={isMobile ? undefined : 4}
          border={isMobile ? "b" : undefined}
          className={cn(
            isMobile ? "border-line/50" : undefined,
            "min-h-[44px]"
          )}
        >
          <Icon className={cn(`w-5 h-5 ${stroke.thick} flex-shrink-0`, isMobile ? "w-6 h-6" : "")} />
          <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
            {label}
          </Text>
        </Box>
      </NavLink>
    </Box>
  );
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
}

export function MobileMenuOverlay({ isOpen, onClose, onSearchClick }: MobileMenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <Box
      as={motion.div}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      position="fixed"
      className="top-16 left-0 right-0 bottom-0 z-[100] bg-bg lg:hidden w-full"
      padding={8}
      overflow="y-auto"
    >
      <Box as="ul" className="space-y-6">
        <Box as="li" position="relative" className="group">
          <Box
            as="button"
            type="button"
            cursor="pointer"
            onClick={onSearchClick}
            display="flex"
            align="center"
            gap={4}
            paddingY={6}
            border="b"
            width="full"
            className="transition-all relative z-10 rounded-md text-text-dim hover:text-accent hover:bg-bg/50 border-line/50 min-h-[44px]"
          >
            <Search className={`w-6 h-6 ${stroke.thick} flex-shrink-0`} />
            <Text variant="sans" size="xl" weight="font-bold" className="leading-none">
              Search
            </Text>
          </Box>
        </Box>
        {routes.filter((r): r is typeof r & { label: string } => !!(r.path !== '/' && r.label)).map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            onClick={onClose}
            isMobile
          />
        ))}
      </Box>
    </Box>
  );
}
