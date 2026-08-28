import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AgentMindTrace } from '../components/AgentMindTrace';
import { ExecutionProgressBar } from '../components/ExecutionProgressBar';
import { FlightBufferTimeline } from '../components/FlightBufferTimeline';
import { FilteringAuditMatrix } from '../components/FilteringAuditMatrix';
import { ThemeDressCodeCard } from '../components/ThemeDressCodeCard';

describe('AgentMindTrace Suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders AgentMindTrace container and header correctly', () => {
    render(<AgentMindTrace />);
    expect(screen.getByText(/Personalized Schedule & Travel Buffer/i)).toBeDefined();
    expect(screen.getAllByText(/Add to Calendar \(\.ics\)/i).length).toBeGreaterThan(0);
  });

  it('renders ExecutionProgressBar sub-tasks', () => {
    render(<ExecutionProgressBar />);
    expect(screen.getByText('Schedule Optimized')).toBeDefined();
    expect(screen.getByText('Schedule Parsed')).toBeDefined();
    expect(screen.getByText('Divisions Filtered')).toBeDefined();
    expect(screen.getByText('Travel Buffer Calculated')).toBeDefined();
    expect(screen.getByText('Calendar Generated (.ics)')).toBeDefined();
  });

  it('renders FlightBufferTimeline buffer steps and time summary', () => {
    render(<FlightBufferTimeline />);
    expect(screen.getAllByText(/Recommended Arrival Time/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Total required buffer/i).length).toBeGreaterThan(0);
    expect(screen.getByText('First Event / Competition Staging Call')).toBeDefined();
    expect(screen.getByText('Warmup & Floor Check (60m)')).toBeDefined();
  });

  it('toggles tabs between all, included, and filtered sessions in FilteringAuditMatrix', () => {
    render(<FilteringAuditMatrix />);
    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();

    const filteredTabBtn = screen.getByRole('tab', { name: /Filtered Out/i });
    fireEvent.click(filteredTabBtn);

    expect(screen.getByText('Advanced & All-Star Jack & Jill')).toBeDefined();
    expect(screen.getByText(/User selected Novice/i)).toBeDefined();

    const includedTabBtn = screen.getByRole('tab', { name: /Matched/i });
    fireEvent.click(includedTabBtn);

    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();
    expect(screen.queryByText('Advanced & All-Star Jack & Jill')).toBeNull();

    const allTabBtn = screen.getByRole('tab', { name: /Full Schedule/i });
    fireEvent.click(allTabBtn);
    expect(screen.getByText('Novice Jack & Jill Prelims')).toBeDefined();
    expect(screen.getByText('Advanced & All-Star Jack & Jill')).toBeDefined();
  });

  it('renders ThemeDressCodeCard items and recommendations', () => {
    render(<ThemeDressCodeCard />);
    expect(screen.getByText('Event Themes & Dress Codes')).toBeDefined();
    expect(screen.getByText(/Neon \/ UV Glow Late Night Party/i)).toBeDefined();
    expect(screen.getByText(/Pro Showcase Gala & Dressy Glam/i)).toBeDefined();
    expect(screen.getByText(/WSDC Competition Dress Code/i)).toBeDefined();
  });

  it('triggers downloadIcsFile and displays visual toast notification', () => {
    const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    render(<AgentMindTrace />);
    const downloadBtns = screen.getAllByRole('button', { name: /Add to Calendar \(\.ics\)/i });
    fireEvent.click(downloadBtns[0]);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(screen.getByText('Calendar Downloaded (.ics)')).toBeDefined();
    expect(screen.getByText(/wcs-navigator-schedule\.ics/i)).toBeDefined();
  });
});

