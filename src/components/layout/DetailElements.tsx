import { ReactNode } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Star, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VerdictCallout({
  score,
  verdict,
  pros = [],
  cons = []
}: {
  score: number;
  verdict: string;
  pros?: string[];
  cons?: string[];
}) {
  return (
    <Box padding={8} border radius="3xl" surface="surface" className="border-line/80 shadow-xl relative overflow-hidden">
      <Box position="absolute" top={-10} right={-10} width={40} height={40} surface="primary" opacity={0.03} radius="full" className="blur-3xl" />
      
      <Stack gap={8}>
        <Box display="flex" align="center" justify="between" width="full">
          <Stack gap={1}>
             <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">The Verdict</Text>
             <Text size="3xl" weight="font-black" className="text-white">Score: {score}/10</Text>
          </Stack>
          <Box height={16} width={16} radius="full" display="flex" align="center" justify="center" border className="border-primary/30 bg-primary/5">
             <Star className="text-primary fill-primary w-8 h-8" />
          </Box>
        </Box>

        <Text className="text-lg leading-relaxed text-text-body/90 italic">
          "{verdict}"
        </Text>

        <Grid cols={{ base: 1, md: 2 }} gap={6}>
          <Stack gap={4}>
            <Box display="flex" align="center" gap={2}>
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <Text weight="font-bold" size="sm" className="text-white uppercase tracking-wider">Pros</Text>
            </Box>
            <Stack gap={2}>
              {(pros || []).map((pro, i) => (
                <Text key={i} size="sm" className="text-text-body/80 flex gap-2">
                  <span className="text-green-400/60">•</span> {pro}
                </Text>
              ))}
            </Stack>
          </Stack>

          <Stack gap={4}>
            <Box display="flex" align="center" gap={2}>
              <AlertCircle className="w-5 h-5 text-red-400" />
              <Text weight="font-bold" size="sm" className="text-white uppercase tracking-wider">Cons</Text>
            </Box>
            <Stack gap={2}>
              {(cons || []).map((con, i) => (
                <Text key={i} size="sm" className="text-text-body/80 flex gap-2">
                  <span className="text-red-400/60">•</span> {con}
                </Text>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
}

export function GearSpecGrid({ specs }: { specs: Record<string, string> }) {
  return (
    <Box padding={6} border radius="2xl" className="border-line/40 bg-surface/40">
      <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest" className="mb-6">Technical Specs</Text>
      <Grid cols={{ base: 1, sm: 2 }} gap={4}>
        {Object.entries(specs).map(([label, value]) => (
          <Box key={label} padding={4} border radius="xl" className="border-line/30 bg-surface/60">
            <Text size="micro" weight="font-bold" color="dim" uppercase tracking="tighter" className="mb-1">{label}</Text>
            <Text size="sm" weight="font-semibold" className="text-white">{value}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export const SpecsTable = GearSpecGrid;

export function ScoreGrid({ children }: { children: ReactNode }) {
  return (
    <Grid cols={{ base: 1, md: 2 }} gap={4}>
      {children}
    </Grid>
  );
}

export function ScoreItem({ label, score }: { label: string; score: number }) {
  return (
    <Box padding={4} border radius="xl" className="border-line/30 bg-surface/60">
      <Box display="flex" justify="between" align="center">
        <Text size="sm" weight="font-bold" className="text-white">{label}</Text>
        <Text variant="mono" size="sm" weight="font-black" className="text-primary">{score}/10</Text>
      </Box>
      <Box width="full" height={1.5} radius="full" className="bg-white/5 mt-2 overflow-hidden">
        <Box width={`${score * 10}%`} height="full" className="bg-primary" />
      </Box>
    </Box>
  );
}
