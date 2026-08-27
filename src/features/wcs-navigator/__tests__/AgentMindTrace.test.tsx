import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AgentMindTrace } from '../components/AgentMindTrace';
import { ExecutionProgressBar } from '../components/ExecutionProgressBar';
import { FlightBufferTimeline } from '../components/FlightBufferTimeline';
import { FilteringAuditMatrix } from '../components/FilteringAuditMatrix';
import { PackingManifestCard } from '../components/PackingManifestCard';
import { downloadIcsFile } from '../utils/icsDownloader';

describe('AgentMindTrace Suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders AgentMindTrace container and header correctly', () => {
    render(<AgentMindTrace />);
    expect(screen.getByText(/Personalized Schedule & Travel Buffer/i)).toBeDefined();
    expect(screen.getAllByText(/Download Calendar \(\.ics\)|Download \(\.ics\)/i).length).toBeGreaterThan(0);
  });

  it('renders ExecutionProgressBar sub-tasks', () => {
    render(<ExecutionProgressBar />);
    expect(screen.getByText('Schedule Optimization Steps')).toBeDefined();
    expect(screen.getByText('Parsed Event Timetable')).toBeDefined();
    expect(screen.getByText('Applied Division Filters')).toBeDefined();
    expect(screen.getByText('Calculated Travel Buffer')).toBeDefined();
    expect(screen.getByText('Generated Calendar File')).toBeDefined();
  });

  it('renders FlightBufferTimeline buffer steps and logistics formula', () => {
    render(<FlightBufferTimeline />);
    expect(screen.getByText('Travel & Arrival Timeline')).toBeDefined();
    expect(screen.getByText('Arrival Timeline Formula')).toBeDefined();
    expect(screen.getByText('Target Flight Landing Deadline')).toBeDefined();
    expect(screen.getByText('Novice Strictly Swing Staging Call')).toBeDefined();
  });

  it('toggles tabs between all, included, and filtered sessions in FilteringAuditMatrix', () => {
    render(<FilteringAuditMatrix />);
    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();

    const filteredTabBtn = screen.getByRole('tab', { name: /Filtered Out/i });
    fireEvent.click(filteredTabBtn);

    expect(screen.getByText('Advanced & All-Star Jack & Jill')).toBeDefined();
    expect(screen.getByText(/User selected Novice/i)).toBeDefined();

    const includedTabBtn = screen.getByRole('tab', { name: /Matched & Scheduled/i });
    fireEvent.click(includedTabBtn);

    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();
    expect(screen.queryByText('Advanced & All-Star Jack & Jill')).toBeNull();

    const allTabBtn = screen.getByRole('tab', { name: /All/i });
    fireEvent.click(allTabBtn);
    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();
    expect(screen.getByText('Advanced & All-Star Jack & Jill')).toBeDefined();
  });

  it('renders PackingManifestCard items and rationale sections', () => {
    render(<PackingManifestCard />);
    expect(screen.getByText('Smart Packing Checklist')).toBeDefined();
    expect(screen.getByText('Suede-soled WCS Shoes (2 Pairs)')).toBeDefined();
    expect(screen.getByText(/Schedule contains 8\+ hours of intensive social dancing/i)).toBeDefined();
  });

  it('triggers downloadIcsFile and displays visual toast notification', () => {
    const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    render(<AgentMindTrace />);
    const downloadBtns = screen.getAllByText(/Download Calendar \(\.ics\)/i);
    fireEvent.click(downloadBtns[0]);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(screen.getByText('Calendar Downloaded (.ics)')).toBeDefined();
    expect(screen.getByText(/wcs-navigator-schedule\.ics/i)).toBeDefined();
  });
});

