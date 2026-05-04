import { Box, Grid, Text } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { useResearch } from './useResearch';

export default function ResearchAnalytics() {
  const { tools } = useResearch();

  return (
    <Box as="section" className="bg-bg text-text-main">
      <SEO
        title="WCS Data & Development Lab"
        description="Interactive data science, software development, and WCS research tools from boomtick.blog."
      />
      <Box paddingX={{ base: 4, sm: 6, md: 10 }} paddingY={{ base: 6, md: 14 }}>
        <Box as="section" className="max-w-6xl">
          <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">
            Technical Portfolio
          </Text>
          <Text as="h1" variant="display" size="5xl" weight="font-black" className="text-3xl 4xl 5xl">
            Data & Development Lab
          </Text>
          <Text variant="body" size="base" className="max-w-3xl leading-7 text-text-dim">
            Interactive data science, software development, and specialized tools for West Coast Swing research and analysis.
          </Text>

          <Grid cols={{ base: 1, sm: 2, xl: 3 }} gap={4} >
            {tools.map((tool) => (
              <Box as="article" key={tool.name} className="rounded-2xl border border-border/80 bg-surface shadow-sm transition-colors hover:border-primary/30">
                <Text variant="sans" size="xs" weight="font-bold" uppercase className="tracking-widest text-text-dim">{tool.status}</Text>
                <Text as="h2" variant="display" size="lg" weight="font-bold" >{tool.name}</Text>
                <Text variant="body" size="sm" className="leading-7 text-text-dim">{tool.layman}</Text>
              </Box>
            ))}
          </Grid>

          <Box as="section" padding={6} className="rounded-2xl border border-dashed border-border/80 bg-surface text-center shadow-sm sm:">
            <Text as="h2" variant="display" size="2xl" weight="font-black" >ETL Pipeline Synchronizing...</Text>
            <Text variant="body" size="sm" className=" max-w-2xl leading-7 text-text-dim">
              The WCS Competition Data Scraper is ingesting and validating public datasets. Detailed studies on judge variance and performance metrics will be available once the baseline analysis is complete.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
