import { useMemo } from "react";
import { aboutConnectItems, aboutPillars, aboutServiceCards, blogPosts, photos, sidebarNavItems, tagColors, upcomingEvents } from "@/content/siteContent";
import { blogFilters } from "@/content/blogContent";
import { gearItems } from "@/content/gearContent";
import { researchTools } from "@/content/researchContent";
import { contactInquiries } from "@/content/contactContent";

export const useHomePageData = () => useMemo(() => ({ blogPosts, upcomingEvents, tagColors }), []);
export const useAboutPageData = () => useMemo(() => ({ aboutConnectItems, aboutPillars, aboutServiceCards, photos }), []);
export const useBlogPageData = () => useMemo(() => ({ blogFilters, blogPosts, tagColors }), []);
export const useGearPageData = () => useMemo(() => ({ gearItems, tagColors }), []);
export const useResearchPageData = () => useMemo(() => ({ researchTools }), []);
export const useContactPageData = () => useMemo(() => ({ contactInquiries }), []);
export const useSidebarData = () => useMemo(() => ({ sidebarNavItems }), []);
