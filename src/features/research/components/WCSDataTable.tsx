import { Box, Stack, Text } from '@/layouts/Primitives';
import { WCSRecord } from '../hooks/useWCSData';

interface WCSDataTableProps {
  data: WCSRecord[];
}

export function WCSDataTable({ data }: WCSDataTableProps) {
  return (
    <Box border surface="default">
      <Box padding="compact" borderBottom display="flex" justify="between" align="center">
        <Text variant="mono" size="xs" weight="font-bold" uppercase>Scoring Results</Text>
        <Text variant="mono" size="micro" color="dim" data-testid="search-results-count">{data.length} RECORDS FOUND</Text>
      </Box>
      <Box className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Date</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Competitor</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Event</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal" className="hidden md:table-cell">Location</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal">Score</Text>
              <Text as="th" padding={4} textAlign="left" size="xs" variant="mono" color="dim" uppercase weight="font-normal" className="hidden sm:table-cell">Status</Text>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((record, i) => (
              <tr key={`${record.Dancer_ID}-${record.result_id}-${record.event_title}-${i}`} className="border-b border-line/50 transition-colors">
                <Text as="td" padding={4} variant="mono" size="xs" color="dim">{record.event_date}</Text>
                <Box as="td" padding={4}>
                  <Stack gap={0}>
                    <Text variant="body" size="xs" weight="font-bold">{record.competitor_name}</Text>
                    <Text variant="mono" size="micro" color="dim">#{record.Dancer_ID}</Text>
                  </Stack>
                </Box>
                <Box as="td" padding={4}>
                  <Text
                    as="a"
                    href={record.event_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body"
                    size="xs"
                    color="dim"
                    className="transition-colors underline-offset-4 hover:underline hover:color-accent"
                  >
                    {record.event_title}
                  </Text>
                </Box>
                <Text as="td" padding={4} size="xs" color="dim" className="hidden md:table-cell">{record.location}</Text>
                <Text as="td" padding={4} variant="mono" size="xs">{record.Registry_Points_Sum.toFixed(1)}</Text>
                <Box as="td" padding={4} className="hidden sm:table-cell">
                  <Text
                    as="div"
                    display="inline-block"
                    paddingX={2}
                    paddingY={0.5}
                    surface={record.Promoted ? 'accent' : 'muted'}
                    size="xs"
                    weight="font-black"
                    uppercase
                    tracking="widest"
                    className={record.Promoted ? 'text-accent-navy' : 'text-text-dim opacity-muted'}
                  >
                    {record.Promoted ? 'Promoted' : 'Held'}
                  </Text>
                </Box>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <Box paddingY={12} textAlign="center">
                    <Text variant="body" size="sm" color="dim">No results found for this search.</Text>
                  </Box>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
      {data.length > 20 && (
        <Box padding="compact" textAlign="center" borderTop>
          <Text variant="mono" size="micro" color="dim">AND {data.length - 20} MORE RECORDS...</Text>
        </Box>
      )}
    </Box>
  );
}
