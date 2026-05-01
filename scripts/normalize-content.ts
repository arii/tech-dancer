import fs from 'fs';
import { glob } from 'glob';

/**
 * Normalizes a string to lowercase kebab-case.
 */
function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Lightweight browser-safe frontmatter parser (mirrored from src/lib/content.ts)
 */
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const yaml = match[1];
  const body = match[2];
  const data: Record<string, string | number | string[] | undefined> = {};

  let currentKey = '';
  yaml.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (line.startsWith('  - ')) {
      // List item
      if (currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        let val = trimmed.replace(/^-\s+/, '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        data[currentKey].push(val);
      }
    } else {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let value = line.slice(colonIdx + 1).trim();
        currentKey = key;

        if (value.startsWith('[') && value.endsWith(']')) {
          const inner = value.slice(1, -1).trim();
          data[key] = inner ? inner.split(',').map(v => {
            let item = v.trim();
            if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
            else if (item.startsWith("'") && item.endsWith("'")) item = item.slice(1, -1);
            return item;
          }) : [];
        } else if (value) {
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
          data[key] = value;
        }
      }
    }
  });

  return { data, body };
}

function stringifyFrontmatter(data: Record<string, string | number | string[] | undefined>) {
  let yaml = '---\n';
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      value.forEach(item => {
        yaml += `  - ${item}\n`;
      });
    } else {
      yaml += `${key}: ${JSON.stringify(value)}\n`;
    }
  });
  yaml += '---';
  return yaml;
}

async function normalize() {
  const files = await glob('content/**/*.md');

  console.log(`🔨 Normalizing ${files.length} content files...`);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
      console.warn(`⚠️ Skipping ${file}: No frontmatter`);
      continue;
    }

    const { data, body } = parsed;

    // 1. Normalize tags
    if (data.tags && Array.isArray(data.tags)) {
      data.tags = data.tags.map(toKebabCase);
    }

    // 2. Ensure mandatory fields
    if (!data.author) data.author = "Ariel Anders, PhD";
    if (!data.date) {
        // Try to extract date from filename
        const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/);
        data.date = dateMatch ? dateMatch[1] : "2026-01-01";
    }
    if (!data.category) data.category = "General";
    if (!data.excerpt) data.excerpt = data.description || "No excerpt provided.";

    // Special fix for the one file with invalid type
    if (data.type === "Post") data.type = "post";
    if (!data.type) data.type = "post";

    const newContent = `${stringifyFrontmatter(data)}\n${body}`;
    fs.writeFileSync(file, newContent);
    console.log(`✅ Normalized ${file}`);
  }
}

normalize().catch(console.error);
