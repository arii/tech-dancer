import { defaultSchema } from 'rehype-sanitize';

/**
 * Standard layout attributes for Box, Grid, and Stack primitives.
 */
const LAYOUT_ATTRIBUTES = [
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
  'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
  'overflow', 'gap', 'span', 'cols', 'rows', 'direction', 'align', 'justify'
];

/**
 * Standard typography attributes for Text primitive.
 */
const TEXT_ATTRIBUTES = [
  ...LAYOUT_ATTRIBUTES,
  'variant', 'size', 'weight', 'color', 'align', 'uppercase', 'intent', 'tracking', 'leading', 'as'
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
    grid: [...LAYOUT_ATTRIBUTES],
    Grid: [...LAYOUT_ATTRIBUTES],
    stack: [...LAYOUT_ATTRIBUTES],
    Stack: [...LAYOUT_ATTRIBUTES],
    text: [...TEXT_ATTRIBUTES],
    Text: [...TEXT_ATTRIBUTES],
    box: [...LAYOUT_ATTRIBUTES],
    Box: [...LAYOUT_ATTRIBUTES]
  },
  clobberPrefix: ''
};
