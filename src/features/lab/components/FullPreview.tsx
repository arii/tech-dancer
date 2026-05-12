import { useMemo } from 'react';
import { ExternalLink, Layout } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { DraftData, EventDraftData, PostDraftData, ResourceDraftData } from '../useBlogDrafter';
import { ResourceSidebar, ResourceHeaderExtras, ResourceBodyExtras } from './sidebar/ResourceSidebar';
import { EventSidebar, EventHeaderExtras, EventBodyExtras } from '@/components/ui/EventSidebar';

interface FullPreviewProps {
  onClose: () => void;
}

const PostHeaderExtras = ({ author }: { author: string }) => (
  <Stack gap={6} marginTop={6}>
    <Stack direction="row" align="center" gap={2} color="dim">
      <Box width={8} height={8} radius="full" surface="muted" />
      <Text variant="mono" size="xs">{author}</Text>
    </Stack>
  </Stack>
);

const PostBodyExtras = ({ affiliateLink }: { affiliateLink?: string }) => {
  if (!affiliateLink) return null;
  return (
    <Box marginY={8} border padding={4} surface="muted">
      <Box marginBottom={2}>
        <Text variant="mono" size="xs" color="brand" weight="font-bold" className="block uppercase">Affiliate Link</Text>
      </Box>
      <Stack as="a" direction="row" align="center" gap={2} href={affiliateLink} target="_blank" className="text-accent hover:underline">
        <Text variant="body" size="sm">Buy on Amazon</Text>
        <ExternalLink className="w-3 h-3" />
      </Stack>
    </Box>
  );
};

export function FullPreview(props: FullPreviewProps & DraftData) {
  const { onClose } = props;

  const { sidebar, headerExtras, content, bodyExtras } = useMemo(() => {
    switch (props.type) {
      case 'post': {
        const data = props as PostDraftData;
        return {
          sidebar: undefined,
          headerExtras: <PostHeaderExtras author={data.author} />,
          content: data.commentary,
          bodyExtras: <PostBodyExtras affiliateLink={data.affiliateLink} />
        };
      }
      case 'resource': {
        const data = props as ResourceDraftData;
        return {
          sidebar: <ResourceSidebar affiliateLink={data.affiliateLink} specs={data.specs} />,
          headerExtras: (
            <ResourceHeaderExtras
              author={data.author}
              rating={data.rating}
              durability={data.durability}
              value={data.value}
              priceCategory={data.priceCategory}
            />
          ),
          content: data.content,
          bodyExtras: <ResourceBodyExtras heading={data.heading} />
        };
      }
      case 'event': {
        const data = props as EventDraftData;
        return {
          sidebar: <EventSidebar startDate={data.startDate} earlyBirdDate={data.earlyBirdDate} hotelCutoffDate={data.hotelCutoffDate} />,
          headerExtras: <EventHeaderExtras author={data.author} />,
          content: data.description,
          bodyExtras: <EventBodyExtras />
        };
      }
      default:
        return { sidebar: undefined, headerExtras: undefined, content: '', bodyExtras: undefined };
    }
  }, [props]);

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
        title={props.title || 'Untitled Post'}
        category={props.category}
        date={props.date}
        content={content}
        onBack={onClose}
        backLabel="Back to Editor"
        headerExtras={headerExtras}
        sidebar={sidebar}
      >
         {props.excerpt && (
           <Box marginY={8} border="l" paddingLeft={6} className="border-accent">
             <Text variant="body" size="lg" className="italic opacity-80">
               {props.excerpt}
             </Text>
           </Box>
         )}

         {bodyExtras}
      </DetailLayout>
    </Box>
  );
}
