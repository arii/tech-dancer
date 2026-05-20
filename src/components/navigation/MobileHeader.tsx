import { Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Text } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';

interface MobileHeaderProps {
  onSearchToggle: () => void;
}

export function MobileHeader({ onSearchToggle }: MobileHeaderProps) {
  return (
    <Box
      as="nav"
      aria-label="Mobile Navigation"
      layout="mobileHeader"
      border="b"
      className="transition-nav bg-surface border-line"
    >
      <Box as={NavLink} to="/" display="flex" align="center" gap={2}>
        <Box shrink={false}>
          <Logo className="h-9 w-auto text-white" />
        </Box>
      </Box>
      <Box
        as="button"
        type="button"
        onClick={onSearchToggle}
        display="flex"
        align="center"
        gap={2}
        paddingX={3}
        paddingY={2}
        border="default"
        radius="md"
        className="text-text-dim hover:text-accent transition-nav"
      >
        <Search className="w-4 h-4" />
        <Text variant="sans" size="sm" weight="font-medium">Search</Text>
      </Box>
    </Box>
  );
}
