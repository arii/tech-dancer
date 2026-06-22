import * as fs from 'fs';
import * as path from 'path';

export interface AIRunLogEntry {
  timestamp: string;
  botName: string;
  modelName: string;
  inputTokens: number;
  outputTokens: number;
  thoughtsTokenCount?: number;
  totalTokens: number;
  cost: number;
  durationMs?: number;
  verdict?: string;
  truncated: boolean;
  parseError?: string;
}

const LOG_DIR = 'dev-tools/logs/ai';
const LOG_FILE = path.join(LOG_DIR, 'review-run.json');

export function logAIRun(entry: Omit<AIRunLogEntry, 'timestamp'>): void {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    const logEntry: AIRunLogEntry = {
      timestamp: new Date().toISOString(),
      ...entry,
    };

    let logs: AIRunLogEntry[] = [];
    if (fs.existsSync(LOG_FILE)) {
      try {
        logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
      } catch (e) {
        console.warn('Failed to parse existing AI logs:', e);
      }
    }

    logs.push(logEntry);
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (e) {
    console.warn('Failed to log AI run:', e);
  }
}
