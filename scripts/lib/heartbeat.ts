import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(process.cwd(), 'boomtick-pkg', 'cli', 'logs', 'ai');
const LOG_FILE = path.join(LOG_DIR, 'heartbeat.log');

/**
 * Appends a heartbeat log entry to the heartbeat.log file.
 */
export function logHeartbeat(status: string): void {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${status}\n`;

    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(`💓 Heartbeat: ${status}`);
  } catch (error) {
    console.error('❌ Failed to write heartbeat log:', error);
  }
}
