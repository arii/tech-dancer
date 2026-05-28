import { Box } from '@/layouts/Primitives';
import { SEO } from '@/components/SEO';
import FolioGrid from '@/components/ui/FolioGrid';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { GearCard } from '@/components/ui/GearCard';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SearchBox } from '@/components/ui/SearchBox';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      <Box as="header" marginBottom={8}>
        <PageHeader
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="Rigorous testing and honest takes on the gear that keeps you moving."
        />

        <AffiliateDisclosure type="gear" />

        {/* Modern Search Bar & Toggle */}
        <Box display="flex" align="center" justify="between" gap={4} marginTop={8} wrap data-testid="toolbox-search-bar">
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gear..."
          />
          <ViewToggle view={view} onChange={setView} />
        </Box>

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
