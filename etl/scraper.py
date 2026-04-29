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
import random
from urllib.parse import urljoin
from tqdm import tqdm
from etl.processor import process_for_ledger

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

BASE_URL = "https://scoring.dance"
USER_AGENT = "TechDancer-WCS-Scraper/1.0 (+https://github.com/arii/tech-dancer)"

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
        headers = {'User-Agent': USER_AGENT}
        response = requests.get(url, headers=headers, timeout=15)
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

    def _extract_single_dancer_id(self, link):
        d_id = link.get('data-wsdc')
        if not d_id and link.get('href'):
            href = link.get('href')
            path_parts = href.split('/')
            if path_parts and path_parts[-1].isdigit():
                d_id = path_parts[-1]
            else:
                match = re.search(r'/(\d+)$', href)
                if match:
                    d_id = match.group(1)

        if not d_id:
            d_id = f"TEMP_{link.get_text(strip=True).replace(' ', '_')}"
        return str(d_id).strip()

    def _extract_competitor_data(self, row):
        competitor_elem = row.find('td', class_='competitor-name')
        if not competitor_elem:
            return None, None

        links = competitor_elem.find_all('a')
        names = [a.get_text(strip=True) for a in links]
        competitor_name = " & ".join(names) if names else competitor_elem.get_text(strip=True)

        dancer_ids = [self._extract_single_dancer_id(link) for link in links]
        dancer_id = " & ".join(dancer_ids) if dancer_ids else f"TEMP_{competitor_name.replace(' ', '_')}"

        return competitor_name, dancer_id

    def _extract_promoted_status(self, row):
        promoted_elem = row.find('td', class_='promoted')
        if promoted_elem:
            promoted_text = promoted_elem.get_text(strip=True).lower()
            return promoted_text in ['yes', 'y']
        return False

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

                competitor_name, dancer_id = self._extract_competitor_data(row)
                if not competitor_name:
                    continue

                promoted = self._extract_promoted_status(row)

                for j_mark in judge_marks:
                    judge_name = j_mark.get('TITLE') or j_mark.get('title')
                    if "Chiefjudge" in judge_name and not j_mark.get_text(strip=True):
                        continue

                    mark_text = j_mark.get_text(strip=True)
                    results.append({
                        'Dancer_ID': dancer_id,
                        'competitor_bib': bib,
                        'competitor_name': competitor_name,
                        'Promoted': promoted,
                        'judge_name': judge_name,
                        'mark': mark_text,
                        'wsdc_points': self.standardize_mark(mark_text),
                        'event_title': title,
                        'event_date': date_str,
                        'result_id': result_id
                    })

        return pd.DataFrame(results)

class OutputManager:
    """Handles saving data to various formats."""
    def __init__(self, ledger_path, studies_dir, json_path=None):
        self.ledger_path = ledger_path
        self.studies_dir = studies_dir
        self.json_path = json_path
        os.makedirs(self.studies_dir, exist_ok=True)
        if self.json_path:
            os.makedirs(os.path.dirname(self.json_path), exist_ok=True)

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

    def _validate_schema(self, df):
        required_cols = ['Dancer_ID', 'result_id', 'competitor_name', 'Registry_Points_Sum']
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            raise ValueError(f"DataFrame missing required columns: {missing_cols}")

    def update_ledger(self, new_data):
        if new_data.empty: return

        self._validate_schema(new_data)

        if os.path.exists(self.ledger_path):
            existing_ledger = pd.read_parquet(self.ledger_path)
            combined = pd.concat([existing_ledger, new_data], ignore_index=True)
        else:
            combined = new_data

        # Single authoritative deduplication step
        final_ledger = combined.drop_duplicates(subset=['Dancer_ID', 'result_id'], keep='last')

        final_ledger.to_parquet(self.ledger_path, index=False)
        logging.info(f"Updated ledger: {self.ledger_path}")

        if self.json_path:
            final_ledger.to_json(self.json_path, orient='records', indent=2)
            logging.info(f"Updated JSON export: {self.json_path}")

class ETLPipeline:
    """Orchestrates the scraping and processing flow."""
    def __init__(self, crawler, parser, output_manager):
        self.crawler = crawler
        self.parser = parser
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
            context = await browser.new_context(user_agent=USER_AGENT)
            content = await self._fetch_page(context, url)
            await browser.close()

            raw_df = self.parser.parse_results(content, url)
            self.output_manager.save_markdown(raw_df, url)

            ledger_df = process_for_ledger(raw_df)
            self.output_manager.update_ledger(ledger_df)

    async def run_historical(self, years=5):
        logging.info(f"Starting historical scrape for past {years} years")
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent=USER_AGENT)

            # Collect events first so tqdm knows the total count
            events = list(self.crawler.get_recent_events(years=years))
            print(f"\n📊 Found {len(events)} events in the last {years} years. Starting processing...\n")

            for event_url in tqdm(events, desc="Scraping Events", unit="event", dynamic_ncols=True):
                logging.info(f"Processing event: {event_url}")
                try:
                    result_links = self.crawler.get_result_links(event_url)
                    for res_url in result_links:
                        logging.info(f"Scraping result: {res_url}")
                        try:
                            content = await self._fetch_page(context, res_url)
                            raw_df = self.parser.parse_results(content, res_url)
                            self.output_manager.save_markdown(raw_df, res_url)

                            ledger_df = process_for_ledger(raw_df)
                            self.output_manager.update_ledger(ledger_df)
                            # Ethical jittered rate limiting
                            await asyncio.sleep(1 + random.random() * 2)
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
    parser.add_argument("--json", default="src/features/research/data/wcs_prelims.json", help="Path to JSON export")
    parser.add_argument("--studies", default="content/studies", help="Directory for Markdown output")
    args = parser.parse_args()

    pipeline = ETLPipeline(
        ScoringDanceCrawler(),
        ScoringDanceParser(),
        OutputManager(args.ledger, args.studies, args.json)
    )

    if args.url:
        await pipeline.run_single(args.url)
    else:
        await pipeline.run_historical(years=args.years)

if __name__ == "__main__":
    asyncio.run(main())
