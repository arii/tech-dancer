---
type: post
title: "Engineering the Dance Floor: Building a Secure, Automated Data Pipeline for West Coast Swing"
date: "2026-05-01"
author: "Ariel Anders, PhD"
category: "Data & Dev Lab"
excerpt: "How I built a secure, fault-tolerant, and fully automated ETL pipeline to scrape, standardize, and store WCS prelim data."
image: ""
tags:
  - data-engineering
  - wcs
  - automation
  - python
  - security
---

As a roboticist and an avid West Coast Swing (WCS) dancer, I spend a lot of time thinking about systems. Whether I'm calculating the physics of momentum and leverage on the dance floor, or designing robust digital infrastructure at my desk, my goal is always the same: optimize for performance.

Recently, I set out to answer a highly debated question in the WCS community: What does it actually take to make a Novice final? To answer that, I needed data. Lots of it. However, WCS preliminary scoring data is scattered across different vendor platforms (like EEPRO and Scoring.Dance), trapped in dynamic, JavaScript-rendered HTML tables, and structurally inconsistent.

What started as a simple curiosity quickly evolved into a full-scale Data Engineering project. Here is how I built a secure, fault-tolerant, and fully automated ETL (Extract, Transform, Load) pipeline to scrape, standardize, and store WCS prelim data using Python, GitHub Actions, and enterprise-grade security practices.

## The Architecture: Extract, Transform, Load

To build a robust pipeline, I needed a stack that could handle both static HTML and dynamic DOM rendering without buckling.

### The Extraction Layer (Playwright + BeautifulSoup)

Because platforms like EEPRO rely heavily on client-side JavaScript to render their scoring matrices, a simple `requests.get()` would return an empty table.

To solve this, I deployed Playwright for Python in headless mode. The script navigates to the event URL, waits for the specific element to appear, and captures the raw HTML. From there, I hand the DOM over to BeautifulSoup4 to parse the rows and columns safely.

### The Transformation Layer (Pandas)

Raw WCS scoring data is wide and messy (competitors as rows, judges as columns). Using Pandas, I melt this matrix into a strict, long-format "Tidy Data" schema: `event_name`, `division`, `competitor_bib`, `judge_name`, and `raw_mark`.

Crucially, the script automatically maps the raw marks to the official WSDC point system (established Jan 2020):
**Yes = 10.0 | Alt 1 = 4.5 | Alt 2 = 4.3 | Alt 3 = 4.2 | No = 0.0**

### The Storage Layer (PyArrow & Git LFS)

Over four years of global competition data easily scales to over 1.5 million rows. Storing this as flat CSVs would bloat the repository and slow down read times. Instead, I use PyArrow to compress the Pandas DataFrame into highly efficient `.parquet` files. To keep my GitHub repository lightweight, these binary files are version-controlled using Git LFS (Large File Storage).

## Security First: Hardening the Pipeline

Web scraping inherently involves pulling untrusted data from external servers. If a malicious actor compromised a scoring website and injected a script into a competitor's name field (e.g., `<script>malicious_payload()</script>`), my pipeline needed to be bulletproof.

Here are the DevSecOps principles I implemented:

1.  **DOM Sanitization:** By strictly using BeautifulSoup's `.text` attribute to extract cell data, the pipeline strips all HTML tags and isolates pure strings. I strictly enforce a "No eval()" rule and never pass extracted strings into system shell commands.
2.  **Principle of Least Privilege:** By default, GitHub Actions runners have broad access. I configured my `.yml` workflow to default to `permissions: read-all` globally, only granting `contents: write` specifically to the final commit job.
3.  **Dependency Pinning (SHA-1):** Supply-chain attacks are a rising threat in CI/CD environments. Instead of referencing mutable release tags for third-party actions (like `actions/checkout@v4`), my workflow pins actions to their exact, immutable commit SHA hashes. If a third-party repository is hijacked, my pipeline remains unaffected.

## Reliability & Automated Testing

A resilient pipeline assumes that third-party data will eventually break. To ensure bad data never makes it into the repository, the pipeline runs a rigorous Pytest suite before the commit step.

*   **Offline Mocking:** Pytest runs the parser against a locally saved, static HTML copy of a past event. This validates the core extraction logic without causing flaky tests due to network timeouts.
*   **Schema Bounds:** The tests assert that the `wsdc_points` column only contains the allowed float values (`[10.0, 4.5, 4.3, 4.2, 0.0]`). If a new judge accidentally inputs a "100", the build fails.
*   **Null Checks:** The pipeline asserts `df['wsdc_points'].notnull().all()` to ensure the mapping dictionary successfully caught every edge case.

## Automated DevOps Scheduling

With the script fortified and tested, the final step was automation.

WCS events typically run from Thursday through Sunday, with organizers finalizing and uploading their scoring data by Monday or Tuesday. To capture this rhythm, I configured the GitHub Actions workflow to trigger automatically via a cron job every Wednesday at 10:00 AM UTC (3:00 AM Pacific).

The runner spins up an `ubuntu-latest` server, installs the pinned dependencies, runs the Pytest validation, executes the Playwright extraction, and uses a fail-safe `git diff` command to gracefully commit the new Parquet files via Git LFS only if new data was found.

## Conclusion

By treating a hobby problem with enterprise-grade engineering rigor, this pipeline does more than just collect dance scores. It serves as a fully automated, self-healing Data Lab.

With this infrastructure humming quietly in the background every Wednesday, the raw data is ready. Next up: building the dashboard and running the analytics to finally decode the mathematics of a West Coast Swing Novice Prelim.

See you on the floor.

---
*"Engineering a better dance weekend. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS lifestyle."*
