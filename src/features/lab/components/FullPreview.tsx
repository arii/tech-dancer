import { Layout } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { DraftData } from '../useBlogDrafter';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { EventSidebar } from './sidebar/EventSidebar';
import { ResourceScoreGrid } from './ResourceScoreGrid';

interface FullPreviewProps {
  onClose: () => void;
}

export function FullPreview(props: FullPreviewProps & DraftData) {
  const { type, author, onClose } = props;

  const sidebar = type === 'resource' ? (
    <ResourceSidebar affiliateLink={props.affiliateLink} specs={props.specs} />
  ) : type === 'event' ? (
    <EventSidebar startDate={props.startDate} earlyBirdDate={props.earlyBirdDate} hotelCutoffDate={props.hotelCutoffDate} />
  ) : undefined;

  const headerExtras = (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>

      {type === 'resource' && (
        <ResourceScoreGrid
          rating={props.rating}
          durability={props.durability}
          value={props.value}
          priceCategory={props.priceCategory}
        />
      )}
    </Stack>
  );

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
        content={props.commentary}
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
      </DetailLayout>
    </Box>
  );
}
