import { ExternalLink, Layout, MapPin, Calendar, Star, Tag, Info } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { DraftData } from '../useBlogDrafter';

function ResourceSidebar({ data }: { data: DraftData }) {
  if (data.type !== 'resource') return null;
  return (
    <Stack gap={6}>
      <Box border padding={4} surface="muted">
        <Stack gap={4}>
          <Box border="b" paddingBottom={2}>
             <Text variant="mono" size="micro" color="brand" weight="font-bold">RESOURCE_STATS</Text>
          </Box>

          <Stack gap={3}>
            <Box display="flex" justify="between" align="center">
              <Text variant="mono" size="xs" color="dim">RATING</Text>
              <Box display="flex" gap={1}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={i < (data.rating || 0) ? "w-3 h-3 text-accent fill-accent" : "w-3 h-3 text-dim"}
                  />
                ))}
              </Box>
            </Box>

            <Box display="flex" justify="between" align="center">
              <Text variant="mono" size="xs" color="dim">PRICE</Text>
              <Text variant="mono" size="xs" weight="font-bold">{data.priceCategory}</Text>
            </Box>

            <Box display="flex" justify="between" align="center">
              <Text variant="mono" size="xs" color="dim">VERDICT</Text>
              <Text variant="mono" size="xs" weight="font-bold" color="brand">{data.verdict}</Text>
            </Box>

            <Box display="flex" justify="between" align="center">
              <Text variant="mono" size="xs" color="dim">UPDATED</Text>
              <Text variant="mono" size="xs">{data.updatedDate}</Text>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {data.tags.length > 0 && (
        <Stack gap={3}>
          <Box display="flex" align="center" gap={2}>
            <Tag className="w-3 h-3 text-accent" />
            <Text variant="mono" size="micro" color="brand">TAGS</Text>
          </Box>
          <Box display="flex" wrap gap={2}>
            {data.tags.map(tag => (
              <Box key={tag} border paddingX={2} paddingY={1} radius="sm" className="bg-white/5">
                <Text variant="mono" size="micro">{tag}</Text>
              </Box>
            ))}
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

function EventSidebar({ data }: { data: DraftData }) {
  if (data.type !== 'event') return null;
  return (
    <Stack gap={6}>
       <Box border padding={4} surface="muted">
        <Stack gap={4}>
          <Box border="b" paddingBottom={2}>
             <Text variant="mono" size="micro" color="brand" weight="font-bold">EVENT_LOGISTICS</Text>
          </Box>

          <Stack gap={4}>
            <Stack gap={1}>
              <Box display="flex" align="center" gap={2} color="dim">
                <MapPin className="w-3 h-3 text-accent" />
                <Text variant="mono" size="micro">LOCATION</Text>
              </Box>
              <Text variant="body" size="sm" weight="font-bold">{data.location}</Text>
              <Text variant="body" size="xs" color="dim">{data.city}</Text>
            </Stack>

            <Stack gap={1}>
              <Box display="flex" align="center" gap={2} color="dim">
                <Calendar className="w-3 h-3 text-accent" />
                <Text variant="mono" size="micro">SCHEDULE</Text>
              </Box>
              <Text variant="body" size="sm" weight="font-bold">{data.schedule}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

interface FullPreviewProps {
  data: DraftData;
  onClose: () => void;
}

export function FullPreview({
  data,
  onClose
}: FullPreviewProps) {
  const isEvent = data.type === 'event';
  const isResource = data.type === 'resource';

  const title = data.title || 'Untitled Draft';
  const category = data.category;
  const date = data.date;
  const author = data.author;
  const content = isEvent ? data.description : isResource ? data.content : data.commentary;

  const sidebar = isResource ? (
    <ResourceSidebar data={data} />
  ) : isEvent ? (
    <EventSidebar data={data} />
  ) : undefined;

  return (
    <Box position="relative">
      <PrimaryActionButton
        position="fixed"
        top={4}
        right={4}
        zIndex={50}
        onClick={onClose}
        gap={2}
        paddingX={4}
        paddingY={2}
        className="shadow-xl"
      >
        <Layout className="w-4 h-4" />
        EXIT_FULL_PREVIEW
      </PrimaryActionButton>

      <DetailLayout
        title={title}
        category={category}
        date={date}
        content={content}
        onBack={onClose}
        backLabel="Back to Editor"
        sidebar={sidebar}
        headerExtras={
          <Stack direction="row" gap={4} marginTop={6}>
            <Stack direction="row" align="center" gap={2} color="dim">
              <Box width={8} height={8} radius="full" surface="muted" />
              <Text variant="mono" size="xs">{author}</Text>
            </Stack>
          </Stack>
        }
      >
         {data.excerpt && (
           <Box marginY={8} border="l" paddingLeft={6} className="border-accent">
             <Text variant="body" size="lg" className="italic opacity-80">
               {data.excerpt}
             </Text>
           </Box>
         )}

         {isResource && data.heading && (
           <Box marginBottom={6}>
              <Text variant="headline" size="2xl" color="main">{data.heading}</Text>
           </Box>
         )}

         {!isEvent && !isResource && data.affiliateLink && (
           <Box marginY={8} border padding={4} surface="muted">
              <Box marginBottom={2}>
                <Text variant="mono" size="xs" color="brand" weight="font-bold" className="block uppercase">Affiliate Link</Text>
              </Box>
              <Stack as="a" direction="row" align="center" gap={2} href={data.affiliateLink} target="_blank" className="text-accent hover:underline">
                <Text variant="body" size="sm">Buy on Amazon</Text>
                <ExternalLink className="w-3 h-3" />
              </Stack>
           </Box>
         )}

         {isResource && data.affiliateIds.length > 0 && (
           <Box marginY={8} border padding={4} surface="muted">
              <Stack gap={2}>
                <Box display="flex" align="center" gap={2}>
                   <Info className="w-4 h-4 text-accent" />
                   <Text variant="mono" size="xs" color="brand" weight="font-bold" className="uppercase">Affiliate IDs</Text>
                </Box>
                <Text variant="body" size="sm" color="dim">
                  Registered IDs: {data.affiliateIds.join(', ')}
                </Text>
              </Stack>
           </Box>
         )}
      </DetailLayout>
    </Box>
  );
}
