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

/**
 * Spacing configuration for PageHeader elements.
 * Higher values provide consistent vertical rhythm between label, title, and body.
 */
const getHeaderSpacing = ({ hasTitle, hasDescription, hasCta }: { hasTitle: boolean; hasDescription: boolean; hasCta: boolean }) => ({
  labelBottom: hasTitle ? 4 : 0,
  titleBottom: (hasDescription || hasCta) ? 6 : 0,
  descriptionBottom: hasCta ? 8 : 0,
});

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
  const spacing = getHeaderSpacing({
    hasTitle: !!title,
    hasDescription: !!description,
    hasCta: !!cta
  });

  return (
    <Box
      paddingBottom={paddingBottom}
      border={border}
    >
      <Stack gap={0}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" tracking="wide-editorial" uppercase marginBottom={spacing.labelBottom}>
          {label}
        </Text>
        <Text as={as} variant="headline" size={titleSize} weight="font-black" leading="tight" tracking="tight" marginBottom={spacing.titleBottom}>
          {title}
        </Text>
        {description && (
          <Text
            variant="body"
            size={{ base: "lg", lg: "xl" }}
            color="dim"
            maxWidth={descriptionMaxWidth}
            marginBottom={spacing.descriptionBottom}
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

