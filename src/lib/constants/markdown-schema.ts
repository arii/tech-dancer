import { defaultSchema } from 'rehype-sanitize';

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
    grid: [
      'cols', 'gap', 'rows',
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ],
    stack: [
      'gap', 'direction', 'align', 'justify',
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ],
    text: [
      'variant', 'size', 'weight', 'color', 'align', 'uppercase', 'display', 'marginBottom',
      'intent', 'tracking', 'leading', 'as'
    ],
    box: [
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ],
    Grid: [
      'cols', 'gap', 'rows',
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ],
    Stack: [
      'gap', 'direction', 'align', 'justify',
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ],
    Text: [
      'variant', 'size', 'weight', 'color', 'align', 'uppercase', 'display', 'marginBottom',
      'intent', 'tracking', 'leading', 'as'
    ],
    Box: [
      'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
      'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
      'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
      'overflow', 'gap', 'span'
    ]
  },
  clobberPrefix: ''
};
