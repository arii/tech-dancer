import { useMemo } from 'react';
import { DEVAI_ASSETS } from '../../config/devai-assets';

export function useResearchToolAssets(toolIds: string[]) {
  return useMemo(() => {
    return DEVAI_ASSETS.filter(asset => toolIds.includes(asset.toolId));
  }, [toolIds]);
}
