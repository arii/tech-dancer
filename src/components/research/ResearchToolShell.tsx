import { ReactNode } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { LucideIcon } from 'lucide-react';
import { ArchitecturalAssetsList } from '@/features/research/components/ArchitecturalAssetsList';
import { DEVAI_ASSETS } from '@/config/devai-assets';
import { SEO, SEOProps } from '@/components/SEO';

interface ToolFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ResearchToolShellProps {
  title: string;
  description: ReactNode;
  toolId: string;
  features: ToolFeature[];
  children?: ReactNode;
  seo?: SEOProps;
}

export function ResearchToolShell({
  title,
  description,
  toolId,
  features,
  children,
  seo
}: ResearchToolShellProps) {
  const assets = DEVAI_ASSETS.filter(a => a.toolId === toolId);

  return (
    <>
      {seo && <SEO {...seo} />}
      <Box border radius="lg" padding={8} surface="default">
        <Stack gap={8}>
          <Stack gap={4}>
            <Text variant="headline" size="xl" weight="font-black">{title}</Text>
            <Text variant="body" color="dim">
              {description}
            </Text>
          </Stack>

          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            {features.map((feature, idx) => (
              <Stack key={idx} gap={4} padding={6} border radius="md" surface="surface">
                <Box display="flex" align="center" gap={3}>
                  <feature.icon className="text-accent w-6 h-6" />
                  <Text variant="display" size="lg" weight="font-bold">{feature.title}</Text>
                </Box>
                <Text variant="body" size="sm" color="dim">
                  {feature.description}
                </Text>
              </Stack>
            ))}
          </Grid>

          {children}

          {assets.length > 0 && <ArchitecturalAssetsList assets={assets} />}
        </Stack>
      </Box>
    </>
  );
}
