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

function ArchitecturalAssetsList({ assets }: ArchitecturalAssetsListProps) {
  return (
    <Stack gap={4}>
      <Text variant="mono" size="micro" color="main" uppercase tracking="widest">
        Core Architectural Assets
      </Text>
      <Stack as="ul" gap={3}>
        {assets.map((asset) => {
          const Icon = asset.icon || getIconForPath(asset.path);
          return (
            <Box as="li" key={asset.path} border radius="md" surface="surface" padding={4} className="group hover:border-accent/30 transition-colors">
              <Box display="flex" gap={4} align="start">
                <Box className="shrink-0" paddingTop={0.5}>
                  <Icon size={18} className="text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                </Box>
                <Stack gap={2} width="full" className="min-w-0">
                  <Box
                    display="flex"
                    align="center"
                    justify="between"
                    width="full"
                    gap={4}
                    className="min-w-0"
                  >
                    <Text
                      as="a"
                      href={`https://github.com/arii/tech-dancer/blob/main/${asset.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="mono"
                      size="xs"
                      weight="font-bold"
                      truncate
                      className="hover:text-accent transition-colors cursor-pointer min-w-0"
                      title={asset.path}
                    >
                      {asset.path}
                    </Text>
                    <Text
                      variant="mono"
                      size="micro"
                      color="body"
                      className="shrink-0 uppercase tracking-tighter whitespace-nowrap"
                    >
                      {asset.label}
                    </Text>
                  </Box>
                  {asset.description && (
                    <Text variant="body" size="xs" color="body" leading="relaxed">
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

export default ArchitecturalAssetsList;
