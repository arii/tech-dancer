import pandas as pd
import logging
import os
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
import asyncio
import re

# --- MECHANICAL DELIGHT: System Logs ---
logging.basicConfig(level=logging.INFO, format='[SYSTEM_HEALTH: OPTIMAL] %(message)s')

class EEPROLedgerFeeder:
    def __init__(self, ledger_path: str = "etl/data/registry_ledger.parquet"):
        self.ledger_path = ledger_path
        self.points_mapping = {
            'Yes': 10.0, 'Alt1': 4.5, 'Alt2': 4.3, 'Alt3': 4.2, 'No': 0.0,
            'Y': 10.0, 'A1': 4.5, 'A2': 4.3, 'A3': 4.2, 'N': 0.0
        }

    def standardize_mark(self, mark_text):
        """Map categorical marks to WSDC standardized points."""
        mark_text = mark_text.strip()
        if mark_text in self.points_mapping:
            return self.points_mapping[mark_text]
        # Heuristic for variations
        if 'Yes' in mark_text or mark_text == 'Y': return 10.0
        if 'Alt1' in mark_text or mark_text == 'A1': return 4.5
        if 'Alt2' in mark_text or mark_text == 'A2': return 4.3
        if 'Alt3' in mark_text or mark_text == 'A3': return 4.2
        if 'No' in mark_text or mark_text == 'N': return 0.0
        return 0.0

    async def scrape_scoring_dance(self, url):
        """Scrape data from Scoring.Dance using Playwright."""
        logging.info(f"Initiating Playwright for {url}...")
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            page = await context.new_page()
            await page.goto(url)
            try:
                await page.wait_for_selector('table', timeout=10000)
                await page.wait_for_timeout(1000)
            except Exception as e:
                logging.warning(f"Timeout or selector not found for {url}: {e}")
                pass
            content = await page.content()
            await browser.close()
            logging.info(f"Playwright finished for {url}.")
            return self.parse_scoring_dance(content)

    def parse_scoring_dance(self, html_content):
        """Parse HTML from Scoring.Dance and extract competition results."""
        soup = BeautifulSoup(html_content, 'html.parser')
        results = []

        tables = soup.find_all('table')
        for table in tables:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all(['td', 'th'])
                if len(cells) < 3:
                    continue

                # Find judge marks - they have a TITLE attribute with judge name
                judge_marks = [c for c in cells if c.has_attr('TITLE') or c.has_attr('title')]
                if not judge_marks:
                    continue

                # Find bib
                bib = None
                for cell in cells:
                    txt = cell.get_text(strip=True)
                    clean_txt = re.sub(r'\D', '', txt)
                    if clean_txt.isdigit():
                        bib = int(clean_txt)
                        break

                if bib is None:
                    continue

                # Find name
                name = ""
                name_a = row.find('a', attrs={'data-wsdc': True})
                if name_a:
                    name = name_a.get_text(strip=True)
                else:
                    for cell in cells[1:3]: # check relevant cells for name
                        txt = cell.get_text(strip=True)
                        if txt and not txt.isdigit() and not any(m in txt for m in ['Yes', 'No', 'Alt']):
                            name = txt
                            break

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

    def extract_eepro_table(self, url_or_html: str, round_type: str) -> pd.DataFrame:
        """Reads the raw HTML table from an EEPRO results page (Mocked)."""
        logging.info("Calibrating Variance... Syncing WSDC Registry Ledger from EEPRO")
        if round_type == 'prelims':
            data = {
                'Dancer_ID': ['REF_ID: 001', 'REF_ID: 002', 'REF_ID: 003'],
                'J1': ['Y', 'A1', 'N'],
                'J2': ['Y', 'Y', 'N'],
                'Counts_Y_A_N': ['2-0-0', '1-1-0', '0-0-2'],
                'Registry_Points_Sum': [20.0, 14.5, 0.0],
                'Status': ['Promote', 'Promote', 'Cut']
            }
        else:
            data = {
                'Dancer_ID': ['REF_ID: 001', 'REF_ID: 002', 'REF_ID: 003'],
                'J1': [1, 2, 3],
                'J2': [2, 1, 3],
                'J3': [1, 2, 3],
                'Result_Rank': [1, 2, 3]
            }
        df = pd.DataFrame(data)
        logging.info(f"Data Scan complete. Retrieved {len(df)} records for {round_type.upper()}.")
        return df

    async def extract_scoring_dance_table(self, url: str) -> pd.DataFrame:
        """Scrapes and formats Scoring.Dance data for the Registry Ledger."""
        logging.info(f"Calibrating Variance... Syncing WSDC Registry Ledger from Scoring.Dance URL: {url}")
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

        logging.info(f"Data Scan complete. Retrieved {len(processed_df)} unique dancers from Scoring.Dance.")
        return processed_df

    def verify_and_append(self, new_data: pd.DataFrame) -> pd.DataFrame:
        """Aggregates new data, drops duplicates, and verifies hygiene."""
        if os.path.exists(self.ledger_path):
            existing_ledger = pd.read_parquet(self.ledger_path)
            # Align columns
            for col in existing_ledger.columns:
                if col not in new_data.columns:
                    new_data[col] = pd.NA
            for col in new_data.columns:
                if col not in existing_ledger.columns:
                    existing_ledger[col] = pd.NA
            combined = pd.concat([existing_ledger, new_data], ignore_index=True)
            logging.info("Existing ledger found. Aggregating data...")
        else:
            combined = new_data
            logging.info("No existing ledger. Initializing new Parquet sequence.")

        final_ledger = combined.drop_duplicates(subset=['Dancer_ID'], keep='last')
        self._verify_hygiene(final_ledger)

        os.makedirs(os.path.dirname(self.ledger_path), exist_ok=True)
        final_ledger.to_parquet(self.ledger_path, index=False)
        logging.info(f"Ledger Synced. {len(final_ledger)} unique slots verified.")
        return final_ledger

    def _verify_hygiene(self, df: pd.DataFrame):
        """Hardened verification step to ensure no slop enters the warehouse."""
        assert not df.empty, "404: Dancer out of slot. No data to process."
        assert df['Dancer_ID'].is_unique, "Hardware Fault: Duplicate REF_IDs detected in ledger."
        legacy_columns = [col for col in df.columns if "points" in col.lower() and "registry" not in col.lower()]
        assert not legacy_columns, f"Terminology Slop Detected: {legacy_columns}. Upgrade to 'Registry_Points'."

async def main():
    feeder = EEPROLedgerFeeder()
    urls = ["https://scoring.dance/enCA/events/190/results/2945.html"]
    for url in urls:
        results = await feeder.extract_scoring_dance_table(url)
        if not results.empty:
            feeder.verify_and_append(results)

if __name__ == "__main__":
    asyncio.run(main())
