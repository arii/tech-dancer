import { Icon } from '@/components/ui/Icon';
import { useNavigate, NavLink } from 'react-router-dom';
import { routes } from '@/config/routes';
import { Search, ArrowRight, Activity, FileText, Cpu, LucideIcon, ExternalLink, Github, Globe, Send, Terminal, Layout, Workflow, Code, Zap, Microscope, SearchCode, Database, Rocket } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/ui/PageHeader';
import { BaseCard } from '@/components/ui/BaseCard';
import { cardVariants } from '@/components/ui/card';
import { Studies } from '@/data/studies';

const Research = () => {
  const navigate = useNavigate();

  const studies: Studies[] = [];

  const engineeringTools = [
    // List of engineering tools
  ];

  return (
    <Box>
      <Stack gap={8}>
        <Box paddingBottom={4} display="flex" justify="between" align="end" border="b">
          <Text variant="headline" size="2xl" weight="font-black">Engineering Systems</Text>
          <Text variant="mono" size="xs" color="dim" weight="font-semibold" uppercase tracking="widest" opacity={0.4}>{engineeringTools.length} TOOLS</Text>
        </Box>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gapX={6} gapY={12}>
          {engineeringTools.map((tool) => (
            <Stack
              key={tool.id}
              as="button"
              onClick={() => navigate(tool.canonicalPath || `/research/${tool.id}`)}
              padding={6}
              paddingBottom={10}
              gap={4}
              height="full"
              align="start"
              textAlign="left"
              className={cardVariants({ interactive: true })}
            >
              <Stack gap={4} width="full">
                <Box display="flex" justify="between" align="start" width="full">
                  <Box width={10} height={10} surface="muted" border radius="md" display="flex" align="center" justify="center">
                    <Icon icon={getToolIcon(tool)} size="md" color="dim" />
                  </Box>
                  <Text size="micro" weight="font-bold" uppercase tracking="widest" color="accent">
                    {tool.status}
                  </Text>
                </Box>
                <Stack gap={3}>
                  <Stack gap={1}>
                      <Text variant="mono" size="micro" color="dim" weight="font-bold" uppercase tracking="widest" opacity={0.4}>
                          {tool.category}
                      </Text>
                      <Text variant="display" size="xl" weight="font-black">
                          {tool.title}
                      </Text>
                  </Stack>
                  <Text size="micro" color="accent" weight="font-normal" uppercase tracking="tighter">
                      {tool.subtitle}
                  </Text>
                  <Text size="sm" color="dim">
                    {tool.description}
                  </Text>
                  <Box display="flex" wrap="wrap" gap={2} marginTop={2}>
                      {tool.tags.map(tag => (
                          <Text key={tag} variant="mono" size="micro" paddingX={2} paddingY={0.5} radius="sm" color="dim" className="flagship-tag">
                              {tag}
                          </Text>
                      ))}
                  </Box>
                </Stack>
              </Stack>
              <Box display="flex" align="center" gap={2} marginTop="auto">
                <Text weight="font-bold" size="xs" uppercase tracking="widest" color="accent">View Assets</Text>
                <Icon icon={ArrowRight} size="md" color="accent" />
              </Box>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default Research;
