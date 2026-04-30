# Instructions to Fix PR 410 (WCS Scraper)

The current implementation in PR 410 uses a hardcoded mock entry for `public/data/wcs_prelims.json` and hasn't populated the historical data. Follow these steps to resolve the issue:

1.  **Checkout the PR Branch**
    Ensure you are on the correct branch for the PR.
    ```bash
    git checkout feat/issue-wcs-scraper-4930082398197226593
    ```

2.  **Set Up the Python Environment**
    The scraper (`etl/scraper.py`) requires specific Python dependencies. From the project root, create a virtual environment and install them:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r etl/requirements.txt
    ```

3.  **Install Playwright Browsers**
    The scraper uses Playwright to render JavaScript-heavy pages. Install the necessary Chromium browser:
    ```bash
    playwright install chromium
    ```

4.  **Run the Historical Scraper**
    Execute the scraper from the root directory and explicitly pass the `--years 5` flag to scrape results from the past 5 years. 
    ```bash
    python etl/scraper.py --years 5
    ```
    *Note: The script will automatically overwrite the hardcoded mock data in `public/data/wcs_prelims.json` and update the Parquet ledger in `etl/data/wcs_prelims.parquet`.*

5.  **Verify the Data Extraction**
    After the script completes, inspect the output file `public/data/wcs_prelims.json` to confirm it now contains a large array of real scraped records instead of the single "Ariel" entry.

6.  **Commit and Push the Real Data**
    Stage the updated JSON and Parquet files, commit the changes, and push them to update the PR.
    ```bash
    git add public/data/wcs_prelims.json etl/data/wcs_prelims.parquet
    git commit -m "fix: scrape 5 years of historical WCS prelim data"
    git push origin feat/issue-wcs-scraper-4930082398197226593
    ```
