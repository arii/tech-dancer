import { defaultSchema } from 'rehype-sanitize';

export const MARKDOWN_SANITIZATION_SCHEMA = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'notice', 'Notice', 'input', 'Grid', 'Stack', 'Text'],
  attributes: {
    ...defaultSchema.attributes,
    notice: ['type', 'id'],
    Notice: ['type', 'id'],
    input: ['type', 'checked', 'disabled'],
    Grid: ['cols', 'gap'],
    Stack: ['gap', 'direction', 'align', 'justify'],
    Text: ['variant', 'size', 'weight', 'color', 'align', 'uppercase']
  },
  clobberPrefix: ''
};
