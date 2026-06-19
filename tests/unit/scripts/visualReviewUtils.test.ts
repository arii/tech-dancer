import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { getLatestPRComment, extractReviewState, formatReviewState } from '../../../scripts/lib/visualReviewUtils';
import { ReviewState } from '../../../scripts/lib/codeReviewTypes';

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
      { id: 1, body: 'Some other comment', user: { type: 'User' }, created_at: '2024-01-01T00:00:00Z' },
      { id: 2, body: '## Test Report\nContent', user: { type: 'Bot' }, created_at: '2024-01-01T00:01:00Z' },
      { id: 3, body: '## Other Report\nContent', user: { type: 'Bot' }, created_at: '2024-01-01T00:02:00Z' },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toEqual({ id: 2, body: '## Test Report\nContent', user: { type: 'Bot' }, created_at: '2024-01-01T00:01:00Z' });
  });

  it('returns the latest comment when multiple exist', async () => {
    const mockComments = [
      { id: 2, body: '## Test Report\nOld Content', user: { type: 'Bot' }, created_at: '2024-01-01T00:01:00Z' },
      { id: 4, body: '## Test Report\nNew Content', user: { type: 'Bot' }, created_at: '2024-01-01T00:05:00Z' },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result?.id).toBe(4);
    expect(result?.body).toContain('New Content');
  });

  it('returns null if no matching comment is found', async () => {
    const mockComments = [
      { id: 1, body: 'Some other comment', user: { type: 'User' }, created_at: '2024-01-01T00:00:00Z' },
    ];

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as Mock).mockRejectedValue(new Error('Network error'));

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });

  it('handles non-OK responses gracefully', async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await getLatestPRComment('Test Report');
    expect(result).toBeNull();
  });
});

describe('ReviewState persistence', () => {
  it('correctly encodes and extracts state', () => {
    const mockState: ReviewState = {
      count: 5,
      lastSha: 'abc1234',
      history: [
        { sha: 'abc1234', verdict: 'pass', timestamp: '2024-01-01T00:00:00Z' }
      ]
    };

    const formatted = formatReviewState(mockState);
    expect(formatted).toContain('<!-- ai-review-state: ');

    const body = `Some prefix content\n${formatted}\nSome suffix content`;
    const extracted = extractReviewState(body);

    expect(extracted).toEqual(mockState);
  });

  it('returns null if state tag is missing', () => {
    const extracted = extractReviewState('No state here');
    expect(extracted).toBeNull();
  });

  it('returns null if state tag is malformed', () => {
    const extracted = extractReviewState('<!-- ai-review-state: invalid-base64!!! -->');
    expect(extracted).toBeNull();
  });
});
