import { ReactNode } from 'react';
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
  titleSize?: "fluid-5" | "fluid-6" | "fluid-7" | "fluid-8";
  cta?: ReactNode;
}

export function PageHeader({ 
  label, 
  title, 
  description, 
  as = "h1", 
  paddingBottom = 12, 
  border = "b", 
  descriptionMaxWidth = "prose",
  titleSize = "fluid-5",
  cta
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text variant="mono" size="xs" color="brand" weight="font-bold" tracking="wide-editorial" uppercase>
          {label}
        </Text>
        <Text as={as} variant="headline" size={titleSize} weight="font-black" className="text-accent-navy leading-tight tracking-tight">
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
        {cta && (
          <Box marginTop={6}>
            {cta}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export function SectionHeader({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <Box display="flex" justify="between" align="end" border="b" paddingBottom={4} className="border-line">
      <Stack gap={1}>
        <Text variant="mono" size="xs" color="brand" weight="font-semibold" tracking="widest" uppercase>{label}</Text>
        <Text variant="display" size="3xl" weight="font-black" className="text-accent-navy">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
