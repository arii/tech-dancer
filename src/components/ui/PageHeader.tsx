// impeccable-ignore-file
import { ReactNode, useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import type { BaseProps } from '@/layouts/Box';

/**
 * Props for the PageHeader component.
 *
 * Note for consumers: As part of the layout standardization (PR 3481),
 * the vertical rhythm is now managed via explicit \`marginBottom\` properties
 * rather than relying on a wrapper \`Stack\` component's \`gap\` property.
 * If you relied on the previous behavior where children had uniform gap spacing,
 * ensure you pass the \`description\` and \`cta\` props directly to this component
 * rather than attempting to render them as siblings outside.
 */
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
 * Centralized vertical rhythm constants for PageHeader.
 */
const HEADER_SPACING = {
  LABEL_TO_TITLE: 2, // 8px
  TITLE_TO_BODY: 6,  // 24px
  BODY_TO_CTA: 8,    // 32px
  NONE: 0
} as const;

/**
 * Resolves vertical spacing based on the presence of siblings.
 * Encapsulated to maintain a consistent hierarchy across all consumers.
 */
const getHeaderSpacing = ({ hasTitle, hasDescription, hasCta }: { hasTitle: boolean; hasDescription: boolean; hasCta: boolean }) => ({
  labelBottom: hasTitle ? HEADER_SPACING.LABEL_TO_TITLE : HEADER_SPACING.NONE,
  titleBottom: (hasDescription || hasCta) ? HEADER_SPACING.TITLE_TO_BODY : HEADER_SPACING.NONE,
  descriptionBottom: hasCta ? HEADER_SPACING.BODY_TO_CTA : HEADER_SPACING.NONE,
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
  const spacing = useMemo(() => getHeaderSpacing({
    hasTitle: !!title,
    hasDescription: !!description,
    hasCta: !!cta
  }), [title, description, cta]);

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

