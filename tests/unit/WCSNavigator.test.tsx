import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CALIFORNIA_2026_EVENTS } from '@/features/wcs-navigator/data/californiaEvents';
import { DANCE_PERSONAS } from '@/features/wcs-navigator/data/personas';
import { EventSelector } from '@/features/wcs-navigator/components/EventSelector';
import { PersonaChips } from '@/features/wcs-navigator/components/PersonaChips';
import { DropzoneUpload } from '@/features/wcs-navigator/components/DropzoneUpload';
import { WCSNavigatorPage } from '@/features/wcs-navigator/WCSNavigatorPage';

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

  it('renders WCSNavigatorPage end-to-end', () => {
    render(
      <MemoryRouter>
        <WCSNavigatorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('WCS Navigator (California 2026)')).toBeTruthy();
    expect(screen.getByText('Mode: Mock Preset Mode')).toBeTruthy();

    const modeBtn = screen.getByRole('button', { name: /Mode: Mock Preset Mode/i });
    fireEvent.click(modeBtn);
    expect(screen.getByText('Mode: Live Backend API')).toBeTruthy();
  });
});
