import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug, getEvents, Event } from "@/lib/content";
import { ProductCatalogItem } from "@/data/products/catalog";
import { getProductsForEvent } from "@/lib/productCatalog";

export interface ResolvedGearSection {
  label: string;
  items: ProductCatalogItem[];
}

/**
 * Organizes an event's products into resolved semantic sections.
 */
export function getGearSections(event?: Event): ResolvedGearSection[] {
  if (!event || !event.gear) return [];

  const allProducts = getProductsForEvent(event);
  const gear = event.gear;

  const resolve = (ids: string[] = []) =>
    allProducts.filter(p => ids.includes(p.id));

  return [
    { label: "Outfits", items: resolve(gear.outfitIds) },
    { label: "Accessories", items: resolve(gear.accessoryIds) },
    {
      label: "Shoes & Essentials",
      items: resolve([
        ...(gear.shoeIds ?? []),
        ...(gear.essentialIds ?? []),
      ]),
    },
    { label: "Travel Extras", items: resolve(gear.travelIds) },
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

  const { themeOutfits, themeAccessories, gearSections } = useMemo(() => {
    if (!event) {
      return { themeOutfits: [], themeAccessories: [], gearSections: [] };
    }

    const allProducts = getProductsForEvent(event);

    return {
      themeOutfits: allProducts.filter(p => event.theme?.outfitIds?.includes(p.id)),
      themeAccessories: allProducts.filter(p => event.theme?.accessoryIds?.includes(p.id)),
      gearSections: getGearSections(event),
    };
  }, [event]);

  // Resolve related events
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
