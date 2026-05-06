import { useState, useMemo, useEffect } from 'react';
import { parquetReadObjects } from 'hyparquet';
import { useSearchParam } from '@/hooks/useSearchParam';

export interface WCSRecord {
  Dancer_ID: string;
  competitor_name: string;
  result_id: string;
  event_title: string;
  event_date: string;
  Registry_Points_Sum: number;
  Promoted: boolean;
}

export function useWCSData() {
  const [data, setData] = useState<WCSRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [filterPromoted, setFilterPromoted] = useSearchParam<'all' | 'promoted' | 'not-promoted'>('filter', 'all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/wcs_prelims.parquet`);
        if (!res.ok) {
          throw new Error(`Failed to fetch dataset: ${res.status} ${res.statusText}`);
        }
        const arrayBuffer = await res.arrayBuffer();

        const objects = await parquetReadObjects({ file: arrayBuffer });

        const formattedObjects = objects.map((obj: Record<string, unknown>) => ({
          ...obj,
          Registry_Points_Sum: Number(obj.Registry_Points_Sum)
        }));

        setData(formattedObjects as unknown as WCSRecord[]);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load WCS data:", err);
        setError(err instanceof Error ? err.message : 'Unknown error loading dataset');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(record => {
      const matchesSearch =
        record.competitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Dancer_ID.includes(searchTerm) ||
        record.event_title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterPromoted === 'all' ||
        (filterPromoted === 'promoted' && record.Promoted) ||
        (filterPromoted === 'not-promoted' && !record.Promoted);

      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterPromoted]);

  const { scoreDistribution, trendData } = useMemo(() => {
    const bins = new Map<string, number>();
    const byDate = new Map<string, { total: number; count: number }>();

    for (const r of filteredData) {
      // Score Distribution
      const bin = Math.floor(r.Registry_Points_Sum).toString();
      bins.set(bin, (bins.get(bin) || 0) + 1);

      // Trend Analysis
      const parts = r.event_date.split('/');
      if (parts.length >= 3) {
        const monthYear = `${parts[0]}/${parts[2]}`; // MM/YYYY
        const stats = byDate.get(monthYear) || { total: 0, count: 0 };
        stats.total += r.Registry_Points_Sum;
        stats.count += 1;
        byDate.set(monthYear, stats);
      }
    }

    const calculatedScoreDistribution = Array.from(bins.entries())
      .map(([score, count]) => ({ score: Number(score), count }))
      .sort((a, b) => a.score - b.score);

    const calculatedTrendData = Array.from(byDate.entries())
      .map(([date, stats]) => ({
        date,
        avg: Number((stats.total / stats.count).toFixed(2)),
      }))
      .sort((a, b) => {
        const [m1, y1] = a.date.split('/').map(Number);
        const [m2, y2] = b.date.split('/').map(Number);
        return y1 !== y2 ? y1 - y2 : m1 - m2;
      });

    return {
      scoreDistribution: calculatedScoreDistribution,
      trendData: calculatedTrendData,
    };
  }, [filteredData]);

  return {
    data,
    filteredData,
    isLoading,
    searchTerm,
    setSearchTerm,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData,
    error
  };
}
