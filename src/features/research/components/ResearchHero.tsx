import React from 'react';
import { cn } from '@/lib/utils';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionButton } from '@/components/ui/ActionButton';

const STACK_CATEGORIES = [
  { label: 'Stack', tags: ['React', 'Vite', 'TypeScript', 'Python'], colorClass: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
  { label: 'Infra', tags: ['GitHub Actions', 'Vercel', 'Playwright'], colorClass: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
  { label: 'Robotics', tags: ['ROS1/2', 'C++', 'Navigation', 'Localization'], colorClass: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
  { label: 'AI', tags: ['LLM Workflows', 'Agentic CI/CD'], colorClass: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' },
];

export const ResearchHero = () => {
  return (
    <>
      <SEO
        title="DevAI Portfolio"
        description="DevAI portfolio by Ariel Anders. High-fidelity automation featuring AI-assisted GitHub PR review agents, data scraping pipelines, Vercel deployments, ecommerce automation, and production React/Vite systems."
        keywords="DevAI, AI engineering, portfolio, GitHub Actions automation, LLM workflows, React, Vite, TypeScript, technical hiring"
      />

      <Grid cols={{ base: 1, lg: 12 }} gap={8} align="center" width="full">
        <Stack gap={2} span={{ base: 1, lg: 7 }}>
          <PageHeader
            label="HIRE_ME"
            title="DevAI Portfolio"
            as="h1"
            paddingBottom={0}
            border="none"
          />
          <Text variant="body" size={{ base: "lg", lg: "xl" }} color="dim" maxWidth="prose" leading="relaxed">
            building AI-assisted engineering infrastructure in my free time. This portfolio showcased my work in agentic CI/CD, LLM workflows, and developer tooling.
          </Text>

          {/* Scrollable Focus Tags for Mobile */}
          <Stack direction="col" align="start" gap={2} width="full" marginTop={2} marginBottom={2} paddingY={1} display={{ base: "flex", lg: "none" }}>
            <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold">Focus</Text>
            <Box display="flex" overflowX="auto" noScrollbar gap={2} width="full" className="flex-nowrap scroll-mask-fade">
              {STACK_CATEGORIES.flatMap(cat => cat.tags.map(tag => ({ tag, col: cat.colorClass }))).map(item => (
                <Text key={item.tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cn(item.col, "shrink-0")}>{item.tag}</Text>
              ))}
            </Box>
          </Stack>

          {/* Categorized Stack Grid for Desktop */}
          <Stack gap={2} marginTop={4} marginBottom={4} width="full" display={{ base: "none", lg: "flex" }}>
            {STACK_CATEGORIES.map(cat => (
              <Box key={cat.label} display="flex" align="center" gap={2} width="full">
                <Text size="micro" color="dim" uppercase tracking="widest" weight="font-bold" width={24} shrink={0}>{cat.label}</Text>
                <Box display="flex" wrap="wrap" gap={2} width="full">
                  {cat.tags.map(tag => (
                    <Text key={tag} size="micro" weight="font-bold" paddingX={2} paddingY={0.5} radius="sm" className={cat.colorClass}>{tag}</Text>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>

          <Stack direction={{ base: "col", sm: "row" }} gap={3} marginTop={2} width={{ base: "full", sm: "auto" }}>
            <ActionButton as="a" href="#flagship" variant="primary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
              View Flagship Projects
            </ActionButton>
            <ActionButton as="a" href="#articles" variant="secondary" paddingX={6} paddingY={3} width={{ base: "full", sm: "auto" }}>
              Read Implementation Articles
            </ActionButton>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};
