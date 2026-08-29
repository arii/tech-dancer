import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { DynamicQuestionnaire } from '../components/DynamicQuestionnaire';
import { AgentMindTrace } from '../components/AgentMindTrace';
import bbbFixture from '../../../../wcs_navigator_api/tests/fixtures/bbb_2026.json';
import halloweenFixture from '../../../../wcs_navigator_api/tests/fixtures/halloween_2026.json';
import { DiscoveryResponse } from '../types/navigator';
import { AgentDecisionTrace } from '../types';
import { extractUserDivision, extractUserRole, adaptTraceToUserPreferences } from '../utils/scheduleRuleEngine';

describe('Frontend Integration & Compatibility Verification with California 2026 Fixtures', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Boogie by the Bay 2026 discovery payload directly in DynamicQuestionnaire', () => {
    const discoveryPayload = bbbFixture.discovery as unknown as DiscoveryResponse;
    render(<DynamicQuestionnaire discoveryResponse={discoveryPayload} />);

    expect(screen.getByText('What is your dancer persona & competition division?')).toBeDefined();
    expect(screen.getByText('Novice Competitor')).toBeDefined();
  });

  it('renders Boogie by the Bay 2026 decision trace directly in AgentMindTrace', () => {
    const tracePayload = bbbFixture.generate.decisionTrace as unknown as AgentDecisionTrace;
    render(<AgentMindTrace trace={tracePayload} activeEventName="Boogie by the Bay" />);

    expect(screen.getByText(/Profile:/i)).toBeDefined();
    expect(screen.getByText('Novice Strictly Swing - Prelims')).toBeDefined();
    expect(screen.getAllByText(/Friday Glow Party/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Saturday Showcase Gala/i).length).toBeGreaterThan(0);
  });

  it('renders Halloween SwingThing 2026 discovery payload directly in DynamicQuestionnaire', () => {
    const discoveryPayload = halloweenFixture.discovery as unknown as DiscoveryResponse;
    render(<DynamicQuestionnaire discoveryResponse={discoveryPayload} />);

    expect(screen.getByText('What is your dancer persona & competition division?')).toBeDefined();
    expect(screen.getByText('Social Dancer Only')).toBeDefined();
  });

  it('renders Halloween SwingThing 2026 decision trace directly in AgentMindTrace', () => {
    const tracePayload = halloweenFixture.generate.decisionTrace as unknown as AgentDecisionTrace;
    render(<AgentMindTrace trace={tracePayload} activeEventName="Halloween SwingThing" />);

    expect(screen.getByText(/Profile:/i)).toBeDefined();
    expect(screen.getAllByText(/Friday Spooktacular Social Dance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Saturday Night Costume Contest/i).length).toBeGreaterThan(0);
  });

  it('correctly extracts Intermediate division from dynamic backend questions (workshop_level / competition_divisions)', () => {
    const answers1 = { workshop_level: 'intermediate', competition_divisions: ['intermediate'] };
    expect(extractUserDivision(answers1)).toBe('intermediate');

    const answers2 = { competition_division: 'intermediate_strictly' };
    expect(extractUserDivision(answers2)).toBe('intermediate');

    const rawTrace = bbbFixture.generate.decisionTrace as unknown as AgentDecisionTrace;
    const adapted = adaptTraceToUserPreferences(rawTrace, answers1, 'The Aloha Open 2026');
    const strictlySession = adapted.sessions.find((s) => s.title.includes('Strictly'));
    expect(strictlySession?.title).toContain('Intermediate');
  });

  it('correctly handles local commuter arrival target and does not assume dance role without user confirmation', () => {
    const userAnswers = {
      intensive: 'no_intensives',
      division: 'novice',
      arrival: 'local',
      track: 'competitor_workshops',
    };

    // Role should not be assumed
    expect(extractUserRole(userAnswers)).toBe('');

    // Target landing should adapt to Local Commute
    const rawTrace = bbbFixture.generate.decisionTrace as unknown as AgentDecisionTrace;
    const adapted = adaptTraceToUserPreferences(rawTrace, userAnswers, 'Boogie by the Bay 2026');
    expect(adapted.bufferTimeline?.latestFlightArrivalDeadline).toBe('Local Commute (Drive-In)');
    const localStep = adapted.bufferTimeline?.steps.find(
      (s) => s.type === 'transit' || s.type === 'flight' || s.label.includes('Local')
    );
    expect(localStep?.label).toBe('Local Hotel / Venue Arrival Buffer');

    // Intensive attendees get 12:00 PM landing target
    const intensiveAnswers = { intensive: 'yes', arrival: 'early_afternoon' };
    const adaptedIntensive = adaptTraceToUserPreferences(rawTrace, intensiveAnswers, 'Boogie by the Bay 2026');
    expect(adaptedIntensive.bufferTimeline?.latestFlightArrivalDeadline).toBe('12:00 PM Friday');
  });
});
