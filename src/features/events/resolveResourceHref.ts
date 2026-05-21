import { AffiliateLink } from '@/types';

const PRINTFUL_HOST_FRAGMENT = 'printful.me';

export interface ResolvedResourceHref {
  href: string;
  isExternal: boolean;
  isAffiliate: boolean;
}

export function resolveResourceHref(resource: Pick<AffiliateLink, 'url' | 'gearSlug'>): ResolvedResourceHref {
  if (resource.gearSlug) {
    return {
      href: `/gear/${resource.gearSlug}`,
      isExternal: false,
      isAffiliate: false,
    };
  }

  const href = resource.url;
  const isExternal = /^https?:\/\//.test(href);
  const isPrintfulMerch = isExternal && href.includes(PRINTFUL_HOST_FRAGMENT);

  return {
    href,
    isExternal,
    isAffiliate: isExternal && !isPrintfulMerch,
  };
}
