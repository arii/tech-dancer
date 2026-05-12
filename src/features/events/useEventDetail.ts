/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * Unified hook for fetching and resolving event resource guide data.
 * Fetches event by slug, resolves all affiliate IDs into full objects,
 * and handles loading/error states for the detail page.
 */
export function useEventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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
  });

  // Resolve theme gear from affiliate IDs
  const themeOutfits = useMemo(
    () =>
      (event?.theme?.outfitIds ?? [])
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l),
    [event],
  );

  const themeAccessories = useMemo(
    () =>
      (event?.theme?.accessoryIds ?? [])
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l),
    [event],
  );

  // Resolve gear sections
  const gearSections = useMemo((): ResolvedGearSection[] => {
    if (!event?.gear) return [];
    const g = event.gear;

    const resolve = (ids: string[] = []) =>
      ids
        .map((id) => affiliateManager.getLink(id))
        .filter((l): l is AffiliateLink => !!l);

    return [
      { label: "Outfits", items: resolve(g.outfitIds) },
      { label: "Accessories", items: resolve(g.accessoryIds) },
      {
        label: "Shoes & Essentials",
        items: resolve([...(g.shoeIds ?? []), ...(g.essentialIds ?? [])]),
      },
      { label: "Travel Extras", items: resolve(g.travelIds) },
    ].filter((s) => s.items.length > 0);
  }, [event]);

  // Resolve related events
  const relatedEvents = useMemo(
    (): Event[] =>
      (event?.relatedEvents ?? [])
        .map((slug) => allEvents.find((e) => e.slug === slug))
        .filter((e): e is Event => !!e),
    [event, allEvents],
  );

  return {
    event,
    themeOutfits,
    themeAccessories,
    gearSections,
    relatedEvents,
    isLoading: isEventLoading || areEventsLoading,
    isError: isEventError || areEventsError,
    error: eventError,
    navigate,
  };
}
