/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, BarChart2, BookOpen, User, Home, Menu, X, Mail, FileText, Terminal, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Stack, Text } from '@/components/layout/Primitives';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';

const iconMap: Record<string, LucideIcon> = {
  '/': Home,
  '/lab': ShoppingBag,
  '/engine': BarChart2,
  '/blog': FileText,
  '/feed': BookOpen,
  '/systems': Terminal,
  '/about': User,
  '/contact': Mail,
};

function NavItem({ to, label, icon: Icon, onClick, isMobile }: { to: string, label: string, icon: any, onClick?: () => void, isMobile?: boolean }) {
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => cn(
          "flex items-center gap-3 transition-colors relative z-10",
          isMobile ? "py-3 border-b border-line/50 text-lg" : "py-2 px-1",
          isActive ? "text-accent-brand" : "text-text-dim group-hover:text-accent-brand"
        )}
      >
        {({ isActive }) => (
          <>
            {!isMobile && isActive && (
              <Box 
                as={motion.div} 
                layoutId="nav-indicator"
                position="absolute"
                height={4}
                width={1}
                surface="accent"
                className="left-[-20px] bg-accent-brand"
                transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              />
            )}
            <Icon className="w-5 h-5 md:w-4 md:h-4 stroke-1" />
            <Text variant={isMobile ? "display" : "mono"} size={isMobile ? "base" : "xs"} weight="font-bold" uppercase tracking="widest" className="text-current">
              {label}
            </Text>
          </>
        )}
      </NavLink>
      {!isMobile && <Box position="absolute" inset surface="accent" opacity={5} className="opacity-0 group-hover:opacity-100 transition-opacity -z-10" />}
    </Box>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Mobile Header */}
      <Box layout="mobileHeader">
        <Stack gap={0}>
          <Text variant="display" size="xs" color="brand" weight="font-bold" tracking="tight">Ariel Anders</Text>
          <Text variant="micro" size="micro" color="brand" weight="font-bold" uppercase tracking="widest">MIT Roboticist // WCS</Text>
        </Stack>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-main hover:text-accent-brand transition-colors relative z-[120]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </Box>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Box 
            as={motion.div} 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            position="fixed"
            inset
            surface="bg"
            zIndex="top"
            padding="nav"
            overflow="y-auto"
            className="md:hidden pt-24"
          >
            <Box as={motion.ul} variants={containerVariants} initial="closed" animate="open" className="space-y-6">
              {routes.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <NavItem 
                    to={item.path} 
                    label={item.label} 
                    icon={iconMap[item.path] || Terminal} 
                    onClick={() => setIsOpen(false)} 
                    isMobile 
                  />
                </motion.div>
              ))}
            </Box>
            
            <Box as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12">
              <Box border surface="accent" padding="card" className="bg-accent/5">
                <Text variant="micro" size="micro" color="brand" uppercase tracking="widest" className="mb-2">Find Me</Text>
                <Text variant="display" size="sm" uppercase>Wednesdays @ Mission City Swing</Text>
                <Text variant="micro" size="micro" color="dim" className="mt-1">San Francisco, CA</Text>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Box layout="navRail">
        <Stack gap={12}>
          <Box>
            <Text variant="display" size="sm" color="brand" weight="font-black" tracking="tight">
              ARIEL ANDERS
            </Text>
            <Text variant="micro" size="micro" color="brand" weight="font-bold" tracking="widest" className="mt-1">
              MIT ROBOTICIST // WCS
            </Text>
          </Box>

          <Stack as="ul" gap={2}>
            {routes.map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} icon={iconMap[item.path] || Terminal} />
            ))}
          </Stack>

          <Box paddingTop={8}>
            <Box border surface="default" padding="compact" className="bg-accent-brand/5 border-accent-brand/20">
              <Text variant="micro" size="micro" color="brand" className="mb-2 underline underline-offset-4">Location_Log</Text>
              <Text variant="display" size="xs" uppercase>Wednesdays @ Mission City Swing</Text>
              <Text variant="micro" size="micro" color="dim" uppercase tracking="widest" className="mt-1">SF // CA</Text>
            </Box>
          </Box>
        </Stack>

        <Box border="t" paddingTop={8}>
          <Text variant="micro" size="micro" color="dim" uppercase tracking="widest" className="leading-relaxed">
            SYSTEM_PROTOCOL: 2026_V1.0
            <br />
            STATUS: ACTIVE_OPTIMIZATION
          </Text>
        </Box>
      </Box>
    </>
  );
}
