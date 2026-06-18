import { spawn, type ChildProcess } from 'child_process';

export function startPreview(cwd: string, port: number): ChildProcess {
  const child = spawn('pnpm', ['exec', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, VITE_BASE_PATH: '/' }
  });
  child.stdout?.on('data', data => process.stdout.write(`[preview:${port}] ${String(data)}`));
  child.stderr?.on('data', data => process.stderr.write(`[preview:${port}] ${String(data)}`));
  return child;
}

export async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status < 500) return;
    } catch { /* retry */ }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

export function stopPreview(child: ChildProcess): void {
  if (!child.killed) child.kill('SIGTERM');
}
