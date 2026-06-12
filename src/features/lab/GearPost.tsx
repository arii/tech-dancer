import { getResourceBySlug, Resource } from '@/lib/content';
import { BASE_URL } from '@/config/constants';
import { GearPostDetail } from './components/GearPostDetail';
import type { SchemaProduct } from '@/utils/schema';
import { AMAZON_AFFILIATE_DISCLOSURE } from '@/utils/schema';
import { ArticleRouteShell } from '@/components/layout/ArticleRouteShell';

export default function GearPost() {
  return (
    <ArticleRouteShell<Resource>
      queryKey="resources"
      queryFn={getResourceBySlug}
      notFoundTitle="Review Not Found"
      notFoundLabel="Back to Toolbox"
      backPath="/gear"
      getSEO={(resource) => {
        const isMerch = !!resource.shopUrl;
        const isAmazon = resource.affiliateProvider === 'amazon' || (resource.affiliateIds && resource.affiliateIds.length > 0);

        const schema: SchemaProduct = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": resource.title,
          "description": isAmazon
            ? `${resource.excerpt} ${AMAZON_AFFILIATE_DISCLOSURE}`
            : resource.excerpt,
          "image": resource.image
            ? (resource.image.startsWith('http') ? resource.image : `${BASE_URL}${resource.image}`)
            : `${BASE_URL}/assets/comp_analysis_hero.webp`,
          "brand": {
            "@type": "Brand",
            "name": "BoomTick"
          },
          "sku": resource.internalSku || resource.slug,
          "offers": {
            "@type": "Offer",
            "url": resource.shopUrl || `${BASE_URL}/gear/${resource.slug}`,
            ...(isMerch ? {
              "availability": "https://schema.org/InStock",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "description": "Made to order. Production and shipping times vary by product and destination. Final delivery estimates are shown at checkout.",
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "US"
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "US",
                "returnPolicyCategory": "https://schema.org/UnsupportedReturnPolicy",
                "description": "Each item is made to order. We cannot accept returns or exchanges for size, color, or change of mind. If your item arrives misprinted, damaged, defective, or incorrect, contact us promptly so we can help resolve it."
              }
            } : {})
          }
        };

        return {
          title: resource.seoTitle || resource.title,
          description: resource.seoDescription || resource.excerpt,
          type: "article",
          image: resource.image,
          schema: schema
        };
      }}
      renderDetail={(resource, onBack) => (
        <GearPostDetail
          post={resource}
          onBack={onBack}
          backLabel="Back to Toolbox"
        />
      )}
    />
  );
}
