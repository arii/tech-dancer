import { useState, useMemo, useEffect } from 'react';
import { parquetReadObjects } from 'hyparquet';

export interface AffiliateRecord {
  date: string;
  affiliate_id: string;
  network: 'Amazon' | 'Fuego';
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
  cost: number;
}

export function useAffiliateData() {
  const [data, setData] = useState<AffiliateRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/affiliate_reporting.parquet`);
        if (!res.ok) throw new Error('Failed to fetch parquet');
        const arrayBuffer = await res.arrayBuffer();

        const objects = await parquetReadObjects({ file: arrayBuffer });

        const formattedObjects = objects.map((obj: Record<string, unknown>) => ({
          ...obj,
          clicks: Number(obj.clicks),
          conversions: Number(obj.conversions),
          revenue: Number(obj.revenue),
          commission: Number(obj.commission),
          cost: Number(obj.cost || 0)
        }));

        setData(formattedObjects as unknown as AffiliateRecord[]);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load Affiliate data:", err);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(() => {
    const totalCommission = data.reduce((sum, r) => sum + r.commission, 0);
    const totalRevenue = data.reduce((sum, r) => sum + r.revenue, 0);
    const totalClicks = data.reduce((sum, r) => sum + r.clicks, 0);
    const totalConversions = data.reduce((sum, r) => sum + r.conversions, 0);
    const totalCost = data.reduce((sum, r) => sum + r.cost, 0);

    // ROI = (Commission - Cost) / Cost
    const totalROI = totalCost > 0 ? (totalCommission - totalCost) / totalCost : 0;

    const byNetwork = data.reduce((acc, r) => {
      if (!acc[r.network]) acc[r.network] = { revenue: 0, commission: 0, clicks: 0, conversions: 0, cost: 0 };
      acc[r.network].revenue += r.revenue;
      acc[r.network].commission += r.commission;
      acc[r.network].clicks += r.clicks;
      acc[r.network].conversions += r.conversions;
      acc[r.network].cost += r.cost;
      return acc;
    }, {} as Record<string, { revenue: number, commission: number, clicks: number, conversions: number, cost: number }>);

    const trendData = data.reduce((acc, r) => {
      const month = r.date.substring(0, 7); // YYYY-MM
      if (!acc[month]) acc[month] = { date: month, commission: 0, revenue: 0, cost: 0 };
      acc[month].commission += r.commission;
      acc[month].revenue += r.revenue;
      acc[month].cost += r.cost;
      return acc;
    }, {} as Record<string, { date: string, commission: number, revenue: number, cost: number }>);

    const performanceById = data.reduce((acc, r) => {
      if (!acc[r.affiliate_id]) acc[r.affiliate_id] = { id: r.affiliate_id, network: r.network, revenue: 0, commission: 0, clicks: 0, conversions: 0, cost: 0 };
      acc[r.affiliate_id].revenue += r.revenue;
      acc[r.affiliate_id].commission += r.commission;
      acc[r.affiliate_id].clicks += r.clicks;
      acc[r.affiliate_id].conversions += r.conversions;
      acc[r.affiliate_id].cost += r.cost;
      return acc;
    }, {} as Record<string, { id: string, network: string, revenue: number, commission: number, clicks: number, conversions: number, cost: number }>);

    const calculatedPerformance = Object.values(performanceById).map(asset => ({
      ...asset,
      roi: asset.cost > 0 ? (asset.commission - asset.cost) / asset.cost : 0
    })).sort((a, b) => b.roi - a.roi);

    return {
      totalCommission,
      totalRevenue,
      totalClicks,
      totalConversions,
      totalCost,
      totalROI,
      byNetwork: Object.entries(byNetwork).map(([name, data]) => ({
        name,
        ...data,
        roi: data.cost > 0 ? (data.commission - data.cost) / data.cost : 0
      })),
      trendData: Object.values(trendData).sort((a, b) => a.date.localeCompare(b.date)),
      performanceById: calculatedPerformance
    };
  }, [data]);

  return {
    data,
    isLoading,
    stats
  };
}
