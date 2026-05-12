    };
  }, [filteredData]);

  return {
    data,
    filteredData,
    isLoading,
    searchTerm,
    setSearchTerm,
    error,
    filterPromoted,
    setFilterPromoted,
    scoreDistribution,
    trendData
  };
}
