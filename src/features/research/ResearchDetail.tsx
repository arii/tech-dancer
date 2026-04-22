import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';
import { ToolView } from './components/ToolView';

import { DetailLayout } from '@/components/layout/DetailLayout';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool, getStudy } = useResearch();
  
  const tool = id ? getTool(id) : null;
  const study = !tool && id ? getStudy(id) : null;

  if (study) {
    return (
      <DetailLayout
        title={study.title}
        category={study.category}
        date={study.date}
        content={study.content}
        onBack={() => navigate('/research')}
        backLabel="Back to Lab"
      />
    );
  }

  if (!toolExists) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search className="w-12 h-12 opacity-20" />
          <Text variant="display" size="2xl">Content Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Laboratory</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      <Stack gap={12}>
        <Box 
          as="button" 
          onClick={() => navigate('/research')}
          display="flex" 
          align="center" 
          gap={2}
          color="dim"
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">Back to Lab</Text>
        </Box>

        <Box border surface="default" padding={{ base: 8, md: 12 }} className="rounded-none">
          <Stack gap={12}>
            {id === 'blog-drafter' ? (
              <BlogDrafter />
            ) : (
              <ToolView />
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
