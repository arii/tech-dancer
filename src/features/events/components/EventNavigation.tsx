import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { journalVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';
import { EVENT_TABS } from '../constants';

export function EventNavigation() {
  const [activeTab, setActiveTab] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = EVENT_TABS
        .filter(tab => !('path' in tab))
        .map(tab => ({
          id: tab.id,
          offset: document.getElementById(tab.id)?.offsetTop || 0
        }))
        .sort((a, b) => b.offset - a.offset);

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        if (scrollPosition >= section.offset) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <Box
      as="nav"
      aria-label="Event navigation"
      layout="eventNav"
      surface="bg"
      top={16}
      zIndex={99998}
    >
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 0, md: 12, lg: 24 }} position="relative">

        <Box
          position="absolute"
          inset="right"
          width={12}
          display={{ base: "block", md: "none" }}
          zIndex={10}
          pointerEvents="none"
          className="bg-gradient-to-l from-bg via-bg to-transparent"
          aria-hidden="true"
        />

        <Box
          display="flex"
          gap={{ base: 6, md: 8 }}
          overflowX="auto"
          scrollBehavior="smooth"
          noScrollbar
          paddingX={{ base: 6, md: 0 }}
          paddingRight={{ base: 12, md: 0 }}
        >
          {EVENT_TABS.map(tab => {
            const isExternal = 'path' in tab;
            const isActive = activeTab === tab.id;

            return (
              <Box
                key={tab.id}
                as={isExternal ? Link : "a"}
                {...(isExternal ? { to: tab.path } : { href: `#${tab.id}` })}
                aria-label={`Navigate to ${tab.label}`}
                aria-current={isActive ? 'page' : undefined}
                paddingY={{ base: 5, md: 3 }}
                shrink={false}
                position="relative"
                cursor="pointer"
                className="group"
              >
                <Box
                  display="flex"
                  align="center"
                  gap={2}
                  className={cn(
                    journalVariants.navLink({ active: isActive }),
                    "whitespace-nowrap"
                  )}
                >
                  <tab.icon size={16} />
                  <Text
                    variant="mono"
                    size="xs"
                    weight="font-bold"
                    uppercase
                    tracking="wider"
                  >
                    {tab.label}
                  </Text>
                </Box>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  height={0.5}
                  className={`bg-accent transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
