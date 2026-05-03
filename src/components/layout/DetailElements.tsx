import { ReactNode } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { LucideIcon, Shield } from 'lucide-react';

interface ScoreItemProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  intent?: "brand" | "accent" | "success" | "warning" | "danger";
}

export function ScoreItem({ label, value, icon: Icon, color, intent }: ScoreItemProps) {
  return (
    <Stack gap={1} align="center" className="flex-1 px-2 md:px-4 py-2 min-w-[100px] sm:min-w-[120px]">
      <Text variant="mono" size="tiny" color="dim" uppercase>{label}</Text>
      <Box display="flex" align="center" gap={1} intent={intent} className={color || ''}>
        {Icon && <Icon className="w-4 h-4" />}
        <Text variant="display" size="xl" weight="font-bold">{value}</Text>
      </Box>
    </Stack>
  );
}

export function ScoreGrid({ children }: { children: ReactNode }) {
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
        flexWrap="wrap"
        justify="center"
        className="w-full divide-x-0 md:divide-x divide-line/30 gap-y-4 md:gap-y-0"
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
      <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line pb-2">Technical Specs</Text>
      <Stack gap={3}>
        {Object.entries(specs).map(([key, value]) => (
          <Stack key={key} gap={1}>
            <Text variant="mono" size="tiny" color="dim" className="uppercase opacity-50">{key}</Text>
            <Text variant="mono" size="xs" weight="font-bold">{value}</Text>
          </Stack>
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
             <Text variant="display" size="2xl" weight="font-black" intent="success">THE VERDICT</Text>
          </Box>
          <Text variant="body" size="lg" intent="success" italic className="leading-relaxed font-medium">
            "{verdict}"
          </Text>
       </Stack>
    </Box>
  );
}
