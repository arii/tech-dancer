/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

function getLineBreakLength(str: string): number {
  if (str.startsWith('\r\n')) return 2;
  if (str.startsWith('\n')) return 1;
  return 0;
}

/**
 * Fast, lightweight browser-safe YAML frontmatter parser.
 * Eliminates the heavy 'yaml' dependency from initial bundle bootstrap.
 */
function parseYamlSimple(yamlStr: string): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  const lines = yamlStr.split(/\r?\n/);

  type Context = { indent: number; obj: Record<string, unknown> | unknown[]; key?: string };
  const stack: Context[] = [{ indent: -1, obj: root }];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = rawLine.search(/\S/);

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parentCtx = stack[stack.length - 1];
    const parentObj = parentCtx.obj;

    if (trimmed.startsWith('- ')) {
      const itemContent = trimmed.slice(2).trim();
      const itemColonIdx = itemContent.indexOf(':');

      if (itemColonIdx !== -1) {
        let itemKey = itemContent.slice(0, itemColonIdx).trim();
        if ((itemKey.startsWith('"') && itemKey.endsWith('"')) || (itemKey.startsWith("'") && itemKey.endsWith("'"))) {
          itemKey = itemKey.slice(1, -1);
        }
        const itemValStr = itemContent.slice(itemColonIdx + 1).trim();
        if (itemKey !== '__proto__' && itemKey !== 'constructor' && itemKey !== 'prototype') {
          const childObj: Record<string, unknown> = {};
          let val: unknown = itemValStr;
          if ((itemValStr.startsWith('"') && itemValStr.endsWith('"')) || (itemValStr.startsWith("'") && itemValStr.endsWith("'"))) {
            val = itemValStr.slice(1, -1);
          } else if (itemValStr === 'true') val = true;
          else if (itemValStr === 'false') val = false;
          else if (!isNaN(Number(itemValStr)) && itemValStr !== '') val = Number(itemValStr);

          childObj[itemKey] = val;
          if (Array.isArray(parentObj)) {
            parentObj.push(childObj);
          }
          stack.push({ indent: indent + 2, obj: childObj });
        }
      } else {
        let val: unknown = itemContent;
        if (typeof val === 'string' && ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))) {
          val = (val as string).slice(1, -1);
        }
        if (Array.isArray(parentObj)) {
          parentObj.push(val);
        }
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    let key = trimmed.slice(0, colonIdx).trim();
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
      key = key.slice(1, -1);
    }
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;

    const valStr = trimmed.slice(colonIdx + 1).trim();

    if (!valStr) {
      let isArray = false;
      for (let j = i + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j].trim();
        if (nextTrimmed && !nextTrimmed.startsWith('#')) {
          if (nextTrimmed.startsWith('- ')) isArray = true;
          break;
        }
      }

      const child = isArray ? [] : {};
      if (!Array.isArray(parentObj)) {
        (parentObj as Record<string, unknown>)[key] = child;
      }
      stack.push({ indent, obj: child, key });
      continue;
    }

    let val: unknown = valStr;
    if (valStr.startsWith('[') && valStr.endsWith(']')) {
      val = valStr.slice(1, -1).split(',').map(s => {
        let item = s.trim();
        if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
          item = item.slice(1, -1);
        }
        return item;
      }).filter(Boolean);
    } else if (valStr === 'true') {
      val = true;
    } else if (valStr === 'false') {
      val = false;
    } else if (!isNaN(Number(valStr)) && valStr !== '' && !valStr.includes('-') && !valStr.includes(':')) {
      val = Number(valStr);
    } else if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
      val = valStr.slice(1, -1);
    }

    if (!Array.isArray(parentObj)) {
      (parentObj as Record<string, unknown>)[key] = val;
    }
  }

  return root;
}

/**
 * Lightweight browser-safe frontmatter parser.
 */
export function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  if (!content || typeof content !== 'string' || !content.startsWith('---')) {
    return { data: {}, content: content || '' };
  }

  const lineBreakLen = getLineBreakLength(content.slice(3));
  if (lineBreakLen === 0) return { data: {}, content };

  const startOffset = 3 + lineBreakLen;
  const match = content.slice(startOffset).match(/(?:^|\r?\n)---(?:\r?\n|$)/);
  if (!match || match.index === undefined) return { data: {}, content };

  const yamlEndIndex = startOffset + match.index;
  const yamlStr = content.slice(startOffset, yamlEndIndex).trim();
  const body = content.slice(yamlEndIndex + match[0].length);

  try {
    const data = parseYamlSimple(yamlStr);
    return { data: (data && typeof data === 'object') ? data : {}, content: body };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { data: {}, content: body };
  }
}
