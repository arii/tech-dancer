import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, Event } from "@/lib/content";
import { affiliateManager } from "@/lib/affiliateManager";
import { AffiliateLink } from "@/types";

export interface ResolvedGearSection {
  label: string;
  items: AffiliateLink[];
}

/**
 * Resolves a list of affiliate IDs into full link objects.
 * Extracted as a static helper to maintain purity and allow reuse.
 */
export function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  return ids
    .map((id) => affiliateManager.getLink(id))
    .filter((l): l is AffiliateLink => !!l);
}

/**
 * Organizes an event's gear IDs into resolved semantic sections.
 */
export function getGearSections(gear?: Event["gear"]): ResolvedGearSection[] {
  if (!gear) return [];

  return [
    { label: "Outfits", items: resolveAffiliateLinks(gear.outfitIds) },
    { label: "Accessories", items: resolveAffiliateLinks(gear.accessoryIds) },
    {
      label: "Shoes & Essentials",
      items: resolveAffiliateLinks([
        ...(gear.shoeIds ?? []),
        ...(gear.essentialIds ?? []),
      ]),
    },
    { label: "Travel Extras", items: resolveAffiliateLinks(gear.travelIds) },
  ].filter((s) => s.items.length > 0);
}

export function useEventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ["events", slug],
    queryFn: () => (slug ? getEventBySlug(slug) : undefined),
    enabled: !!slug,
  });

  const { data: allEvents = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 3600000, // 1 hour
  });

  // Resolve theme gear from affiliate IDs
  // Split from other resolutions to minimize re-computations
  const themeOutfits = useMemo(
    () => resolveAffiliateLinks(event?.theme?.outfitIds),
    [event?.theme?.outfitIds],
  );

  const themeAccessories = useMemo(
    () => resolveAffiliateLinks(event?.theme?.accessoryIds),
    [event?.theme?.accessoryIds],
  );

  // Resolve gear sections separately from related events
  // Prevents unnecessary object reconstruction if only one subset changes
  const gearSections = useMemo(
    () => getGearSections(event?.gear),
    [event?.gear],
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
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    navigate,
  };
}
