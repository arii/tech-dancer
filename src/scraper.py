import os
import pandas as pd
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import re

class WCSScraper:
    def __init__(self):
        self.points_mapping = {
            'Yes': 10.0,
            'Alt1': 4.5,
            'Alt2': 4.3,
            'Alt3': 4.2,
            'No': 0.0
        }

    def standardize_mark(self, mark_text):
        mark_text = mark_text.strip()
        if mark_text in self.points_mapping:
            return self.points_mapping[mark_text]
        # Sometimes 'Yes' is stylized or contains other text
        if 'Yes' in mark_text or mark_text == 'Y':
            return 10.0
        if 'Alt1' in mark_text or mark_text == 'A1':
            return 4.5
        if 'Alt2' in mark_text or mark_text == 'A2':
            return 4.3
        if 'Alt3' in mark_text or mark_text == 'A3':
            return 4.2
        if 'No' in mark_text or mark_text == 'N':
            return 0.0
        return 0.0

    def scrape_scoring_dance(self, url):
        with sync_playwright() as p:
            # Add user agent and some headers to avoid being blocked if that's the issue
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            page = context.new_page()
            page.goto(url)
            # Wait for the results table to load
            try:
                page.wait_for_selector('table', timeout=10000)
                # Extra wait for dynamic rows if any
                page.wait_for_timeout(2000)
            except:
                print("Timed out waiting for table")

            content = page.content()
            browser.close()
            return self.parse_scoring_dance(content)

    def parse_scoring_dance(self, html_content):
        # with open('debug.html', 'w') as f: f.write(html_content)
        soup = BeautifulSoup(html_content, 'html.parser')
        results = []

        tables = soup.find_all('table')
        # print(f"Found {len(tables)} tables")
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

                # Find bib - first cell that's purely numeric
                bib = None
                for cell in cells:
                    txt = cell.get_text(strip=True)
                    if txt.isdigit():
                        bib = int(txt)
                        break

                if bib is None:
                    continue

                # Find name - first cell with a data-wsdc link, or second/third cell
                name = ""
                name_a = row.find('a', attrs={'data-wsdc': True})
                if name_a:
                    name = name_a.get_text(strip=True)
                else:
                    # Usually bib is cells[0], name is cells[1]
                    for cell in cells[1:3]:
                        txt = cell.get_text(strip=True)
                        if txt and not txt.isdigit() and not any(m in txt for m in ['Yes', 'No', 'Alt']):
                            name = txt
                            break

                for j_mark in judge_marks:
                    judge_name = j_mark.get('TITLE') or j_mark.get('title')
                    # Chief judges often don't give marks in prelims
                    if "Chiefjudge" in judge_name and not j_mark.get_text(strip=True):
                        continue

                    mark_text = j_mark.get_text(strip=True)
                    points = self.standardize_mark(mark_text)

                    results.append({
                        'competitor_bib': bib,
                        'competitor_name': name,
                        'judge_name': judge_name,
                        'mark': mark_text,
                        'wsdc_points': points
                    })

        return pd.DataFrame(results)

    def save_to_parquet(self, df, filepath):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        df.to_parquet(filepath, index=False)

if __name__ == "__main__":
    scraper = WCSScraper()
    # Sample URL from exploration
    url = "https://scoring.dance/enCA/events/190/results/2945.html"
    print(f"Scraping {url}...")
    try:
        df = scraper.scrape_scoring_dance(url)
        if not df.empty:
            scraper.save_to_parquet(df, 'data/wcs_prelims.parquet')
            print(f"Saved {len(df)} records to data/wcs_prelims.parquet")
            print(df.head())
        else:
            print("No data extracted.")
    except Exception as e:
        print(f"Error: {e}")
