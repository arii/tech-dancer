import { type ReactNode } from "react";
import { Box, Stack, Text } from '@/layouts/Primitives';
import type { BaseProps } from '@/layouts/Box';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  as?: keyof JSX.IntrinsicElements;
  paddingBottom?: BaseProps['paddingBottom'];
  border?: BaseProps['border'];
  descriptionMaxWidth?: BaseProps['maxWidth'];
}

export function PageHeader({ label, title, description, as = "h1", paddingBottom = 12, border = "b", descriptionMaxWidth = "prose" }: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>
          {label}
        </Text>
        <Text as={as} variant="headline" size="fluid-7" weight="font-black" className="text-accent-navy leading-tight tracking-tight text-balance">
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

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4}>
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="dim" weight="font-semibold" tracking="widest" uppercase>{label}</Text>
        <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
