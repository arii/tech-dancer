import fs from 'fs';
import path from 'path';
import https from 'https';
import { AMAZON_IMAGE_DIR, GEAR_ASSET_DIR } from './utils';

export async function validateImageUrl(url: string): Promise<{ contentType: string, contentLength: number }> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to validate image: HTTP ${res.statusCode}`));
        return;
      }

      const contentType = res.headers['content-type'] || '';
      const contentLength = parseInt(res.headers['content-length'] || '0', 10);

      if (!contentType.startsWith('image/')) {
        reject(new Error(`Invalid content type: ${contentType}`));
        return;
      }

      if (contentLength === 0) {
        reject(new Error('Image is empty (0 bytes)'));
        return;
      }

      resolve({ contentType, contentLength });
    });

    req.on('error', reject);
    req.end();
  });
}

export async function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: HTTP ${res.statusCode}`));
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
    if (dryRun) {
      console.log(`[Dry Run] Would create directory: ${targetDir}`);
    } else {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }

  try {
    console.log(`Validating image URL: ${imageUrl}...`);
    const { contentType, contentLength } = await validateImageUrl(imageUrl);
    console.log(`Validated image: ${contentType} (${contentLength} bytes)`);

    // Determine extension from content-type or URL
    let ext = '.jpg';
    if (contentType === 'image/png') ext = '.png';
    else if (contentType === 'image/webp') ext = '.webp';
    else if (contentType === 'image/gif') ext = '.gif';
    else {
      const urlPath = new URL(imageUrl).pathname;
      const urlExt = path.extname(urlPath).toLowerCase();
      if (urlExt && urlExt.length <= 5) {
        ext = urlExt;
      }
    }

    const filename = `${slug}${ext}`;
    const destPath = path.join(targetDir, filename);
    const relativePath = isAmazon
      ? `/images/gear/amazon/${filename}`
      : `/images/gear/${filename}`;

    if (fs.existsSync(destPath) && !force) {
      console.log(`Image already exists: ${destPath}. Use --force to overwrite.`);
      return relativePath;
    }

    if (dryRun) {
      console.log(`[Dry Run] Would download ${imageUrl} to ${destPath}`);
      return relativePath;
    }

    await downloadImage(imageUrl, destPath);
    console.log(`Downloaded image to ${destPath}`);
    return relativePath;
  } catch (error) {
    console.error(`Error handling image: ${(error as Error).message}`);
    return null;
  }
}
