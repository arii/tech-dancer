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
      <Stack gap={0}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" tracking="wide-editorial" uppercase marginBottom={title ? 4 : 0}>
          {label}
        </Text>
        <Text as={as} variant="headline" size={titleSize} weight="font-black" leading="tight" tracking="tight" marginBottom={(description || cta) ? 6 : 0}>
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth={descriptionMaxWidth}
            marginBottom={cta ? 8 : 0}
            className="leading-relaxed text-pretty"
          >
            {description}
          </Text>
        )}
        {cta && (
          <Box>
            {cta}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

