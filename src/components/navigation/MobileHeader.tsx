import { NavLink } from 'react-router-dom';
import { Box } from '@/layouts/Primitives';
import { Logo } from '@/components/ui/Logo';

export function MobileHeader() {
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
    </Box>
  );
}
