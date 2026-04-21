import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';
import { ToolView } from './components/ToolView';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool } = useResearch();
  
  // We check for existence here to handle 404 state,
  // but sub-components will independently fetch data for modularity.
  const toolExists = id ? !!getTool(id) : false;

  if (!toolExists) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Search className="w-12 h-12 opacity-20" />
          <Text variant="display" size="2xl">Tool Not Found</Text>
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

        <Box border surface="default" padding={{ base: 8, md: 12 }}>
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
