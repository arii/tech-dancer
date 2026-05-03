import { useMemo } from "react";
import { aboutConnectItems, aboutPillars, aboutServiceCards, blogPosts, photos, tagColors, upcomingEvents } from "@/lib/types/site";
import { blogFilters, gearItems, researchTools, contactInquiries } from "@/lib/types/content";
import { primaryNavigation } from "@/lib/types/navigation";

export const useHomePageData = () => useMemo(() => ({ blogPosts, upcomingEvents, tagColors }), []);
export const useAboutPageData = () => useMemo(() => ({ aboutConnectItems, aboutPillars, aboutServiceCards, photos }), []);
export const useBlogPageData = () => useMemo(() => ({ blogFilters, blogPosts, tagColors }), []);
export const useGearPageData = () => useMemo(() => ({ gearItems, tagColors }), []);
export const useResearchPageData = () => useMemo(() => ({ researchTools }), []);
export const useContactPageData = () => useMemo(() => ({ contactInquiries }), []);
export const useSidebarData = () => useMemo(() => ({ primaryNavigation }), []);
