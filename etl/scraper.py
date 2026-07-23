# pylint: disable=too-many-locals,logging-fstring-interpolation,too-many-nested-blocks,pointless-string-statement,missing-function-docstring,too-few-public-methods,too-many-instance-attributes,import-outside-toplevel,too-many-statements,bare-except
"""Module for scraping data from external sources."""
import argparse
import asyncio
import logging
import os
import random
import re
import sys
from datetime import datetime, timedelta
from urllib.parse import urljoin

import pandas as pd
import requests
from bs4 import BeautifulSoup
from playwright.async_api import TimeoutError as PlaywrightTimeoutError
from playwright.async_api import async_playwright
from tenacity import retry, stop_after_attempt, wait_exponential
from tqdm import tqdm

from etl.processor import process_for_ledger

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

BASE_URL = "https://scoring.dance"
USER_AGENT = "TechDancer-WCS-Scraper/1.0 (+https://github.com/arii/tech-dancer)"


async def ethical_throttle(base_delay=1.0, jitter_range=(0.0, 2.0)):
    """Handles ethical rate limiting with jitter."""
    delay = base_delay + random.uniform(*jitter_range)
    await asyncio.sleep(delay)


POINTS_MAPPING = {
    "Yes": 10.0,
    "Alt1": 4.5,
    "Alt2": 4.3,
    "Alt3": 4.2,
    "No": 0.0,
    "Y": 10.0,
    "A1": 4.5,
    "A2": 4.3,
    "A3": 4.2,
    "N": 0.0,
}


class ScoringDanceCrawler:
    """Handles navigation and link extraction from scoring.dance."""

    def __init__(self, base_url=BASE_URL):
        self.base_url = base_url

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=10), reraise=True)
    def _fetch_page_text(self, url):
        headers = {"User-Agent": USER_AGENT}
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        return response.text

    def get_recent_events(self, years=5, stop_set=None, legacy_stop_set=None):
        """Crawls the 'Recent Results' pages to find event links."""
        page = 1
        cutoff_date = datetime.now() - timedelta(days=years * 365)
        logging.info(f"Discovering events from the last {years} years...")

        while page <= 100:  # Safety limit
            url = f"{self.base_url}/enUS/recent?page={page}"
            logging.debug(f"Crawling discovery page {page}: {url}")
            try:
                html_content = self._fetch_page_text(url)
                soup = BeautifulSoup(html_content, "html.parser")
                links = soup.find_all("a", href=re.compile(r"/events/\d+/results/"))

                if not links:
                    break

                page_has_valid_date = False
                for link in links:
                    event_url = urljoin(self.base_url, link["href"])
                    event_title = link.get_text().strip()
                    event_date_str = self._extract_date_near_element(link)
                    location = self._extract_location_near_element(link)

                    # Check if we should stop because we've hit known territory
                    # For historical backfill, we continue discovery but skip processing known URLs
                    if stop_set and event_url in stop_set:
                        logging.debug(f"Skipping known event URL: {event_url}")
                        continue

                    if legacy_stop_set and (event_title, event_date_str) in legacy_stop_set:
                        logging.debug(f"Skipping known legacy event: {event_title}")
                        continue

                    if event_date_str:
                        try:
                            found_date = datetime.strptime(
                                event_date_str,
                                "%m/%d/%p/%Y" if "/p/" in event_date_str else "%m/%d/%Y",
                            )
                            if found_date >= cutoff_date:
                                yield (event_url, location)
                                page_has_valid_date = True
                        except:
                            yield (event_url, location)
                            page_has_valid_date = True
                    else:
                        yield (event_url, location)
                        page_has_valid_date = True

                if not page_has_valid_date and page > 1:
                    break

                page += 1
            except Exception as e:
                logging.error(f"Error crawling page {page}: {e}")
                break

    def _extract_date_near_element(self, element):
        parent = element.find_parent()
        if not parent:
            return None
        for _ in range(4):
            date_icon = parent.find("i", class_=re.compile(r"fa-calendar"))
            if date_icon:
                sibling = date_icon.find_next_sibling(string=True)
                if sibling:
                    return sibling.strip()
            parent = parent.find_parent()
            if not parent:
                break
        return None

    def _extract_location_near_element(self, element):
        parent = element.find_parent()
        if not parent:
            return "Unknown"
        for _ in range(4):
            location_icon = parent.find("i", class_=re.compile(r"fa-map-marker"))
            if location_icon:
                sibling = location_icon.find_next_sibling(string=True)
                if sibling:
                    return sibling.strip()
            parent = parent.find_parent()
            if not parent:
                break
        return "Unknown"

    def extract_results_links(self, html_content, event_url):
        """Extracts individual competition result links from an event page."""
        soup = BeautifulSoup(html_content, "html.parser")
        links = soup.find_all("a", href=re.compile(r"/results/\d+\.html"))
        return [urljoin(event_url, link["href"]) for link in links]


class ScoringDanceParser:
    """Handles parsing of individual result pages."""

    @staticmethod
    def standardize_mark(mark_text):
        """Standardize the mark text into points."""
        return POINTS_MAPPING.get(mark_text.strip(), 0.0)

    def _extract_single_dancer_id(self, link):
        d_id = link.get("data-wsdc")
        if not d_id and link.get("href"):
            href = link.get("href")
            # Extract number from /dancer/123 or /wsdc/registry/123.html
            match = re.search(r"/(?:dancer|registry)/(\d+)", href)
            if match:
                d_id = match.group(1)
            else:
                # Fallback to last digit part of the path
                path_parts = href.split("/")
                if path_parts:
                    last_part = path_parts[-1].replace(".html", "")
                    if last_part.isdigit():
                        d_id = last_part

        if not d_id:
            d_id = f"TEMP_{link.get_text(strip=True).replace(' ', '_')}"
        return str(d_id).strip()

    def _extract_competitor_data(self, row):
        cells = row.find_all(["td", "th"])
        bib = "000"
        if cells:
            bib_text = cells[0].get_text(strip=True)
            if bib_text.isdigit():
                bib = bib_text

        competitor_elem = row.find("td", class_="competitor-name")
        if not competitor_elem:
            # Fallback: Many results use the second cell for the competitor name
            if len(cells) >= 2:
                competitor_elem = cells[1]
            else:
                return None, None

        links = competitor_elem.find_all("a")
        names = [a.get_text(strip=True) for a in links]
        competitor_name = " & ".join(names) if names else competitor_elem.get_text(strip=True)

        dancer_ids = [self._extract_single_dancer_id(link) for link in links]
        # Use Bib + Name for TEMP IDs to increase reliability when registry links are missing
        dancer_id = " & ".join(dancer_ids) if dancer_ids else f"TEMP_{bib}_{competitor_name.replace(' ', '_')}"

        return competitor_name, dancer_id

    def _extract_promoted_status(self, row):
        promoted_elem = row.find("td", class_="promoted")
        if promoted_elem:
            promoted_text = promoted_elem.get_text(strip=True).lower()
            return promoted_text in ["yes", "y"]
        return False

    def parse_results(self, html_content, url, event_url=None, location="Unknown"):
        """Parse the results from the HTML content."""
        soup = BeautifulSoup(html_content, "html.parser")
        results = []

        # Use the provided event_url or fallback to the parent of the result URL
        if not event_url:
            event_url = url.split("/results/")[0] + "/results/"

        title_tag = soup.find("h1")
        title = title_tag.get_text(strip=True) if title_tag else "Unknown Result"

        date_match = re.search(r"at (\d{2}/\d{2}/\d{4})", soup.get_text())
        date_str = date_match.group(1) if date_match else None

        if not date_str:
            logging.warning("No event date found while parsing results page: %s", title)

        result_id_match = re.search(r"/results/(\d+)\.html", url)
        result_id = result_id_match.group(1) if result_id_match else "unknown"

        tables = soup.find_all("table", class_=lambda c: c and "results-table" in c)
        if not tables:
            tables = soup.find_all("table")

        for table in tables:
            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all(["td", "th"])
                if len(cells) < 3:
                    continue

                judge_marks = [c for c in cells if c.has_attr("TITLE") or c.has_attr("title")]
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
                    judge_name = j_mark.get("TITLE") or j_mark.get("title")
                    if "Chiefjudge" in judge_name and not j_mark.get_text(strip=True):
                        continue

                    mark_text = j_mark.get_text(strip=True)
                    results.append(
                        {
                            "Dancer_ID": dancer_id,
                            "competitor_bib": bib,
                            "competitor_name": competitor_name,
                            "Promoted": promoted,
                            "judge_name": judge_name,
                            "mark": mark_text,
                            "wsdc_points": self.standardize_mark(mark_text),
                            "event_title": title,
                            "event_date": date_str,
                            "location": location,
                            "event_url": event_url,
                            "result_id": result_id,
                        }
                    )

        return pd.DataFrame(results)


class OutputManager:
    """Handles saving data to various formats."""

    def __init__(self, ledger_path, studies_dir):
        self.ledger_path = ledger_path
        self.studies_dir = studies_dir
        os.makedirs(self.studies_dir, exist_ok=True)

    def _validate_schema(self, df):
        required_cols = [
            "Dancer_ID",
            "result_id",
            "competitor_name",
            "Registry_Points_Sum",
            "event_url",
            "location",
        ]
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            raise ValueError(f"DataFrame missing required columns: {missing_cols}")

    def update_ledger(self, new_data):
        """Update the ledger with new data."""
        if new_data.empty:
            return

        self._validate_schema(new_data)

        if os.path.exists(self.ledger_path):
            existing_ledger = pd.read_parquet(self.ledger_path)
            combined = pd.concat([existing_ledger, new_data], ignore_index=True)
        else:
            combined = new_data

        # Single authoritative deduplication step
        final_ledger = combined.drop_duplicates(subset=["Dancer_ID", "result_id"], keep="last")

        final_ledger.to_parquet(self.ledger_path, index=False)
        logging.info(f"Updated ledger: {self.ledger_path}")


class ETLPipeline:
    """Orchestrates the scraping and processing flow."""

    def __init__(self, crawler, parser, output_manager, queue_path=None):
        self.crawler = crawler
        self.parser = parser
        self.output_manager = output_manager
        self.queue_path = queue_path
        self.processed_result_ids = set()
        self.known_event_urls = set()
        self.known_events_legacy = set()
        self.event_queue = []
        self._load_existing_ids()
        self._load_queue()

    def _load_existing_ids(self):
        """Loads existing result IDs and event URLs from the ledger."""
        if os.path.exists(self.output_manager.ledger_path):
            try:
                df = pd.read_parquet(self.output_manager.ledger_path)
                if "result_id" in df.columns:
                    self.processed_result_ids = set(df["result_id"].astype(str).unique())
                if "event_url" in df.columns:
                    self.known_event_urls = set(df["event_url"].unique())
                if "event_title" in df.columns and "event_date" in df.columns:
                    # Legacy fallback: use title + date to identify known events
                    self.known_events_legacy = set(zip(df["event_title"], df["event_date"]))
                logging.info(
                    f"Loaded {len(self.processed_result_ids)} results and {len(self.known_events_legacy)} known events."
                )
            except Exception as e:
                logging.error(f"Failed to load existing ledger for incremental check: {e}")

    def _load_queue(self):
        """Loads the event queue from a JSON file."""
        if self.queue_path and os.path.exists(self.queue_path):
            try:
                import json

                with open(self.queue_path, "r", encoding="utf-8") as f:
                    self.event_queue = json.load(f)
                logging.info(f"Loaded {len(self.event_queue)} events from queue: {self.queue_path}")
            except Exception as e:
                logging.error(f"Failed to load queue from {self.queue_path}: {e}")

    def _save_queue(self):
        """Saves the remaining event queue to a JSON file."""
        if self.queue_path:
            try:
                import json

                with open(self.queue_path, "w", encoding="utf-8") as f:
                    json.dump(self.event_queue, f, indent=2)
                logging.debug(f"Saved {len(self.event_queue)} events to queue: {self.queue_path}")
            except Exception as e:
                logging.error(f"Failed to save queue to {self.queue_path}: {e}")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def _fetch_page(self, browser_context, url):
        """Handle the scraping loop."""
        page = await browser_context.new_page()
        try:
            await page.goto(url, timeout=30000)
            try:
                await page.wait_for_selector("table", state="attached", timeout=10000)
            except PlaywrightTimeoutError:
                logging.debug(f"Timeout waiting for results table on {url}.")
            content = await page.content()
        finally:
            await page.close()
        return content

    async def run_single(self, url):
        """Save the scraped data to a file."""
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent=USER_AGENT)
            content = await self._fetch_page(context, url)
            await browser.close()

            raw_df = self.parser.parse_results(content, url, event_url=url)
            ledger_df = process_for_ledger(raw_df)
            self.output_manager.update_ledger(ledger_df)

    async def run_historical(self, years=5, limit=None):
        logging.info(f"Starting historical scrape for past {years} years (Limit: {limit})")

        # Discovery Phase (Always check for NEW events, but prepend to queue)
        logging.info("Checking for new events...")
        discovered = list(
            self.crawler.get_recent_events(
                years=years,
                stop_set=self.known_event_urls,
                legacy_stop_set=self.known_events_legacy,
            )
        )

        if discovered:
            logging.info(f"Discovered {len(discovered)} new events.")
            # Prepend new events to the existing queue
            new_queue = []
            seen_urls = set()

            def extend_queue(items):
                for item in items:
                    url = (
                        item[0]
                        if isinstance(item, (tuple, list))
                        else (item["url"] if isinstance(item, dict) else item)
                    )
                    if url not in seen_urls:
                        loc = (
                            item[1]
                            if isinstance(item, (tuple, list))
                            else (item["loc"] if isinstance(item, dict) else "Unknown")
                        )
                        new_queue.append([url, loc])
                        seen_urls.add(url)

            extend_queue(discovered)
            extend_queue(self.event_queue)

            self.event_queue = new_queue
            self._save_queue()
        else:
            logging.info("No new events discovered.")

        if not self.event_queue:
            logging.info("No events in queue to process.")
            return 0

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent=USER_AGENT)

            processed_count = 0
            # Work on a copy of the queue for iteration
            queue_to_process = list(self.event_queue)

            for item in tqdm(queue_to_process, desc="Scraping Events", unit="event", dynamic_ncols=True):
                if limit and processed_count >= limit:
                    logging.info(f"Reached batch limit of {limit}. Stopping.")
                    break

                event_url = (
                    item[0] if isinstance(item, (tuple, list)) else (item["url"] if isinstance(item, dict) else item)
                )
                location = (
                    item[1]
                    if isinstance(item, (tuple, list))
                    else (item["loc"] if isinstance(item, dict) else "Unknown")
                )

                try:
                    # Discover specific results pages for this event
                    discovery_html = await self._fetch_page(context, event_url)
                    results_links = self.crawler.extract_results_links(discovery_html, event_url)

                    event_has_new_data = False

                    semaphore = asyncio.Semaphore(5)

                    async def fetch_result(res_url, sem):
                        res_id_match = re.search(r"/results/(\d+)\.html", res_url)
                        res_id = res_id_match.group(1) if res_id_match else None
                        if res_id and res_id in self.processed_result_ids:
                            return None

                        async with sem:
                            try:
                                content = await self._fetch_page(context, res_url)
                                await ethical_throttle()
                                return (res_url, content)
                            except Exception as e:
                                logging.error(f"Failed to fetch {res_url}: {e}")
                                return None

                    fetch_tasks = [fetch_result(url, semaphore) for url in results_links]
                    fetched_results = await asyncio.gather(*fetch_tasks)

                    for result in fetched_results:
                        if result is not None:
                            res_url, content = result
                            try:
                                raw_df = self.parser.parse_results(
                                    content, res_url, event_url=event_url, location=location
                                )
                                ledger_df = process_for_ledger(raw_df)
                                self.output_manager.update_ledger(ledger_df)
                                event_has_new_data = True
                            except Exception as e:
                                logging.error(f"Failed to process {res_url}: {e}")

                    if event_has_new_data:
                        processed_count += 1

                    # Remove from queue after processing (even if no new data, it's "done")
                    self.event_queue = [
                        q
                        for q in self.event_queue
                        if (q[0] if isinstance(q, (tuple, list)) else (q["url"] if isinstance(q, dict) else q))
                        != event_url
                    ]
                    self._save_queue()

                except Exception as e:
                    logging.error(f"Failed to process event {event_url}: {e}")

            await browser.close()
            return processed_count


async def main():
    """Entry point for the scraper."""
    parser = argparse.ArgumentParser(description="Scoring.dance ETL Scraper")
    parser.add_argument("url", nargs="?", help="Single result URL to scrape")
    parser.add_argument("--years", type=int, default=5, help="Years to crawl back (default: 5)")
    parser.add_argument("--limit", type=int, default=None, help="Max number of new events to process")
    parser.add_argument("--queue", default="etl/data/event_queue.json", help="Path to event discovery queue")
    parser.add_argument("--ledger", default="etl/data/wcs_prelims.parquet", help="Path to Parquet ledger")
    parser.add_argument("--studies", default="content/studies", help="Directory for Markdown output")
    args = parser.parse_args()

    pipeline = ETLPipeline(
        ScoringDanceCrawler(),
        ScoringDanceParser(),
        OutputManager(args.ledger, args.studies),
        queue_path=args.queue,
    )

    if args.url:
        await pipeline.run_single(args.url)
    else:
        processed = await pipeline.run_historical(years=args.years, limit=args.limit)
        # Signal to GHA if we processed anything
        if processed == 0:
            logging.info("No new events to process.")
            sys.exit(100)  # Special exit code for "finished/nothing to do"
        else:
            logging.info(f"Batch completed. Processed {processed} events.")


if __name__ == "__main__":
    asyncio.run(main())
