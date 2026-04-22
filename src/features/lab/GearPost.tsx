import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { GearPostDetail } from './components/GearPostDetail';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = useMemo(() => slug ? getResourceBySlug(slug) : undefined, [slug]);

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Review Not Found</Text>
          <Box as="button" onClick={() => navigate('/gear')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Toolbox</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <GearPostDetail
      post={resource}
      onBack={() => navigate('/gear')}
      backLabel="Back to Toolbox"
    />
  );
}
