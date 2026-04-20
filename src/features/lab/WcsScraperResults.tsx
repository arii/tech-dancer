import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Database, Activity, Search, Table as TableIcon } from 'lucide-react';
import mockData from './wcs_results_mock.json';

export function WcsScraperResults() {
  return (
    <Stack gap={12}>
      <Stack gap={4}>
        <Box display="flex" align="center" gap={3}>
           <TableIcon className="w-5 h-5 text-accent-brand" />
           <Text variant="display" size="2xl">REGISTRY LEDGER: PRELIMS</Text>
        </Box>
        <Box border surface="accent" padding="compact" opacity={5} className="bg-accent/5">
           <Stack gap={2} display="flex" align="start" direction="row">
              <Database className="w-4 h-4 text-accent-brand shrink-0 mt-1" />
              <Text variant="body" size="xs">
                CALIBRATING VARIANCE... SYNCING WSDC REGISTRY LEDGER.
                This view displays aggregated preliminary marks mapped to standardized WSDC points (Yes: 10.0, Alt1: 4.5, etc.).
              </Text>
           </Stack>
        </Box>
      </Stack>

      <Box border surface="default" overflow="x-auto" className="w-full">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-surface">
              <th className="p-4"><Text variant="mono" size="micro" color="dim" weight="font-bold">DANCER_ID</Text></th>
              <th className="p-4"><Text variant="mono" size="micro" color="dim" weight="font-bold">DANCER_NAME</Text></th>
              <th className="p-4"><Text variant="mono" size="micro" color="dim" weight="font-bold">REGISTRY_POINTS</Text></th>
              <th className="p-4"><Text variant="mono" size="micro" color="dim" weight="font-bold">STATUS</Text></th>
              <th className="p-4"><Text variant="mono" size="micro" color="dim" weight="font-bold">LAST_SYNC</Text></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.Dancer_ID} className="border-b border-line hover:bg-black/[0.02] transition-colors">
                <td className="p-4"><Text variant="mono" size="xs" color="brand" weight="font-bold">{row.Dancer_ID}</Text></td>
                <td className="p-4"><Text variant="sans" size="sm" weight="font-bold">{row.Dancer_Name}</Text></td>
                <td className="p-4">
                  <Box display="flex" align="center" gap={2}>
                    <Text variant="mono" size="sm" weight="font-bold">{row.Registry_Points_Sum.toFixed(1)}</Text>
                    <Box paddingX={2} paddingY={0.5} surface="accent" opacity={10} className="bg-accent/10">
                      <Text variant="mono" size="micro" className="text-accent-brand">PTS</Text>
                    </Box>
                  </Box>
                </td>
                <td className="p-4">
                  <Box display="inline-flex" align="center" gap={1.5} className={row.Status === 'Verified' ? 'text-green-600' : 'text-amber-500'}>
                    <Activity className="w-3 h-3" />
                    <Text variant="mono" size="micro" weight="font-bold" uppercase>{row.Status}</Text>
                  </Box>
                </td>
                <td className="p-4"><Text variant="mono" size="xs" color="dim">{row.Last_Sync}</Text></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Box border surface="accent" padding="card" className="bg-accent-brand/5 border-dashed">
        <Stack gap={4} align="center" textAlign="center">
          <Search className="w-8 h-8 text-accent-brand opacity-50" />
          <Stack gap={2}>
            <Text variant="display" size="xl">Real-time Analysis Pipeline</Text>
            <Text variant="body" size="sm" color="dim" maxWidth="md">
              The backend ETL pipeline (EEPROLedgerFeeder) is currently syncing with Scoring.Dance and EEPRO live results.
              The Registry Ledger is updated every Wednesday at 10:00 AM UTC.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
