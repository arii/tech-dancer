#!/usr/bin/env node
/**
 * check-types.mjs - ratcheted TypeScript checking.
 *
 * Why this exists: the root tsconfig.json is a solution-style file
 * ({ files: [], references: [...] }), so bare `tsc --noEmit` type-checks
 * ZERO files and always exits 0. The real projects (tsconfig.app.json,
 * tsconfig.node.json) currently have pre-existing errors, so this script
 * runs tsc against both projects and compares the output against
 * scripts/typecheck-baseline.json:
 *
 *   - any error NOT in the baseline  -> fail (new type errors are blocked)
 *   - baseline entries now gone      -> fail (run --update-baseline to
 *                                        shrink the baseline; stale entries
 *                                        are not allowed to linger)
 *   - exact match                    -> pass
 *
 * Regenerate the baseline after fixing errors:
 *   node scripts/check-types.mjs --update-baseline
 *
 * Errors are normalized to `path|TScode|message` (line/column numbers are
 * dropped) so unrelated edits above an error do not cause false failures.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASELINE_FILE = path.join(ROOT, 'scripts', 'typecheck-baseline.json');
const PROJECTS = ['tsconfig.app.json', 'tsconfig.node.json'];

const UPDATE = process.argv.includes('--update-baseline');

function runTsc(project) {
  try {
    const out = execFileSync(
      'npx',
      ['tsc', '--noEmit', '--pretty', 'false', '-p', project],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }
    );
    return out;
  } catch (err) {
    // tsc exits non-zero when it finds errors; that is the normal path here.
    if (typeof err.stdout === 'string') return err.stdout + (err.stderr || '');
    throw err;
  }
}

/**
 * Normalize tsc --pretty false output into stable entries.
 * Input line: src/foo.tsx(12,34): error TS2322: Type 'x' is not...
 * Normalized:  src/foo.tsx|TS2322|Type 'x' is not...
 * Related-information lines (indented, no "error TS") are ignored.
 */
function normalize(output, project) {
  const entries = [];
  for (const rawLine of output.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const m = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+): (.*)$/);
    if (m) {
      entries.push(`${m[1]}|${m[2]}|${m[3]}`);
    } else if (/ error TS\d+: /.test(line)) {
      // Errors without a file position (e.g. config-level TS6307/TS5097).
      const g = line.match(/error (TS\d+): (.*)$/);
      entries.push(`<global>|${g[1]}|${g[2]}`);
    }
  }
  entries.sort();
  return { project, entries };
}

function toCounts(entries) {
  const counts = {};
  for (const e of entries) counts[e] = (counts[e] || 0) + 1;
  return counts;
}

function diffMultisets(currentCounts, baselineCounts) {
  const newErrors = [];
  const fixedErrors = [];
  for (const [k, v] of Object.entries(currentCounts)) {
    const b = baselineCounts[k] || 0;
    for (let i = b; i < v; i++) newErrors.push(k);
  }
  for (const [k, v] of Object.entries(baselineCounts)) {
    const c = currentCounts[k] || 0;
    for (let i = c; i < v; i++) fixedErrors.push(k);
  }
  return { newErrors, fixedErrors };
}

function main() {
  const results = [];
  for (const project of PROJECTS) {
    const output = runTsc(project);
    const normalized = normalize(output, project);
    if (normalized.entries.length === 0 && /error/i.test(output) && !/error TS\d+/.test(output)) {
      console.error(`tsc failed unexpectedly for ${project}:\n${output.slice(0, 2000)}`);
      process.exit(2);
    }
    results.push(normalized);
  }

  if (UPDATE) {
    const baseline = {
      updatedAt: new Date().toISOString(),
      note: 'Ratchet baseline for scripts/check-types.mjs. Shrink-only: fix errors, then regenerate with node scripts/check-types.mjs --update-baseline. Do not add entries to absorb new errors.',
      projects: Object.fromEntries(results.map((r) => [r.project, r.entries]))
    };
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(baseline, null, 2) + '\n');
    const total = results.reduce((a, r) => a + r.entries.length, 0);
    console.log(`Baseline updated: ${total} known errors across ${PROJECTS.length} projects.`);
    return;
  }

  if (!fs.existsSync(BASELINE_FILE)) {
    console.error(`Missing ${path.relative(ROOT, BASELINE_FILE)}. Generate it with: node scripts/check-types.mjs --update-baseline`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));

  let failed = false;
  let totalKnown = 0;
  for (const r of results) {
    const baselineEntries = baseline.projects?.[r.project];
    if (!baselineEntries) {
      console.error(`Baseline has no entries for ${r.project}; regenerate with --update-baseline.`);
      failed = true;
      continue;
    }
    totalKnown += baselineEntries.length;
    const { newErrors, fixedErrors } = diffMultisets(toCounts(r.entries), toCounts(baselineEntries));
    if (newErrors.length) {
      failed = true;
      console.error(`\nNEW type errors in ${r.project} (not in baseline):`);
      for (const e of newErrors) console.error(`  ${e}`);
    }
    if (fixedErrors.length) {
      failed = true;
      console.error(`\nFIXED type errors in ${r.project} (shrink the baseline):`);
      for (const e of fixedErrors) console.error(`  ${e}`);
      console.error(`Run: node scripts/check-types.mjs --update-baseline`);
    }
  }

  const totalCurrent = results.reduce((a, r) => a + r.entries.length, 0);
  if (failed) {
    process.exit(1);
  }
  console.log(`Type-check ratchet OK: ${totalCurrent} known errors (baseline ${totalKnown}) across ${PROJECTS.length} projects; no new errors.`);
}

main();
