import { useState, useEffect } from 'react';

interface AmazonPriceData {
  price: string | null;
  title: string | null;
  loading: boolean;
  error: boolean;
}

export function useAmazonPrice(asin?: string) {
  const [data, setData] = useState<AmazonPriceData>({
    price: null,
    title: null,
    loading: !!asin,
    error: false,
  });

  useEffect(() => {
    if (!asin) {
      setData({ price: null, title: null, loading: false, error: false });
      return;
    }

    let isMounted = true;

    async function fetchPrice() {
      setData(prev => ({ ...prev, loading: true, error: false }));
      try {
        const response = await fetch(`/api/amazon-price?asin=${asin}`);
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }
        const result = await response.json();
        if (isMounted) {
          setData({
            price: result.price,
            title: result.title,
            loading: false,
            error: false,
          });
        }
      } catch (err) {
        console.error('Error fetching Amazon price:', err);
        if (isMounted) {
          setData({
            price: null,
            title: null,
            loading: false,
            error: true,
          });
        }
      }
    }

    fetchPrice();

    return () => {
      isMounted = false;
    };
  }, [asin]);

  return data;
}
