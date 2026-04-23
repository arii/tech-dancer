import { Box, Stack, Text } from '@/layouts/Primitives';
import type { BaseProps } from '@/layouts/Box';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  paddingBottom?: BaseProps['paddingBottom'];
  border?: BaseProps['border'];
  descriptionMaxWidth?: BaseProps['maxWidth'];
  titleAs?: "h1" | "h2" | "h3";
}

export function PageHeader({
  label,
  title,
  description,
  paddingBottom = 12,
  border = "b",
  descriptionMaxWidth = "65ch",
  titleAs = "h1"
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text
          variant="mono"
          size="xs"
          color="dim"
          weight="font-semibold"
          uppercase
          tracking="wide-editorial"
        >
          {label}
        </Text>
        <Text
          as={titleAs}
          variant="headline"
          size={{ base: "4xl", lg: "6xl" }}
          weight="font-black"
          tracking="tighter"
          color="main"
          uppercase
          className="leading-tight"
        >
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth={descriptionMaxWidth}
            marginTop={4}
            className="leading-relaxed"
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
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="wide-editorial" uppercase>{label}</Text>
        <Text variant="display" size="3xl" weight="font-black" color="navy">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
