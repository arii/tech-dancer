
import { Box, Text } from '@/layouts/Primitives';
import { ReactNode } from 'react';

interface ArticleSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export function ArticleSection({ title, id, children }: ArticleSectionProps) {
  return (
    <Box as="section" id={id} marginBottom={16}>
      <Text
        as="h2"
        variant="display"
        size="2xl"
        color="main"
        weight="font-bold"
        marginBottom={8}
      >
        {title}
      </Text>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
