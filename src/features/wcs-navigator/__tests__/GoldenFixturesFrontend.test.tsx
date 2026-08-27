import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { DynamicQuestionnaire } from '../components/DynamicQuestionnaire';
import { AgentMindTrace } from '../components/AgentMindTrace';
import bbbFixture from '../../../../wcs_navigator_api/tests/fixtures/bbb_2026.json';
import halloweenFixture from '../../../../wcs_navigator_api/tests/fixtures/halloween_2026.json';
import { DiscoveryResponse } from '../types/navigator';
import { AgentDecisionTrace } from '../types';

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
    render(<AgentMindTrace trace={tracePayload} />);

    expect(screen.getByText('Personalized Schedule & Travel Buffer')).toBeDefined();
    expect(screen.getByText('Novice Strictly Swing - Prelims')).toBeDefined();
    expect(screen.getByText('Friday Glow Party')).toBeDefined();
    expect(screen.getByText('Saturday Showcase Gala')).toBeDefined();
  });

  it('renders Halloween SwingThing 2026 discovery payload directly in DynamicQuestionnaire', () => {
    const discoveryPayload = halloweenFixture.discovery as unknown as DiscoveryResponse;
    render(<DynamicQuestionnaire discoveryResponse={discoveryPayload} />);

    expect(screen.getByText('What is your dancer persona & competition division?')).toBeDefined();
    expect(screen.getByText('Social Dancer Only')).toBeDefined();
  });

  it('renders Halloween SwingThing 2026 decision trace directly in AgentMindTrace', () => {
    const tracePayload = halloweenFixture.generate.decisionTrace as unknown as AgentDecisionTrace;
    render(<AgentMindTrace trace={tracePayload} />);

    expect(screen.getByText('Personalized Schedule & Travel Buffer')).toBeDefined();
    expect(screen.getByText('Friday Spooktacular Social Dance')).toBeDefined();
    expect(screen.getByText('Saturday Night Costume Contest & Showcase Exhibition')).toBeDefined();
  });
});
