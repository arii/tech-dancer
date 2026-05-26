/**
 * Content type detector for resources.
 * Classifies resources into affiliate, merch, or event types.
 */

export type ContentType = 'affiliate' | 'merch' | 'event';

export interface ResourceWithType {
  affiliateIds?: string[];
  shopUrl?: string;
}

/**
 * Detect the content type of a resource.
 * 
 * Priority: shopUrl → merch, affiliateIds → affiliate, else → event
 */
export function detectContentType(resource: ResourceWithType | null | undefined): ContentType {
  if (!resource) return 'event';

  // Printful merch has shopUrl (Etsy, Printful, etc.)
  if (resource.shopUrl) {
    return 'merch';
  }

  // Amazon affiliate items have affiliateIds
  if (resource.affiliateIds && resource.affiliateIds.length > 0) {
    return 'affiliate';
  }

  // Default to event resource
  return 'event';
}

/**
 * Get the appropriate CTA label for a content type.
 */
export function getCtaLabel(type: ContentType, isExternal: boolean = false): string {
  switch (type) {
    case 'affiliate':
      return isExternal ? 'View on Amazon' : 'Read review';
    case 'merch':
      return 'Shop merch';
    case 'event':
      return 'See picks';
    default:
      return 'View';
  }
}

/**
 * Get the appropriate source badge text for a content type.
 */
export function getSourceBadge(type: ContentType): string {
  switch (type) {
    case 'affiliate':
      return 'Amazon affiliate pick';
    case 'merch':
      return 'BoomTick Printful merch';
    case 'event':
      return 'Event resource';
    default:
      return '';
  }
}

/**
 * Check if a resource is an external affiliate link.
 */
export function isAffiliateExternal(resource: ResourceWithType): boolean {
  return detectContentType(resource) === 'affiliate' && !!resource.affiliateIds;
}

/**
 * Check if a resource is merch (Printful).
 */
export function isMerch(resource: ResourceWithType): boolean {
  return detectContentType(resource) === 'merch';
}
