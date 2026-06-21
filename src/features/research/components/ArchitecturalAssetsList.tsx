import { Box, Text, Stack } from '@/layouts/Primitives';
import { FileCode, Terminal, LucideIcon } from 'lucide-react';

export interface ArchitecturalAsset {
  path: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface ArchitecturalAssetsListProps {
  assets: ArchitecturalAsset[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  'py': FileCode,
  'sh': Terminal,
  'mjs': FileCode,
  'json': FileCode,
  'default': FileCode
};

function getIconForPath(path: string): LucideIcon {
    const ext = path.split('.').pop() || '';
    return ICON_MAP[ext] || ICON_MAP.default;
}

export function ArchitecturalAssetsList({ assets }: ArchitecturalAssetsListProps) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="micro" color="dim" uppercase tracking="widest" opacityVariant="muted">
        Core Architectural Assets
      </Text>
      <Stack gap={2}>
        {assets.map((asset) => {
          const Icon = asset.icon || getIconForPath(asset.path);
          return (
            <Box key={asset.path} border radius="md" surface="surface" padding={3} className="group hover:border-accent/30 transition-colors">
              <Box display="flex" gap={3} align="start">
                <Box paddingTop={0.5} className="shrink-0">
                  <Icon size={16} className="text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                </Box>
                <Stack gap={1} width="full" className="min-w-0">
                  <Box display="flex" align="center" justify="between" gap={3} className="min-w-0">
                    <Text
                      as="a"
                      href={`https://github.com/arii/tech-dancer/blob/main/${asset.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="mono"
                      size="xs"
                      weight="font-bold"
                      truncate
                      className="hover:text-accent transition-colors cursor-pointer"
                      title={asset.path}
                    >
                      {asset.path}
                    </Text>
                    <Text variant="mono" size="micro" color="dim" opacityVariant="dim" className="shrink-0 uppercase tracking-tighter whitespace-nowrap">
                      {asset.label}
                    </Text>
                  </Box>
                  {asset.description && (
                    <Text variant="body" size="xs" color="dim" leading="relaxed">
                      {asset.description}
                    </Text>
                  )}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
