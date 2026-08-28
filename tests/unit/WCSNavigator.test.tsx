import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CALIFORNIA_2026_EVENTS } from '@/features/wcs-navigator/data/californiaEvents';
import { DANCE_PERSONAS } from '@/features/wcs-navigator/data/personas';
import { EventSelector } from '@/features/wcs-navigator/components/EventSelector';
import { PersonaChips } from '@/features/wcs-navigator/components/PersonaChips';
import { DropzoneUpload } from '@/features/wcs-navigator/components/DropzoneUpload';
import { EventSearchHero } from '@/features/wcs-navigator/components/EventSearchHero';
import { WorkflowExplainer } from '@/features/wcs-navigator/components/WorkflowExplainer';
import { WCSNavigatorPage } from '@/features/wcs-navigator/WCSNavigatorPage';

afterEach(() => {
  cleanup();
});

describe('WCS Navigator Data Fixtures', () => {
  it('contains 5 California 2026 events', () => {
    expect(CALIFORNIA_2026_EVENTS).toHaveLength(5);
    const names = CALIFORNIA_2026_EVENTS.map(e => e.name);
    expect(names).toContain('South Bay Dance Fling');
    expect(names).toContain('Boogie by the Bay');
    expect(names).toContain('Halloween SwingThing');
    expect(names).toContain('The Open (US Open Swing Dance Championships)');
    expect(names).toContain('The After Party');
  });

  it('contains 4 social dance personas', () => {
    expect(DANCE_PERSONAS).toHaveLength(4);
    const names = DANCE_PERSONAS.map(p => p.name);
    expect(names).toContain('Novice Competitor');
    expect(names).toContain('Int/Adv Competitor');
    expect(names).toContain('Pure Social Dancer');
    expect(names).toContain('Workshop Enthusiast');
  });
});

describe('WCS Navigator Components', () => {
  it('renders EventSelector and handles selection', () => {
    const handleSelect = vi.fn();
    render(
      <EventSelector
        selectedEventId={CALIFORNIA_2026_EVENTS[0].id}
        onSelectEvent={handleSelect}
      />
    );

    expect(screen.getByText('1. Select California 2026 Event Preset')).toBeTruthy();
    expect(screen.getAllByText('South Bay Dance Fling').length).toBeGreaterThan(0);

    const secondEventButton = screen.getByRole('button', { name: /Boogie by the Bay/i });
    fireEvent.click(secondEventButton);
    expect(handleSelect).toHaveBeenCalledWith(CALIFORNIA_2026_EVENTS[1]);
  });

  it('renders PersonaChips and handles selection', () => {
    const handleSelect = vi.fn();
    render(
      <PersonaChips
        selectedPersonaId={null}
        onSelectPersona={handleSelect}
      />
    );

    expect(screen.getByText('2. Select Social Dance Persona')).toBeTruthy();
    const noviceChip = screen.getByRole('button', { name: /Novice Competitor/i });
    fireEvent.click(noviceChip);
    expect(handleSelect).toHaveBeenCalledWith(DANCE_PERSONAS[0]);
  });

  it('handles DropzoneUpload PDF and URL validation', () => {
    const onIngestPdf = vi.fn();
    const onIngestUrl = vi.fn();

    render(
      <DropzoneUpload
        onIngestPdf={onIngestPdf}
        onIngestUrl={onIngestUrl}
      />
    );

    const input = screen.getByPlaceholderText('https://event.com/schedule');
    const submitBtn = screen.getByRole('button', { name: /Fetch & Ingest URL/i });

    fireEvent.change(input, { target: { value: 'https://southbaydancefling.com/schedule' } });
    fireEvent.click(submitBtn);

    expect(onIngestUrl).toHaveBeenCalledWith('https://southbaydancefling.com/schedule');
  });

  it('renders EventSearchHero and handles preset discovery trigger', () => {
    const onDiscoverPreset = vi.fn();
    const onDiscoverPdf = vi.fn();
    const onDiscoverUrl = vi.fn();

    render(
      <EventSearchHero
        onDiscoverPreset={onDiscoverPreset}
        onDiscoverPdf={onDiscoverPdf}
        onDiscoverUrl={onDiscoverUrl}
      />
    );

    expect(screen.getByText('What event are you attending?')).toBeTruthy();
    const eventBtn = screen.getByRole('button', { name: 'Boogie by the Bay' });
    fireEvent.click(eventBtn);

    const planBtn = screen.getByRole('button', { name: /Plan My Weekend/i });
    fireEvent.click(planBtn);

    expect(onDiscoverPreset).toHaveBeenCalled();
  });

  it('renders WorkflowExplainer and closes on hide details click', () => {
    const onClose = vi.fn();
    render(<WorkflowExplainer onClose={onClose} />);

    expect(screen.getByText('How WCS Navigator Works')).toBeTruthy();
    expect(screen.getByText('Step 1: Schedule Reading')).toBeTruthy();
    expect(screen.getByText('Step 2: Buffer Calculation')).toBeTruthy();
    expect(screen.getByText('Step 3: Calendar Sync')).toBeTruthy();

    const hideBtn = screen.getByRole('button', { name: /Hide Details/i });
    fireEvent.click(hideBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders WCSNavigatorPage end-to-end and navigates through wizard steps', async () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <WCSNavigatorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('WCS Navigator')).toBeTruthy();
    expect(screen.getByText('Demo Data')).toBeTruthy();

    // Mode Toggle
    const modeBtn = screen.getByRole('button', { name: /Demo Data/i });
    fireEvent.click(modeBtn);
    expect(screen.getByText('Live Data')).toBeTruthy();

    // Select Boogie by the Bay and trigger plan
    const eventBtn = screen.getByRole('button', { name: 'Boogie by the Bay' });
    fireEvent.click(eventBtn);

    const planBtn = screen.getByRole('button', { name: /Plan My Weekend/i });
    fireEvent.click(planBtn);

    // Agent Pre-scanning transition should appear
    expect(screen.getByText(/Agent Pre-Scanning Schedule/i)).toBeTruthy();

    // Fast forward timer to complete discovery pass
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Select West Coast Swing checkbox on Step 1 (for Boogie by the Bay)
    const wcsCheckbox = screen.getByRole('checkbox', { name: /West Coast Swing/i });
    fireEvent.click(wcsCheckbox);

    // Step 1 -> Step 2
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));
    // Step 2 -> Step 3
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));

    // Click "Generate Calendar" on final step to advance to Step 3: results
    const generateBtn = screen.getByRole('button', { name: /Generate Calendar/i });
    fireEvent.click(generateBtn);

    // Should render Agent Mind Trace results
    expect(screen.getByText('Personalized Schedule & Travel Buffer')).toBeTruthy();
    expect(screen.getByText('First Event / Competition Staging Call')).toBeTruthy();
    expect(screen.getAllByText('Add to Calendar (.ics)').length).toBeGreaterThan(0);

    vi.useRealTimers();
  });
});
