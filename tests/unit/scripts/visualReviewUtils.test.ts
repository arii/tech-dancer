import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLatestPRComment } from '../../../scripts/lib/visualReviewUtils';

describe('getLatestPRComment', () => {
  const mockToken = 'mock-token';
  const mockRepo = 'owner/repo';
  const mockPrNumber = '123';

  beforeEach(() => {
    vi.stubEnv('GITHUB_TOKEN', mockToken);
    vi.stubEnv('GITHUB_REPOSITORY', mockRepo);
    vi.stubEnv('PR_NUMBER', mockPrNumber);

    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('returns null if environment variables are missing', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');
    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });

  it('returns the correct comment when it exists', async () => {
    const mockComments = [
      { id: 1, body: 'Some other comment', user: { type: 'User' } },
      { id: 2, body: '## Test Report\nContent', user: { type: 'Bot' } },
      { id: 3, body: '## Other Report\nContent', user: { type: 'Bot' } },
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toEqual({ id: 2, body: '## Test Report\nContent', user: { type: 'Bot' } });
  });

  it('returns null if no matching comment is found', async () => {
    const mockComments = [
      { id: 1, body: 'Some other comment', user: { type: 'User' } },
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });

  it('handles non-OK responses gracefully', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });
});
