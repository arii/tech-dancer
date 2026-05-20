import { FileText } from 'lucide-react';
import { Box, Stack } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';

interface EventNotesProps {
  id?: string;
  content?: string;
}

export function EventNotes({ id, content }: EventNotesProps) {
  if (!content) return null;

  return (
    <Box id={id} as="section" data-testid="notes">
      <Stack gap={8}>
        <Box display="flex" align="center" gap={4}>
          <Icon icon={FileText} size="xl" color="accent" />
          <SectionHeader
            eyebrow="EXPERT INTELLIGENCE"
            title="Pro Tips & Notes"
          />
        </Box>

        <Box className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </Box>
      </Stack>
    </Box>
  );
}
