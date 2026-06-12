import { Box } from '@/layouts/Primitives';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ReactNode } from 'react';

interface EditorialContentRendererProps {
  content: string;
  verdict?: string;
  children?: ReactNode;
}

export function EditorialContentRenderer({ content, verdict, children }: EditorialContentRendererProps) {
  return (
    <Box className="prose-editorial">
      {verdict && <VerdictCallout verdict={verdict} />}
      <MarkdownRenderer content={content} />
      {children}
    </Box>
  );
}
