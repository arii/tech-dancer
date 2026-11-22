import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '../..');
const STUDIES_DIR = path.join(ROOT, 'content/studies');
const IMAGE_REF = /!\[[^\]]*\]\((\/assets\/[^)\s]+)\)/g;

describe('study article local assets', () => {
  const files = fs.readdirSync(STUDIES_DIR).filter((f) => f.endsWith('.md'));

  it.each(files)('%s only references local images that exist in public/', (file) => {
    const content = fs.readFileSync(path.join(STUDIES_DIR, file), 'utf-8');
    const missing = [...content.matchAll(IMAGE_REF)]
      .map((m) => m[1])
      .filter((ref) => !fs.existsSync(path.join(ROOT, 'public', ref.split(/[?#]/)[0])));
    expect(missing).toEqual([]);
  });
});
