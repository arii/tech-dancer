import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface GearCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  basePath: string;
  rating?: number;
  verdict?: string;
}

export function GearCard({
  slug,
  title,
  category,
  excerpt,
  basePath,
  rating,
  verdict,
  ...rest
}: GearCardProps) {
  // Destructure and ignore known data props that shouldn't bleed to the DOM
  // even if they are passed via {...item} in parent components.
  const {
    // @ts-expect-error - ignoring unused data props
    type: _type, date: _date, author: _author, content: _content,
    image: _image, tags: _tags, affiliateIds: _affiliateIds,
    priceCategory: _priceCategory, updatedDate: _updatedDate,
    durability: _durability, value: _value, specs: _specs,
    ...cleanProps
  } = rest as Record<string, unknown>;

  return (
    <Stack
      as={NavLink}
      to={`${basePath}/${slug}`}
      {...cleanProps}
      direction="col"
      gap={3}
      height="full"
      padding={4}
      radius="lg"
      border
      className="group bg-bg/40 backdrop-blur-sm transition-all duration-300"
    >
      <Box display="flex" align="center" justify="between">
        <Box
          paddingX={2}
          paddingY={1}
          radius="full"
          border
          className="border-line"
        >
          <Text size="tiny" weight="font-black" uppercase tracking="widest" color="accent">
            {category}
          </Text>
        </Box>
        <Text variant="mono" size="tiny" color="dim">
          {verdict}
        </Text>
      </Box>

      <Stack gap={2}>
        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
          className="text-text-main leading-tight group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        <Text variant="body" size="sm" color="dim" className="line-clamp-3 leading-relaxed">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto">
        {rating && (
          <Text variant="mono" size="xs" weight="font-bold" className="text-accent-purple">
            {rating}
          </Text>
        )}
        <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="widest" uppercase>
          Read Review
        </Text>
      </Box>
    </Stack>
  );
}
