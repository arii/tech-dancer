import { Link } from 'react-router-dom';
import { Stack, Text } from '@/layouts/Primitives';

interface SectionHeaderProps {
  label?: string; // Legacy support
  eyebrow?: string;
  title: string;
  link?: {
    text: string;
    to: string;
  };
}

export function SectionHeader({ label, eyebrow, title, link }: SectionHeaderProps) {
  const displayEyebrow = eyebrow || label;
  return (
    <Stack direction="row" align="end" justify="between" marginBottom={4}>
      <Stack direction="col" gap={1}>
        <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
          {displayEyebrow}
        </Text>
        <Text as="h3" size="3xl" weight="font-black" color="brand">
          {title}
        </Text>
      </Stack>
      {link && (
        <Text
          as={Link}
          to={link.to}
          variant="mono"
          size="xs"
          weight="font-black"
          color="dim"
          uppercase
          tracking="widest"
          className="hover:text-accent transition-colors"
        >
          {link.text}
        </Text>
      )}
    </Stack>
  );
}
