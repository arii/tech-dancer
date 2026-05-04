import { useMemo } from "react";

export const gearItems = [
  { tag: "Dance Gear", title: "Portable Bluetooth Speaker (UE Wonderboom 4)", description: "Rugged, waterproof, and loud enough for hotel practice or a quick outdoor run-through.", href: "/gear/portable-speaker", rating: "4.8", label: "Best for Travel" },
  { tag: "Dance Gear", title: "Loop Experience Earplugs", description: "Protects your hearing in loud social dance settings without making the music feel flat.", href: "/gear/loop-earplugs", rating: "5", label: "Highly Recommended" },
  { tag: "Travel", title: "Travel Steamer Pro", description: "Compact, efficient, and dual-voltage. Keeps competition outfits ready after a long flight.", href: "/gear/travel-steamer", rating: "4.5", label: "Essential for Competitors" },
];

export const tagColors: Record<string, string> = {
  Tech: "text-primary border-primary/40",
  Travel: "text-secondary border-secondary/40",
  "Dance Research": "text-accent border-accent/40",
  "Travel/Lifestyle": "text-secondary border-secondary/40",
  "Gear Reviews": "text-primary border-primary/40",
  "Data & Dev Lab": "text-accent border-accent/40",
  "Dance Gear": "text-primary border-primary/40",
  Gear: "text-primary border-primary/40",
};

export function useToolbox() {
  const items = useMemo(() => gearItems, []);

  return {
    gearItems: items,
    tagColors
  };
}
