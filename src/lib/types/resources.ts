export type ResourceKind =
  | "article"
  | "guide"
  | "affiliate-product"
  | "boomtick-merch"
  | "event-guide"
  | "tool";

export type ResourceSource =
  | "editorial"
  | "affiliate"
  | "printful"
  | "internal";

export type ResourceCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: ResourceKind;
  source: ResourceSource;
  category: "learn" | "travel" | "gear" | "merch" | "events" | "tools";
  image?: string;
  tags?: string[];
  featured?: boolean;
};
