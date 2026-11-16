import { Box, Stack, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { journalVariants } from '@/lib/variants';

interface RelatedItem {
  title: string;
  href: string;
  category?: string;
  image?: string;
}

interface EditorialRelatedProps {
  title?: string;
  items: RelatedItem[];
}

export function EditorialRelated({ title = "Related Guides", items }: EditorialRelatedProps) {
  if (items.length === 0) return null;

  return (
    <Box paddingY={{ base: 8, md: 12 }} border="t" borderColor="line" className="border-opacity-medium">
      <Stack gap={6}>
        <Text variant="mono" size="xs" color="dim" weight="font-bold">
          {title}
        </Text>
        <Stack gap={4}>
          {items.map((item) => (
            <Link key={item.href} to={item.href} className="group">
              <Stack direction="row" align="center" gap={3} padding={3} border radius="md" className={journalVariants.card({ interactive: true })}>
                {item.image && (
                  <Box width={16} height={16} shrink={0} radius="md" overflow="hidden" border className="bg-surface-alt">
                    <img src={item.image} alt="" width={64} height={64} loading="lazy" className="w-full h-full object-cover object-top" />
                  </Box>
                )}
                <Stack gap={1} minWidth={0}>
                  {item.category && (
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" className="capitalize">
                      {item.category}
                    </Text>
                  )}
                  <Text variant="body" size="lg" weight="font-bold" color="main" className="group-hover:text-accent transition-colors">
                    {item.title}
                  </Text>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
