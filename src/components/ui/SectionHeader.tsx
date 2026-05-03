import { Link } from 'react-router-dom';
import { Stack, Text } from '@/layouts/Primitives';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  link?: {
    text: string;
    to: string;
  };
}

export function SectionHeader({ eyebrow, title, link }: SectionHeaderProps) {
  return (
    <Stack direction="row" align="end" justify="between" marginBottom={4}>
      <Stack direction="col" gap={1}>
        <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
          {eyebrow}
        </Text>
        <Text as="h3" size="3xl" weight="font-black" className="text-accent-navy">
          {title}
        </Text>
      </Stack>
      {link && (
        <Link
          to={link.to}
          className="text-xs font-black uppercase tracking-widest text-text-dim hover:text-accent transition-colors"
        >
          {link.text}
        </Link>
      )}
    </Stack>
  );
}
