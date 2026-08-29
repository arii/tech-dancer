import React from 'react';
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

export const GatewayFallbackBanner: React.FC<GatewayFallbackBannerProps> = ({
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
      className="bg-amber-950/30 border-amber-500/40 text-amber-200 shadow-lg backdrop-blur-md animate-fade-in"
    >
      <Stack gap={3}>
        <Box display="flex" align="start" justify="between" gap={3} flexWrap="wrap">
          <Box display="flex" align="start" gap={3}>
            <Box padding={1.5} radius="full" className="bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
              <Icon icon={AlertTriangle} size="sm" />
            </Box>
            <Stack gap={0.5}>
              <Text weight="font-bold" size="sm" className="text-amber-300">
                Live AI Parsing Offline • Using Baseline AI Extractor for &ldquo;{eventName}&rdquo;
              </Text>
              <Text size="xs" className="text-amber-200/80 leading-relaxed">
                {errorReason || 'We could not reach the live cloud extraction gateway.'} We synthesized a baseline schedule draft tailored to your uploaded file. You can continue with this draft, or switch to one of our fully-verified 2026 convention schedules.
              </Text>
            </Stack>
          </Box>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRetryUpload}
            className="text-amber-300 hover:text-white border border-amber-500/30 hover:bg-amber-900/40 text-xs font-mono"
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
          <Stack direction="row" align="center" gap={1.5} className="text-xs font-mono text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Or try a verified 2026 schedule:</span>
          </Stack>

          <Box display="flex" wrap gap={1.5} align="center">
            {CALIFORNIA_2026_EVENTS.slice(0, 4).map((evt) => (
              <button
                key={evt.id}
                type="button"
                onClick={() => onSelectPreset(evt)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 border border-amber-500/30 text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{evt.name}</span>
              </button>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default GatewayFallbackBanner;
