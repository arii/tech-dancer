// impeccable-ignore-file
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
  ctaMarginTop?: BaseProps['marginTop'];
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
  cta,
  ctaMarginTop = 6
}: PageHeaderProps) {
  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={4}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" tracking="wide-editorial" uppercase>
          {label}
        </Text>
        <Text as={as} variant="headline" size={titleSize} weight="font-black" leading="tight" tracking="tight">
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth={descriptionMaxWidth}
            marginTop={4}
            className="leading-relaxed text-pretty"
          >
            {description}
          </Text>
        )}
        {cta && (
          <Box marginTop={ctaMarginTop}>
            {cta}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

