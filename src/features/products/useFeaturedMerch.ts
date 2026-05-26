import { useQuery } from '@tanstack/react-query';
import { getFeaturedMerch } from '@/lib/productCatalog';

export function useFeaturedMerch(limit = 4) {
  const { data: featuredMerch = [] } = useQuery({
    queryKey: ['merch', 'featured', limit],
    queryFn: () => getFeaturedMerch(limit),
    initialData: () => getFeaturedMerch(limit),
  });

  return { featuredMerch };
}
