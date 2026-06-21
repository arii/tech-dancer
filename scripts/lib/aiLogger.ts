import * as fs from 'fs';
import * as path from 'path';

export interface AIRunLogEntry {
  timestamp: string;
  type: 'code-review' | 'visual-review';
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheTokens?: number;
  totalTokens: number;
  durationMs: number;
  cost: number;
  verdict: string;
  pr?: string;
  route?: string;
  error?: string;
  truncated?: boolean;
  parseError?: string;
  rawResponse?: string;
}

const LOG_DIR = path.join(process.cwd(), 'dev-tools', 'logs', 'ai');
const LOG_FILE = path.join(LOG_DIR, 'review-run.json');

/**
 * Records an AI review run entry to a structured JSON log file.
 */
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
        const content = fs.readFileSync(LOG_FILE, 'utf-8');
        if (content.trim()) {
          logs = JSON.parse(content);
        }
      } catch (e) {
        console.warn(`⚠️ Failed to parse existing AI logs at ${LOG_FILE}, starting fresh.`, e);
      }
    }

    logs.push(logEntry);
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
    console.log(`📊 AI review metrics logged to ${LOG_FILE}`);
  } catch (error) {
    console.error('❌ Failed to write AI run log:', error);
  }
}
