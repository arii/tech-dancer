import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
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
      position="sticky"
      top={{ base: 16, lg: 0 }}
      zIndex="sticky"
      width="full"
      surface="bg"
      border="b"
      borderColor="line/10"
    >
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 0, md: 12, lg: 24 }} position="relative">

        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          width={12}
          display={{ base: "block", md: "none" }}
          className="bg-gradient-to-l from-bg via-bg/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        <Box
          display="flex"
          gap={{ base: 6, md: 8 }}
          overflowX="auto"
          scrollBehavior="smooth"
          className="no-scrollbar"
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
                paddingY={3}
                shrink={false}
                className="group relative cursor-pointer"
              >
                <Box
                  display="flex"
                  align="center"
                  gap={2}
                  className={`${isActive ? 'text-accent' : 'text-dim'} group-hover:text-accent transition-colors whitespace-nowrap`}
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
