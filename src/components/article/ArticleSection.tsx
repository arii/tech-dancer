
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface ArticleSectionProps {
  number?: string;
  title: string;
  id?: string;
  children: ReactNode;
}

export function ArticleSection({ number, title, id, children }: ArticleSectionProps) {
  return (
    <Box id={id} marginBottom={16} scrollMarginTop={24} className="group">
      <Stack gap={8}>
        <Stack gap={3}>
          {number && (
            <Text variant="mono" size="xs" color="accent" weight="font-extrabold" uppercase tracking="utility">
              {number}
            </Text>
          )}
          <Text as="h2" variant="h2" size="4xl" color="main" weight="font-bold" leading="tight" tracking="tight">
            {title}
          </Text>
        </Stack>
        <Box marginBottom={8}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
