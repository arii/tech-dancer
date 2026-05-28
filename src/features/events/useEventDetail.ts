import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, Event } from "@/lib/content";
import { affiliateManager } from "@/lib/affiliateManager";
import { AffiliateLink } from "@/types";

const MAX_THEME_OUTFITS = 6;
const MAX_THEME_ACCESSORIES = 3;
const MAX_TOTAL_PRODUCTS = 15;

export interface ResolvedGearSection {
  label: string;
  description?: string;
  items: AffiliateLink[];
}

/**
 * Resolves a list of affiliate IDs into full link objects.
 * Extracted as a static helper to maintain purity and allow reuse.
 */
export function resolveAffiliateLinks(ids: string[] = []): AffiliateLink[] {
  return ids
    .map((id) => affiliateManager.getLink(id))
    .filter((l): l is AffiliateLink => !!l && !l.draft);
}

/**
 * Organizes an event's gear IDs into resolved semantic sections.
 */
export function getGearSections(gear?: Event["gear"]): ResolvedGearSection[] {
  if (!gear) return [];

  return [
    {
      label: "Outfits",
      description: gear.outfitDescription,
      items: resolveAffiliateLinks(gear.outfitIds),
    },
    {
      label: "Accessories",
      description: gear.accessoryDescription,
      items: resolveAffiliateLinks(gear.accessoryIds),
    },
    {
      label: "Shoes & Essentials",
      description: [gear.shoeDescription, gear.essentialDescription]
        .filter(Boolean)
        .join(" "),
      items: resolveAffiliateLinks([
        ...(gear.shoeIds ?? []),
        ...(gear.essentialIds ?? []),
      ]),
    },
    {
      label: "Travel Extras",
      description: gear.travelDescription,
      items: resolveAffiliateLinks(gear.travelIds),
    },
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

  // Consolidate event-specific derived state into a single memoization block
  // to reduce dependency chains and potential extra re-renders.
  const {
    themeOutfits,
    themeAccessories,
    gearSections,
    compactThemeOutfits,
    compactThemeAccessories,
    compactGearSections,
    hasMoreThemeOutfits,
    hasMoreThemeAccessories,
  } = useMemo(() => {
    const allOutfits = resolveAffiliateLinks(event?.theme?.outfitIds);
    const allAccessories = resolveAffiliateLinks(event?.theme?.accessoryIds);

    const themePickCount = MAX_THEME_OUTFITS;
    const themeAccessoryCount = MAX_THEME_ACCESSORIES;

    const compactOutfits = allOutfits.slice(0, themePickCount);
    const compactAccessories = allAccessories.slice(0, themeAccessoryCount);

    // Track IDs already shown in the Theme Spotlight
    const shownIds = new Set([
      ...compactOutfits.map((i) => i.id),
      ...compactAccessories.map((i) => i.id),
    ]);

    const allGearSections = getGearSections(event?.gear).map((section) => ({
      ...section,
      items: section.items.filter((item) => !shownIds.has(item.id)),
    }));

    // Requirement: 15 visible product items max.
    // Use dynamic quota: 15 - (actual theme items) = remaining for gear
    const remainingGearQuota =
      MAX_TOTAL_PRODUCTS - compactOutfits.length - compactAccessories.length;

    const compactGearResult = allGearSections.reduce(
      (acc, section) => {
        const take = Math.max(0, Math.min(3, remainingGearQuota - acc.count));
        const items = section.items.slice(0, take);
        if (items.length > 0) {
          return {
            sections: [
              ...acc.sections,
              {
                ...section,
                items,
                hasMore: section.items.length > take,
              },
            ],
            count: acc.count + items.length,
          };
        }
        return acc;
      },
      {
        sections: [] as (ResolvedGearSection & { hasMore: boolean })[],
        count: 0,
      },
    );
    const compactGear = compactGearResult.sections;

    return {
      themeOutfits: allOutfits,
      themeAccessories: allAccessories,
      gearSections: allGearSections,
      compactThemeOutfits: compactOutfits,
      compactThemeAccessories: compactAccessories,
      compactGearSections: compactGear,
      hasMoreThemeOutfits: allOutfits.length > themePickCount,
      hasMoreThemeAccessories: allAccessories.length > themeAccessoryCount,
    };
  }, [event?.theme?.outfitIds, event?.theme?.accessoryIds, event?.gear]);

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
    compactThemeOutfits,
    compactThemeAccessories,
    compactGearSections,
    hasMoreThemeOutfits,
    hasMoreThemeAccessories,
    relatedEvents,
    navigate,
  };
}
