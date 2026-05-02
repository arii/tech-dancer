---
type: post
title: "Coming Soon: WCS Competition Data Scraper"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Dance Research"
excerpt: "Announcing a new tool for objective, ethical analysis of West Coast Swing competition data."
image: ""
tags:
  - competition
  - metrics
  - data-science
  - wcs
---

<Notice type="info">
**Lab Notes: Competitive Intelligence**

- **Current State:** Subjective video review and manual placement tracking.
- **Why Improvement is Needed:** High variance in human judging makes it difficult to measure granular technical growth over time.
- **Action Items:**
  - [x] Define ethical data collection framework.
  - [ ] Complete ETL pipeline for major 2025/2026 events.
  - [ ] Build interactive judge variance visualization.
</Notice>

## Objective Analysis in a Subjective Sport

In West Coast Swing, we are judged by humans. Humans have bias, variance, and limited focus. While individual placements are high-variance data points, aggregated scores across multiple events can reveal powerful insights about progression and judging consistency.

I am excited to announce the development of the **WCS Competition Data Scraper**, a specialized research tool designed to bring data-driven clarity to the competitive landscape.

### Core Philosophy

The goal of this project isn't to rank dancers, but to provide tools for self-improvement and to understand the underlying mechanics of competition scoring.

- **[ ] Anonymous data collection:** The tool focus on trends and distributions. No individual dancer names are stored in our public datasets; we only process aggregated scores and anonymized IDs.
- **[ ] Ethical approach:** We only use public competition data that has already been published by event organizers. Our scraper respects `robots.txt` and implements aggressive rate-limiting to ensure zero impact on event servers.
- **[ ] Privacy guarantees:** All raw data is processed in a secure environment and then discarded after aggregation. We do not track personal performance over time in a way that is identifiable to the public.

### Technical Pipeline

Our data pipeline is built for accuracy and reliability:
1. **Collection:** Automated extraction from public WSDC-compliant registries.
2. **Validation:** Cross-referencing results to ensure data integrity.
3. **Processing:** Normalizing scores across different event sizes and judging panels.

### Analytical Features

Once launched, the lab will feature:

#### Judge Variance Analysis
Measuring the consistency across judging panels. This helps competitors understand which aspects of their dance resonate with different judging styles, without the noise of a single subjective opinion.

#### Median-Relative Performance Tracking
Instead of looking at your raw placement, we compare your performance to the competition median. This provides a much more stable metric of growth, as it accounts for the overall strength of the heat.

*Stay tuned for the official release in the Research Lab.*
