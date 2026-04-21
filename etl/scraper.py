import pandas as pd
import logging
import os
import re
import asyncio
import sys
import argparse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError
from datetime import datetime, timedelta
from tenacity import retry, stop_after_attempt, wait_exponential
import requests
from urllib.parse import urljoin

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

BASE_URL = "https://scoring.dance"

POINTS_MAPPING = {
    'Yes': 10.0, 'Alt1': 4.5, 'Alt2': 4.3, 'Alt3': 4.2, 'No': 0.0,
    'Y': 10.0, 'A1': 4.5, 'A2': 4.3, 'A3': 4.2, 'N': 0.0
}

class ScoringDanceCrawler:
    """Handles navigation and link extraction from scoring.dance."""
    def __init__(self, base_url=BASE_URL):
        self.base_url = base_url

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=10), reraise=True)
    def _fetch_page_text(self, url):
        response = requests.get(url, timeout=15)
        response.raise_for_status()
        return response.text

    def get_recent_events(self, years=5):
        """Generator that yields event URLs within the given timeframe."""
        cutoff_date = datetime.now() - timedelta(days=years*365)
        page = 1

        while True:
            url = f"{self.base_url}/enUS/recent?page={page}"
            logging.info(f"Crawling recent events page {page}...")
            try:
                html_content = self._fetch_page_text(url)
            except requests.RequestException as e:
                logging.error(f"Failed to fetch recent events page {page}: {e}")
                break

            soup = BeautifulSoup(html_content, 'html.parser')
            links_found = soup.find_all('a', href=re.compile(r'/events/\d+/results/?$'))

            if not links_found:
                break

            page_has_valid_date = False
            for link in links_found:
                href = link['href']
                event_url = urljoin(self.base_url, href)

                found_date = self._extract_date_near_element(link)

                if found_date:
                    if found_date >= cutoff_date:
                        yield event_url
                        page_has_valid_date = True
                else:
                    # Fallback: yield and assume it's recent enough
                    yield event_url
                    page_has_valid_date = True

            if not page_has_valid_date and page > 1:
                break

            page += 1
            if page > 100:
                break

    def _extract_date_near_element(self, element):
        parent = element.find_parent()
        for _ in range(4):
            if not parent: break
            text = parent.get_text()
            date_matches = re.findall(r'(\d{2}/\d{2}/\d{4})', text)
            if date_matches:
                try:
                    return datetime.strptime(date_matches[-1], '%m/%d/%Y')
                except ValueError:
                    pass
            parent = parent.parent
        return None

    def get_result_links(self, event_url):
        """Extracts individual competition result links from an event page."""
        try:
            html_content = self._fetch_page_text(event_url)
        except requests.RequestException as e:
            logging.error(f"Failed to fetch event page {event_url}: {e}")
            return []

        soup = BeautifulSoup(html_content, 'html.parser')
        links = soup.find_all('a', href=re.compile(r'/results/\d+\.html'))
        return [urljoin(self.base_url, l['href']) for l in links]

class ScoringDanceParser:
    """Handles parsing of individual result pages."""
    @staticmethod
    def standardize_mark(mark_text):
        return POINTS_MAPPING.get(mark_text.strip(), 0.0)

    def parse_results(self, html_content, url):
        soup = BeautifulSoup(html_content, 'html.parser')
        results = []

        title_tag = soup.find('h1')
        title = title_tag.get_text(strip=True) if title_tag else "Unknown Result"

        date_match = re.search(r'at (\d{2}/\d{2}/\d{4})', soup.get_text())
        date_str = date_match.group(1) if date_match else None

        if not date_str:
            logging.warning("No event date found while parsing results page: %s", title)

        result_id_match = re.search(r'/results/(\d+)\.html', url)
        result_id = result_id_match.group(1) if result_id_match else "unknown"

        tables = soup.find_all('table', class_=lambda c: c and 'results-table' in c)
        if not tables:
            tables = soup.find_all('table')

        for table in tables:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all(['td', 'th'])
                if len(cells) < 3:
                    continue

                judge_marks = [c for c in cells if c.has_attr('TITLE') or c.has_attr('title')]
                if not judge_marks:
                    continue

                bib_cell = cells[0].get_text(strip=True)
                if bib_cell.isdigit():
                    bib = int(bib_cell)
                else:
                    continue

                name_links = row.find_all('a', attrs={'data-wsdc': True})
                if name_links:
                    name = " & ".join([a.get_text(strip=True) for a in name_links])
                else:
                    name_cell = row.find('td', class_='competitor-name')
                    if name_cell:
                        name = name_cell.get_text(strip=True)
                    elif len(cells) > 1:
                        name = cells[1].get_text(strip=True)
                    else:
                        name = ""

                for j_mark in judge_marks:
                    judge_name = j_mark.get('TITLE') or j_mark.get('title')
                    if "Chiefjudge" in judge_name and not j_mark.get_text(strip=True):
                        continue

                    mark_text = j_mark.get_text(strip=True)
                    results.append({
                        'competitor_bib': bib,
                        'competitor_name': name,
                        'judge_name': judge_name,
                        'mark': mark_text,
                        'wsdc_points': self.standardize_mark(mark_text),
                        'event_title': title,
                        'event_date': date_str,
                        'result_id': result_id
                    })

        return pd.DataFrame(results)

class DataProcessor:
    """Handles data transformation and aggregation."""
    @staticmethod
    def process_for_ledger(raw_df):
        if raw_df.empty:
            return pd.DataFrame()

        processed_df = raw_df.groupby(['competitor_bib', 'competitor_name', 'result_id']).agg(
            Registry_Points_Sum=('wsdc_points', 'sum')
        ).reset_index()

        processed_df['Dancer_ID'] = processed_df.apply(
            lambda row: f"REF_ID: {row['competitor_bib']:03d}-{row['result_id']}", axis=1
        )
        processed_df = processed_df[['Dancer_ID', 'Registry_Points_Sum', 'competitor_name']]
        processed_df.rename(columns={'competitor_name': 'Dancer_Name'}, inplace=True)
        return processed_df

class OutputManager:
    """Handles saving data to various formats."""
    def __init__(self, ledger_path, studies_dir):
        self.ledger_path = ledger_path
        self.studies_dir = studies_dir
        os.makedirs(self.studies_dir, exist_ok=True)

    def save_markdown(self, df, url):
        if df.empty: return

        first_row = df.iloc[0]
        title = first_row.get('event_title', 'Competition Results')
        date_raw = first_row.get('event_date')

        if date_raw:
            try:
                date_iso = datetime.strptime(date_raw, '%m/%d/%Y').strftime('%Y-%m-%d')
            except ValueError:
                logging.warning("Invalid event_date %r for %s; falling back to current date.", date_raw, url)
                date_iso = datetime.now().strftime('%Y-%m-%d')
        else:
            date_iso = "unknown"

        result_id = re.search(r'/results/(\d+)\.html', url)
        id_suffix = f"-{result_id.group(1)}" if result_id else ""
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-') + id_suffix

        md_df = df.drop_duplicates(subset=['competitor_bib']).reset_index(drop=True)

        md_content = f"""---
type: study
title: "{title}"
date: "{date_iso}"
author: "Scraper"
category: "Results"
excerpt: "Final results for {title}."
slug: "{slug}"
---

| Rank | Lead | Follow |
|------|------|--------|
"""
        for i, row in md_df.iterrows():
            name = row['competitor_name']
            if " & " in name:
                parts = name.split(" & ")
                lead, follow = parts[0], parts[1] if len(parts) > 1 else ""
            else:
                lead, follow = name, ""

            md_content += f"| {i+1} | {lead} | {follow} |\n"

        filepath = os.path.join(self.studies_dir, f"{slug}.md")
        with open(filepath, 'w') as f:
            f.write(md_content)
        logging.info(f"Saved markdown study: {filepath}")

    def update_ledger(self, new_data):
        if new_data.empty: return

        if os.path.exists(self.ledger_path):
            existing_ledger = pd.read_parquet(self.ledger_path)
            combined = pd.concat([existing_ledger, new_data], ignore_index=True)
        else:
            combined = new_data

        # Single authoritative deduplication step
        final_ledger = combined.drop_duplicates(subset=['Dancer_ID'], keep='last')

        final_ledger.to_parquet(self.ledger_path, index=False)
        logging.info(f"Updated ledger: {self.ledger_path}")

class ETLPipeline:
    """Orchestrates the scraping and processing flow."""
    def __init__(self, crawler, parser, processor, output_manager):
        self.crawler = crawler
        self.parser = parser
        self.processor = processor
        self.output_manager = output_manager

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def _fetch_page(self, browser_context, url):
        page = await browser_context.new_page()
        try:
            await page.goto(url, timeout=30000)
            try:
                await page.wait_for_selector('table.results-table', state='attached', timeout=10000)
            except PlaywrightTimeoutError:
                logging.debug(f"Timeout waiting for results table on {url}.")
            content = await page.content()
        finally:
            await page.close()
        return content

    async def run_single(self, url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent="Mozilla/5.0...")
            content = await self._fetch_page(context, url)
            await browser.close()

            raw_df = self.parser.parse_results(content, url)
            self.output_manager.save_markdown(raw_df, url)

            ledger_df = self.processor.process_for_ledger(raw_df)
            self.output_manager.update_ledger(ledger_df)

    async def run_historical(self, years=5):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent="Mozilla/5.0...")

            for event_url in self.crawler.get_recent_events(years=years):
                logging.info(f"Processing event: {event_url}")
                try:
                    result_links = self.crawler.get_result_links(event_url)
                    for res_url in result_links:
                        logging.info(f"Scraping result: {res_url}")
                        try:
                            content = await self._fetch_page(context, res_url)
                            raw_df = self.parser.parse_results(content, res_url)
                            self.output_manager.save_markdown(raw_df, res_url)

                            ledger_df = self.processor.process_for_ledger(raw_df)
                            self.output_manager.update_ledger(ledger_df)
                            await asyncio.sleep(1)
                        except Exception as e:
                            logging.error(f"Failed to process {res_url}: {e}")
                except Exception as e:
                    logging.error(f"Failed to process event {event_url}: {e}")
            await browser.close()

async def main():
    parser = argparse.ArgumentParser(description="Scoring.dance ETL Scraper")
    parser.add_argument("url", nargs="?", help="Single result URL to scrape")
    parser.add_argument("--years", type=int, default=5, help="Years to crawl back (default: 5)")
    parser.add_argument("--ledger", default="etl/data/wcs_prelims.parquet", help="Path to Parquet ledger")
    parser.add_argument("--studies", default="content/studies", help="Directory for Markdown output")
    args = parser.parse_args()

    pipeline = ETLPipeline(
        ScoringDanceCrawler(),
        ScoringDanceParser(),
        DataProcessor(),
        OutputManager(args.ledger, args.studies)
    )

    if args.url:
        await pipeline.run_single(args.url)
    else:
        await pipeline.run_historical(years=args.years)

if __name__ == "__main__":
    asyncio.run(main())
