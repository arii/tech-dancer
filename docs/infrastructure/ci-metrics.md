# Systemic CI Metrics

This document establishes clear measurable targets for the CI pipeline improvements, as specified in the meta-issue for systemic CI improvements.

## 1. AI Token Usage
To ensure cost-effectiveness and stay within quota limits, the following thresholds are established for AI-driven steps (code review, visual review).

- **Max Input Tokens per Pipeline:** 150,000
- **Max Output Tokens per Pipeline:** 50,000
- **Total Max Tokens per Pipeline:** 200,000

## 2. Pipeline Duration
CI pipelines must provide fast feedback to developers.

- **Total Pipeline Duration Threshold:** 15 minutes
- **Individual Job Duration Threshold:** 10 minutes (except for `test-build` which may take longer)

## 3. Visual Snapshot Stability
Visual regression tests must be stable and only fail on significant unintended changes.

- **Maximum Allowed Difference Percent:** 1.5%
- **Threshold for 'HIGH' Severity Visual Change:** 5.0%

## 4. Related Issues
This metrics definition serves as the acceptance criteria for the following CI and review related issues:
- #2582
- #2581
- #2579
- #2577
- #2576
- #2575
- #2574
- #2573
- #2571
- #2570
- #2569
- #2563
- #2561
- #2555
- #2554
- #2553
- #2552
- #2551
- #2550
