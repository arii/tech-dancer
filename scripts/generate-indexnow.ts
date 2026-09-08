import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Retrieves the IndexNow key from environment variables.
 */
export function getIndexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY || process.env.VITE_INDEXNOW_KEY || '';
  const trimmed = key.trim();
  return trimmed || null;
}

/**
 * Dynamically generates public/<key>.txt and dist/<key>.txt verification files.
 */
export function generateIndexNowKeyFile(): string | null {
  const key = getIndexNowKey();
  if (!key) {
    console.log('ℹ️ INDEXNOW_KEY / VITE_INDEXNOW_KEY not set in environment. Skipping IndexNow key verification file generation.');
    return null;
  }

  // Validate key format (alphanumeric and dashes) to prevent directory traversal
  if (!/^[a-zA-Z0-9-]+$/.test(key)) {
    console.warn(`⚠️ Invalid IndexNow key format: "${key}". Key must contain only alphanumeric characters or hyphens.`);
    return null;
  }

  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  // Clean up any stale IndexNow key text files in public/ (except llms.txt, llms-full.txt)
  if (fs.existsSync(publicDir)) {
    const existingFiles = fs.readdirSync(publicDir);
    for (const file of existingFiles) {
      if (
        file.endsWith('.txt') &&
        file !== 'llms.txt' &&
        file !== 'llms-full.txt' &&
        file !== 'robots.txt' &&
        file !== `${key}.txt` &&
        /^[a-zA-Z0-9-]+\.txt$/.test(file)
      ) {
        fs.unlinkSync(path.join(publicDir, file));
        console.log(`🧹 Removed stale IndexNow key file: public/${file}`);
      }
    }
  } else {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const keyContent = `${key}\n`;
  const publicFilePath = path.join(publicDir, `${key}.txt`);
  fs.writeFileSync(publicFilePath, keyContent, 'utf-8');
  console.log(`✅ Generated public/${key}.txt for IndexNow verification`);

  if (fs.existsSync(distDir)) {
    const distFilePath = path.join(distDir, `${key}.txt`);
    fs.writeFileSync(distFilePath, keyContent, 'utf-8');
    console.log(`✅ Generated dist/${key}.txt for IndexNow verification`);
  }

  return key;
}

// Execute CLI directly if run as entry script
const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  generateIndexNowKeyFile();
}
