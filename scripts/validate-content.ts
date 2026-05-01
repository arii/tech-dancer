import fs from 'fs';
import { glob } from 'glob';
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
  image: z.string().optional(),
  affiliateIds: z.array(z.string()).optional(),
});

const ResourceSchema = BaseSchema.extend({
  type: z.literal('resource'),
  image: z.string().optional(),
  affiliateIds: z.array(z.string()).optional(),
  rating: z.number().optional(),
  verdict: z.string().optional(),
  priceCategory: z.string().optional(),
  updatedDate: z.string().optional(),
  durability: z.number().optional(),
  value: z.number().optional(),
  specs: z.record(z.string()).optional(),
});

const StudySchema = BaseSchema.extend({
  type: z.literal('study'),
});

const EventSchema = BaseSchema.extend({
  type: z.literal('event'),
  location: z.string(),
  city: z.string(),
  schedule: z.string(),
  description: z.string(),
  link: z.string().optional(),
});

const ContentSchema = z.discriminatedUnion('type', [
  PostSchema,
  ResourceSchema,
  StudySchema,
  EventSchema,
]);

/**
 * Lightweight browser-safe frontmatter parser (mirrored from src/lib/content.ts)
 */
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n/);
  if (!match) return null;

  const yaml = match[1];
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

          // Basic numeric conversion for rating
          if (['rating', 'durability', 'value'].includes(key)) data[key] = parseFloat(value);
          else data[key] = value;
        }
      }
    }
  });

  return data;
}

async function validate() {
  const files = await glob('content/**/*.md');
  let hasError = false;

  console.log(`🔍 Validating ${files.length} content files...`);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const data = parseFrontmatter(content);

    if (!data) {
      console.error(`❌ ${file}: Missing frontmatter block`);
      hasError = true;
      continue;
    }

    const result = ContentSchema.safeParse(data);
    if (!result.success) {
      console.error(`❌ ${file}:`);
      result.error.issues.forEach(issue => {
        console.error(`  - [${issue.path.join('.')}] ${issue.message}`);
      });
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('✅ All content files validated successfully');
  }
}

validate().catch(err => {
  console.error('Fatal error during validation:', err);
  process.exit(1);
});
