import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AffiliateLink } from '@/types';

interface EventMerchProps {
  id?: string;
  items: AffiliateLink[];
}

export function EventMerch({ id, items }: EventMerchProps) {
  if (!items || items.length === 0) return null;

  return (
    <Box id={id} as="section" data-testid="merch">
      <Stack gap={12}>
        <SectionHeader eyebrow="MERCH" title="Featured Collection" />

        <Box width="full" overflowX="auto" radius="lg" border className="overflow-hidden">
          <Box as="table" width="full" className="border-collapse text-left whitespace-nowrap">
            <Box as="thead" surface="surface" className="border-b border-line">
              <Box as="tr">
                <Text as="th" variant="mono" size="xs" color="dim" uppercase weight="font-bold" padding={4}>Item</Text>
                <Text as="th" variant="mono" size="xs" color="dim" uppercase weight="font-bold" padding={4}>Preview</Text>
                <Text as="th" variant="mono" size="xs" color="dim" uppercase weight="font-bold" padding={4}>Price</Text>
                <Text as="th" variant="mono" size="xs" color="dim" uppercase weight="font-bold" padding={4}>Link</Text>
              </Box>
            </Box>
            <Box as="tbody">
              {items.map((item) => (
                <Box as="tr" key={item.id} className="border-b border-line/50 hover:bg-surface-alt/50 transition-colors">
                  <Box as="td" padding={4} className="whitespace-normal min-w-xs">
                    <Text variant="body" size="sm" weight="font-bold">{item.name}</Text>
                    {item.description && (
                      <Text variant="body" size="xs" color="dim" display="block" marginTop={1}>
                        {item.description}
                      </Text>
                    )}
                  </Box>
                  <Box as="td" padding={4}>
                    {item.image ? (
                      <Box
                        as="img"
                        src={item.image}
                        alt={item.name}
                        className="rounded shadow-sm max-h-24 w-auto object-contain bg-white"
                        loading="lazy"
                      />
                    ) : (
                      <Text variant="mono" size="xs" color="dim">No Image</Text>
                    )}
                  </Box>
                  <Box as="td" padding={4}>
                    <Text variant="mono" size="sm" color="main">{item.price || '-'}</Text>
                  </Box>
                  <Box as="td" padding={4}>
                    <Button
                      as="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      variant="primary"
                    >
                      Shop
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
