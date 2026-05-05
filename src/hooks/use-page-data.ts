import { primaryNavigation } from "@/lib/types/navigation";

export const useSidebarData = () => useMemo(() => ({ primaryNavigation }), []);
