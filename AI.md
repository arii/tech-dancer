# Project Overview

BoomTick is a social dancing platform that helps users:

- Discover events
- Track dance progress
- Browse educational content
- Purchase dance accessories

## Technology Stack

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS

## Architecture

src/
├── pages/ - Page-level components
├── components/ - Reusable UI components
├── services/ - API and business logic
├── hooks/ - Custom React hooks
├── utils/ - Reusable utility functions
└── types/ - TypeScript type definitions

## Testing

Run all tests:
```bash
npm test
```

Run unit tests:
```bash
npm run test:unit
```

Run lint:
```bash
npm run lint
```

## Standards

- Use TypeScript strict mode
- Prefer functional components
- No default exports
- All public functions require documentation
- Components should remain presentational
