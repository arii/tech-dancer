import { useState, useMemo, useEffect } from 'react';
import { parquetReadObjects, asyncBufferFromUrl } from 'hyparquet';
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
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [filterPromoted, setFilterPromoted] = useSearchParam<'all' | 'promoted' | 'not-promoted'>('filter', 'all');

  useEffect(() => {
    const loadData = async () => {
      const startTime = performance.now();
      try {
        const file = await asyncBufferFromUrl({ url: `${import.meta.env.BASE_URL}data/wcs_prelims.parquet` });

        const objects = await parquetReadObjects({ file });

        const formattedObjects = objects.map((obj: Record<string, unknown>) => ({
          ...obj,
          Registry_Points_Sum: Number(obj.Registry_Points_Sum)
        }));

        setData(formattedObjects as unknown as WCSRecord[]);
        setLatency(performance.now() - startTime);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load WCS data:", err);
        setError("Failed to load dataset. Please ensure the data source is available.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const { filteredData, scoreDistribution, trendData } = useMemo(() => {
    const filteredResults: WCSRecord[] = [];
    const bins = new Map<string, number>();
    const byDate = new Map<string, { total: number; count: number }>();

    const searchLower = searchTerm.toLowerCase();

    for (const record of data) {
      const matchesSearch =
        record.competitor_name.toLowerCase().includes(searchLower) ||
        record.Dancer_ID.includes(searchTerm) ||
        record.event_title.toLowerCase().includes(searchLower);

      const matchesFilter =
        filterPromoted === 'all' ||
        (filterPromoted === 'promoted' && record.Promoted) ||
        (filterPromoted === 'not-promoted' && !record.Promoted);

      if (matchesSearch && matchesFilter) {
        filteredResults.push(record);

        // Score Distribution
        const bin = Math.floor(record.Registry_Points_Sum).toString();
        bins.set(bin, (bins.get(bin) || 0) + 1);

        // Trend Analysis
        const parts = record.event_date.split('/');
        if (parts.length >= 3) {
          const monthYear = `${parts[0]}/${parts[2]}`; // MM/YYYY
          const stats = byDate.get(monthYear) || { total: 0, count: 0 };
          stats.total += record.Registry_Points_Sum;
          stats.count += 1;
          byDate.set(monthYear, stats);
        }
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
      filteredData: filteredResults,
      scoreDistribution: calculatedScoreDistribution,
      trendData: calculatedTrendData,
    };
  }, [data, searchTerm, filterPromoted]);

  return {
    data,
    filteredData,
    isLoading,
    latency,
    searchTerm,
    setSearchTerm,
    error,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData
  };
}
