import { Box, Text } from '@/layouts/Primitives';
import { EVENT_TABS } from '../constants';

interface EventNavigationProps {
  activeTab?: string;
}

export function EventNavigation({ activeTab }: EventNavigationProps) {
  return (
    <Box
      position="sticky"
      top={{ base: 16, lg: 0 }}
      zIndex={40}
      className="bg-bg/80 backdrop-blur-md border-b border-line/10"
    >
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 0, md: 12, lg: 24 }} position="relative">
        {/* Right fade indicator for mobile horizontal scroll */}
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          width={12}
          display={{ base: "block", md: "none" }}
          bgGradient="bg-gradient-to-l from-bg via-bg/80 to-transparent"
          className="pointer-events-none z-10"
        />

        <Box
          display="flex"
          gap={{ base: 8, md: 10 }}
          overflowX="auto"
          className="no-scrollbar scroll-smooth"
          paddingX={{ base: 6, md: 0 }}
          paddingRight={{ base: 12, md: 0 }}
          className="no-scrollbar scroll-smooth scroll-touch"
        >
          {EVENT_TABS.map(tab => (
            <Box
              key={tab.id}
              as="a"
              href={`#${tab.id}`}
              paddingY={4}
              shrink={false}
              className="group relative cursor-pointer"
            >
              <Box
                display="flex"
                align="center"
                gap={2}
                color={activeTab === tab.id ? "accent" : "dim"}
                className="group-hover:text-accent transition-colors whitespace-nowrap"
              >
                <tab.icon size={14} />
                <Text
                  variant="mono"
                  size="xs"
                  weight="font-bold"
                  uppercase
                  tracking="widest"
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
                className={`bg-accent transition-transform origin-left ${activeTab === tab.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
