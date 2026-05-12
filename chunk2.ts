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
