import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(process.cwd(), 'boomtick-pkg', 'cli', 'logs', 'ai');
const LOG_FILE = path.join(LOG_DIR, 'heartbeat.log');

interface NodeError extends Error {
  code?: string;
}

/**
 * Appends a heartbeat log entry to the heartbeat.log file.
 * Implements a retry mechanism to handle concurrent writes in parallel steps.
 */
export async function logHeartbeat(status: string): Promise<void> {
  const sanitizedStatus = status.replace(/[\r\n]/g, ' ').trim();
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${sanitizedStatus}\n`;

  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  } catch (err) {
    // Ignore EEXIST if created between check and call
    if ((err as NodeError).code !== 'EEXIST') throw err;
  }

  const MAX_RETRIES = 5;
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      fs.appendFileSync(LOG_FILE, logEntry);
      console.log(`💓 Heartbeat: ${sanitizedStatus}`);
      return;
    } catch (error) {
      lastError = error;
      const errCode = (error as NodeError).code;
      const isLockError = errCode === 'EBUSY' || errCode === 'EAGAIN' || errCode === 'EMFILE';

      if (!isLockError || attempt === MAX_RETRIES) {
        break;
      }

      // Jittered exponential backoff
      const delay = Math.pow(2, attempt) * 25 + Math.random() * 50;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.error('❌ Failed to write heartbeat log after retries:', lastError);
  throw lastError;
}
