import fs from 'fs';
import path from 'path';
import https from 'https';
import { AMAZON_IMAGE_DIR, GEAR_ASSET_DIR } from './utils';

export async function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

export async function captureImage(options: {
  imageUrl: string;
  slug: string;
  isAmazon?: boolean;
  force?: boolean;
  dryRun?: boolean;
}): Promise<string | null> {
  const { imageUrl, slug, isAmazon = true, force = false, dryRun = false } = options;

  const targetDir = isAmazon ? AMAZON_IMAGE_DIR : GEAR_ASSET_DIR;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Determine extension from URL or fallback to .jpg
  const urlPath = new URL(imageUrl).pathname;
  let ext = path.extname(urlPath).toLowerCase();
  if (!ext || ext.length > 5) {
    ext = '.jpg';
  }

  const filename = `${slug}${ext}`;
  const destPath = path.join(targetDir, filename);
  const relativePath = isAmazon
    ? `/images/gear/amazon/${filename}`
    : `/assets/gear/${filename}`;

  if (fs.existsSync(destPath) && !force) {
    console.log(`Image already exists: ${destPath}. Use --force to overwrite.`);
    return relativePath;
  }

  if (dryRun) {
    console.log(`[Dry Run] Would download ${imageUrl} to ${destPath}`);
    return relativePath;
  }

  try {
    await downloadImage(imageUrl, destPath);
    console.log(`Downloaded image to ${destPath}`);
    return relativePath;
  } catch (error) {
    console.error(`Error downloading image: ${(error as Error).message}`);
    return null;
  }
}
