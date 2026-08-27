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
    expect(screen.getByText('WCS Navigator Reasoning & Logistics Trace')).toBeDefined();
    expect(screen.getAllByText('Download Calendar (.ics)').length).toBeGreaterThan(0);
  });

  it('renders ExecutionProgressBar sub-tasks', () => {
    render(<ExecutionProgressBar />);
    expect(screen.getByText('Agent Reasoning Progress')).toBeDefined();
    expect(screen.getByText('Extracted text from PDF')).toBeDefined();
    expect(screen.getByText('Applied persona boundaries')).toBeDefined();
    expect(screen.getByText('Calculated travel buffer')).toBeDefined();
    expect(screen.getByText('Packaged RFC 5545 calendar')).toBeDefined();
  });

  it('renders FlightBufferTimeline buffer steps and logistics formula', () => {
    render(<FlightBufferTimeline />);
    expect(screen.getByText('Flight & Buffer Timeline')).toBeDefined();
    expect(screen.getByText('Logistics Equation')).toBeDefined();
    expect(screen.getByText('Earliest Staging Time')).toBeDefined();
    expect(screen.getByText('Latest Flight Arrival Deadline')).toBeDefined();
  });

  it('toggles tabs between included and filtered sessions in FilteringAuditMatrix', () => {
    render(<FilteringAuditMatrix />);
    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();

    const filteredTabBtn = screen.getByRole('button', { name: /Filtered Out Sessions/i });
    fireEvent.click(filteredTabBtn);

    expect(screen.getByText('Advanced & All-Star Jack & Jill')).toBeDefined();
    expect(screen.getByText(/User selected Novice/i)).toBeDefined();
  });

  it('renders PackingManifestCard items and rationale sections', () => {
    render(<PackingManifestCard />);
    expect(screen.getByText('Context-Backed Packing Manifest')).toBeDefined();
    expect(screen.getByText('Suede-soled WCS Shoes (2 Pairs)')).toBeDefined();
    expect(screen.getByText(/Schedule contains 8\+ hours of intensive social dancing/i)).toBeDefined();
  });

  it('triggers downloadIcsFile Blob download correctly without throwing error', () => {
    const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const icsData = 'BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR';
    downloadIcsFile(icsData, 'test-schedule.ics');

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });
});
