import { useQuery } from '@tanstack/react-query';

interface AmazonPriceResponse {
  price: string | null;
  title: string | null;
}

export function useAmazonPrice(asin?: string) {
  const { data, isLoading, isError } = useQuery<AmazonPriceResponse>({
    queryKey: ['amazon-price', asin],
    queryFn: async () => {
      if (!asin) return { price: null, title: null };
      const response = await fetch(`/api/amazon-price?asin=${asin}`);
      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }
      return response.json();
    },
    enabled: !!asin,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    price: data?.price ?? null,
    title: data?.title ?? null,
    loading: isLoading,
    error: isError,
  };
}
