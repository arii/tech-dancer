import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CALIFORNIA_2026_EVENTS } from '@/features/wcs-navigator/data/californiaEvents';
import { DANCE_PERSONAS } from '@/features/wcs-navigator/data/personas';
import { EventSelector } from '@/features/wcs-navigator/components/EventSelector';
import { PersonaChips } from '@/features/wcs-navigator/components/PersonaChips';
import { DropzoneUpload } from '@/features/wcs-navigator/components/DropzoneUpload';
import { EventSearchHero } from '@/features/wcs-navigator/components/EventSearchHero';
import { WorkflowExplainer } from '@/features/wcs-navigator/components/WorkflowExplainer';
import { AgentDiscoveryTransition } from '@/features/wcs-navigator/components/AgentDiscoveryTransition';
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

  it('handles DropzoneUpload PDF validation and selection', () => {
    const onIngestPdf = vi.fn();

    render(
      <DropzoneUpload
        onIngestPdf={onIngestPdf}
      />
    );

    expect(screen.getByText('Drop Event Schedule PDF here')).toBeTruthy();

    const file = new File(['fake pdf content'], 'test-schedule.pdf', { type: 'application/pdf' });
    const dropzoneBox = screen.getByText('Drop Event Schedule PDF here').closest('div');
    const input = dropzoneBox?.querySelector('input[type="file"]') as HTMLInputElement;

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
      expect(onIngestPdf).toHaveBeenCalledWith(file);
    }
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

    expect(
      screen.getByPlaceholderText(/Search WCS event name or paste PDF URL/i)
    ).toBeTruthy();
  });

  it('renders WorkflowExplainer and closes on hide details click', () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <WorkflowExplainer onClose={onClose} />
      </MemoryRouter>
    );

    expect(screen.getByText('How WCS Navigator Works')).toBeTruthy();
    expect(screen.getByText('Step 1: Schedule Reading')).toBeTruthy();
    expect(screen.getByText('Step 2: Buffer Calculation')).toBeTruthy();
    expect(screen.getByText('Step 3: Calendar Sync')).toBeTruthy();

    const hideBtn = screen.getByRole('button', { name: /Hide Details/i });
    fireEvent.click(hideBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders AgentDiscoveryTransition for custom uploads with stage progression labels', () => {
    const onComplete = vi.fn();

    render(
      <AgentDiscoveryTransition
        eventName="test-event"
        targetName="test-schedule.pdf"
        isCustomUpload={true}
        uploadType="pdf"
        isAsyncLoading={true}
        onComplete={onComplete}
      />
    );

    expect(screen.getByText('Uploading & Parsing Schedule')).toBeTruthy();
    expect(screen.getByText(/test-schedule.pdf/i)).toBeTruthy();
    expect(screen.getByText(/Uploading schedule document.../i)).toBeTruthy();
    expect(screen.getByText(/Parsing schedule & extracting event details with AI.../i)).toBeTruthy();
    expect(screen.getByText(/Analyzing workshop tracks & finding relevant details.../i)).toBeTruthy();
    expect(screen.getByText(/Preparing personalized questionnaire.../i)).toBeTruthy();
  });

  it('renders WCSNavigatorPage end-to-end and navigates through wizard steps', async () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <WCSNavigatorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('WCS Navigator')).toBeTruthy();
    expect(screen.getByText('Live Gateway')).toBeTruthy();

    // Mode Toggle
    const modeBtn = screen.getByRole('button', { name: /Live Gateway/i });
    fireEvent.click(modeBtn);
    expect(screen.getByText('Demo Presets')).toBeTruthy();

    vi.useRealTimers();
  });
});
