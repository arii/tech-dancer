import { Star, Layout } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { PrimaryActionButton } from '@/components/ui/PrimaryActionButton';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { DraftData } from '../useBlogDrafter';
import { ResourceSidebar } from './sidebar/ResourceSidebar';
import { EventSidebar } from './sidebar/EventSidebar';
import { ScoreGrid, ScoreItem } from '@/components/layout/DetailElements';

interface FullPreviewProps extends DraftData {
  onClose: () => void;
}

export function FullPreview({
  type,
  title,
  category,
  date,
  author,
  excerpt,
  commentary,
  affiliateLink,
  rating,
  durability,
  value,
  priceCategory,
  specs,
  startDate,
  earlyBirdDate,
  hotelCutoffDate,
  onClose
}: FullPreviewProps) {
  const sidebar = type === 'resource' ? (
    <ResourceSidebar affiliateLink={affiliateLink} specs={specs} />
  ) : type === 'event' ? (
    <EventSidebar startDate={startDate} earlyBirdDate={earlyBirdDate} hotelCutoffDate={hotelCutoffDate} />
  ) : undefined;

  const headerExtras = (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>

      {type === 'resource' && (
        <ScoreGrid>
          <ScoreItem label="Overall" value={rating ?? 'N/A'} icon={Star} intent="warning" />
          {durability !== undefined && durability > 0 && <ScoreItem label="Durability" value={`${durability}/5`} />}
          {value !== undefined && value > 0 && <ScoreItem label="Value" value={`${value}/5`} />}
          <ScoreItem label="Price" value={priceCategory || '$$'} intent="warning" />
        </ScoreGrid>
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
        title={title || 'Untitled Post'}
        category={category}
        date={date}
        content={commentary}
        onBack={onClose}
        backLabel="Back to Editor"
        headerExtras={headerExtras}
        sidebar={sidebar}
      >
         {excerpt && (
           <Box marginY={8} border="l" paddingLeft={6} className="border-accent">
             <Text variant="body" size="lg" className="italic opacity-80">
               {excerpt}
             </Text>
           </Box>
         )}
      </DetailLayout>
    </Box>
  );
}
