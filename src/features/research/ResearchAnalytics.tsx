// impeccable-ignore-file
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { Icon } from '@/components/ui/Icon';
import { useResearch } from './useResearch';

// Sub-components
import FlagshipCard from './components/FlagshipCard';
import ToolSection from './components/ToolSection';
import ResearchHero from './components/ResearchHero';
import WorkWithMe from './components/WorkWithMe';
import ResearchArticleCard from './components/ResearchArticleCard';

const ResearchAnalytics = () => {
  const navigate = useNavigate();
  const { studies, flagshipTools, engineeringTools, dataContentTools, ecommerceTools } = useResearch();
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <Box as="section" maxWidth="7xl" marginX="auto" width="full">
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />
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
        <ToolSection title="Ecommerce Experiments" tools={ecommerceTools} navigate={navigate} />

        {/* Articles & Research Section */}
        {studies.length > 0 && (
          <Stack gap={12} id="articles" width="full">
            <Box paddingBottom={4} display="flex" justify="between" align="center" border="b" width="full">
              <Text as="h2" variant="headline" size="2xl" weight="font-black">Articles & Research</Text>
              <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacityVariant="subtle">{studies.length} POSTS</Text>
            </Box>

            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} width="full">
              {studies.map((study) => (
                <ResearchArticleCard key={study.slug} study={study} onNavigate={navigate} />
              ))}
            </Grid>
          </Stack>
        )}

        <WorkWithMe />
      </Stack>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <Box
          position="fixed"
          inset={0}
          zIndex={100}
          display="flex"
          align="center"
          justify="center"
          className="bg-black/90 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <Box position="absolute" top={4} right={4} className="text-white hover:text-accent p-2">
            <Icon icon={X} size="lg" />
          </Box>
          <img
            src={lightboxImage}
            alt="Enlarged screenshot preview"
            className="max-w-[95vw] max-h-[95vh] md:max-w-[85vw] md:max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl"
          />
        </Box>
      )}
    </Box>
  );
};

export default ResearchAnalytics;
