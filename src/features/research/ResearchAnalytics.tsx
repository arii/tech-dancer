import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useResearch } from './useResearch';
import { FlagshipCard } from './components/FlagshipCard';
import { ToolSection } from './components/ToolSection';
import { ResearchHero } from './components/ResearchHero';
import { ResearchArticles } from './components/ResearchArticles';
import { ResearchContact } from './components/ResearchContact';

const ResearchAnalytics = () => {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const flagshipTools = tools.filter(t => t.taxonomyBucket === 'flagship' || t.isFlagship);
  const engineeringTools = tools.filter(t => t.taxonomyBucket === 'engineering');
  const dataContentTools = tools.filter(t => t.taxonomyBucket === 'data-content');
  const e_commerceTools = tools.filter(t => t.taxonomyBucket === 'e-commerce');

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full">
      <Stack gap={16} width="full">
        <ResearchHero />

        {/* Flagship Projects Section */}
        <Stack gap={8} id="flagship" marginTop={2} width="full">
          <Box paddingBottom={2} display="flex" justify="between" align="center" border="b" width="full">
            <Text variant="headline" size="2xl" weight="font-black">Flagship Projects</Text>
            <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">CASE STUDIES</Text>
          </Box>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
            {flagshipTools.map((tool) => (
              <FlagshipCard key={tool.id} tool={tool} baseUrl={baseUrl} onImageClick={setLightboxImage} />
            ))}
          </Grid>
        </Stack>

        <Box className="why-this-matters">
          <Text as="h2" size="3xl" className="label">Why this matters</Text>
          <Text as="p">
            Shipping high-fidelity products requires <Text weight="font-bold" color="main">practical AI orchestration</Text>, not hype. I focus on engineering systems that keep the developer in the loop while maintaining high standards.
          </Text>
        </Box>

        {/* Engineering Systems Section */}
        <ToolSection title="Engineering Systems" tools={engineeringTools} navigate={navigate} />

        {/* Data & Content Systems Section */}
        <ToolSection title="Data & Content Systems" tools={dataContentTools} navigate={navigate} />

        {/* Ecommerce Experiments Section */}
        <ToolSection title="Ecommerce Experiments" tools={e_commerceTools} navigate={navigate} />

        <ResearchArticles studies={studies} navigate={navigate} />

        <ResearchContact lightboxImage={lightboxImage} setLightboxImage={setLightboxImage} />
      </Stack>
    </Box>
  );
};

export default ResearchAnalytics;
