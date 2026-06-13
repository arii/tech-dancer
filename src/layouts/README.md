# Layout Primitives

This directory contains the core UI building blocks for the BoomTick design system.

## Primitives

- **Box**: The base layout component. Supports all system props (padding, margin, overflow, etc.).
- **Stack**: A vertical or horizontal layout container with controlled spacing (`gap`).
- **Grid**: A CSS Grid container for multi-column layouts.
- **Text**: The mandatory component for all typographic nodes. Ensure tokenized font sizes and weights.

## Usage Rules

1. **Composition Over Raw CSS**: Build all UI by composing these primitives.
2. **No Raw Tailwind Layouts**: Avoid `flex`, `grid`, `items-center`, etc., in `className`. Use primitive props instead.
3. **Token Compliance**: Always use tokens for spacing (`padding`, `margin`, `gap`) and typography.
4. **Responsive Props**: Use the object syntax for responsive values (e.g., `cols={{ base: 1, md: 3 }}`).
