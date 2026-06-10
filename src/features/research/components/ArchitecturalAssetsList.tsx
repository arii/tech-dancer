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
            <Box key={asset.path} border radius="md" surface="surface" padding={3}>
              <Box display="flex" gap={3}>
                <Box className="shrink-0" paddingTop={0.5}>
                  <Icon size={16} className="text-accent" />
                </Box>
                <Stack gap={2} width="full">
                  <Box display="flex" align="center" justify="between" width="full">
                    <Text variant="mono" size="xs">{asset.path}</Text>
                    <Text variant="mono" size="micro" color="dim" opacityVariant="dim">{asset.label}</Text>
                  </Box>
                  {asset.description && (
                    <Text variant="body" size="micro" color="dim">
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
