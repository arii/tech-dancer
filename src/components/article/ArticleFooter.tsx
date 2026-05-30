
import { Stack } from '@/layouts/Primitives';
import { RelatedContent, RelatedPost } from './RelatedContent';
import { NewsletterBlock } from './NewsletterBlock';

interface ArticleFooterProps {
  related?: RelatedPost[];
}

export function ArticleFooter({ related }: ArticleFooterProps) {
  return (
    <Stack gap={24}>
      {related && related.length > 0 && (
        <RelatedContent items={related} />
      )}
      <NewsletterBlock />
    </Stack>
  );
}

export { RelatedContent, NewsletterBlock };
export type { RelatedPost };
