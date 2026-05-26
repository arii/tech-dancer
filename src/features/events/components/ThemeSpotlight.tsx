import { Box, Stack, Text } from '@/layouts/Primitives';
import type { Product } from './EventProductCard';
import { EventProductGrid } from './EventProductGrid';
import { EventSection } from './EventSection';

interface ThemeSpotlightProps {
  id?: string;
  title: string;
  label?: string;
  description?: string;
  products?: Product[];
  colors?: string[];
}

export function ThemeSpotlight({
  id,
  title,
  label,
  description,
  products = [],
  colors = [],
}: ThemeSpotlightProps) {
  const hasProducts = products.length > 0;

  if (!description && !hasProducts && colors.length === 0) {
    return null;
  }

  return (
    <EventSection
      id={id}
      eyebrow={label || 'Theme spotlight'}
      title={title}
      description={description}
    >
      <Stack gap={4}>
        {colors.length > 0 && (
          <Stack direction="row" gap={2} wrap>
            {colors.map((color) => (
              <Box key={color} border radius="full" paddingX={3} paddingY={1} surface="muted">
                <Text variant="mono" size="xs" color="dim" uppercase className="tracking-wide">
                  {color}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
        {hasProducts && (
          <EventProductGrid
            products={products}
            maxItems={6}
            showMoreCta={false}
          />
        )}
      </Stack>
    </EventSection>
  );
}
