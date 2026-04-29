import { ExternalLink, Layout } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { DraftData } from '../useBlogDrafter';

interface FullPreviewProps {
  data: DraftData;
  onClose: () => void;
}

export function FullPreview({ data, onClose }: FullPreviewProps) {
  return (
    <Box position="relative">
      <Box
        position="fixed"
        top={4}
        right={4}
        zIndex={50}
        as="button"
        onClick={onClose}
        display="flex"
        align="center"
        gap={2}
        surface="accent"
        paddingX={4}
        paddingY={2}
        className="bg-accent text-bg hover:bg-accent-brand transition-all cursor-pointer font-bold uppercase tracking-widest text-xs shadow-xl"
      >
        <Layout className="w-4 h-4" />
        EXIT_FULL_PREVIEW
      </Box>
      <DetailLayout
        title={data.title || 'Untitled Post'}
        category={data.category}
        date={data.date}
        content={data.commentary}
        onBack={onClose}
        backLabel="Back to Editor"
        headerExtras={
          <Stack direction="row" gap={4} marginTop={6}>
            <Stack direction="row" align="center" gap={2} color="dim">
              <Box width={8} height={8} radius="full" surface="muted" />
              <Text variant="mono" size="xs">{data.author}</Text>
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
         {data.affiliateLink && (
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
      </DetailLayout>
    </Box>
  );
}
