    <Box border surface="default" padding="card">
      <Stack gap={6}>
        <Box display="flex" align="center" gap={3}>
          <Download className="w-5 h-5 text-accent" />
          <Text variant="mono" size="xs" weight="font-bold" uppercase>Export Console</Text>
        </Box>
        <Stack gap={3}>
          <Button
            variant="secondary"
            width="full"
            onClick={() => exportCSV(data)}
          >
            <Box display="flex" align="center" gap={3} width="full" textAlign="left">
              <FileJson className="w-4 h-4 shrink-0" />
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_CSV</Text>
                <Text variant="body" size="micro" color="dim">Raw machine-readable data</Text>
              </Stack>
            </Box>
          </Button>
          <Button
            variant="secondary"
            width="full"
            onClick={handleExportPDF}
          >
            <Box display="flex" align="center" gap={3} width="full" textAlign="left">
              <FileText className="w-4 h-4 shrink-0" />
              <Stack gap={0}>
                <Text variant="mono" size="micro" weight="font-bold">EXPORT_PDF_REPORT</Text>
                <Text variant="body" size="micro" color="dim">Formatted analytical brief</Text>
              </Stack>
            </Box>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function WCSScraperStats() {
  return (
    <Box paddingX={4} paddingY={6}>
      <Stack gap={4}>
        <Text variant="mono" size="micro" color="dim" uppercase weight="font-bold" tracking="widest">Scraper Intelligence</Text>
        <Stack gap={4}>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
            <Text variant="body" size="xs" color="dim">Success Rate</Text>
            <Text variant="mono" size="xs" color="brand" weight="font-bold">99.8%</Text>
          </Box>
          <Box display="flex" justify="between" align="center" borderBottom="b" paddingBottom={2} className="border-line/20">
