import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { LucideIcon, Star, DollarSign, Shield, ExternalLink } from 'lucide-react';

interface ScoreItemProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  intent?: "brand" | "accent" | "success" | "warning" | "danger";
}

export function ScoreItem({ label, value, icon: Icon, color, intent }: ScoreItemProps) {
  return (
    <Stack gap={1} align="center" className="flex-1 px-4 py-2">
      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
      <Box display="flex" align="center" gap={1} intent={intent} className={color || ''}>
        {Icon && <Icon className="w-4 h-4" />}
        <Text variant="displayLower" size="xl" weight="font-bold">{value}</Text>
      </Box>
    </Stack>
  );
}

export function ScoreGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      border="y"
      paddingY={6}
      surface="muted"
      className="border-line/50 w-full"
    >
      <Box
        display="flex"
        flexDirection="row"
        className="w-full divide-x divide-line/30"
      >
        {children}
      </Box>
    </Box>
  );
}

export function SpecsTable({ specs }: { specs?: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Stack gap={4}>
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase tracking="widest" className=" border-b border-line pb-2">Technical Specs</Text>
      <Stack gap={3}>
        {Object.entries(specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="tiny" color="dim" uppercase className=" opacity-50">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export function TOC({ headings }: { headings: string[] }) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase tracking="widest" className=" border-b border-line pb-2">In this post</Text>
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
             <Text variant="displayLower" size="2xl" weight="font-black" intent="success" uppercase>THE VERDICT</Text>
          </Box>
          <Text variant="body" size="lg" intent="success" italic className="leading-relaxed font-medium">
            "{verdict}"
          </Text>
       </Stack>
    </Box>
  );
}
