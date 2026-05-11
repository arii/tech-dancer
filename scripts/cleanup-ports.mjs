import { execSync } from 'node:child_process';
import { platform } from 'node:os';

/**
 * Cleanup stale processes on specified ports.
 * This ensures that pnpm run preview and Playwright/Lighthouse
 * always start with a clean slate.
 *
 * Supports both Unix-like systems (via lsof/kill) and Windows (via netstat/taskkill).
 */
const ports = [4173, 4174];
const isWindows = platform() === 'win32';

console.log('🧹 Cleaning up stale preview processes...');

for (const port of ports) {
  try {
    if (isWindows) {
      // Windows implementation
      let stdout;
      try {
        stdout = execSync(`netstat -ano | findstr :${port}`, {
          stdio: ['ignore', 'pipe', 'ignore'],
          timeout: 5000
        });
      } catch (error) {
        // findstr exits with code 1 if no match is found, which is expected
        if (error.status === 1) continue;
        throw error;
      }

      const lines = stdout.toString().trim().split('\n');
      const pids = new Set();

      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0' && !isNaN(pid)) {
          pids.add(pid);
        }
      }

      for (const pid of pids) {
        console.log(`  - Found process on port ${port}: ${pid}. Killing...`);
        execSync(`taskkill /F /PID ${pid}`, {
          stdio: 'ignore',
          timeout: 5000
        });
      }
    } else {
      // Unix-like implementation
      let stdout;
      try {
        stdout = execSync(`lsof -t -i :${port}`, {
          stdio: ['ignore', 'pipe', 'ignore'],
          timeout: 5000
        });
      } catch (error) {
        // lsof exits with code 1 if no processes are found, which is expected
        if (error.status === 1) continue;
        throw error;
      }

      const pids = stdout.toString().trim().split('\n').filter(Boolean);

      if (pids.length > 0) {
        console.log(`  - Found processes on port ${port}: ${pids.join(', ')}. Killing...`);
        execSync(`kill -9 ${pids.join(' ')}`, {
          stdio: 'ignore',
          timeout: 5000
        });
      }
    }
  } catch (error) {
    console.error(`❌ Unexpected error cleaning up port ${port}:`, error.message);
  }
}

console.log('✅ Port cleanup complete.');
