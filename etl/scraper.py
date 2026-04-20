import pandas as pd
import logging
import os
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

POINTS_MAPPING = {
    'Yes': 10.0, 'Alt1': 4.5, 'Alt2': 4.3, 'Alt3': 4.2, 'No': 0.0,
    'Y': 10.0, 'A1': 4.5, 'A2': 4.3, 'A3': 4.2, 'N': 0.0
}

class EEPROLedgerFeeder:
    def __init__(self, ledger_path: str = "etl/data/wcs_prelims.parquet"):
        self.ledger_path = ledger_path

    def standardize_mark(self, mark_text):
        mark_text = mark_text.strip()
        if mark_text in POINTS_MAPPING:
            return POINTS_MAPPING[mark_text]
        logging.warning(f"Unknown mark encountered: {mark_text}")
        return 0.0

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def scrape_scoring_dance(self, url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            page = await context.new_page()
            await page.goto(url)
            try:
                await page.wait_for_selector('table.results-table', state='attached', timeout=10000)
            except Exception as e:
                logging.error(f"Critical failure: {e}")
                await browser.close()
                return pd.DataFrame()
            content = await page.content()
            await browser.close()
            return self.parse_scoring_dance(content)

    def parse_scoring_dance(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        results = []

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

                name = ""
                name_a = row.find('a', attrs={'data-wsdc': True})
                if name_a:
                    name = name_a.get_text(strip=True)
                else:
                    name_cell = row.find('td', class_='competitor-name')
                    if name_cell:
                        name = name_cell.get_text(strip=True)

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
                        'wsdc_points': self.standardize_mark(mark_text)
                    })

        return pd.DataFrame(results)

    async def extract_scoring_dance_table(self, url: str) -> pd.DataFrame:
        logging.info(f"Syncing WSDC Registry Ledger from Scoring.Dance URL: {url}")
        raw_df = await self.scrape_scoring_dance(url)

        if raw_df.empty:
            logging.warning(f"No data extracted from Scoring.Dance URL: {url}")
            return pd.DataFrame()

        processed_df = raw_df.groupby(['competitor_bib', 'competitor_name']).agg(
            Registry_Points_Sum=('wsdc_points', 'sum')
        ).reset_index()

        processed_df['Dancer_ID'] = processed_df['competitor_bib'].apply(lambda x: f'REF_ID: {x:03d}')
        processed_df = processed_df[['Dancer_ID', 'Registry_Points_Sum', 'competitor_name']]
        processed_df.rename(columns={'competitor_name': 'Dancer_Name'}, inplace=True)

        return processed_df

    def verify_and_append(self, new_data: pd.DataFrame) -> pd.DataFrame:
        if os.path.exists(self.ledger_path):
            existing_ledger = pd.read_parquet(self.ledger_path)
            combined = pd.concat([existing_ledger, new_data], ignore_index=True)
        else:
            combined = new_data

        final_ledger = combined.drop_duplicates(subset=['Dancer_ID'], keep='last')
        self._verify_hygiene(final_ledger)

        final_ledger.to_parquet(self.ledger_path, index=False)
        return final_ledger

    def _verify_hygiene(self, df: pd.DataFrame):
        if df.empty:
            raise ValueError("No data to process.")
        if not df['Dancer_ID'].is_unique:
            raise ValueError("Duplicate REF_IDs detected in ledger.")

async def main(url="https://scoring.dance/enCA/events/190/results/2945.html"):
    feeder = EEPROLedgerFeeder()
    results = await feeder.extract_scoring_dance_table(url)
    if not results.empty:
        feeder.verify_and_append(results)

if __name__ == "__main__":
    import sys
    asyncio.run(main(*sys.argv[1:2]))
