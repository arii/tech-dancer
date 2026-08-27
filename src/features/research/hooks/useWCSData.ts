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
  event_url: string;
  location: string;
  _searchToken?: string;
}

export function useWCSData() {
  const [data, setData] = useState<WCSRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchParam('search');
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);
  const [filterPromoted, setFilterPromoted] = useSearchParam<'all' | 'promoted' | 'not-promoted'>('filter', 'all');

  // Derive active search status directly during render
  const isSearching = searchInput !== searchTerm;

  // Sync searchInput when searchTerm changes externally (e.g. back button / direct link)
  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    setSearchInput(searchTerm);
  }

  // Debounce local search input changes by 300ms before updating searchTerm & URL
  useEffect(() => {
    if (searchInput === searchTerm) return;

    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, searchTerm, setSearchTerm]);

  useEffect(() => {
    const loadData = async () => {
      const startTime = performance.now();
      try {
        const baseUrl = import.meta.env.BASE_URL.endsWith('/')
          ? import.meta.env.BASE_URL
          : `${import.meta.env.BASE_URL}/`;
        const parquetUrl = new URL(`${baseUrl}data/wcs_prelims.parquet`, window.location.origin).href;

        let objects;
        try {
          // Attempt 1: Lazy Load
          const file = await asyncBufferFromUrl({ url: parquetUrl });
          objects = await parquetReadObjects({ file });
        } catch (lazyErr) {
          console.warn("Lazy load failed or invalid Parquet footer, falling back to full fetch:", lazyErr);

          // Attempt 2: Full Fetch Fallback
          const res = await fetch(parquetUrl);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`, { cause: lazyErr });
          const buffer = await res.arrayBuffer();
          objects = await parquetReadObjects({ file: buffer });
        }

        const formattedObjects = objects.map((obj: Record<string, unknown>) => {
          const competitor = String(obj.competitor_name || '');
          const dancerId = String(obj.Dancer_ID || '');
          const eventTitle = String(obj.event_title || '');
          return {
            ...obj,
            Registry_Points_Sum: Number(obj.Registry_Points_Sum),
            _searchToken: `${competitor} ${dancerId} #${dancerId} ${eventTitle}`.toLowerCase()
          };
        });

        setData(formattedObjects as unknown as WCSRecord[]);
        setLatency(performance.now() - startTime);
        setIsLoading(false);
      } catch (err) {
        console.warn("Failed to load WCS data:", err);
        setError("Failed to load dataset. Please ensure the data source is available.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const { filteredData, scoreDistribution, trendData, totalEvents, lastSync } = useMemo(() => {
    const filteredResults: WCSRecord[] = [];
    const bins = new Map<string, number>();
    const byDate = new Map<string, { total: number; count: number }>();

    const searchLower = searchTerm.trim().toLowerCase();

    for (const record of data) {
      const matchesSearch =
        !searchLower ||
        (record._searchToken
          ? record._searchToken.includes(searchLower)
          : record.competitor_name.toLowerCase().includes(searchLower) ||
            record.Dancer_ID.toLowerCase().includes(searchLower) ||
            record.event_title.toLowerCase().includes(searchLower));

      const matchesFilter =
        filterPromoted === 'all' ||
        (filterPromoted === 'promoted' && record.Promoted) ||
        (filterPromoted === 'not-promoted' && !record.Promoted);

      if (matchesSearch && matchesFilter) {
        filteredResults.push(record);

        // Score Distribution
        const scoreVal = Number(record.Registry_Points_Sum);
        if (!isNaN(scoreVal)) {
          const bin = Math.floor(scoreVal).toString();
          bins.set(bin, (bins.get(bin) || 0) + 1);
        }

        // Trend Analysis
        const dateStr = record.event_date || '';
        const parts = dateStr.split('/');
        if (parts.length >= 3) {
          const year = parts.length > 3 ? parts[3] : parts[2];
          const month = parts[0];
          const monthYear = `${month}/${year}`;
          
          const stats = byDate.get(monthYear) || { total: 0, count: 0 };
          stats.total += isNaN(scoreVal) ? 0 : scoreVal;
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

    const uniqueEvents = new Set(data.map(r => r.result_id)).size;

    const lastSyncDate = data.reduce((latest, r) => {
      if (!r.event_date) return latest;
      const parts1 = r.event_date.split('/');
      const parts2 = latest.split('/');
      if (parts1.length < 3 || parts2.length < 3) return latest;
      
      const [m1, d1] = [Number(parts1[0]), Number(parts1[1])];
      const y1 = Number(parts1.length > 3 ? parts1[3] : parts1[2]);
      
      const [m2, d2] = [Number(parts2[0]), Number(parts2[1])];
      const y2 = Number(parts2.length > 3 ? parts2[3] : parts2[2]);
      
      const date1 = new Date(y1, m1 - 1, d1);
      const date2 = new Date(y2, m2 - 1, d2);
      return date1 > date2 ? r.event_date : latest;
    }, '01/01/2023');

    return {
      filteredData: filteredResults,
      scoreDistribution: calculatedScoreDistribution,
      trendData: calculatedTrendData,
      totalEvents: uniqueEvents,
      lastSync: lastSyncDate
    };
  }, [data, searchTerm, filterPromoted]);

  return {
    data,
    filteredData,
    isLoading,
    isSearching,
    latency,
    searchTerm,
    searchInput,
    setSearchInput,
    setSearchTerm,
    error,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData,
    totalEvents,
    lastSync
  };
}
