import { Box } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { GEAR_PILLS } from "./config";
import { GearCard } from '@/components/ui/GearCard';
import { getResources } from "@/lib/content";

export default function Toolbox() {
  const resources = getResources();

  const categories = [
    { id: 'all', label: 'All Gear' },
    ...GEAR_PILLS.map(pill => ({ id: pill.value, label: pill.label }))
  ];

  return (
    <Box as="section">
      <SEO
        title="Toolbox"
        description="Rigorous testing and honest takes on the gear that keeps you moving. Gear reviews for West Coast Swing dancers."
      />

      <FolioGrid
        items={resources}
        categoryTitle="Gear Reviews"
        label="THE TOOLBOX"
        description="Rigorous testing and honest takes on the gear that keeps you moving."
        basePath="/gear"
        searchPlaceholder="Search gear..."
        categories={categories}
        categoryParam="pill"
        renderItem={(item) => (
          <GearCard
            key={item.slug}
            {...item}
            basePath="/gear"
          />
        )}
      />
    </Box>
  );
}
