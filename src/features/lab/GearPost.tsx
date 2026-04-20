import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';
import { ContentDetail } from '@/layouts/ContentDetail';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = useMemo(() => slug ? getResourceBySlug(slug) : undefined, [slug]);

  const affiliateLinks = useMemo(() =>
    (resource?.affiliateIds || []).map(id => affiliateManager.getLink(id)).filter(Boolean),
    [resource]
  );

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
    <ContentDetail
      post={resource}
      onBack={() => navigate('/gear')}
      backLabel="Back to Toolbox"
    >
      {affiliateLinks.length > 0 && (
        <Box border padding={6} className="bg-surface/50 border-accent/20">
          <Stack gap={4}>
            <Text variant="mono" size="xs" weight="font-bold" color="brand">FEATURED GEAR</Text>
            <Box display="flex" flexWrap="wrap" gap={4}>
              {affiliateLinks.map((link) => (
                <Box
                  key={link!.id}
                  as="a"
                  href={affiliateManager.resolveUrl(link!.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 bg-surface border border-line hover:border-accent transition-colors"
                >
                  <Stack gap={1}>
                    <Text variant="mono" size="xs" weight="font-bold">{link!.name}</Text>
                    <Text variant="mono" size="micro" color="dim" className="max-w-xs line-clamp-1">{link!.description}</Text>
                  </Stack>
                  <ExternalLink className="w-3 h-3 text-accent" />
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      )}
    </ContentDetail>
  );
}
