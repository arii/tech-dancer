import { FileText } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface EventNotesProps {
  id?: string;
  content?: string;
}

export function EventNotes({ id, content }: EventNotesProps) {
  if (!content) return null;

  return (
    <Box id={id} as="section" data-testid="notes">
      <Stack gap={8}>
        <Stack gap={2}>
          <Text variant="mono" size="xs" color="accent" weight="font-bold" uppercase tracking="widest">
            Expert Notes
          </Text>
          <Box display="flex" align="center" gap={3}>
            <FileText className="w-8 h-8 text-white" />
            <Text variant="headline" size="3xl" weight="font-black">
              Pro Tips & Notes
            </Text>
          </Box>
        </Stack>

        <Box className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </Box>
      </Stack>
    </Box>
  );
}
