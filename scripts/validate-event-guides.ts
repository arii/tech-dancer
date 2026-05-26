import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { EventFrontmatterSchema } from '../src/lib/types/event-frontmatter.schema';

const EVENTS_DIR = path.resolve(process.cwd(), 'content/events');

function validate() {
  console.log('🔍 Validating event guides...');
  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.md'));
  let hasError = false;

  for (const file of files) {
    const fullPath = path.join(EVENTS_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const match = content.match(/^---\n([\s\S]+?)\n---\n/);

    if (!match) {
      console.error(`❌ No frontmatter found in ${file}`);
      hasError = true;
      continue;
    }

    try {
      const data = parse(match[1]);
      const result = EventFrontmatterSchema.safeParse(data);

      if (!result.success) {
        console.error(`❌ Validation failed for ${file}:`);
        console.error(JSON.stringify(result.error.format(), null, 2));
        hasError = true;
      } else {
        // Silent success to keep logs clean
      }
    } catch (e) {
      console.error(`❌ Error parsing YAML in ${file}:`, e);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('❌ Event guide validation failed.');
    process.exit(1);
  } else {
    console.log('✅ All event guides passed validation.');
  }
}

validate();
