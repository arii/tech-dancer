import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { LucideIcon, Star, DollarSign, Shield, ExternalLink } from 'lucide-react';

interface ScoreItemProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
}

export function ScoreItem({ label, value, icon: Icon, color }: ScoreItemProps) {
  return (
    <Stack gap={1} align="center" className="sm:border-r border-line/30 last:border-0">
      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
      <Box display="flex" align="center" gap={1} className={color}>
        {Icon && <Icon className="w-4 h-4" />}
        <Text variant="display" size="xl" weight="font-bold">{value}</Text>
      </Box>
    </Stack>
  );
}

export function ScoreGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box border="y" paddingY={8} surface="muted" emphasis="low" className="border-line/50">
      <Grid cols={{ base: 1, sm: 2, md: 5 }} gap={8}>
        {children}
      </Grid>
    </Box>
  );
}

export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
      <Stack gap={3}>
        {specs ? Object.entries(specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="tiny" color="dim" className="uppercase opacity-50">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
        )) : (
          <Text variant="mono" size="xs" color="dim">No specs provided.</Text>
        )}
      </Stack>
    </Stack>
  );
}

export function TOC({ headings }: { headings: string[] }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">In this post</Text>
      <Stack gap={2}>
        {headings.map((h, i) => (
          <Text key={i} variant="mono" size="tiny" className="cursor-pointer hover:text-accent transition-colors">
            <span className="opacity-30 mr-2">0{i+1}</span> {h}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
}

export function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <Box border padding={8} surface="success" marginBottom={12}>
       <Stack gap={3}>
          <Box display="flex" align="center" gap={3}>
             <Shield className="w-6 h-6 text-emerald-600" />
             <Text variant="display" size="2xl" weight="font-black" intent="success" uppercase={true}>THE VERDICT</Text>
          </Box>
          <Text variant="body" size="lg" intent="success" italic className="leading-relaxed font-medium">
            "{verdict}"
          </Text>
       </Stack>
    </Box>
  );
}
