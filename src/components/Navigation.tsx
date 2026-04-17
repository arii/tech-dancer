/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, BarChart2, BookOpen, User, Home, Menu, X, Mail, FileText, Terminal } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Box, Stack, Text, Motion, Icon, Inline } from '@/components/layout/Primitives';
import { routes } from '@/config/routes';

const iconMap: Record<string, any> = {
  '/': Home,
  '/lab': ShoppingBag,
  '/engine': BarChart2,
  '/blog': FileText,
  '/feed': BookOpen,
  '/systems': Terminal,
  '/about': User,
  '/contact': Mail,
};

function NavItem({ to, label, icon, onClick, isMobile }: { to: string, label: string, icon: any, onClick?: () => void, isMobile?: boolean }) {
  return (
    <Box as="li" position="relative" className="group">
      <NavLink
        to={to}
        onClick={onClick}
        style={{ display: 'block' }}
      >
        {({ isActive }) => (
          <Box 
            paddingY={isMobile ? "md" : "xs"} 
            paddingX={isMobile ? 0 : "xs"}
            border={isMobile ? "b" : false}
            display="flex"
            alignItems="center"
            gap="md"
            position="relative"
            zIndex="sys"
            cursor="pointer"
            className="transition-colors"
          >
            {!isMobile && isActive && (
              <Motion 
                layoutId="nav-indicator"
                position="absolute"
                height={4}
                width={1}
                surface="accent"
                insetLeft={-20}
                className="bg-accent-brand"
                transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              />
            )}
            <Icon 
              icon={icon} 
              size={isMobile ? "md" : "sm"} 
              color={isActive ? "brand" : "dim"}
              className="group-hover:text-accent-brand transition-colors"
            />
            <Text 
              variant={isMobile ? "display" : "mono"} 
              size={isMobile ? "base" : "xs"} 
              weight="font-bold" 
              uppercase 
              tracking="widest"
              color={isActive ? "brand" : "dim"}
              className="group-hover:text-accent-brand transition-colors"
            >
              {label}
            </Text>
            {!isMobile && (
              <Box 
                position="absolute" 
                inset 
                surface="accent" 
                opacity="0" 
                zIndex="hide"
                className="group-hover:opacity-10 transition-opacity" 
              />
            )}
          </Box>
        )}
      </NavLink>
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
      <Box layout="mobileHeader">
        <Stack gap={0}>
          <Text variant="display" size="xs" color="brand" weight="font-bold" tracking="tight">Ariel Anders</Text>
          <Text variant="micro" size="micro" color="brand" weight="font-bold" uppercase tracking="widest">MIT Roboticist // WCS</Text>
        </Stack>
        <Motion 
          as="button"
          onClick={() => setIsOpen(!isOpen)}
          padding="sm"
          cursor="pointer"
          position="relative"
          zIndex="top"
          className="hover:text-accent-brand transition-colors"
        >
          <AnimatePresence mode="wait">
            <Motion
              key={isOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Icon icon={isOpen ? X : Menu} size="lg" />
            </Motion>
          </AnimatePresence>
        </Motion>
      </Box>

      <AnimatePresence>
        {isOpen && (
          <Motion 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            position="fixed"
            inset
            surface="default"
            zIndex="max"
            padding="xl"
            overflow="y-auto"
            display={{ base: "block", md: "none" }}
            paddingTop="3xl"
          >
            <Motion as="ul" variants={containerVariants} initial="closed" animate="open" display="grid" gap="lg">
              {routes.map((item) => (
                <Motion key={item.path} variants={itemVariants}>
                  <NavItem 
                    to={item.path} 
                    label={item.label} 
                    icon={iconMap[item.path] || Terminal} 
                    onClick={() => setIsOpen(false)} 
                    isMobile 
                  />
                </Motion>
              ))}
            </Motion>
            
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} marginTop="2xl">
              <Box border surface="subsoil" padding="xl" className="bg-accent/5">
                <Text variant="micro" size="micro" color="brand" uppercase tracking="widest" display="block" marginBottom="sm">Find Me</Text>
                <Text variant="display" size="sm" uppercase>Wednesdays @ Mission City Swing</Text>
                <Text variant="micro" size="micro" color="dim" display="block" marginTop="xs">San Francisco, CA</Text>
              </Box>
            </Motion>
          </Motion>
        )}
      </AnimatePresence>

      <Box layout="navRail">
        <Stack gap="2xl">
          <Box>
            <Text variant="display" size="sm" color="brand" weight="font-black" tracking="tight">
              ARIEL ANDERS
            </Text>
            <Text variant="micro" size="micro" color="brand" weight="font-bold" tracking="widest" display="block" marginTop="xs">
              MIT ROBOTICIST // WCS
            </Text>
          </Box>

          <Stack as="ul" gap="xs">
            {routes.map((item) => (
              <NavItem key={item.path} to={item.path} label={item.label} icon={iconMap[item.path] || Terminal} />
            ))}
          </Stack>

          <Box paddingTop="xl">
            <Box border surface="subsoil" padding="md" className="bg-accent-brand/5 border-accent-brand/20">
              <Text variant="micro" size="micro" color="brand" display="block" marginBottom="sm" className="underline underline-offset-4">Location_Log</Text>
              <Text variant="display" size="xs" uppercase>Wednesdays @ Mission City Swing</Text>
              <Text variant="micro" size="micro" color="dim" uppercase tracking="widest" display="block" marginTop="xs">SF // CA</Text>
            </Box>
          </Box>
        </Stack>

        <Box border="t" paddingTop="xl">
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
