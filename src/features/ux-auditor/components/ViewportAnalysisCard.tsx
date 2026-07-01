import { Box, Stack, Text } from '@/layouts/Primitives';
import { Icon } from '@/components/ui/Icon';
import { Smartphone, Monitor, Tablet, Image as ImageIcon } from 'lucide-react';
import { ViewportAnalysis } from '@/features/ux-auditor/useUXAuditor';
import { cardVariants } from '@/lib/variants';
import { Skeleton } from '@/components/ui/Skeleton';
import ViewportFrame from './ViewportFrame';
import CopyPromptButton from './CopyPromptButton';

const viewportIcons = {
  Mobile: <Icon icon={Smartphone} size="md" />,
  Tablet: <Icon icon={Tablet} size="md" />,
  Desktop: <Icon icon={Monitor} size="md" />
};

interface ViewportAnalysisCardProps {
  vp: { name: string; width: number; height: number };
  data: ViewportAnalysis;
  activeReportUrl?: string;
}

const ViewportAnalysisCard = ({ vp, data, activeReportUrl }: ViewportAnalysisCardProps) => {
  return (
    <Box className={cardVariants({ overflow: "hidden" })} minWidth={0}>
      <Stack padding={4} border="b" direction="row" align="center" justify="between" surface="muted">
        <Stack direction="row" align="center" gap={3}>
          <Box width={9} height={9} surface="default" radius="md" shadow="sm" color="accent" display="flex" align="center" justify="center" shrink={0}>
            {viewportIcons[vp.name as keyof typeof viewportIcons]}
          </Box>
          <Text variant="sans" size="base" weight="font-bold">
            {vp.name} Analysis
          </Text>
        </Stack>
        <Text variant="mono" size="xs" weight="font-bold" color="dim" uppercase tracking="widest">
          {vp.width}w × {vp.height}h
        </Text>
      </Stack>

      <Stack direction={{ base: 'col', md: 'row' }} width="full">
        <Box padding={8} surface="muted" display="flex" align="center" justify="center" border={{ base: 'b', md: 'r' }} minHeight={400} width={{ base: 'full', md: '41.666%' }}>
          {activeReportUrl ? (
            <ViewportFrame
              key={`${vp.name}-${activeReportUrl}`}
              url={activeReportUrl}
              width={vp.width}
              height={vp.height}
            />
          ) : (
            <Stack align="center" justify="center" color="dim" className="text-center">
              <Box marginBottom={2}>
                <Icon icon={ImageIcon} size="2xl" color="muted" />
              </Box>
              <Text variant="sans" size="xs" weight="font-bold" uppercase tracking="wider">
                Awaiting Frame...
              </Text>
            </Stack>
          )}
        </Box>

        <Stack gap={6} padding={8} flex={1} minWidth="0" overflow="hidden">
          {data ? (
            <>
              <Box surface="alt" padding={5} className="border border-line rounded-lg">
                <Box marginBottom={3}>
                  <Text variant="sans" size="xs" weight="font-black" color="accent" uppercase display="block" tracking="widest">
                    Analysis Summary
                  </Text>
                </Box>
                <Text variant="sans" size="sm" weight="font-medium" className="leading-relaxed break-words block">
                  "{data.summary}"
                </Text>
              </Box>
              <Stack gap={4}>
                {data.improvements?.map((imp, idx) => (
                  <Box key={idx} padding={4} className={cardVariants({ interactive: true })}>
                    <Box display="flex" justify="between" align="start" marginBottom={2}>
                      <Stack direction="row" align="center" gap={2}>
                        <Box width={2} height={2} radius="full" className={imp.severity > 7 ? 'bg-error shadow-sm' : 'bg-accent-purple shadow-sm'} />
                        <Text variant="sans" size="sm" weight="font-black">
                          {imp.element}
                        </Text>
                      </Stack>
                      <Text variant="mono" size="xs" weight="font-black" paddingX={2} paddingY={0.5} radius="full" surface="muted" color="dim" uppercase title={`Severity level: ${imp.severity} out of 10 (1-10 scale)`}>
                        SEV {imp.severity}
                      </Text>
                    </Box>
                    <Text variant="sans" size="xs" color="dim" marginBottom={3}>
                      {imp.issue}
                    </Text>
                    {imp.suggestion && imp.suggestion.trim() !== '' && (
                      <Box surface="muted" padding={3} radius="md" border={true}>
                        <Stack direction={{ base: 'col', sm: 'row' }} align="start" gap={2} minWidth={0}>
                          <Text variant="sans" size="xs" weight="font-black" color="accent" marginTop={0.5} uppercase tracking="widest" className="shrink-0">FIX</Text>
                          <Box flex={1} minWidth="0" className="overflow-hidden">
                            <Text variant="sans" size="xs" weight="font-bold" className="break-all line-clamp-3" title={imp.suggestion}>
                              {imp.suggestion}
                            </Text>
                            {imp.element === "Manual Audit Required" && (
                              <CopyPromptButton suggestion={imp.suggestion} />
                            )}
                          </Box>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </>
          ) : (
            <Stack gap={4} width="full">
              <Skeleton height={20} width="full" />
              <Stack gap={2}>
                <Skeleton height={4} width="full" />
                <Skeleton height={4} width="full" />
                <Skeleton height={4} width="3/4" />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ViewportAnalysisCard;
