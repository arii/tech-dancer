import { logHeartbeat } from './lib/heartbeat';

const status = process.argv.slice(2).join(' ') || 'Heartbeat';
logHeartbeat(status);
