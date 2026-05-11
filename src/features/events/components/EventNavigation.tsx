import { Box } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';

interface EventTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface EventNavigationProps {
  tabs: readonly EventTab[];
  activeTabId?: string;
}

export function EventNavigation({ tabs, activeTabId }: EventNavigationProps) {
  return (
    <Box
      width="full"
      position="sticky"
      top={0}
      zIndex={50}
      className="bg-surface/90 backdrop-blur-md border-y border-white/10"
    >
      <Box
        maxWidth="screen-xl"
        marginX="auto"
        paddingX={{ base: 4, md: 12, lg: 24 }}
        display="flex"
        align="center"
        className="overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab) => (
          <Box
            as="a"
            key={tab.id}
            href={`#${tab.id}`}
            display="flex"
            align="center"
            gap={2}
            paddingX={6}
            paddingY={4}
            className={`text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTabId === tab.id
                ? "text-accent border-accent"
                : "border-transparent hover:text-accent hover:border-accent"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
