import fs from 'fs';
import { globSync } from 'glob';
import { z } from 'zod';

const tagRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const BaseSchema = z.object({
  type: z.enum(['post', 'resource', 'study', 'event']),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  author: z.string().min(1),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  tags: z.array(z.string().regex(tagRegex, "Tags must be lowercase kebab-case")).optional(),
});

const PostSchema = BaseSchema.extend({
  type: z.literal('post'),
});

const ResourceSchema = BaseSchema.extend({
  type: z.literal('resource'),
});

const StudySchema = BaseSchema.extend({
  type: z.literal('study'),
});

const EventSchema = BaseSchema.extend({
  type: z.literal('event'),
  location: z.string().min(1),
  city: z.string().min(1),
  schedule: z.string().min(1),
  description: z.string().min(1),
});

const ContentSchema = z.discriminatedUnion('type', [
  PostSchema,
  ResourceSchema,
  StudySchema,
  EventSchema,
]);

/**
 * Basic frontmatter parser similar to src/lib/content.ts
 */
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n/);
  if (!match) return null;

  const yaml = match[1];
  const data: Record<string, any> = {};

  let currentKey = '';
  yaml.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (line.startsWith('  - ')) {
      // List item
      if (currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        let val = trimmed.replace(/^- /, '').trim();
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

  return data;
}

function main() {
  const files = globSync('content/**/*.md');
  let hasError = false;

  console.log(`Validating ${files.length} content files...`);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const data = parseFrontmatter(content);

    if (!data) {
      console.error(`Error in ${file}: No frontmatter found or invalid format (missing --- delimiters)`);
      hasError = true;
      return;
    }

    const result = ContentSchema.safeParse(data);
    if (!result.success) {
      console.error(`Error in ${file}:`);
      result.error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      hasError = true;
    }
  });

  if (hasError) {
    console.error('\nContent validation failed!');
    process.exit(1);
  } else {
    console.log('\nAll content files are valid!');
  }
}

main();
