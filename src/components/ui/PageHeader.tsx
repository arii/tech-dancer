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
  paddingBottom = 8, 
  border = "none", 
  descriptionMaxWidth = "3xl",
  titleSize = "fluid-5",
  cta
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text weight="font-bold" size="xs" className="tracking-[0.35em] uppercase text-text-dim/65">
          {label}
        </Text>
        <Text as={as} variant="display" size={titleSize} weight="font-black" className="leading-tight tracking-tight">
          {title}
        </Text>
        {description && (
          <Text
            size={{ base: "sm", sm: "base" }}
            maxWidth={descriptionMaxWidth}
            className="leading-7 text-text-body/72"
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
    <Box display="flex" justify="between" align="end" paddingBottom={4}>
      <Stack gap={1}>
        <Text size="xs" weight="font-bold" className="tracking-widest uppercase text-text-dim/65">{label}</Text>
        <Text as="h2" size="2xl" weight="font-black">{title}</Text>
      </Stack>
      {children}
    </Box>
  );
}
