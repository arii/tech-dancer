import { Link } from 'react-router-dom';
import { Stack, Text } from '@/layouts/Primitives';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  link?: {
    text: string;
    to: string;
  };
  size?: 'sm' | 'md' | 'lg';
  'data-testid'?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  link,
  size = 'lg',
  'data-testid': testId
}: SectionHeaderProps) {
  const titleSize = size === 'sm' ? 'xl' : size === 'md' ? '2xl' : '3xl';

  return (
    <Stack
      direction="row"
      align="end"
      justify="between"
      marginBottom={size === 'sm' ? 2 : 4}
      data-testid={testId}
    >
      <Stack direction="col" gap={1}>
        {eyebrow && (
          <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
            {eyebrow}
          </Text>
        )}
        <Text as="h3" size={titleSize} weight="font-black" color="brand">
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
