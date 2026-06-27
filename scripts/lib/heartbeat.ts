import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(process.cwd(), 'boomtick-pkg', 'cli', 'logs', 'ai');
const LOG_FILE = path.join(LOG_DIR, 'heartbeat.log');

/**
 * Appends a heartbeat log entry to the heartbeat.log file.
 * Implements basic sanitization, error propagation, and a simple retry mechanism
 * to mitigate race conditions during concurrent writes.
 */
export function logHeartbeat(status: string): void {
  const sanitizedStatus = status.replace(/[\r\n]/g, ' ').trim();
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${sanitizedStatus}\n`;

  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      fs.appendFileSync(LOG_FILE, logEntry);
      console.log(`💓 Heartbeat: ${sanitizedStatus}`);
      return;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        console.error('❌ Failed to write heartbeat log after multiple attempts:', error);
        throw error;
      }
      // Brief pause before retry
      const delay = Math.floor(Math.random() * 50) + 10;
      const start = Date.now();
      while (Date.now() - start < delay) {
        // block for a bit
      }
    }
  }
}
