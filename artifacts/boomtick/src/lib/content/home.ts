import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { upcomingEvents, tagColors } from "@/lib/types/site";
import { blogPosts } from "@/lib/types/content";

export const homeHeroLinks = [
  [
    { label: "WCS Training →", href: "/blog" },
    { label: "Competition tips →", href: "/blog" },
    { label: "Gear reviews →", href: "/gear" },
  ],
  [
    { label: "Travel guides →", href: "/blog" },
    { label: "Event calendar →", href: "/research" },
    { label: "Packing lists →", href: "/gear" },
  ],
];

export { ArrowRight, Calendar, MapPin, blogPosts, upcomingEvents, tagColors };