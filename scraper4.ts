            <Text variant="body" size="xs" color="dim">Avg Latency</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">1.2s</Text>
          </Box>
          <Box display="flex" justify="between" align="center">
            <Text variant="body" size="xs" color="dim">Ethical Backoff</Text>
            <StatusBadge label="ACTIVE" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export function WCSScraperTool() {
  const {
    filteredData,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData
  } = useWCSData();

  if (error) {
    return (
      <Box border surface="muted" padding="card" className="border-accent/20">
        <Stack align="center" gap={4} paddingY={10}>
          <AlertCircle className="w-12 h-12 text-accent opacity-50" />
          <Stack align="center" gap={1}>
            <Text variant="mono" size="sm" weight="font-bold" uppercase>Data Synchronisation Failed</Text>
            <Text variant="body" size="xs" color="dim" textAlign="center">{error}</Text>
          </Stack>
          <Box paddingTop={4}>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Stack gap={8}>
        <Box border surface="muted" padding="card">
          <Skeleton height={10} width="full" />
