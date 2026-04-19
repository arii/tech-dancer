import { motion } from 'motion/react';
import { ShoppingBag, Star, ArrowRight, Search } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/components/layout/Primitives';
import { useToolbox } from './useToolbox';
import { useState, useMemo } from 'react';

export default function GearReviews() {
  const { categories } = useToolbox();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const term = searchTerm.toLowerCase();
    return categories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term)
      )
    })).filter(cat => cat.items.length > 0);
  }, [categories, searchTerm]);

  return (
    <Box as="section" padding="panel">
      <Stack gap={16}>
        <Stack gap={12}>
          <Stack gap={6}>
            <Text variant="mono" color="brand" weight="font-bold">GEAR REVIEWS</Text>
            <Text variant="headline" size="fluid-9" className="leading-none">The Stacks.</Text>
            <Text variant="body" size="xl" maxWidth="2xl">
              A searchable repository of product reviews I recommend. From dance shoes to travel gear, every item expands to a full review.
            </Text>
          </Stack>

          <Box position="relative" maxWidth="4xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent-brand" />
            <Box 
              as="input" 
              type="text"
              placeholder="SEARCH GEAR REVIEWS // FILTER BY ITEM"
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              width="full"
              surface="default"
              border
              paddingY={6}
              paddingLeft={16}
              paddingRight={6}
              variant="display"
              size="2xl"
              className="placeholder:opacity-30 focus:border-accent-brand focus:ring-1 focus:ring-accent-brand transition-all outline-none"
            />
          </Box>
        </Stack>

        <Stack gap={24}>
          {filteredCategories.map((category) => (
            <Stack key={category.id} gap={8}>
              <Box border="b" paddingBottom={4} display="flex" justify="between" align="end">
                <Stack gap={1}>
                  <Text variant="mono" color="brand" weight="font-bold">{category.label.toUpperCase()}</Text>
                  <Text variant="body" size="sm" color="dim">{category.description}</Text>
                </Stack>
                <Text variant="mono" size="micro" color="dim" uppercase>{category.items.length} Items</Text>
              </Box>

              <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {category.items.map((item, i) => (
                  <Box 
                    key={item.slug}
                    as={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    surface="default" 
                    border 
                    padding="card"
                    className="group hover:border-accent-brand transition-all"
                  >
                    <Stack gap={6}>
                      <Box display="flex" justify="between" align="start">
                        <Box width={10} height={10} surface="muted" border display="flex" align="center" justify="center">
                          <ShoppingBag className="w-5 h-5 stroke-1" />
                        </Box>
                        <Box display="flex" gap={1}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3 h-3 text-accent-brand fill-accent-brand" />
                          ))}
                        </Box>
                      </Box>
                      
                      <Stack gap={2}>
                        <Text variant="mono" size="micro" color="brand" uppercase>{item.category}</Text>
                        <Text variant="display" size="xl" className="group-hover:text-accent-brand transition-colors">
                          {item.title}
                        </Text>
                        <Text variant="body" size="sm" color="dim" className="line-clamp-2">
                          {item.excerpt}
                        </Text>
                      </Stack>

                      <Box 
                        display="flex" 
                        align="center" 
                        gap={2} 
                        color="dim" 
                        className="group-hover:text-accent-brand transition-colors pt-4 mt-auto border-t border-line/50"
                      >
                        <Text variant="mono" size="xs" weight="font-bold">View Review</Text>
                        <ArrowRight className="w-4 h-4" />
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
