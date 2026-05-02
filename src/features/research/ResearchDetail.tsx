import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { BASE_URL, SITE_NAME } from '@/config/constants';
import { SITE_METADATA } from '@/config/content';

import { BlogDrafter } from '@/features/lab/BlogDrafter';
import { WCSScraperTool } from './components/WCSScraperTool';

export default function ResearchDetail() {
  const { id: toolId } = useParams();
  const navigate = useNavigate();
  const { getTool } = useResearch();
  
  const tool = useMemo(() => toolId ? getTool(toolId) : undefined, [toolId, getTool]);

  const structuredData = useMemo(() => {
    if (!tool) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": tool.name,
      "description": tool.layman,
      "author": {
        "@type": "Person",
        "name": SITE_METADATA.author,
        "url": `${BASE_URL}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_NAME
      }
    };
  }, [tool]);

  if (!tool) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Lab Resource Not Found</Text>
          <Box as="button" onClick={() => navigate('/research')} className="hover:text-accent transition-colors">
            <Text variant="mono" size="xs">Back to Research</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <SEO
        title={tool.name}
        description={tool.layman}
        type="article"
        schema={structuredData}
      />
      <Box as="article" paddingY={12}>
        <PageHeader
          label={tool.category.toUpperCase()}
          title={tool.name}
          description={tool.layman}
        />
        <Stack gap={8} marginTop={12}>
           {toolId === 'blog-drafter' && <BlogDrafter />}
           {toolId === 'wcs-scraper' && <WCSScraperTool />}
           {toolId !== 'blog-drafter' && toolId !== 'wcs-scraper' && (
             <Box padding="panel" border surface="muted" textAlign="center">
               <Text variant="mono" size="xs" color="dim">SYSTEM_LOG: Console for "{tool.name}" is currently in development.</Text>
             </Box>
           )}
        </Stack>
      </Box>
    </>
  );
}

function PageHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="xs" color="brand" weight="font-bold">{label}</Text>
      <Text variant="display" size="5xl" weight="font-black" className="uppercase tracking-tight">{title}</Text>
      <Text variant="body" size="lg" color="body" maxWidth="prose">{description}</Text>
    </Stack>
  );
}
