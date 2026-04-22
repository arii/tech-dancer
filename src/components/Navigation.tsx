import {
  Home,
  BookOpen,
  ShoppingBag,
  Database,
  User,
  Send,
  Menu,
  X,
  Terminal,
  Search
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';

const ICON_REGISTRY: Record<string, any> = {
  Home,
  BookOpen,
  ShoppingBag,
  Database,
  User,
  Send,
};

function NavItem({ to, label, iconName, onClick, isMobile }: { to: string, label: string, iconName?: string, onClick?: () => void, isMobile?: boolean }) {
  const Icon = (iconName && ICON_REGISTRY[iconName]) || Terminal;
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
          "flex items-center gap-4 transition-all relative z-10 rounded-md",
          isMobile ? "py-6 border-b border-line/50 text-xl" : "py-6 px-4",
          isActive 
            ? "text-accent bg-bg" 
            : "text-text-dim hover:text-accent hover:bg-bg/50"
        )}
      >
        <Icon className={cn("w-5 h-5 stroke-[1.5] flex-shrink-0", isMobile ? "w-6 h-6" : "")} />
        <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold" className="leading-none">
          {label}
        </Text>
      </NavLink>
    </Box>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <Box as="nav" aria-label="Mobile Navigation" layout="mobileHeader">
        <Box as={NavLink} to="/" onClick={() => setIsOpen(false)}>
          <Text variant="mono" size="sm" weight="font-bold" className="text-accent-navy tracking-wider uppercase">TECH-DANCER</Text>
        </Box>
        <Box
          as="button"
          onClick={() => setIsOpen(!isOpen)}
          padding={2}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Box>
      </Box>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
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
              {routes.filter(r => r.path !== '/').map((item) => (
                <NavItem 
                  key={item.path} 
                  to={item.path} 
                  label={item.label} 
                  iconName={item.icon}
                  onClick={() => setIsOpen(false)} 
                  isMobile 
                />
              ))}
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Box 
        as="nav"
        aria-label="Main Navigation"
        layout="navRail" 
        className="w-[280px] bg-surface border-r border-line hidden lg:flex flex-col min-h-screen sticky top-0"
      >
        <Stack padding={8} gap={10} flex={1}>
          <Box as={NavLink} to="/" className="group block mb-4">
            <Text 
              variant="mono" 
              size="lg" 
              weight="font-bold" 
              className="text-accent-navy group-hover:text-accent transition-colors tracking-wider leading-none uppercase"
            >
              TECH-DANCER
            </Text>
          </Box>

          <Stack as="ul" gap={2}>
            <Box as="li">
              <Box
                as="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                display="flex"
                align="center"
                gap={4}
                width="full"
                paddingY={6}
                paddingX={4}
                radius="md"
                className="group text-text-dim hover:bg-bg hover:text-accent transition-all text-left"
              >
                <Search className="w-5 h-5 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                <Text variant="sans" size="base" weight="font-bold" className="leading-none">Search</Text>
              </Box>
            </Box>

            {routes.filter(r => r.path !== '/').map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} iconName={item.icon} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
