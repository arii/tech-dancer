import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface SectionHeaderProps {
  label?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  link?: {
    text: string;
    to: string;
  };
}

export function SectionHeader({ label, eyebrow, title, children, link }: SectionHeaderProps) {
  const displayEyebrow = label || eyebrow;
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} marginBottom={4}>
      <Stack direction="col" gap={1}>
        {displayEyebrow && (
          <Text variant="mono" size="xs" color="brand" weight="font-semibold" tracking="widest" uppercase>
            {displayEyebrow}
          </Text>
        )}
        <Text as="h3" variant="headline" size="3xl" weight="font-black">
          {title}
        </Text>
      </Stack>
      <Box display="flex" align="center" gap={4}>
        {children}
        {link && (
          <Link
            to={link.to}
            className="text-xs font-black uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
          >
            {link.text}
          </Link>
        )}
      </Box>
    </Box>
  );
}
