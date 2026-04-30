import { useState, useMemo, useEffect } from 'react';
import { parquetReadObjects } from 'hyparquet';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPromoted, setFilterPromoted] = useState<'all' | 'promoted' | 'not-promoted'>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/wcs_prelims.parquet`);
        const arrayBuffer = await res.arrayBuffer();

        const objects = await parquetReadObjects({ file: arrayBuffer });

        setData(objects as unknown as WCSRecord[]);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load WCS data:", err);
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

  const scoreDistribution = useMemo(() => {
    const bins: Record<string, number> = {};
    filteredData.forEach(r => {
      const bin = Math.floor(r.Registry_Points_Sum).toString();
      bins[bin] = (bins[bin] || 0) + 1;
    });
    return Object.entries(bins)
      .map(([score, count]) => ({ score: Number(score), count }))
      .sort((a, b) => a.score - b.score);
  }, [filteredData]);

  const trendData = useMemo(() => {
    const byDate: Record<string, { total: number, count: number }> = {};
    filteredData.forEach(r => {
      // Group by Month/Year for trend analysis
      const parts = r.event_date.split('/');
      if (parts.length < 3) return;
      const monthYear = `${parts[0]}/${parts[2]}`; // MM/YYYY
      if (!byDate[monthYear]) byDate[monthYear] = { total: 0, count: 0 };
      byDate[monthYear].total += r.Registry_Points_Sum;
      byDate[monthYear].count += 1;
    });

    return Object.entries(byDate)
      .map(([date, stats]) => ({
        date,
        avg: Number((stats.total / stats.count).toFixed(2))
      }))
      .sort((a, b) => {
        const [m1, y1] = a.date.split('/').map(Number);
        const [m2, y2] = b.date.split('/').map(Number);
        return y1 !== y2 ? y1 - y2 : m1 - m2;
      });
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
    trendData
  };
}
