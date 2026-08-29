import { FC } from 'react';
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
}

export const GatewayFallbackBanner: FC<GatewayFallbackBannerProps> = ({
  eventName,
  source,
  errorReason,
  onSelectPreset,
  onRetryUpload,
}) => {
  if (source === 'live_api') return null;

  return (
    <Box
      role="region"
      aria-label="Live gateway fallback notification"
      padding={4}
      radius="xl"
      border
      className="bg-surface/30 border-amber-500/40 text-amber-500 shadow-lg backdrop-blur-md animate-fade-in"
    >
      <Stack gap={3}>
        <Box display="flex" align="start" justify="between" gap={3} flexWrap="wrap">
          <Box display="flex" align="start" gap={3}>
            <Box padding={1.5} radius="full" shrink={0} className="bg-amber-500/20 text-amber-500">
              <Icon icon={AlertTriangle} size="sm" />
            </Box>
            <Stack gap={0.5}>
              <Text weight="font-bold" size="sm" className="text-amber-500">
                Live AI Parsing Offline • Using Baseline AI Extractor for &ldquo;{eventName}&rdquo;
              </Text>
              <Text size="xs" color="dim" leading="relaxed">
                {errorReason || 'We could not reach the live cloud extraction gateway.'} We synthesized a baseline schedule draft tailored to your uploaded file. You can continue with this draft, or switch to one of our fully-verified 2026 convention schedules.
              </Text>
            </Stack>
          </Box>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRetryUpload}
            className="text-amber-500 hover:text-white border border-amber-500/30 hover:bg-surface-alt text-xs font-mono"
          >
            <Stack direction="row" align="center" gap={1.5}>
              <RefreshCw className="w-3 h-3" />
              <span>Retry Upload</span>
            </Stack>
          </Button>
        </Box>

        {/* 1-Click Verified Presets Alternative */}
        <Box
          paddingTop={2}
          border="t"
          borderColor="line"
          display="flex"
          align="center"
          justify="between"
          gap={2}
          flexWrap="wrap"
          className="border-amber-500/20"
        >
          <Stack direction="row" align="center" gap={1.5} className="text-xs font-mono text-amber-500 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Or try a verified 2026 schedule:</span>
          </Stack>

          <Box display="flex" wrap gap={1.5} align="center">
            {CALIFORNIA_2026_EVENTS.slice(0, 4).map((evt) => (
              <Box
                key={evt.id}
                as="button"
                type="button"
                onClick={() => onSelectPreset(evt)}
                paddingX={2.5}
                paddingY={1}
                radius="lg"
                border
                className="border-amber-500/30 bg-surface/40 hover:bg-surface-alt text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <Stack direction="row" align="center" gap={1.5}>
                  <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{evt.name}</span>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default GatewayFallbackBanner;
