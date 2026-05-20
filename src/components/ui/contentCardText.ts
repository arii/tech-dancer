import { ROUTE_PATHS } from '@/config/routePaths';

export function getContentCardCtaText(basePath: string): string {
  return basePath.includes(ROUTE_PATHS.gear) ? 'Read review' : 'Read article';
}
