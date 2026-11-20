import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WCSNavigatorPage } from './WCSNavigatorPage';
import { discoverSchedule } from './services/wcsApiClient';
import { MOCK_EVENT_RESULTS } from './data/mockResults';
import { CALIFORNIA_2026_EVENTS } from './data/californiaEvents';

vi.mock('./services/wcsApiClient', () => ({ discoverSchedule: vi.fn(), generateSchedule: vi.fn() }));
vi.mock('@/components/SEO', () => ({ SEO: () => null }));
vi.mock('./hooks/useNavigatorStorage', () => ({ useNavigatorStorage: () => ({ saveDraftDebounced: vi.fn() }) }));
vi.mock('./components/EventSearchHero', () => ({
  EventSearchHero: ({ onDiscoverUrl, onDiscoverPreset }: {
    onDiscoverUrl: (url: string) => void;
    onDiscoverPreset: (event: typeof CALIFORNIA_2026_EVENTS[number]) => void;
  }) => (
    <div>
      <button onClick={() => onDiscoverUrl('https://example.com/my-event')}>Upload schedule URL</button>
      <button onClick={() => onDiscoverPreset(CALIFORNIA_2026_EVENTS[0])}>Choose sample preset</button>
    </div>
  ),
}));
vi.mock('./components/AgentDiscoveryTransition', () => ({
  AgentDiscoveryTransition: ({ onComplete, isAsyncLoading }: { onComplete: () => void; isAsyncLoading: boolean }) => (
    <button disabled={isAsyncLoading} onClick={onComplete}>Finish discovery</button>
  ),
}));
vi.mock('./components/DynamicQuestionnaire', () => ({ DynamicQuestionnaire: () => <div>Preference questions</div> }));
vi.mock('./components/AgentMindTrace', () => ({ AgentMindTrace: () => <div>Schedule results</div> }));

const mockData = MOCK_EVENT_RESULTS['south-bay-dance-fling-2026'];

beforeEach(() => {
  vi.mocked(discoverSchedule).mockResolvedValue({ ...mockData, source: 'client_heuristic', errorReason: 'Gateway offline' });
});
afterEach(() => { cleanup(); vi.clearAllMocks(); });

async function finishUpload() {
  fireEvent.click(screen.getByText('Upload schedule URL'));
  await waitFor(() => expect((screen.getByText('Finish discovery') as HTMLButtonElement).disabled).toBe(false));
  fireEvent.click(screen.getByText('Finish discovery'));
}

describe('custom schedule fallback choice', () => {
  it('blocks questions and schedule results until the synthesized draft is explicitly accepted', async () => {
    render(<WCSNavigatorPage />);
    await finishUpload();
    expect(screen.queryByText('Preference questions')).toBeNull();
    expect(screen.queryByText('Schedule results')).toBeNull();
    expect(screen.getByText(/not verified against your uploaded schedule/)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'Use unverified synthesized draft' }));
    expect(screen.getByText('Preference questions')).toBeDefined();
  });

  it('allows choosing a preset instead and clears the upload fallback', async () => {
    render(<WCSNavigatorPage />);
    await finishUpload();
    fireEvent.click(screen.getByRole('button', { name: 'South Bay Dance Fling' }));
    fireEvent.click(screen.getByText('Finish discovery'));
    expect(screen.getByText('Preference questions')).toBeDefined();
    expect(screen.queryByRole('region', { name: 'Live gateway fallback notification' })).toBeNull();
  });

  it('allows retrying without accepting or opening the questionnaire', async () => {
    render(<WCSNavigatorPage />);
    await finishUpload();
    fireEvent.click(screen.getByRole('button', { name: 'Retry Upload' }));
    expect(screen.getByText('Upload schedule URL')).toBeDefined();
    expect(screen.queryByText('Preference questions')).toBeNull();
    await finishUpload();
    expect(screen.getByRole('button', { name: 'Use unverified synthesized draft' })).toBeDefined();
  });

  it('never reuses the previous schedule if discovery itself fails', async () => {
    vi.mocked(discoverSchedule).mockRejectedValue(new Error('Extraction failed'));
    render(<WCSNavigatorPage />);
    await finishUpload();
    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.queryByText('Preference questions')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Try another schedule' }));
    expect(screen.getByText('Upload schedule URL')).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'Choose sample preset' }));
    fireEvent.click(screen.getByText('Finish discovery'));
    expect(screen.getByText('Preference questions')).toBeDefined();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('does not require fallback approval for a live discovery response', async () => {
    vi.mocked(discoverSchedule).mockResolvedValue({ ...mockData, source: 'live_api' });
    render(<WCSNavigatorPage />);
    await finishUpload();
    expect(screen.getByText('Preference questions')).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Use unverified synthesized draft' })).toBeNull();
  });
});
