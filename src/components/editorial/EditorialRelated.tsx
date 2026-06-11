import { Box, Stack, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';

interface RelatedItem {
  title: string;
  href: string;
  category?: string;
}

interface EditorialRelatedProps {
  title?: string;
  items: RelatedItem[];
}

export function EditorialRelated({ title = "Related Guides", items }: EditorialRelatedProps) {
  if (items.length === 0) return null;

  return (
    <Box paddingY={12} border="t" borderColor="line" className="border-opacity-medium">
      <Stack gap={6}>
        <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
          {title}
        </Text>
        <Stack gap={0}>
          {items.map((item) => (
            <Link key={item.href} to={item.href} className="group">
              <Box
                paddingY={6}
                border="b"
                borderColor="line"
                borderOpacityVariant="medium"
                className="group-last:border-none"
              >
                <Stack gap={2}>
                  {item.category && (
                    <Text variant="mono" size="micro" color="accent" weight="font-black" tracking="widest">
                      {item.category.toUpperCase()}
                    </Text>
                  )}
                  <Text
                    variant="body"
                    size="xl"
                    weight="font-bold"
                    color="main"
                    hoverColor="accent"
                  >
                    {item.title}
                  </Text>
                </Stack>
              </Box>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
