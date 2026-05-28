import { Box } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { GearCard } from '@/components/ui/GearCard';
import { GEAR_PILLS } from "./config";
import { getResources } from "@/lib/content";
import { useQuery } from '@tanstack/react-query';

export default function Toolbox() {
  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
    initialData: getResources,
  });

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
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous testing and honest takes on the gear that keeps you moving."
        />

        <AffiliateDisclosure type="gear" />

      </Box>

      <FolioGrid
        items={resources as unknown as Parameters<typeof FolioGrid>[0]['items']}
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
            {...(item as unknown as Parameters<typeof GearCard>[0])}
            basePath="/gear"
          />
        )}
      />
    </Box>
  );
}
