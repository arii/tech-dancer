import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DecisionDebugInspector } from '../components/DecisionDebugInspector';
import { AgentDecisionTrace } from '../types';

describe('DecisionDebugInspector Suite', () => {
  afterEach(() => {
    cleanup();
  });

  const mockDecisionTrace: AgentDecisionTrace = {
    eventName: 'The Aloha Open 2026',
    sessions: [
      {
        id: 's1',
        title: 'Intermediate Strictly Swing Preliminaries',
        time: 'Friday 5:30 PM - 6:45 PM',
        location: 'Grand Ballroom',
        category: 'competition',
        status: 'included',
        decisionBadge: 'Competition Call',
        justification: 'Division match for Intermediate. Marshalling call on time.',
      },
      {
        id: 's2',
        title: 'Novice Strictly Swing Preliminaries',
        time: 'Friday 4:00 PM - 5:15 PM',
        location: 'Grand Ballroom',
        category: 'competition',
        status: 'filtered',
        decisionBadge: 'Not Competing',
        justification: 'Filtered out because user entered Intermediate division.',
      },
    ],
    bufferTimeline: {
      earliestStagingTime: '5:00 PM Friday',
      latestFlightArrivalDeadline: '2:15 PM Friday',
      transitMinutes: 30,
      hotelSettleMinutes: 90,
      warmupMinutes: 45,
      steps: [],
    },
    themeDressCodes: [],
    icsContent: '',
  };

  const mockTelemetry = {
    endpoint: 'http://localhost:8000/api/v1/generate',
    method: 'POST',
    timestamp: '2026-08-28T19:15:00.000Z',
    durationMs: 342,
    engine: 'FastAPI / Gemini-2.5-Pro Stage 2 Optimization',
    httpStatus: 200,
    requestPayload: { workshop_level: 'intermediate' },
    responsePayload: { status: 'success' },
  };

  it('renders inspector header, confirmed inputs, and tab navigation', () => {
    render(
      <DecisionDebugInspector
        eventName="The Aloha Open 2026"
        confirmedDivision="intermediate"
        confirmedRole="lead"
        answers={{ workshop_level: 'intermediate', competition_divisions: ['intermediate'] }}
        telemetry={mockTelemetry}
        decisionTrace={mockDecisionTrace}
      />
    );

    expect(screen.getByText('Agent Decision Logic & Taskmaker Telemetry')).toBeDefined();
    expect(screen.getByText('INTERMEDIATE')).toBeDefined();
    expect(screen.getByText('LEAD')).toBeDefined();
    expect(screen.getByText('workshop_level')).toBeDefined();
  });

  it('switches to Gateway & Engine Telemetry tab and inspects service trace', () => {
    render(
      <DecisionDebugInspector
        eventName="The Aloha Open 2026"
        confirmedDivision="intermediate"
        answers={{ workshop_level: 'intermediate' }}
        telemetry={mockTelemetry}
        decisionTrace={mockDecisionTrace}
      />
    );

    const telemetryTabBtn = screen.getByRole('button', { name: /2\. Gateway & Engine/i });
    fireEvent.click(telemetryTabBtn);

    expect(screen.getByText('342 ms')).toBeDefined();
    expect(screen.getByText('FastAPI / Gemini-2.5-Pro Stage 2 Optimization')).toBeDefined();
    expect(screen.getByText('HTTP 200')).toBeDefined();
  });

  it('switches to Rule Engine Audit tab and searches justifications', () => {
    render(
      <DecisionDebugInspector
        eventName="The Aloha Open 2026"
        confirmedDivision="intermediate"
        answers={{ workshop_level: 'intermediate' }}
        telemetry={mockTelemetry}
        decisionTrace={mockDecisionTrace}
      />
    );

    const filterTabBtn = screen.getByRole('button', { name: /3\. Rule Engine Audit/i });
    fireEvent.click(filterTabBtn);

    expect(screen.getByText('Intermediate Strictly Swing Preliminaries')).toBeDefined();
    expect(screen.getByText('Novice Strictly Swing Preliminaries')).toBeDefined();
    expect(screen.getByText(/Filtered out because user entered Intermediate division/i)).toBeDefined();

    // Search filter
    const searchInput = screen.getByPlaceholderText(/Search audit sessions/i);
    fireEvent.change(searchInput, { target: { value: 'Novice' } });

    expect(screen.getByText('Novice Strictly Swing Preliminaries')).toBeDefined();
    expect(screen.queryByText('Intermediate Strictly Swing Preliminaries')).toBeNull();
  });

  it('switches to Raw JSON Schemas tab and supports clipboard copy', () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <DecisionDebugInspector
        eventName="The Aloha Open 2026"
        confirmedDivision="intermediate"
        answers={{ workshop_level: 'intermediate' }}
        telemetry={mockTelemetry}
        decisionTrace={mockDecisionTrace}
      />
    );

    const jsonTabBtn = screen.getByRole('button', { name: /4\. Raw JSON Schemas/i });
    fireEvent.click(jsonTabBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy JSON/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalled();
  });

  it('renders default role indicator when confirmedRole is empty (no assumption)', () => {
    render(
      <DecisionDebugInspector
        eventName="The Aloha Open 2026"
        confirmedDivision="novice"
        confirmedRole=""
        answers={{ division: 'novice' }}
        telemetry={mockTelemetry}
        decisionTrace={mockDecisionTrace}
      />
    );

    expect(screen.getByText('NOVICE')).toBeDefined();
    expect(screen.getByText('None Specified (Universal)')).toBeDefined();
  });
});
