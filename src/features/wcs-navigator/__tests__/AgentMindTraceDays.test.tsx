import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AgentMindTrace } from '../components/AgentMindTrace';
import type { AgentDecisionTrace, AuditSession, ThemeDressCode } from '../types';

const session = (id: string, time: string, status: AuditSession['status'] = 'included'): AuditSession => ({
  id, time, title: `Workshop ${id}`, location: 'Main room', status,
  decisionBadge: 'match', justification: 'Matches selected profile',
});
const theme = (day: string): ThemeDressCode => ({
  id: day, day, themeTitle: `${day} party`, category: 'social_theme',
  description: 'Evening social', recommendedAttire: ['dance shoes'], vibe: 'Relaxed',
});
const trace: Partial<AgentDecisionTrace> = {
  sessions: [session('thu', 'Thu 8 PM'), session('fri', 'Fri 9 AM'), session('sat', 'Sat 10 AM'), session('sun', 'Sun 11 AM'), session('other', 'TBD'), session('hidden', 'Fri noon', 'filtered')],
  themeDressCodes: ['Thursday', 'Friday', 'Saturday', 'Sunday'].map(theme),
};

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe('day-by-day itinerary rendering', () => {
  it.each([['all days', trace], ['empty plan', {}], ['theme-only Thursday', {themeDressCodes: [theme('Thursday')]}]])('preserves DOM for %s', (_label, plan) => {
    const { container } = render(<AgentMindTrace trace={plan} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('retains ordering, removes a session, and resets to the original plan', () => {
    render(<AgentMindTrace trace={trace} />);
    expect(screen.getAllByRole('heading', {level: 3}).map(el => el.textContent?.trim())).toEqual([
      'Thursday — Early Arrivals & Pre-Party', 'Friday — Arrival, Warmup & Prelims',
      'Saturday — Daytime Workshops & Champions Gala', 'Sunday — Intensive Masterclasses & Survivor Social',
      'Other Scheduled Sessions',
    ]);
    expect(screen.queryByText('Workshop hidden')).toBeNull();
    fireEvent.click(screen.getByRole('button', {name: 'Remove Workshop fri'}));
    expect(screen.queryByRole('button', {name: 'Remove Workshop fri'})).toBeNull();
    expect(screen.getByText(/No Friday sessions currently/)).toBeDefined();
    fireEvent.click(screen.getByRole('button', {name: 'Reset'}));
    expect(screen.getByRole('button', {name: 'Remove Workshop fri'})).toBeDefined();
  });

  it('keeps Thursday when only its theme exists but hides an empty optional day', () => {
    const { rerender } = render(<AgentMindTrace trace={{themeDressCodes: [theme('Thursday')]}} />);
    expect(screen.getByRole('heading', {name: /Thursday/})).toBeDefined();
    expect(screen.getByText('Thursday Theme: Thursday party')).toBeDefined();
    rerender(<AgentMindTrace trace={{}} />);
    expect(screen.queryByRole('heading', {name: /Thursday/})).toBeNull();
    expect(screen.queryByRole('heading', {name: 'Other Scheduled Sessions'})).toBeNull();
    expect(screen.getByText(/No Saturday sessions currently/)).toBeDefined();
    expect(screen.getByText(/No Sunday sessions currently/)).toBeDefined();
  });
});
