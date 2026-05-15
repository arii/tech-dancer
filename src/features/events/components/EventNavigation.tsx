import { Box, Text } from '@/layouts/Primitives';
import { EVENT_TABS } from '../constants';

interface EventNavigationProps {
  activeTab?: string;
  onTabClick?: (id: string) => void;
}

export function EventNavigation({ activeTab, onTabClick }: EventNavigationProps) {
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={40}
      className="bg-bg/80 backdrop-blur-md border-b border-line/10"
    >
      <Box maxWidth="screen-xl" marginX="auto" paddingX={{ base: 0, md: 12, lg: 24 }}>
        <Box
          display="flex"
          gap={{ base: 6, md: 8 }}
          overflowX="auto"
          className="no-scrollbar scroll-smooth"
          paddingX={{ base: 6, md: 0 }}
        >
          {EVENT_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <Box
                key={tab.id}
                as="a"
                href={`#${tab.id}`}
                onClick={(e) => {
                  if (onTabClick) {
                    e.preventDefault();
                    onTabClick(tab.id);
                  }
                }}
                paddingY={4}
                shrink={false}
                className="group relative cursor-pointer"
              >
                <Box
                  display="flex"
                  align="center"
                  gap={2}
                  color={isActive ? "main" : "dim"}
                  className="group-hover:text-accent transition-colors whitespace-nowrap"
                >
                  <tab.icon size={14} className={isActive ? "text-accent" : ""} />
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
                  className={`bg-accent transition-transform origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
