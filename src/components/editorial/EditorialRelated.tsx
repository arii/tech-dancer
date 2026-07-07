import { Box, Stack, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { journalVariants, variants, type JournalCardVariants } from '@/lib/variants';
import { isSafeUrl } from '@/lib/utils';

interface RelatedItem {
  title: string;
  href: string;
  category?: string;
}

interface EditorialRelatedProps extends JournalCardVariants {
  title?: string;
  items: RelatedItem[];
}

export function EditorialRelated({ title = "Related Guides", items, variant = 'default', interactive = true }: EditorialRelatedProps) {
  if (items.length === 0) return null;

  return (
    <Box paddingY={12} border="t" className={variants.border.muted}>
      <Stack gap={6}>
        <Text variant="mono" size="xs" color="dim" weight="font-bold" uppercase tracking="widest">
          {title}
        </Text>
        <Stack gap={4}>
          {items.map((item) => (
            <Link key={item.href} to={isSafeUrl(item.href) ? item.href : '#'} className="group">
              <Box padding={4} border radius="md" className={journalVariants.card({ variant, interactive })}>
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
