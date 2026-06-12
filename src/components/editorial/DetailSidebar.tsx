import { ReactNode } from 'react';
import { Box, Stack } from '@/layouts/Primitives';

interface DetailSidebarProps {
  headerExtras?: ReactNode;
  bodyExtras?: ReactNode;
  stats?: ReactNode;
  links?: ReactNode;
  disclosure?: ReactNode;
  children?: ReactNode;
}

export function DetailSidebar({ headerExtras, bodyExtras, stats, links, disclosure, children }: DetailSidebarProps) {
  return (
    <Box as="aside">
      <Stack gap={8} className="sticky top-24">
        {headerExtras}
        {bodyExtras}
        {stats}
        {children}
        {links}
        {disclosure}
      </Stack>
    </Box>
  );
}
