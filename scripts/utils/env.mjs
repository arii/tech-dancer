export const getBaseUrl = () => {
  return process.env.BASE_URL || 'http://localhost:4173/tech-dancer';
};

// If run as a standalone script, it will print the BASE_URL to stdout
// This allows other non-JS scripts to fetch the standard unified config
if (process.argv[1] && process.argv[1].endsWith('env.mjs')) {
  process.stdout.write(getBaseUrl());
}
