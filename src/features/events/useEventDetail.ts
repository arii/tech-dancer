import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, getResources, Event } from "@/lib/content";
import { affiliateManager } from "@/lib/affiliateManager";
import { AffiliateLink } from "@/types";
import { Resource } from "@/lib/types/content";

export interface ResolvedGearSection {
  label: string;
  items: (AffiliateLink & { slug: string; image?: string })[];
}

/**
 * Resolves a list of affiliate IDs into full link objects.
 * Extracted as a static helper to maintain purity and allow reuse.
 */
export function resolveAffiliateLinks(
  ids: string[] = [],
  resourceByAffiliateId: Map<string, Resource> = new Map(),
): (AffiliateLink & { slug: string; image?: string })[] {
  return ids
    .map((id) => {
      const link = affiliateManager.getLink(id);
      if (!link) return undefined;

      const linkedResource = resourceByAffiliateId.get(id);
      return {
        ...link,
        slug: linkedResource?.slug ?? id,
        image: linkedResource?.image,
      };
    })
    .filter((l): l is AffiliateLink & { slug: string; image?: string } => !!l);
}

/**
 * Organizes an event's gear IDs into resolved semantic sections.
 */
export function getGearSections(
  gear?: Event["gear"],
  resourceByAffiliateId: Map<string, Resource> = new Map(),
): ResolvedGearSection[] {
  if (!gear) return [];

  return [
    { label: "Outfits", items: resolveAffiliateLinks(gear.outfitIds, resourceByAffiliateId) },
    { label: "Accessories", items: resolveAffiliateLinks(gear.accessoryIds, resourceByAffiliateId) },
    {
      label: "Shoes & Essentials",
      items: resolveAffiliateLinks([
        ...(gear.shoeIds ?? []),
        ...(gear.essentialIds ?? []),
      ], resourceByAffiliateId),
    },
    { label: "Travel Extras", items: resolveAffiliateLinks(gear.travelIds, resourceByAffiliateId) },
  ].filter((s) => s.items.length > 0);
}

export function useEventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", slug],
    queryFn: () => (slug ? getEventBySlug(slug) : undefined),
    enabled: !!slug,
    initialData: () => (slug ? getEventBySlug(slug) : undefined),
  });

  const { data: allEvents = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: getEvents,
    staleTime: 3600000, // 1 hour
  });

  const { data: resources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    initialData: getResources,
    staleTime: 3600000, // 1 hour
  });

  const resourceByAffiliateId = useMemo(() => {
    const map = new Map<string, Resource>();
    resources.forEach((resource) => {
      resource.affiliateIds?.forEach((affiliateId) => {
        map.set(affiliateId, resource);
      });
    });
    return map;
  }, [resources]);

  // Consolidate event-specific derived state into a single memoization block
  // to reduce dependency chains and potential extra re-renders.
  const { themeOutfits, themeAccessories, gearSections } = useMemo(
    () => ({
      themeOutfits: resolveAffiliateLinks(event?.theme?.outfitIds),
      themeAccessories: resolveAffiliateLinks(event?.theme?.accessoryIds),
      gearSections: getGearSections(event?.gear, resourceByAffiliateId),
    }),
    [event?.theme?.outfitIds, event?.theme?.accessoryIds, event?.gear, resourceByAffiliateId],
  );

  // Resolve related events
  // Dependent on both the current event and the full list
  const relatedEvents = useMemo(
    (): Event[] =>
      (event?.relatedEvents ?? [])
        .map((slug) => allEvents.find((e) => e.slug === slug))
        .filter((e): e is Event => !!e),
    [event?.relatedEvents, allEvents],
  );

  return {
    event,
    isLoading,
    isError,
    error,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  };
}
