import { Box, Stack, Grid, Text } from '@/components/layout/Primitives';
import { Search } from 'lucide-react';
import { useToolbox } from './useToolbox';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContentCard } from '@/components/ui/ContentCard';

export default function Toolbox() {
  const { searchTerm, setSearchTerm, filteredCategories } = useToolbox();

  return (
    <Box as="section">
      <Stack gap={12}>
        <PageHeader 
          label="THE TOOLBOX"
          title="Gear Reviews"
          description="An easy searchable format for looking up products I recommend. Every gear review card expands to an actual blog post for sharing products you can purchase."
        />

        <Box 
          display="flex" 
          align="center" 
          gap={4} 
          surface="surface" 
          border 
          paddingX={6} 
          paddingY={4}
          radius="md"
          className="bg-surface shadow-sm border-line"
        >
          <Search className="w-5 h-5 text-accent" />
          <Box 
            as="input"
            type="text"
            placeholder="Search gear, tools, and technical resources..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            width="full"
            variant="sans"
            size="base"
            className="bg-transparent border-none outline-none focus:ring-0 placeholder:text-text-dim/50 text-text-main font-medium"
          />
        </Box>

        <Stack gap={16}>
          {filteredCategories.map((category) => (
            <Stack key={category.id} gap={8}>
              <Box paddingBottom={4} display="flex" justify="between" align="end" className="border-b border-slate-200">
                <Text variant="display" size="2xl" weight="font-black" className="text-accent-navy">{category.label}</Text>
                <Text variant="mono" size="xs" color="dim" weight="font-semibold" className="tracking-[0.15em]">{category.items.length} ITEMS FOUND</Text>
              </Box>

              <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={8}>
                {category.items.map((item) => (
                  <ContentCard 
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    category={category.label}
                    image={item.image}
                    basePath="/gear"
                    aspect="video"
                  />
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
