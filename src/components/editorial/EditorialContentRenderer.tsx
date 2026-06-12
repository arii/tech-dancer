import { ReactNode } from 'react';
import { Box } from '@/layouts/Primitives';
import { EditorialLayout } from './EditorialLayout';
import { EditorialHeader } from './EditorialHeader';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface EditorialContentRendererProps {
  // Metadata for EditorialHeader
  category: string;
  date: string;
  readTime: string;
  title: string;
  dek?: string;
  author: string;
  authorAvatarSrc?: string;
  tags?: string[];
  onShare?: () => void;
  isShared?: boolean;
  hero?: ReactNode;

  // Layout props
  onBack: () => void;
  backLabel: string;

  // Content
  content: string;

  // Slots
  sidebar?: ReactNode;
  footer?: ReactNode;
  contentTop?: ReactNode;
  contentBottom?: ReactNode;
}

/**
 * Unified renderer for article-style content.
 * Centralizes prose-editorial usage and markdown rendering patterns.
 */
export function EditorialContentRenderer({
  category,
  date,
  readTime,
  title,
  dek,
  author,
  authorAvatarSrc,
  tags,
  onShare,
  isShared,
  hero,
  onBack,
  backLabel,
  content,
  sidebar,
  footer,
  contentTop,
  contentBottom,
}: EditorialContentRendererProps) {
  return (
    <EditorialLayout
      onBack={onBack}
      backLabel={backLabel}
      header={
        <EditorialHeader
          category={category}
          date={date}
          readTime={readTime}
          title={title}
          dek={dek}
          author={author}
          authorAvatarSrc={authorAvatarSrc}
          tags={tags}
          onShare={onShare}
          isShared={isShared}
          hero={hero}
        />
      }
      sidebar={sidebar}
      footer={footer}
    >
      {contentTop}
      <Box className="prose-editorial">
        <MarkdownRenderer content={content} />
      </Box>
      {contentBottom}
    </EditorialLayout>
  );
}
