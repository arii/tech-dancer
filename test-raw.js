import { createServer } from 'vite';

async function run() {
  const server = await createServer();
  const module = await server.ssrLoadModule('/src/lib/content.ts');
  console.log(module.getPosts());
  await server.close();
}
run();
