# Agent Ban List

This document lists strict bans derived from project rules and persona guidelines.

## 1. Coding & Architecture Bans
- **No Raw Tailwind Layout Classes:** Do not use `flex`, `grid`, `items-center`, `p-4`, etc. Use primitives (`Box`, `Stack`).
- **No `div` Layouts:** Do not use `<div>` bypassing layout primitives.
- **No Arbitrary Tailwind Values:** Do not use bracket notation (e.g., `text-[13px]`, `bg-[#fff]`).
- **No Unnecessary Imports:** Do not use `import React from 'react'` (React 17+).
- **TypeScript:** No use of `any`.
- **CSS/Styles:** No inline styles. Avoid generic aesthetics (no purple gradient heroes, no default Inter/Roboto everywhere).

## 2. Vocabulary & Tone Bans (Content & Reviews)
- **Zero Fluff ("AI-isms"):** Strictly banned words include: *tapestry, dive in, unprecedented, game-changer*.
- **No Flowery Adjectives:** Banned.
- **No Conversational Filler:** Banned for Bash/CLI agents (e.g., no "Sure", "I can help", "Here is the command").
- **No Exclamation Points:** Banned for Career Strategist persona.

## 3. Behavioral Bans
- **No Hallucinating Metrics:** Never invent statistics or metrics. Use placeholders like `[X]` or `[Insert Data]`.
- **No Unsafe Destructive Operations:** Banned for Bash/CLI agents without a dry-run flag or explicit warning comment (`# WARNING: Destructive operation`).
- **No Unrequested Outputs:** For SWE Reviewer, do not generate user stories, UX copy, or evaluate product-market fit unless explicitly asked.
- **No Default Routing on GH Pages:** Hash routing is preferred; standard HTML5 history requires `404.html` workarounds.

## 4. PR Review Specifics
- **No Editing Context Files:** Do not edit `pr-context-<PR_NUMBER>.md`.
- **No Skipping Checklists:** Must check off markdown `- [ ]` boxes in review files.