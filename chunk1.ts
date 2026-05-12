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
        const arrayBuffer = await res.arrayBuffer();

        const objects = await parquetReadObjects({ file: arrayBuffer });

        const formattedObjects = objects.map((obj: Record<string, unknown>) => ({
          ...obj,
          Registry_Points_Sum: Number(obj.Registry_Points_Sum)
        }));

        setData(formattedObjects as unknown as WCSRecord[]);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load WCS data:", err);
        setError("Failed to load dataset. Please ensure the data source is available.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(record => {
      const matchesSearch =
        record.competitor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
