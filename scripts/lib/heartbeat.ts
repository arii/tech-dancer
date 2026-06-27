import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(process.cwd(), 'boomtick-pkg', 'cli', 'logs', 'ai');
const LOG_FILE = path.join(LOG_DIR, 'heartbeat.log');

/**
 * Appends a heartbeat log entry to the heartbeat.log file.
 * Refactored to be non-blocking and efficient using fs.promises.
 */
export async function logHeartbeat(status: string): Promise<void> {
  const sanitizedStatus = status.replace(/[\r\n]/g, ' ').trim();
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${sanitizedStatus}\n`;

  try {
    if (!fs.existsSync(LOG_DIR)) {
      await fs.promises.mkdir(LOG_DIR, { recursive: true });
    }

    await fs.promises.appendFile(LOG_FILE, logEntry);
    console.log(`💓 Heartbeat: ${sanitizedStatus}`);
  } catch (error) {
    console.error('❌ Failed to write heartbeat log:', error);
    throw error;
  }
}
