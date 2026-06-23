import { Box, Stack, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { journalVariants } from '@/lib/variants';

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
        <Stack gap={3}>
          {items.map((item) => (
            <Link key={item.href} to={item.href} className="group">
              <Box padding={4} border radius="md" className={journalVariants.card({ interactive: true })}>
                <Stack gap={1}>
                  {item.category && (
                    <Text variant="mono" size="micro" color="accent" weight="font-bold">
                      {item.category.toUpperCase()}
                    </Text>
                  )}
                  <Text variant="body" size="lg" weight="font-bold" color="main" className="group-hover:text-accent transition-colors">
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
