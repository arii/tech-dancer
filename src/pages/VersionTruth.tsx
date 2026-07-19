import { SEO } from '@/components/SEO';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { EndpointCard } from '@/components/ui/EndpointCard';

const VersionTruth = () => {
  return (
    <Box
      as="section"
      aria-label="VersionTruth content"
      marginX="auto"
      width="full"
      maxWidth="5xl"
      minWidth={0}
      paddingX={{ base: 4, sm: 6, lg: 8 }}
      paddingY={10}
    >
      <SEO
        title="VersionTruth - Real-time Version Oracle"
        description="The antidote to version hallucinations: real-time ground-truth for npm, Node, and GitHub Actions."
      />

      <Stack gap={8} width="full" maxWidth="full">
        {/* Header */}
        <Stack gap={3}>
          <Box as="h1" emphasis="h1" className="text-3xl sm:text-4xl">
            VersionTruth
          </Box>
          <Box as="p" emphasis="body" className="text-lg" maxWidth="3xl">
            The antidote to version hallucinations: real-time ground-truth for npm, Node, and GitHub Actions. Exposes live, registry-fetched ground-truth so coding agents stop downgrading correct dependency versions.
          </Box>
        </Stack>

        {/* Concept Cards */}
        <Grid cols={{ base: 1, md: 2 }} gap={6} width="full">
          <Box padding={6} radius="lg" border="default" surface="card">
            <Box as="h3" emphasis="h3" marginBottom={2}>
              The Fallacy
            </Box>
            <Box as="p" emphasis="body" className="text-sm">
              LLMs suffer from knowledge cutoff dates. When they encounter newer, unfamiliar releases (like v6), they confidently assume they are hallucinations or typos and revert them back to old, stale versions (like v4) that exist in their training data.
            </Box>
          </Box>
          <Box padding={6} radius="lg" border="default" surface="card">
            <Box as="h3" emphasis="h3" marginBottom={2}>
              The Remedy
            </Box>
            <Box as="p" emphasis="body" className="text-sm">
              VersionTruth serves as a live oracle. Before writing updates, an agent queries the API or reads the hosted <Box as="code" emphasis="mono" className="text-xs">skill.md</Box> to verify that their candidate is current and valid.
            </Box>
          </Box>
        </Grid>

        {/* Endpoints */}
        <Stack gap={4}>
          <Box as="h2" emphasis="h2">
            API Endpoints
          </Box>
          <Stack gap={4} width="full">
            <EndpointCard
              method="GET"
              path="/api/latest-version?ecosystem={npm|node|gh-action}&name={name}"
              description="Retrieves the current latest stable version of a package or runtime."
              exampleCall='curl "https://boomtick.blog/api/latest-version?ecosystem=npm&name=pnpm"'
              exampleResponse={JSON.stringify(
                {
                  ecosystem: 'npm',
                  name: 'pnpm',
                  latest: '10.28.2',
                  checkedAt: '2026-07-10T07:55:00.000Z',
                },
                null,
                2
              )}
            />
            <EndpointCard
              method="GET"
              path="/api/compare-version?ecosystem={npm|node|gh-action}&name={name}&candidate={version}"
              description="Verifies a candidate version against the latest release, warning if it is outdated, deprecated, or EOL."
              exampleCall='curl "https://boomtick.blog/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4"'
              exampleResponse={JSON.stringify(
                {
                  ecosystem: 'gh-action',
                  name: 'actions/checkout',
                  candidate: 'v4',
                  latest: 'v6.0.1',
                  isOutdated: true,
                  isCurrent: false,
                  isAheadOfLatest: false,
                  isDeprecated: false,
                  checkedAt: '2026-07-10T07:55:00.000Z',
                },
                null,
                2
              )}
            />
            <EndpointCard
              method="POST"
              path="/api/batch-compare"
              description="Validates a list of dependency candidate versions concurrently in a single batch request."
              exampleCall="curl -X POST \"https://boomtick.blog/api/batch-compare\" -H \"Content-Type: application/json\" -d '[{\"ecosystem\":\"node\",\"candidate\":\"18\"},{\"ecosystem\":\"npm\",\"name\":\"pnpm\",\"candidate\":\"10.28.2\"}]'"
              exampleResponse={JSON.stringify(
                [
                  {
                    ecosystem: 'node',
                    name: 'node',
                    candidate: '18',
                    latest: '24.16.0',
                    isOutdated: true,
                    isCurrent: false,
                    isAheadOfLatest: false,
                    isDeprecated: true,
                  },
                  {
                    ecosystem: 'npm',
                    name: 'pnpm',
                    candidate: '10.28.2',
                    latest: '10.28.2',
                    isOutdated: false,
                    isCurrent: true,
                    isAheadOfLatest: false,
                    isDeprecated: false,
                  },
                ],
                null,
                2
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VersionTruth;
