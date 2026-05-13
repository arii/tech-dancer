import { Link } from 'react-router-dom';
import { Stack, Text } from '@/layouts/Primitives';

interface SectionHeaderProps {
  eyebrow?: string;
  label?: string;
  title: string;
  size?: "sm" | "md" | "lg";
  link?: {
    text: string;
    to: string;
  };
}

export function SectionHeader({ eyebrow, label, title, size = "lg", link }: SectionHeaderProps) {
  const finalEyebrow = label || eyebrow;
  const marginBottom = size === "sm" ? 2 : 4;
  const titleSize = size === "sm" ? "xl" : "3xl";

  return (
    <Stack direction="row" align="end" justify="between" marginBottom={marginBottom}>
      <Stack direction="col" gap={1}>
        {finalEyebrow && (
          <Text variant="mono" size="xs" color="dim" uppercase tracking="widest">
            {finalEyebrow}
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
