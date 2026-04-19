import { motion } from 'motion/react';
import { Database, FileText, Search, Activity } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useResearch } from './useResearch';

export default function ResearchAnalytics() {
  const { studies, tools, selectedTool, setSelectedTool } = useResearch();

  return (
    <Box as="section" padding="panel">
      <Stack gap={16}>
        <Stack gap={1}>
          <Text variant="mono" color="brand" weight="font-bold">TECHNICAL PORTFOLIO</Text>
          <Text variant="headline" size="9xl">Data & Development Lab.</Text>
          <Text variant="body" size="xl" maxWidth="3xl">
            Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle.
          </Text>
        </Stack>

        <Stack gap={8}>
          <Box border="b" paddingBottom={4}>
            <Text variant="mono" color="brand" weight="font-bold">PROJECTS</Text>
          </Box>
          <Grid cols={{ base: 1, lg: 12 }} gap={8}>
            <Box span={{ base: 12, lg: 5 }}>
              <Stack gap={4}>
                {tools.map((tool) => (
                  <Box 
                    key={tool.id}
                    as="button"
                    onClick={() => setSelectedTool(tool.id)}
                    surface={selectedTool === tool.id ? "accent" : "default"}
                    border
                    padding="compact"
                    cursor="pointer"
                    className="group hover:border-accent-brand transition-all text-left"
                  >
                    <Grid cols={12} gap={4} align="center">
                      <Box span={2} display="flex" justify="center" color={selectedTool === tool.id ? "brand" : "dim"}>
                        <Search className="w-5 h-5" />
                      </Box>
                      <Box span={7}>
                        <Stack gap={1}>
                          <Text variant="mono" weight="font-bold" size="xs">{tool.name}</Text>
                          <Text variant="mono" size="micro" color="dim">{tool.category}</Text>
                        </Stack>
                      </Box>
                      <Box span={3} textAlign="right">
                        <Text variant="mono" size="micro" color="brand">{tool.status}</Text>
                      </Box>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box span={{ base: 12, lg: 7 }} border surface="default" padding="card">
              {selectedTool ? (
                <Stack gap={8}>
                  {(() => {
                    const tool = tools.find(t => t.id === selectedTool);
                    return (
                      <>
                        <Stack gap={4}>
                          <Text variant="mono" color="brand" size="xs">ANALYSIS</Text>
                          <Text variant="display" size="4xl">{tool?.name}</Text>
                          <Box border surface="accent" padding="compact" opacity={5}>
                            <Text variant="mono" size="micro" color="brand">DESCRIPTION:</Text>
                            <Text variant="body" size="sm" display="block" marginTop={2}>{tool?.layman}</Text>
                          </Box>
                        </Stack>

                        <Grid cols={2} gap={8}>
                          <Stack gap={2}>
                            <Text variant="mono" size="micro" color="dim">SOURCE</Text>
                            <Box display="flex" align="center" gap={2}>
                              <Database className="w-4 h-4 text-accent-brand" />
                              <Text variant="mono" size="xs">WSDC Registry</Text>
                            </Box>
                          </Stack>
                          <Stack gap={2}>
                            <Text variant="mono" size="micro" color="dim">AVAILABILITY</Text>
                            <Box display="flex" align="center" gap={2}>
                              <Activity className="w-4 h-4 text-accent-brand" />
                              <Text variant="mono" size="xs">Public Tool</Text>
                            </Box>
                          </Stack>
                        </Grid>

                        <Box border="t" paddingTop={8}>
                          <Text variant="body" size="base" color="dim">
                            This tool was developed as part of a larger effort to modernize dance statistics. 
                            It focuses on accurate data modeling and providing dancers with clear, actionable insights.
                          </Text>
                        </Box>
                      </>
                    )
                  })()}
                </Stack>
              ) : (
                <Stack justify="center" align="center" height="full" gap={6} opacity={40} textAlign="center">
                  <Activity className="w-12 h-12 stroke-1" />
                  <Text variant="mono" size="xs" weight="font-bold">Select a project to view details</Text>
                </Stack>
              )}
            </Box>
          </Grid>
        </Stack>

        <Stack gap={8}>
          <Box border="b" paddingBottom={4}>
            <Text variant="mono" color="brand" weight="font-bold">STUDIES</Text>
          </Box>
          <Grid cols={{ base: 1, md: 2 }} gap={12}>
            {studies.map((study) => (
              <Box key={study.slug} className="group">
                <Stack gap={4}>
                  <Box display="flex" justify="between" align="center">
                    <Text variant="mono" size="micro" color="brand" uppercase>{study.category}</Text>
                    <Text variant="mono" size="micro" color="dim">{study.date}</Text>
                  </Box>
                  <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
                    {study.title}
                  </Text>
                  <Text variant="body" size="sm" color="dim" className="line-clamp-3">
                    {study.excerpt}
                  </Text>
                  <Box 
                    as={motion.div}
                    whileHover={{ x: 5 }}
                    display="flex" 
                    align="center" 
                    gap={2} 
                    color="dim" 
                    className="group-hover:text-accent-brand transition-colors"
                  >
                    <Text variant="mono" size="xs" weight="font-bold">Read Study</Text>
                    <FileText className="w-4 h-4" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
