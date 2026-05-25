---
title: "WCS Scraper: Initial Synchronization & Data Integrity Study"
date: "2026-05-13"
category: "Data Science"
excerpt: "Analysis of the initial large-scale synchronization of West Coast Swing competition results, focusing on historical backfill and data accuracy."
---

# WCS Results Tracker: Data Quality Report

This report documents the initial setup and data collection phase of the WCS Results Tracker. Our goal is to provide a complete and accurate set of West Coast Swing competition results for community research.

## Data Collection Progress

As of May 2026, we have set up the main data processing system and completed the following:

- **2026 Data**: Results from the 2026 season are being captured as they happen.
- **Historical Results**: We are currently adding results from 2023 to 2025 to provide better historical context.
- **Data Checks**: All records are checked to ensure they are correctly assigned to the right dancer and event.

## Data Integrity Focus

We have addressed several critical issues identified during the pilot phase:

1. **Registry Link Resilience**: Competitors without direct WSDC registry links are no longer dropped; they are indexed using robust temporary identifiers.
2. **Result Restoration**: Missing prelim and semi-final data for specific events (e.g., Easter Swing) have been found and added.
3. **Accuracy Checks**: We use several data points to ensure that event locations and dates match the scoring records.

## Community Feedback (Interactive Data Lab)

We believe that data integrity is a community-driven effort. If you identify any discrepancies, missing results, or formatting errors in the live dataset, please help us improve the tool.

### Report a Data Issue

We are looking for feedback on:
- Missing historical events from 2023–2025.
- Incorrectly parsed names or scores.
- Events with custom HTML formats that may require specialized parsing logic (e.g., H-Town Throwdown).

**How to contribute:**
Please send an email to [research@ariidance.com](mailto:research@ariidance.com?subject=WCS%20Scraper%20Data%20Feedback) with the following details:
- Event Name & Date
- Link to the original result page (if available)
- Description of the discrepancy

Your input directly helps us improve our data processing and ensure accuracy for the entire community.
