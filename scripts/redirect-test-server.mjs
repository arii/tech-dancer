#!/usr/bin/env node
/**
 * Static file server for dist/ that applies the redirect rules from
 * vercel.json. Used by the retired-paths e2e suite so the permanent
 * redirects can be asserted locally (vite preview does not honor
 * vercel.json). Not used in production — Vercel applies the real rules.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = Number(process.env.REDIRECT_SERVER_PORT || 4174);

const { redirects = [] } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../vercel.json'), 'utf-8'));

/**
 * Compile a Vercel redirect source pattern into a RegExp.
 * Handles the `:param` and `:param*` wildcard syntax.
 */
function compileSource(source) {
  let out = '';
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === ':') {
      const rest = source.slice(i + 1);
      const starMatch = rest.match(/^(\w+)\*/);
      if (starMatch) {
        out += '(.*)';
        i += starMatch[0].length;
        continue;
      }
      const segMatch = rest.match(/^(\w+)/);
      if (segMatch) {
        out += '([^/]+)';
        i += segMatch[0].length;
        continue;
      }
    }
    out += /[.+?^${}()|[\]\\]/.test(ch) ? '\\' + ch : ch;
  }
  return new RegExp('^' + out + '$');
}

const compiled = redirects
  .filter(rule => !rule.has) // host-conditional rules (www) don't apply to localhost
  .map(rule => ({ rule, regex: compileSource(rule.source) }));

function matchRedirect(pathname) {
  for (const { rule, regex } of compiled) {
    if (regex.test(pathname)) {
      return rule;
    }
  }
  return null;
}

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  const redirect = matchRedirect(pathname);
  if (redirect) {
    res.writeHead(redirect.statusCode, { Location: redirect.destination });
    res.end();
    return;
  }

  // Static serving with SPA fallback to index.html
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  if (!filePath.startsWith(DIST_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Try directory index, then SPA fallback
    const dirIndex = path.join(DIST_DIR, pathname, 'index.html');
    if (fs.existsSync(dirIndex)) {
      filePath = dirIndex;
    } else {
      filePath = path.join(DIST_DIR, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log('redirect-test-server: dist/ + vercel.json redirects on http://localhost:' + PORT);
});
