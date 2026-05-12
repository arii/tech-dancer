/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, Event } from "@/lib/content";
import { affiliateManager } from "@/lib/affiliateManager";
import { AffiliateLink } from "@/types";

export interface ResolvedGearSection {
  label: string;
  items: AffiliateLink[];
}

/**
 * Static helper to resolve affiliate IDs into full link objects.
 */
function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  return ids
    .map((id) => affiliateManager.getLink(id))
    .filter((l): l is AffiliateLink => !!l);
}

/**
 * Static helper to map gear data into resolved sections.
 */
function getGearSections(gear?: Event['gear']): ResolvedGearSection[] {
  if (!gear) return [];
  return [
    { label: "Outfits", items: resolveAffiliateLinks(gear.outfitIds) },
    { label: "Accessories", items: resolveAffiliateLinks(gear.accessoryIds) },
    {
      label: "Shoes & Essentials",
      items: resolveAffiliateLinks([...(gear.shoeIds ?? []), ...(gear.essentialIds ?? [])]),
    },
    { label: "Travel Extras", items: resolveAffiliateLinks(gear.travelIds) },
  ].filter((s) => s.items.length > 0);
}

/**
 * Unified hook for fetching and resolving event resource guide data.
 * Fetches event by slug, resolves all affiliate IDs into full objects,
 * and handles loading/error states for the detail page.
 */
export function useEventDetail() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
    error: eventError
  } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => (slug ? getEventBySlug(slug) : undefined),
    enabled: !!slug,
  });

  const {
    data: allEvents = [],
    isLoading: areEventsLoading,
    isError: areEventsError
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Memoize event-specific resources independently from list resolution
  const resources = useMemo(() => ({
    themeOutfits: resolveAffiliateLinks(event?.theme?.outfitIds),
    themeAccessories: resolveAffiliateLinks(event?.theme?.accessoryIds),
    gearSections: getGearSections(event?.gear),
  }), [event]);

  // Memoize related events independently to prevent reconstruction on resource-only changes
  const relatedEvents = useMemo(() =>
    (event?.relatedEvents ?? [])
      .map((s) => allEvents.find((e) => e.slug === s))
      .filter((e): e is Event => !!e),
  [event?.relatedEvents, allEvents]);

  return {
    event,
    ...resources,
    relatedEvents,
    isLoading: isEventLoading || areEventsLoading,
    isError: isEventError || areEventsError,
    error: eventError,
  };
}
