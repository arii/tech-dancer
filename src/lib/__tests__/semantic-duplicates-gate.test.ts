import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SCRIPTS_DIR = path.join(ROOT, 'scripts');
const DETECTOR_SCRIPT = path.join(SCRIPTS_DIR, 'detect-semantic-duplicates.mjs');
const ORIGINAL_BASELINE = path.join(ROOT, 'src/config/semantic-duplicates-baseline.json');

describe('Semantic Duplicate Gate Integration', () => {
  let originalBaselineContent = null;

  beforeEach(() => {
    if (fs.existsSync(ORIGINAL_BASELINE)) {
      originalBaselineContent = fs.readFileSync(ORIGINAL_BASELINE, 'utf8');
    }
  });

  afterEach(() => {
    if (originalBaselineContent !== null) {
      fs.writeFileSync(ORIGINAL_BASELINE, originalBaselineContent);
    } else if (fs.existsSync(ORIGINAL_BASELINE)) {
      fs.unlinkSync(ORIGINAL_BASELINE);
    }
  });

  it('should pass when duplicates are within baseline', () => {
    // Set baseline to 100 to ensure it passes
    fs.writeFileSync(ORIGINAL_BASELINE, JSON.stringify({ baseline: 100 }));

    try {
      const output = execSync(`node ${DETECTOR_SCRIPT} --gate`, { encoding: 'utf8' });
      expect(output).toContain('✅ Semantic Duplicate Gate Passed.');
    } catch (error) {
      console.error(error.stdout);
      throw error;
    }
  });

  it('should fail when duplicates exceed baseline', () => {
    // Set baseline to -1 to ensure it fails
    fs.writeFileSync(ORIGINAL_BASELINE, JSON.stringify({ baseline: -1 }));

    try {
      execSync(`node ${DETECTOR_SCRIPT} --gate`, { encoding: 'utf8', stdio: 'pipe' });
      throw new Error('Should have failed');
    } catch (err) {
      const error = err as { status: number; stderr: string };
      expect(error.status).toBe(1);
      expect(error.stderr).toContain('❌ Semantic Duplicate Gate Failed');
    }
  });
});
