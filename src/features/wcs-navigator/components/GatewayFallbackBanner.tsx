import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { CALIFORNIA_2026_EVENTS, WCSCaliforniaEvent } from '../data/californiaEvents';
import { AlertTriangle, Sparkles, RefreshCw, Calendar } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

export interface GatewayFallbackBannerProps {
  eventName: string;
  source: 'live_api' | 'client_heuristic';
  errorReason?: string;
  onSelectPreset: (event: WCSCaliforniaEvent) => void;
  onRetryUpload: () => void;
  onAcceptDraft?: () => void;
}

export const GatewayFallbackBanner = ({
  eventName,
  source,
  errorReason,
  onSelectPreset,
  onRetryUpload,
  onAcceptDraft,
}: GatewayFallbackBannerProps) => {
  if (source === 'live_api') return null;

  return (
    <Box
      role="region"
      aria-label="Live gateway fallback notification"
      padding={4}
      radius="xl"
      border
      className="bg-brand-amber/10 border-brand-amber/40 text-brand-amber shadow-lg backdrop-blur-md animate-fade-in"
    >
      <Stack gap={3}>
        <Box display="flex" align="start" justify="between" gap={3} flexWrap="wrap">
          <Box display="flex" align="start" gap={3}>
            <Box padding={1.5} radius="full" shrink={0} marginTop={0.5} className="bg-brand-amber/20 text-brand-amber">
              <Icon icon={AlertTriangle} size="sm" />
            </Box>
            <Stack gap={0.5}>
              <Text weight="font-bold" size="sm" className="text-brand-amber">
                Live parsing unavailable for &ldquo;{eventName}&rdquo;
              </Text>
              <Text size="xs" className="text-brand-amber/80 leading-relaxed">
                {errorReason || 'We could not reach the live cloud extraction gateway.'} The draft is synthesized from the file name or URL, not verified against your uploaded schedule. Times, sessions and event details may be wrong. Choose whether to use this unverified draft or switch to a California sample preset.
              </Text>
            </Stack>
          </Box>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRetryUpload}
            className="text-brand-amber hover:text-white border border-brand-amber/30 hover:bg-brand-amber/20 text-xs font-mono"
          >
            <Stack direction="row" align="center" gap={1.5}>
              <RefreshCw className="w-3 h-3" />
              <Text size="xs">Retry Upload</Text>
            </Stack>
          </Button>
        </Box>

        {onAcceptDraft && (
          <Button type="button" onClick={onAcceptDraft}>
            Use unverified synthesized draft
          </Button>
        )}

        {/* Explicit preset alternative */}
        <Box
          paddingTop={2}
          border="t"
          borderColor="line"
          display="flex"
          align="center"
          justify="between"
          gap={2}
          flexWrap="wrap"
          className="border-brand-amber/20"
        >
          <Stack direction="row" align="center" gap={1.5} className="text-xs font-mono text-brand-amber font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber shrink-0" />
            <Text size="xs" weight="font-semibold" className="text-brand-amber">Or switch to a 2026 California sample preset:</Text>
          </Stack>

          <Box display="flex" wrap gap={1.5} align="center">
            {CALIFORNIA_2026_EVENTS.slice(0, 4).map((evt) => (
              <Stack
                as="button"
                direction="row"
                align="center"
                gap={1.5}
                paddingX={2.5}
                paddingY={1}
                radius="lg"
                border
                key={evt.id}
                type="button"
                onClick={() => onSelectPreset(evt)}
                className="bg-brand-amber/20 hover:bg-brand-amber/30 border-brand-amber/30 text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-brand-amber shrink-0" />
                <Text size="xs">{evt.name}</Text>
              </Stack>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
