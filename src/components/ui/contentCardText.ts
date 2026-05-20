const GEAR_ROUTE_SEGMENT = '/gear';

export function getContentCardCtaText(basePath: string): string {
  return basePath.includes(GEAR_ROUTE_SEGMENT) ? 'Read review' : 'Read article';
}
