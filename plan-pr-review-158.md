# PR Review Plan: #158 — Update ETL tools and scraper for WSDC IDs and progress tracking

<!-- PR_NUMBER: 158 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/158
**Stats:** +193/-53 across 9 file(s)

---

<!-- AGENT INSTRUCTIONS — READ BEFORE DOING ANYTHING ELSE

RULES:
1. Work ONLY from the diff content in this document. Do NOT fetch external data.
2. Do NOT alter the document structure, headings, or fenced code blocks.
3. Keep all ```json blocks intact and properly fenced — the parser depends on them.
4. Do NOT mark Step 3 verification items complete until Step 2 is fully done.

STEPS (in order):
  Step 1: Read the Description and Stats. If additions > 100 lines, you MUST find 10+ lines to cut.
  Step 2: For every file block in "Per-File Audit":
    - Read the diff.
    - Mark each checklist item [x] if clean, or write the violation inline.
    - Replace the "body" value in the Proposed inline comment JSON blocks with specific feedback.
    - Update "line" to the actual diff line number where the issue occurs.
    - You MUST leave a comment for every file, even if just confirming it is clean.
  Step 3: Verify all items below are complete, then mark each [x].
    [ ] Every audit checklist item is marked [x] or has a violation noted.
    [ ] Every Proposed inline comment has a real line number (not 1) and a real body (not a placeholder).
    [ ] The Submission body is filled in with ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION.
  Step 4: Submit using the command in the Submission section at the bottom.
-->

## Description

This PR updates the WCS ETL pipeline to improve data accuracy and usability. 

Key changes:
- **Scraper Enhancement**: The `ScoringDanceParser` now extracts permanent WSDC IDs (registry numbers) instead of temporary event-specific IDs. It also handles results for couples by parsing multiple links and joining names/IDs.
- **New Metadata**: Added extraction of 'Promoted' status for each result.
- **Visual Feedback**: Integrated `tqdm` to provide a live progress bar during historical 5-year syncs.
- **Improved Data Integrity**: Updated `OutputManager` to deduplicate records based on a composite key of `Dancer_ID` and `result_id`, ensuring historical competition records for the same dancer are preserved.
- **CLI Utility**: Created `etl/query_ledger.py` to allow easy querying of the local Parquet ledger by name or WSDC ID.
- **Tests**: Expanded the test suite to verify WSDC ID extraction and the updated data processing logic.

Fixes #149

---
*PR created automatically by Jules for task [13591944083224708278](https://jules.google.com/task/13591944083224708278) started by @arii*

---

## Review Standards

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. Dead abstractions — new class/context/hook that a simpler primitive already handles?
2. Unnecessary indirection — adds a layer where a direct call would do?
3. Responsibility creep — component taking on logic that belongs in a hook or parent?
4. Import bloat — `import React` added unnecessarily? (Not needed in React 17+)
5. Token compliance — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. No arbitrary Tailwind — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. Audit ratio — if additions > 100 lines, find at least 10 lines to cut.

Mandatory response sections (fill these in the Submission body below):
- ANTI-AI-SLOP: verbose/over-engineered patterns found, or confirmed absent
- FINDINGS: per-file critical feedback with specific line numbers
- FINAL RECOMMENDATION: Approved | Approved with Minor Changes | Not Approved

---

## Files Changed

- `[A]` [etl/__init__.py](https://github.com/arii/tech-dancer/pull/158/files) `+0/-0`
- `[M]` [etl/data/wcs_prelims.parquet](https://github.com/arii/tech-dancer/pull/158/files) `+0/-0`
- `[A]` [etl/processor.py](https://github.com/arii/tech-dancer/pull/158/files) `+14/-0`
- `[A]` [etl/query_ledger.py](https://github.com/arii/tech-dancer/pull/158/files) `+53/-0`
- `[M]` [etl/requirements.txt](https://github.com/arii/tech-dancer/pull/158/files) `+1/-0`
- `[M]` [etl/scraper.py](https://github.com/arii/tech-dancer/pull/158/files) `+65/-37`
- `[A]` [etl/tests/__init__.py](https://github.com/arii/tech-dancer/pull/158/files) `+0/-0`
- `[M]` [etl/tests/mock_scoring_dance.html](https://github.com/arii/tech-dancer/pull/158/files) `+3/-3`
- `[M]` [etl/tests/test_pipeline.py](https://github.com/arii/tech-dancer/pull/158/files) `+57/-13`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: etl/__init__.py -->
---

### File: `etl/__init__.py` +0/-0 (added)

Diff:
```diff
_Binary file or no textual diff available._
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/__init__.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/__init__.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/__init__.py -->


<!-- BEGIN_FILE_AUDIT: etl/data/wcs_prelims.parquet -->
---

### File: `etl/data/wcs_prelims.parquet` +0/-0 (modified)

Diff:
```diff
_Binary file or no textual diff available._
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/data/wcs_prelims.parquet",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/data/wcs_prelims.parquet",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/data/wcs_prelims.parquet -->


<!-- BEGIN_FILE_AUDIT: etl/processor.py -->
---

### File: `etl/processor.py` +14/-0 (added)

Diff:
```diff
@@ -0,0 +1,14 @@
+import pandas as pd
+
+def process_for_ledger(raw_df):
+    """Handles data transformation and aggregation."""
+    if raw_df.empty:
+        return pd.DataFrame()
+
+    # Group by the new Dancer_ID and other metadata
+    processed_df = raw_df.groupby(['Dancer_ID', 'competitor_name', 'result_id', 'event_title', 'event_date']).agg(
+        Registry_Points_Sum=('wsdc_points', 'sum'),
+        Promoted=('Promoted', 'any')
+    ).reset_index()
+
+    return processed_df
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/processor.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/processor.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/processor.py -->


<!-- BEGIN_FILE_AUDIT: etl/query_ledger.py -->
---

### File: `etl/query_ledger.py` +53/-0 (added)

Diff:
```diff
@@ -0,0 +1,53 @@
+import pandas as pd
+import argparse
+import os
+
+def _print_message(msg, status="info"):
+    icon = {"info": "ℹ️", "success": "✅", "error": "❌"}.get(status, "ℹ️")
+    print(f"{icon} {msg}")
+
+def _print_results(df, query):
+    if df.empty:
+        _print_message(f"No records found for '{query}'", "error")
+        return
+
+    _print_message(f"Found {len(df)} records for '{query}':", "success")
+    cols = ['event_date', 'event_title', 'competitor_name', 'Dancer_ID', 'Promoted']
+    available_cols = [c for c in cols if c in df.columns]
+    print(df[available_cols].sort_values('event_date', ascending=False).to_string(index=False))
+
+def query_dancer(path, identity):
+    # Sanitize and resolve path
+    safe_path = os.path.abspath(path)
+
+    if not os.path.exists(safe_path) or not os.path.isfile(safe_path):
+        _print_message(f"Ledger file not found or invalid: {safe_path}", "error")
+        return
+
+    try:
+        df = pd.read_parquet(safe_path)
+    except Exception as e:
+        _print_message(f"Failed to read ledger file: {e}", "error")
+        return
+
+    required_cols = ['Dancer_ID', 'competitor_name']
+    missing_cols = [col for col in required_cols if col not in df.columns]
+    if missing_cols:
+        _print_message(f"Ledger schema mismatch. Missing columns: {', '.join(missing_cols)}", "error")
+        return
+
+    try:
+        result = df[
+            (df['Dancer_ID'].astype(str) == str(identity)) |
+            (df['competitor_name'].str.contains(str(identity), case=False, na=False))
+        ]
+        _print_results(result, identity)
+    except Exception as e:
+        _print_message(f"Error during query execution: {e}", "error")
+
+if __name__ == "__main__":
+    parser = argparse.ArgumentParser(description="Query the WCS competition ledger.")
+    parser.add_argument("query", help="Dancer Name or WSDC ID")
+    parser.add_argument("--ledger", default="etl/data/wcs_prelims.parquet", help="Path to Parquet ledger")
+    args = parser.parse_args()
+    query_dancer(args.ledger, args.query)
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/query_ledger.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/query_ledger.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/query_ledger.py -->


<!-- BEGIN_FILE_AUDIT: etl/requirements.txt -->
---

### File: `etl/requirements.txt` +1/-0 (modified)

Diff:
```diff
@@ -7,3 +7,4 @@ pytest-asyncio==1.3.0
 pytest-mock==3.15.1
 tenacity==8.2.3
 requests==2.33.1
+tqdm==4.67.3
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/requirements.txt",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/requirements.txt",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/requirements.txt -->


<!-- BEGIN_FILE_AUDIT: etl/scraper.py -->
---

### File: `etl/scraper.py` +65/-37 (modified)

Diff:
```diff
@@ -11,6 +11,8 @@
 from tenacity import retry, stop_after_attempt, wait_exponential
 import requests
 from urllib.parse import urljoin
+from tqdm import tqdm
+from etl.processor import process_for_ledger
 
 logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
 
@@ -107,6 +109,43 @@ class ScoringDanceParser:
     def standardize_mark(mark_text):
         return POINTS_MAPPING.get(mark_text.strip(), 0.0)
 
+    def _extract_single_dancer_id(self, link):
+        d_id = link.get('data-wsdc')
+        if not d_id and link.get('href'):
+            href = link.get('href')
+            path_parts = href.split('/')
+            if path_parts and path_parts[-1].isdigit():
+                d_id = path_parts[-1]
+            else:
+                match = re.search(r'/(\d+)$', href)
+                if match:
+                    d_id = match.group(1)
+
+        if not d_id:
+            d_id = f"TEMP_{link.get_text(strip=True).replace(' ', '_')}"
+        return str(d_id).strip()
+
+    def _extract_competitor_data(self, row):
+        competitor_elem = row.find('td', class_='competitor-name')
+        if not competitor_elem:
+            return None, None
+
+        links = competitor_elem.find_all('a')
+        names = [a.get_text(strip=True) for a in links]
+        competitor_name = " & ".join(names) if names else competitor_elem.get_text(strip=True)
+
+        dancer_ids = [self._extract_single_dancer_id(link) for link in links]
+        dancer_id = " & ".join(dancer_ids) if dancer_ids else f"TEMP_{competitor_name.replace(' ', '_')}"
+
+        return competitor_name, dancer_id
+
+    def _extract_promoted_status(self, row):
+        promoted_elem = row.find('td', class_='promoted')
+        if promoted_elem:
+            promoted_text = promoted_elem.get_text(strip=True).lower()
+            return promoted_text in ['yes', 'y']
+        return False
+
     def parse_results(self, html_content, url):
         soup = BeautifulSoup(html_content, 'html.parser')
         results = []
@@ -144,17 +183,11 @@ def parse_results(self, html_content, url):
                 else:
                     continue
 
-                name_links = row.find_all('a', attrs={'data-wsdc': True})
-                if name_links:
-                    name = " & ".join([a.get_text(strip=True) for a in name_links])
-                else:
-                    name_cell = row.find('td', class_='competitor-name')
-                    if name_cell:
-                        name = name_cell.get_text(strip=True)
-                    elif len(cells) > 1:
-                        name = cells[1].get_text(strip=True)
-                    else:
-                        name = ""
+                competitor_name, dancer_id = self._extract_competitor_data(row)
+                if not competitor_name:
+                    continue
+
+                promoted = self._extract_promoted_status(row)
 
                 for j_mark in judge_marks:
                     judge_name = j_mark.get('TITLE') or j_mark.get('title')
@@ -163,8 +196,10 @@ def parse_results(self, html_content, url):
 
                     mark_text = j_mark.get_text(strip=True)
                     results.append({
+                        'Dancer_ID': dancer_id,
                         'competitor_bib': bib,
-                        'competitor_name': name,
+                        'competitor_name': competitor_name,
+                        'Promoted': promoted,
                         'judge_name': judge_name,
                         'mark': mark_text,
                         'wsdc_points': self.standardize_mark(mark_text),
@@ -175,24 +210,6 @@ def parse_results(self, html_content, url):
 
         return pd.DataFrame(results)
 
-class DataProcessor:
-    """Handles data transformation and aggregation."""
-    @staticmethod
-    def process_for_ledger(raw_df):
-        if raw_df.empty:
-            return pd.DataFrame()
-
-        processed_df = raw_df.groupby(['competitor_bib', 'competitor_name', 'result_id']).agg(
-            Registry_Points_Sum=('wsdc_points', 'sum')
-        ).reset_index()
-
-        processed_df['Dancer_ID'] = processed_df.apply(
-            lambda row: f"REF_ID: {row['competitor_bib']:03d}-{row['result_id']}", axis=1
-        )
-        processed_df = processed_df[['Dancer_ID', 'Registry_Points_Sum', 'competitor_name']]
-        processed_df.rename(columns={'competitor_name': 'Dancer_Name'}, inplace=True)
-        return processed_df
-
 class OutputManager:
     """Handles saving data to various formats."""
     def __init__(self, ledger_path, studies_dir):
@@ -250,27 +267,34 @@ def save_markdown(self, df, url):
             f.write(md_content)
         logging.info(f"Saved markdown study: {filepath}")
 
+    def _validate_schema(self, df):
+        required_cols = ['Dancer_ID', 'result_id', 'competitor_name', 'Registry_Points_Sum']
+        missing_cols = [col for col in required_cols if col not in df.columns]
+        if missing_cols:
+            raise ValueError(f"DataFrame missing required columns: {missing_cols}")
+
     def update_ledger(self, new_data):
         if new_data.empty: return
 
+        self._validate_schema(new_data)
+
         if os.path.exists(self.ledger_path):
             existing_ledger = pd.read_parquet(self.ledger_path)
             combined = pd.concat([existing_ledger, new_data], ignore_index=True)
         else:
             combined = new_data
 
         # Single authoritative deduplication step
-        final_ledger = combined.drop_duplicates(subset=['Dancer_ID'], keep='last')
+        final_ledger = combined.drop_duplicates(subset=['Dancer_ID', 'result_id'], keep='last')
 
         final_ledger.to_parquet(self.ledger_path, index=False)
         logging.info(f"Updated ledger: {self.ledger_path}")
 
 class ETLPipeline:
     """Orchestrates the scraping and processing flow."""
-    def __init__(self, crawler, parser, processor, output_manager):
+    def __init__(self, crawler, parser, output_manager):
         self.crawler = crawler
         self.parser = parser
-        self.processor = processor
         self.output_manager = output_manager
 
     @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
@@ -297,15 +321,20 @@ async def run_single(self, url):
             raw_df = self.parser.parse_results(content, url)
             self.output_manager.save_markdown(raw_df, url)
 
-            ledger_df = self.processor.process_for_ledger(raw_df)
+            ledger_df = process_for_ledger(raw_df)
             self.output_manager.update_ledger(ledger_df)
 
     async def run_historical(self, years=5):
+        logging.info(f"Starting historical scrape for past {years} years")
         async with async_playwright() as p:
             browser = await p.chromium.launch(headless=True)
             context = await browser.new_context(user_agent="Mozilla/5.0...")
 
-            for event_url in self.crawler.get_recent_events(years=years):
+            # Collect events first so tqdm knows the total count
+            events = list(self.crawler.get_recent_events(years=years))
+            print(f"\n📊 Found {len(events)} events in the last {years} years. Starting processing...\n")
+
+            for event_url in tqdm(events, desc="Scraping Events", unit="event", dynamic_ncols=True):
                 logging.info(f"Processing event: {event_url}")
                 try:
                     result_links = self.crawler.get_result_links(event_url)
@@ -316,7 +345,7 @@ async def run_historical(self, years=5):
                             raw_df = self.parser.parse_results(content, res_url)
                             self.output_manager.save_markdown(raw_df, res_url)
 
-                            ledger_df = self.processor.process_for_ledger(raw_df)
+                            ledger_df = process_for_ledger(raw_df)
                             self.output_manager.update_ledger(ledger_df)
                             await asyncio.sleep(1)
                         except Exception as e:
@@ -336,7 +365,6 @@ async def main():
     pipeline = ETLPipeline(
         ScoringDanceCrawler(),
         ScoringDanceParser(),
-        DataProcessor(),
         OutputManager(args.ledger, args.studies)
     )
 
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/scraper.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/scraper.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/scraper.py -->


<!-- BEGIN_FILE_AUDIT: etl/tests/__init__.py -->
---

### File: `etl/tests/__init__.py` +0/-0 (added)

Diff:
```diff
_Binary file or no textual diff available._
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/tests/__init__.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/tests/__init__.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/tests/__init__.py -->


<!-- BEGIN_FILE_AUDIT: etl/tests/mock_scoring_dance.html -->
---

### File: `etl/tests/mock_scoring_dance.html` +3/-3 (modified)

Diff:
```diff
@@ -10,21 +10,21 @@
         </tr>
         <tr>
             <td>101</td>
-            <td><a href="/profile/123" data-wsdc="123">John Doe</a></td>
+            <td class="competitor-name"><a href="/profile/123" data-wsdc="123">John Doe</a></td>
             <td TITLE="Judge One">Yes</td>
             <td TITLE="Judge Two">Alt1</td>
             <td>14.5</td>
         </tr>
         <tr>
             <td>102</td>
-            <td><a href="/profile/456" data-wsdc="456">Jane Smith</a></td>
+            <td class="competitor-name"><a href="/profile/456" data-wsdc="456">Jane Smith</a></td>
             <td TITLE="Judge One">No</td>
             <td TITLE="Judge Two">Alt2</td>
             <td>4.3</td>
         </tr>
         <tr>
             <td>103</td>
-            <td>Bob Brown</td>
+            <td class="competitor-name">Bob Brown</td>
             <td TITLE="Judge One">Alt3</td>
             <td TITLE="Judge Two">No</td>
             <td>4.2</td>
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/tests/mock_scoring_dance.html",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/tests/mock_scoring_dance.html",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/tests/mock_scoring_dance.html -->


<!-- BEGIN_FILE_AUDIT: etl/tests/test_pipeline.py -->
---

### File: `etl/tests/test_pipeline.py` +57/-13 (modified)

Diff:
```diff
@@ -3,13 +3,33 @@
 import os
 import requests
 from datetime import datetime, timedelta
-from scraper import (
+from bs4 import BeautifulSoup
+from etl.scraper import (
     ScoringDanceCrawler,
     ScoringDanceParser,
-    DataProcessor,
     OutputManager,
     BASE_URL
 )
+from etl.processor import process_for_ledger
+
+def test_wsdc_id_extraction():
+    parser = ScoringDanceParser()
+    # Mock HTML snippet representing a result row with a WSDC link
+    html_snippet = """
+    <table>
+        <tr>
+            <td>101</td>
+            <td class="competitor-name"><a href="/dancer/24305" data-wsdc="24305">Ariel</a></td>
+            <td class="promoted">Yes</td>
+            <td title="Judge 1">Yes</td>
+        </tr>
+    </table>
+    """
+    url = "http://mock-url.com/results/123.html"
+    df = parser.parse_results(html_snippet, url)
+
+    assert df['Dancer_ID'].iloc[0] == '24305'
+    assert df['Promoted'].iloc[0] == True
 
 def test_parse_results():
     parser = ScoringDanceParser()
@@ -24,41 +44,65 @@ def test_parse_results():
     # In mock, we have 3 rows, but each has 2 judge marks, so 6 rows in df
     assert len(df) == 6
     john_doe = df[df['competitor_name'] == 'John Doe']
+    assert john_doe['Dancer_ID'].iloc[0] == '123'
     assert 101 in john_doe['competitor_bib'].values
     assert 10.0 in john_doe['wsdc_points'].values
     assert all(df['result_id'] == '2945')
 
     # Test fallback for Bob Brown who has no link (based on cell text)
     bob_brown = df[df['competitor_name'] == 'Bob Brown']
     assert not bob_brown.empty
+    assert bob_brown['Dancer_ID'].iloc[0] == 'TEMP_Bob_Brown'
     assert 103 in bob_brown['competitor_bib'].values
 
 def test_process_for_ledger():
-    processor = DataProcessor()
     raw_data = pd.DataFrame({
+        'Dancer_ID': ['123', '123', '456'],
         'competitor_bib': [101, 101, 102],
         'competitor_name': ['John Doe', 'John Doe', 'Jane Smith'],
         'wsdc_points': [10.0, 4.5, 0.0],
-        'result_id': ['2945', '2945', '2945']
+        'Promoted': [True, True, False],
+        'result_id': ['2945', '2945', '2945'],
+        'event_title': ['Mock Event', 'Mock Event', 'Mock Event'],
+        'event_date': ['01/01/2025', '01/01/2025', '01/01/2025']
     })
-    df = processor.process_for_ledger(raw_data)
+    df = process_for_ledger(raw_data)
     assert len(df) == 2
-    assert df[df['Dancer_ID'] == 'REF_ID: 101-2945']['Registry_Points_Sum'].values[0] == 14.5
+    assert df[df['Dancer_ID'] == '123']['Registry_Points_Sum'].values[0] == 14.5
+    assert df[df['Dancer_ID'] == '123']['Promoted'].values[0] == True
 
 def test_update_ledger_hygiene(tmp_path):
     ledger_file = tmp_path / "test_ledger.parquet"
     manager = OutputManager(ledger_path=str(ledger_file), studies_dir=str(tmp_path/"studies"))
 
-    data = pd.DataFrame({
-        'Dancer_ID': ['REF_ID: 001-2945', 'REF_ID: 002-2945'],
-        'Dancer_Name': ['John Doe', 'Jane Smith'],
-        'Registry_Points_Sum': [10.0, 10.0]
+    data1 = pd.DataFrame({
+        'Dancer_ID': ['123', '456'],
+        'result_id': ['2945', '2945'],
+        'competitor_name': ['John Doe', 'Jane Smith'],
+        'Registry_Points_Sum': [10.0, 10.0],
+        'Promoted': [True, False],
+        'event_title': ['Mock Event', 'Mock Event'],
+        'event_date': ['01/01/2025', '01/01/2025']
+    })
+    manager.update_ledger(data1)
+
+    data2 = pd.DataFrame({
+        'Dancer_ID': ['123', '456'],
+        'result_id': ['2946', '2946'],
+        'competitor_name': ['John Doe', 'Jane Smith'],
+        'Registry_Points_Sum': [5.0, 5.0],
+        'Promoted': [True, False],
+        'event_title': ['Mock Event 2', 'Mock Event 2'],
+        'event_date': ['01/02/2025', '01/02/2025']
     })
-    manager.update_ledger(data)
+    manager.update_ledger(data2)
+
     assert os.path.exists(ledger_file)
 
     df = pd.read_parquet(ledger_file)
-    assert len(df) == 2
+    # Deduplication is on (Dancer_ID, result_id).
+    # Since result_id differs, we should have 4 rows.
+    assert len(df) == 4
 
 def test_get_recent_events(mocker):
     # Use relative date for deterministic test
@@ -72,7 +116,7 @@ def test_get_recent_events(mocker):
         </tr>
     </table>
     """
-    mocker.patch('scraper.ScoringDanceCrawler._fetch_page_text', side_effect=[html_text, requests.RequestException("End of pagination")])
+    mocker.patch('etl.scraper.ScoringDanceCrawler._fetch_page_text', side_effect=[html_text, requests.RequestException("End of pagination")])
 
     crawler = ScoringDanceCrawler()
     links = list(crawler.get_recent_events(years=1))
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "etl/tests/test_pipeline.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "etl/tests/test_pipeline.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: etl/tests/test_pipeline.py -->


---

## Submission

After completing every file block above, fill in the body below and run the command.

<!-- BEGIN_SUBMISSION_JSON -->
```json
{
  "body": "## ANTI-AI-SLOP\n<findings or confirmed absent>\n\n## FINDINGS\n<per-file summary with line references>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```
<!-- END_SUBMISSION_JSON -->

Command:
```bash
python3 dev-tools/submit_pr_review_data.py plan-pr-review-158.md
```
