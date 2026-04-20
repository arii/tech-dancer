import { createServer } from 'vite';

async function run() {
  const server = await createServer();
  // Not easy to test import.meta.glob from outside without compiling a file.
  await server.close();
}
run();
