import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WCSScraperTool } from './WCSScraperTool';
import * as useWCSDataModule from '../hooks/useWCSData';

vi.mock('./WCSChartContainers', () => ({
  ScoreDistributionChart: () => <div data-testid="score-distribution-chart" />,
  AvgScoreTrendChart: () => <div data-testid="avg-score-trend-chart" />,
}));

vi.mock('../hooks/useWCSData', () => ({
  useWCSData: vi.fn(),
}));

const mockRecords: useWCSDataModule.WCSRecord[] = [
  {
    Dancer_ID: '1234',
    competitor_name: 'John Doe',
    result_id: 'res-1',
    event_title: 'Boogie by the Bay 2026',
    event_date: '10/10/2026',
    Registry_Points_Sum: 15.5,
    Promoted: true,
    event_url: 'https://example.com/event1',
    location: 'San Francisco, CA',
  },
  {
    Dancer_ID: '5678',
    competitor_name: 'Jane Smith',
    result_id: 'res-2',
    event_title: 'Halloween Swing 2026',
    event_date: '10/31/2026',
    Registry_Points_Sum: 5.0,
    Promoted: false,
    event_url: 'https://example.com/event2',
    location: 'Burbank, CA',
  },
];

describe('WCSScraperTool', () => {
  const defaultMockReturn = {
    data: mockRecords,
    filteredData: mockRecords,
    isLoading: false,
    isSearching: false,
    latency: 120,
    error: null,
    searchTerm: '',
    searchInput: '',
    setSearchInput: vi.fn(),
    setSearchTerm: vi.fn(),
    filterPromoted: 'all' as const,
    setFilterPromoted: vi.fn(),
    scoreDistribution: [{ score: 5, count: 1 }, { score: 15, count: 1 }],
    trendData: [{ date: '10/2026', avg: 10.25 }],
    totalEvents: 6308,
    lastSync: '10/31/2026',
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useWCSDataModule.useWCSData).mockReturnValue(defaultMockReturn);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders prominent KPI callout cards with formatted event count', () => {
    render(
      <MemoryRouter>
        <WCSScraperTool />
      </MemoryRouter>
    );

    const kpiElement = screen.getByTestId('kpi-total-events');
    expect(kpiElement).toBeDefined();
    expect(kpiElement.textContent).toBe('6,308');
    expect(screen.getByText('Total Dance Events Indexed (Since 2023)')).toBeDefined();
    expect(screen.getAllByText('Safe Access').length).toBeGreaterThan(0);
  });

  it('toggles the methodology drawer when header button is clicked', () => {
    render(
      <MemoryRouter>
        <WCSScraperTool />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByTestId('methodology-drawer-toggle');
    expect(screen.queryByText('Dual-ID Verification')).toBeNull();

    fireEvent.click(toggleBtn);
    expect(screen.getByText('Dual-ID Verification')).toBeDefined();
    expect(screen.getByText(/intentional delays and zero-impact rate-limiting/i)).toBeDefined();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText('Dual-ID Verification')).toBeNull();
  });

  it('handles search input keystrokes and displays active querying indicator during search state', () => {
    const setSearchInputMock = vi.fn();
    vi.mocked(useWCSDataModule.useWCSData).mockReturnValue({
      ...defaultMockReturn,
      isSearching: true,
      searchInput: 'John',
      setSearchInput: setSearchInputMock,
    });

    render(
      <MemoryRouter>
        <WCSScraperTool />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId('wcs-search-input') as HTMLInputElement;
    expect(searchInput.value).toBe('John');

    fireEvent.change(searchInput, { target: { value: 'John Doe' } });
    expect(setSearchInputMock).toHaveBeenCalledWith('John Doe');

    expect(screen.getByTestId('active-search-indicator')).toBeDefined();
    expect(screen.getByText(/Querying 6,308 records.../i)).toBeDefined();
  });
});
