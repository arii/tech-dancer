import { logHeartbeat } from './lib/heartbeat';

async function run() {
  const status = process.argv.slice(2).join(' ') || 'Heartbeat';
  await logHeartbeat(status);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
