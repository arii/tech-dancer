import { Box, Stack, Text } from '@/layouts/Primitives';
import type { BaseProps } from '@/layouts/Box';
import type { ResponsiveProp } from '@/layouts/system-utils';
import type { typeSizes } from '@/styles/design-tokens';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  paddingBottom?: BaseProps['paddingBottom'];
  border?: BaseProps['border'];
  descriptionMaxWidth?: BaseProps['maxWidth'];
  titleAs?: "h1" | "h2" | "h3";
  size?: ResponsiveProp<keyof typeof typeSizes>;
}

export function PageHeader({
  label,
  title,
  description,
  paddingBottom = 12,
  border = "b",
  descriptionMaxWidth = "prose",
  titleAs = "h1",
  size = { base: "4xl", lg: "6xl" }
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom} marginBottom={8}
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
          size={size}
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

export function SectionHeader({
  label,
  title,
  children,
  paddingBottom = 4
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
  paddingBottom?: BaseProps['paddingBottom'];
}) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={paddingBottom} marginBottom={8}>
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="wide-editorial" uppercase>{label}</Text>
        <Text variant="display" size="3xl" weight="font-black" color="navy">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
