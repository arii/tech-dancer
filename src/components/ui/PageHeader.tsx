import { Box, Stack, Text } from '@/layouts/Primitives';
import { spacing } from '@/styles/design-tokens';
import { ResponsiveProp } from '@/layouts/system-utils';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  border?: boolean | "t" | "b" | "l" | "r" | "x" | "y" | "accent" | "l-accent";
  paddingBottom?: ResponsiveProp<keyof typeof spacing | number | string>;
  marginBottom?: ResponsiveProp<keyof typeof spacing | number | string | "auto">;
  descriptionItalic?: boolean;
}

export function PageHeader({
  label,
  title,
  description,
  border = "b",
  paddingBottom = 10,
  marginBottom,
  descriptionItalic
}: PageHeaderProps) {
  return (
    <Box paddingBottom={paddingBottom} border={border} marginBottom={marginBottom} as="header">
      <Stack gap={1}>
        <Text
          variant="label"
          size="xs"
          color="dim"
          weight="font-bold"
          display="block"
          marginBottom={2}
          uppercase
          tracking="widest"
        >
          {label}
        </Text>
        <Text as="h1" variant="headline" size="4xl" weight="font-black" color="main" marginBottom={1}>
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size="lg"
            color="dim"
            weight="font-medium"
            italic={descriptionItalic}
          >
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
      <Stack gap={1}>
        <Text variant="label" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest">{label}</Text>
        <Text as="h2" variant="display" size="3xl" weight="font-black" color="main">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
