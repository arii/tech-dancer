import fs from 'fs';
import path from 'path';

export const getBaseUrl = () => {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  try {
    const configPath = path.resolve(process.cwd(), 'scripts/utils/env.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config.BASE_URL;
  } catch (error) {
    return 'http://localhost:4173/tech-dancer';
  }
};
