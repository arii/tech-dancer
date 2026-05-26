import { Box } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { EventSection } from './EventSection';

interface EventNotesProps {
  id?: string;
  content?: string;
}

export function EventNotes({ id, content }: EventNotesProps) {
  if (!content) return null;

  return (
    <EventSection
      id={id}
      eyebrow="Editorial notes"
      title="Pro Tips & Notes"
      description="Field notes, reviews, and community context collected for this event."
    >
      <Box className="prose prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </Box>
    </EventSection>
  );
}
