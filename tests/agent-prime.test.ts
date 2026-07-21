import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, unlinkSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { generateAgentContext, primeAgentContext } from '../scripts/agent-prime.mjs';

describe('agent:prime indexing logic', () => {
  const testDir = resolve(tmpdir(), `agent-prime-test-${Date.now()}`);

  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
    writeFileSync(resolve(testDir, 'package.json'), JSON.stringify({ name: 'test-repo' }), 'utf8');
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it('generates structured context object without throwing', () => {
    const context = generateAgentContext(testDir);
    expect(context.packageName).toBe('test-repo');
    expect(context).toHaveProperty('updatedAt');
    expect(context).toHaveProperty('gitCommit');
    expect(context).toHaveProperty('submodules');
  });

  it('writes .agent-context.json to target directory', () => {
    const context = primeAgentContext(testDir);
    const targetFile = resolve(testDir, '.agent-context.json');

    expect(existsSync(targetFile)).toBe(true);
    const writtenData = JSON.parse(readFileSync(targetFile, 'utf8'));
    expect(writtenData.packageName).toBe('test-repo');
    expect(writtenData.version).toBe('1.0.0');
  });
});
