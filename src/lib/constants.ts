export const CONTENT_METADATA_KEYS = [
  'type', 'slug', 'title', 'date', 'author', 'authorAvatar', 'category', 'excerpt',
  'content', 'image', 'tags', 'affiliateIds', 'rating', 'verdict', 'priceCategory',
  'updatedDate', 'durability', 'value', 'specs', 'location', 'city', 'schedule',
  'description', 'link', 'url', 'heroImage', 'whyAttending',
  'basePath', 'readingTime', 'status', 'readTime',
  // Additional post and resource keys to prevent DOM property pollution
  'draft', 'imageAlt', 'updated', 'imageBack', 'seoTitle', 'seoDescription',
  'shopUrl', 'internalSku', 'printfulProductId', 'printfulVariantIds',
  'displayMode', 'featuredSide', 'productType', 'fulfillmentType', 'provider',
  'shippingPolicySummary', 'returnPolicySummary', 'affiliateProvider',
  'affiliateDisclosure', 'priceDisplayPolicy', 'availabilityDisplayPolicy',
  'region', 'bestFor', 'imageFit'
] as const;
