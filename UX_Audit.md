# UX Audit Report

## Overview
This document contains the findings from a heuristic visual audit of the Tech-Dancer web application, covering both Desktop and Mobile viewports across key pages (`/`, `/about`, `/blog`, `/gear`, and `/research`).

---

## Findings

### 1. Search Bar Icon Overlap
**Observation:** On the Blog and Gear pages (both Desktop and Mobile), the search icon (magnifying glass) overlaps directly with the placeholder text ("Search articles, guides, or gear...") within the search input field.
**Heuristic Violated:** Spatial Design (Spacing and Alignment).
**Impact:** Creates visual clutter and reduces the legibility of the placeholder text, making the UI appear unpolished or broken.
**Recommendation:** Add sufficient left padding (`pl-10` or similar) to the input field so that the text starts to the right of the absolutely positioned search icon.
**Severity:** Medium

### 2. Ambiguous Data Visualization Context
**Observation:** The main line graph on the Research/Data Lab page ("WCS COMPETITION TRENDS (INDEXED)") lacks a Y-axis label, scale, or a clear explanation of the metric being displayed.
**Heuristic Violated:** Cognitive Load (Clarity and Context).
**Impact:** Users cannot easily interpret what the data points represent or what the overall trend indicates, which diminishes the value of the visualization.
**Recommendation:** Add explicit Y-axis labels, a descriptive subtitle, or an accompanying paragraph explaining the dataset and its significance.
**Severity:** High

### 3. Missing Affordance for Mobile Filter Scrolling
**Observation:** On the Mobile view of the Blog and Gear pages, the category filter bar (e.g., "All Posts", "Tech", "Travel") is horizontally scrollable, but there is no strong visual cue indicating this affordance (e.g., right-side fade or a partially visible pill).
**Heuristic Violated:** Interaction (Affordance and Discoverability).
**Impact:** Users might assume the visible categories are the only ones available and miss out on filtering options further down the list.
**Recommendation:** Implement a subtle right-side gradient fade or ensure the styling guarantees that the right-most visible item is noticeably truncated at standard mobile widths.
**Severity:** Medium

### 4. Low Prominence of Tool Status Badges
**Observation:** On the Research page under "Tools Ecosystem", the status text ("ACTIVE" or "COMING SOON") in the top right of the tool cards is very small and lacks distinguishing color (both appear as dark gray/black text).
**Heuristic Violated:** Color & Contrast (Visual Hierarchy).
**Impact:** Users must carefully read the small text to determine if a tool is usable or disabled, which increases cognitive effort.
**Recommendation:** Introduce color-coded badges (e.g., a green indicator for "ACTIVE" and an amber/gray indicator for "COMING SOON") to communicate status at a glance.
**Severity:** Low

---
*Audit completed automatically by Jules.*
