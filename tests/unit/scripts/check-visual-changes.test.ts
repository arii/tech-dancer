import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const VISUAL_SUMMARY_PATH = path.join(process.cwd(), 'artifacts/visual-review/summary.json');

describe('check-visual-changes script', () => {
  beforeEach(() => {
    vi.resetModules();
    if (fs.existsSync(VISUAL_SUMMARY_PATH)) {
      fs.unlinkSync(VISUAL_SUMMARY_PATH);
    }
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return 0 if summary file does not exist', async () => {
    await import('../../../scripts/check-visual-changes');
    expect(process.stdout.write).toHaveBeenCalledWith('changed_routes=0\n');
  });

  it('should count routes with difference > 1.5', async () => {
    const mockSummary = {
      routes: [
        { route: '/1', differencePercent: 1.0 },
        { route: '/2', differencePercent: 2.0 },
        { route: '/3', differencePercent: 1.5 },
        { route: '/4', differencePercent: 5.0 }
      ]
    };
    fs.mkdirSync('artifacts/visual-review', { recursive: true });
    fs.writeFileSync(VISUAL_SUMMARY_PATH, JSON.stringify(mockSummary));

    await import('../../../scripts/check-visual-changes');
    // Since it's an async script, we might need a small wait or check multiple times if using dynamic import
    // But Vitest + dynamic import usually works synchronously in terms of the module side-effect if not top-level awaited inside the script
    // However, the script DOES have top-level await now.

    // Wait for the promise to resolve
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(process.stdout.write).toHaveBeenCalledWith('changed_routes=2\n');
  });

  it('should return 0 and log error on invalid JSON', async () => {
    fs.mkdirSync('artifacts/visual-review', { recursive: true });
    fs.writeFileSync(VISUAL_SUMMARY_PATH, 'invalid json');

    await import('../../../scripts/check-visual-changes');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(process.stdout.write).toHaveBeenCalledWith('changed_routes=0\n');
    expect(console.error).toHaveBeenCalled();
  });
});
