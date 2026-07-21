import { describe, it, expect, vi } from 'vitest';
import { waitForPageReady } from '../utils/visual-helpers';

describe('waitForPageReady helper', () => {
  it('executes setup pipeline without throwing', async () => {
    const mockPage = {
      waitForSelector: vi.fn().mockResolvedValue(undefined),
      addStyleTag: vi.fn().mockResolvedValue(undefined),
      evaluate: vi.fn().mockResolvedValue(undefined),
      waitForTimeout: vi.fn().mockResolvedValue(undefined),
    } as any;

    await expect(
      waitForPageReady(mockPage, { mainSelector: 'main', timeout: 5000 })
    ).resolves.not.toThrow();

    expect(mockPage.waitForSelector).toHaveBeenCalledWith('main', {
      state: 'visible',
      timeout: 5000,
    });
    expect(mockPage.addStyleTag).toHaveBeenCalledOnce();
    expect(mockPage.evaluate).toHaveBeenCalledTimes(2);
  });
});
