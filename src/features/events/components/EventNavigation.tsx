import { Box, Text } from '@/layouts/Primitives';
import { EVENT_TABS } from '../constants';

export function EventNavigation() {
  return (
    <Box
      position="sticky"
      top={{ base: 16, lg: 0 }}
      zIndex={40}
      width="full"
      surface="bg"
      border="b"
      className="bg-bg/80 backdrop-blur-md border-white/10"
    >
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 0, md: 12, lg: 24 }} position="relative">
        {/* Right fade indicator for mobile horizontal scroll */}
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
          gap={{ base: 2, md: 4 }}
          overflowX="auto"
          scrollBehavior="smooth"
          className="no-scrollbar"
          paddingX={{ base: 4, md: 0 }}
          paddingY={3}
        >
          {EVENT_TABS.map(tab => (
            <Box
              key={tab.id}
              as="a"
              href={`#${tab.id}`}
              shrink={false}
              paddingX={4}
              paddingY={2}
              radius="full"
              className="whitespace-nowrap text-sm text-dim hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Text
                weight="font-semibold"
              >
                {tab.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
