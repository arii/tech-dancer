import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

vi.mock('node:child_process', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:child_process')>();
  const viFn = vi.fn().mockReturnValue('mocked-git-sha\n');
  return {
    ...actual,
    execSync: viFn,
    default: {
      ...actual,
      execSync: viFn,
    }
  };
});

import * as child_process from 'node:child_process';
import { generateAgentContext, primeAgentContext } from '../../scripts/agent-prime.mjs';

describe('agent-prime.mjs', () => {
  let tmpDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-prime-test-'));
    originalCwd = process.cwd();
    process.chdir(tmpDir);
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('generateAgentContext', () => {
    it('returns context with valid git and package data', () => {
      fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({ name: 'mocked-pkg-name' }));

      vi.mocked(child_process.execSync).mockImplementation((_cmd: unknown, _opts?: unknown) => {
        if (_cmd === 'git rev-parse HEAD:boomtick-pkg') return 'mocked-submodule-sha\n';
        if (_cmd === 'git rev-parse HEAD') return 'mocked-git-sha\n';
        return '';
      });

      const context = generateAgentContext(tmpDir);
      expect(context.gitCommit).toBe('mocked-git-sha');
      expect(context.submodules['boomtick-pkg']).toBe('mocked-submodule-sha');
      expect(context.packageName).toBe('mocked-pkg-name');
    });

    it('handles git failure gracefully and logs fallback', () => {
      vi.mocked(child_process.execSync).mockImplementation(() => {
        throw new Error('git error');
      });

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const context = generateAgentContext(tmpDir);
      expect(context.gitCommit).toBe('unknown');
      expect(context.submodules['boomtick-pkg']).toBe('unknown');
      expect(context.packageName).toBe('tech-dancer');

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('handles JSON parse error gracefully and logs warning', () => {
      fs.writeFileSync(path.join(tmpDir, 'package.json'), 'invalid-json');

      vi.mocked(child_process.execSync).mockImplementation((_cmd: unknown) => {
        return 'mocked-git-sha\n';
      });

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const context = generateAgentContext(tmpDir);
      expect(context.packageName).toBe('tech-dancer');

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('handles missing name property in package.json and logs warning', () => {
      fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({}));

      vi.mocked(child_process.execSync).mockImplementation((_cmd: unknown) => {
        return 'mocked-git-sha\n';
      });

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const context = generateAgentContext(tmpDir);
      expect(context.packageName).toBe('tech-dancer'); // defaults to tech-dancer

      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('The "name" property is missing'));

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('handles empty package.json gracefully', () => {
      fs.writeFileSync(path.join(tmpDir, 'package.json'), '');

      vi.mocked(child_process.execSync).mockImplementation((_cmd: unknown) => {
        return 'mocked-git-sha\n';
      });

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const context = generateAgentContext(tmpDir);
      expect(context.packageName).toBe('tech-dancer');

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('primeAgentContext', () => {
    it('writes context to .agent-context.json', () => {
      vi.mocked(child_process.execSync).mockImplementation((_cmd: unknown) => {
        return 'mocked-git-sha\n';
      });

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const context = primeAgentContext(tmpDir);

      const outputPath = path.join(tmpDir, '.agent-context.json');
      expect(fs.existsSync(outputPath)).toBe(true);

      const writtenData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

      // Remove updatedAt for stable comparison
      delete writtenData.updatedAt;
      const expectedContext = { ...context };
      delete expectedContext.updatedAt;

      expect(writtenData).toEqual(expectedContext);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Updated .agent-context.json successfully'));

      consoleSpy.mockRestore();
    });
  });
});
