import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { getBasePath } from './base-path.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_PATH = getBasePath();
const PORT = process.env.PORT || 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.parquet': 'application/octet-stream',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  let reqPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  reqPath = decodeURIComponent(reqPath);

  if (BASE_PATH !== '/' && reqPath.startsWith(BASE_PATH)) {
    reqPath = reqPath.slice(BASE_PATH.length - 1);
  }

  let safePath = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  try {
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    await fs.promises.access(filePath, fs.constants.F_OK);
    const finalStat = await fs.promises.stat(filePath);
    if (!finalStat.isFile()) {
        filePath = path.join(DIST_DIR, 'index.html');
    }
  } catch {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(`Server Error: ${err.code}`);
      return;
    }
    const headers = { 'Content-Type': contentType };
    if (ext.match(/\.(css|js|mjs|png|jpg|jpeg|gif|svg|webp|ico|woff2|woff|ttf|webmanifest)$/)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    }

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const compressable = ext.match(/\.(html|css|js|mjs|json|svg|txt|xml)$/);

    if (compressable && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      zlib.gzip(data, (zlibErr, compressed) => {
        if (zlibErr) {
          res.writeHead(200, headers);
          res.end(data);
          return;
        }
        res.writeHead(200, headers);
        res.end(compressed);
      });
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
});


server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}${BASE_PATH}`);
});
