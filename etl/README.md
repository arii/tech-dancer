# WCS Data ETL Pipeline

This directory contains the tools and data for scraping, processing, and maintaining West Coast Swing (WCS) competition results from `scoring.dance`.

## Tool Architecture

The scraper is built with a modular architecture following the Single Responsibility Principle:

- **`ScoringDanceCrawler`**: Handles navigation and link extraction. It supports paginated crawling of recent events and filtering by date.
- **`ScoringDanceParser`**: Parses individual result pages using BeautifulSoup and Playwright, extracting competitor names, bib numbers, and marks.
- **`DataProcessor`**: Transforms raw HTML data into structured DataFrames and calculates WSDC points.
- **`OutputManager`**: Manages data persistence. It exports competition "studies" as Markdown files for the frontend and maintains a central Parquet ledger.
- **`ETLPipeline`**: Orchestrates the components to perform either single-URL extractions or comprehensive historical crawls.

## Usage

### Prerequisites
Install dependencies:
```bash
pip install -r etl/requirements.txt
playwright install chromium
```

### Run a Historical Crawl
By default, the scraper crawls the last 5 years of data:
```bash
python etl/scraper.py
```

To crawl a specific number of years:
```bash
python etl/scraper.py --years 2
```

### Scrape a Single URL
```bash
python etl/scraper.py https://scoring.dance/enUS/events/338/results/5415.html
```

## Data Management

### Central Ledger
The primary data artifact is `etl/data/wcs_prelims.parquet`.
- **Entries**: 1,652 unique dancer-competition records.
- **Unique Identifier**: `REF_ID: {bib_number}-{result_id}`, ensuring stability across different events.

### Frontend Integration
The frontend application directly consumes the Parquet ledger using `hyparquet`.
- During the build process, `wcs_prelims.parquet` is copied to the `public/data/` directory.
- This approach eliminates intermediate JSON or Markdown files and ensures the frontend has immediate, zero-overhead access to the full historical dataset.

## Automated Workflow
A GitHub Action (`.github/workflows/wcs_etl.yml`) runs weekly to perform a rolling 1-year crawl, keeping the ledger up to date with the latest results.
