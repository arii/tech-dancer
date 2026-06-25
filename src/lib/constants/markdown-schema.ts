import { defaultSchema } from 'rehype-sanitize';

const LAYOUT_ATTRIBUTES = [
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
  'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
  'overflow', 'gap', 'span'
];

const TEXT_ATTRIBUTES = [
  'variant', 'size', 'weight', 'color', 'align', 'uppercase', 'display', 'marginBottom',
  'intent', 'tracking', 'leading', 'as'
];

export const MARKDOWN_SANITIZATION_SCHEMA = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'notice', 'Notice', 'input',
    'grid', 'stack', 'text', 'box',
    'Grid', 'Stack', 'Text', 'Box'
  ],
  attributes: {
    ...defaultSchema.attributes,
    notice: ['type', 'id'],
    Notice: ['type', 'id'],
    input: ['type', 'checked', 'disabled'],
    grid: ['cols', 'gap', 'rows', ...LAYOUT_ATTRIBUTES],
    Grid: ['cols', 'gap', 'rows', ...LAYOUT_ATTRIBUTES],
    stack: ['gap', 'direction', 'align', 'justify', ...LAYOUT_ATTRIBUTES],
    Stack: ['gap', 'direction', 'align', 'justify', ...LAYOUT_ATTRIBUTES],
    text: [...TEXT_ATTRIBUTES],
    Text: [...TEXT_ATTRIBUTES],
    box: [...LAYOUT_ATTRIBUTES],
    Box: [...LAYOUT_ATTRIBUTES]
  },
  clobberPrefix: ''
};
