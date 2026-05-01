# Tech-Dancer

The Roboticist's Guide to the West Coast Swing.

## Overview
A gear, tech, and travel guide for West Coast Swing dancers. Built with Vite and React to provide real-time comp data and travel logistics.

## Features
- **Folio Journal**: Deep dives into technique, engineering, and lifestyle.
- **The Stacks**: A curated, searchable gear repository with affiliate integrations.
- **Data Lab**: Automated content pipelines and research summaries.
- **Real-time Hub**: WebSocket-driven dashboard for live event monitoring.

## Account Context
- **GitHub**: All submissions and issue tracking are handled via the [arii](https://github.com/arii) account.

## Development
```bash
pnpm run dev
```
For production:
```bash
pnpm run build
pnpm run preview
```

## Firebase Security Rules
To deploy the Firestore security rules for the UX Auditor, use the Firebase CLI:
```bash
firebase deploy --only firestore:rules
```
The rules are defined in `firestore.rules` and ensure that users can only access their own audit reports.
