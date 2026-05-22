with open('src/features/events/useEventDetail.ts', 'r') as f:
    content = f.read()

new_content = content.replace(
"""import { getEventBySlug, getEvents, Event } from "@/lib/content";""",
"""import { getEventBySlug, getEvents, getResources, Event } from "@/lib/content";"""
)

new_content = new_content.replace(
"""export function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  return ids
    .map((id) => affiliateManager.getLink(id))
    .filter((l): l is AffiliateLink => !!l);
}""",
"""export function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  const resources = getResources();
  return ids
    .map((id) => {
      const link = affiliateManager.getLink(id);
      if (!link) return null;

      const matchedResource = resources.find(r => r.affiliateIds?.includes(id));
      if (matchedResource) {
        return {
          ...link,
          resourceSlug: matchedResource.slug,
          resourceTitle: matchedResource.title,
          resourceExcerpt: matchedResource.excerpt,
          resourceRating: matchedResource.rating,
          resourceImage: matchedResource.image,
        };
      }
      return link;
    })
    .filter((l): l is AffiliateLink => !!l);
}"""
)

with open('src/features/events/useEventDetail.ts', 'w') as f:
    f.write(new_content)
