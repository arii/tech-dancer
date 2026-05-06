# UX Audit: Homepage

## Screenshots

**Desktop Audit (1440x900)**
![Desktop Home](desktop-home.png)

**Mobile Audit (390x844)**
![Mobile Home](mobile-home.png)

## Findings

### 1. Raw Layout Class Usage
- **Observation**: Multiple raw layout classes (e.g. `flex-col`, `gap-3`, `sm:-mx-2`) were used in Dashboard.tsx instead of design tokens.
- **Heuristic / Principle Violated**: Inconsistent design tokens (Medium P2). Layouts should utilize unified `<Box />` or `<Stack />` components.
- **Impact**: Increased maintenance overhead and potential layout breaking on resizing due to hard-coded spacing.
- **Recommendation**: Implemented primitive props on `<Box />` and `<Stack />` per token standards.

### 2. Invalid Color Token
- **Observation**: Used `bg-surface-alt/50` or `bg-surface-muted` in Dashboard.tsx, UXAuditor.tsx, and ArielProfile.tsx instead of `bg-surface`.
- **Heuristic / Principle Violated**: Color & Contrast (Medium P2). The color token was invalid and rejected by the anti-pattern script.
- **Impact**: Elements may not render correctly in standard site themes (e.g., dark vs light themes) due to missing token references.
- **Recommendation**: Updated to the standard `bg-surface` color token.

### 3. Raw Spacing Classes
- **Observation**: `p-2` was used instead of `padding={2}` in UXAuditor.tsx.
- **Heuristic / Principle Violated**: Inconsistent design tokens (Low P3).
- **Impact**: Code base styling inconsistencies.
- **Recommendation**: Standardized using the padding property of `<Box>`.

## Recommendations Checklist
- [x] Replace raw layout classes with `<Box />` and `<Stack />` primitives across the application.
- [x] Adopt standard semantic color variables (e.g., `surface="muted"`, `bg-surface`).
- [x] Centralize all padding/spacing via standard token props.
