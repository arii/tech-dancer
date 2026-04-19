import { ShoppingBag, Database, BookOpen, User, Home, Menu, X, Terminal, Search } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/components/layout/Primitives';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';

const iconMap: Record<string, any> = {
  '/': Home,
  '/gear': ShoppingBag,
  '/blog': BookOpen,
  '/research': Database,
  '/about': User,
};

function NavItem({ to, label, icon: Icon, onClick, isMobile }: { to: string, label: string, icon: any, onClick?: () => void, isMobile?: boolean }) {
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
          "flex items-center gap-4 transition-all relative z-10 rounded-md",
          isMobile ? "py-4 border-b border-line/50 text-xl" : "py-3 px-4",
          isActive
            ? "text-accent bg-bg"
            : "text-text-dim hover:text-accent hover:bg-bg/50"
        )}
      >
        <Icon className={cn("w-5 h-5 stroke-[1.5]", isMobile ? "w-6 h-6" : "")} />
        <Text variant="sans" size={isMobile ? "lg" : "base"} weight="font-bold">
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
      <Box layout="mobileHeader">
        <Box as={NavLink} to="/" onClick={() => setIsOpen(false)}>
          <Text variant="display" size="xs" color="brand" weight="font-bold">TECH-DANCER</Text>
        </Box>
        <Box as="button" onClick={() => setIsOpen(!isOpen)} padding={2} aria-label={isOpen ? "Close menu" : "Open menu"}>
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
            inset
            surface="bg"
            zIndex="top"
            padding="nav"
            className="md:hidden"
            paddingTop={24}
          >
            <Box as="ul" className="space-y-6">
              {routes.filter(r => r.path !== '/').map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={iconMap[item.path] || Terminal}
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
        layout="navRail"
        className="w-[280px] bg-surface border-r border-line hidden md:flex flex-col h-screen sticky top-0"
      >
        <Stack padding={8} gap={10} flex={1}>
          <Box as={NavLink} to="/" className="group block mb-4">
            <Text
              variant="display"
              size="lg"
              weight="font-black"
              className="text-accent-navy group-hover:text-accent transition-colors tracking-tight leading-none"
            >
              Tech-Dancer
            </Text>
          </Box>

          <Stack as="ul" gap={2}>
            <Box
              as="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
              display="flex"
              align="center"
              gap={4}
              width="full"
              paddingY={3}
              paddingX={4}
              radius="md"
              className="group text-text-dim hover:bg-bg hover:text-accent transition-all text-left"
            >
              <Search className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              <Text variant="sans" size="base" weight="font-bold">Search</Text>
            </Box>

            {routes.filter(r => r.path !== '/').map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} icon={iconMap[item.path] || Terminal} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
