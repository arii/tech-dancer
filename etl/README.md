# WCS Data ETL Pipeline

Tools for collecting and processing West Coast Swing competition results
from scoring.dance. `scraper.py` contains `ScoringDanceCrawler`,
`ScoringDanceParser`, `OutputManager` and `ETLPipeline`; `processor.py`
transforms parsed results for the Parquet ledger.

## Setup and use

From the repository root, use a Python environment and install the scraper
and Chromium dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r etl/requirements.txt
python -m playwright install chromium
```

The following commands make network requests and can update local data;
they are not read-only verification commands:

```bash
# Historical crawl, default five years
PYTHONPATH=. python etl/scraper.py

# Limit the history and number of new events
PYTHONPATH=. python etl/scraper.py --years 2 --limit 10

# A single result URL
PYTHONPATH=. python etl/scraper.py https://scoring.dance/enUS/events/338/results/5415.html
```

The CLI also accepts `--queue`, `--ledger` and `--studies` paths. Historical
runs exit 100 when no new events were processed; that is distinct from a
successful batch that processed events. The optional
[`scripts/run-etl.sh`](../scripts/run-etl.sh) wrapper activates `.venv` or
`venv` and defaults to a one-year, ten-event batch. It is not a scheduler.

## Data contracts

The default ledger path is `etl/data/wcs_prelims.parquet`. `OutputManager`
validates the required columns and deduplicates on the pair
`Dancer_ID`, `result_id`, keeping the newest row for that pair. Record counts
change as data is collected; this README does not promise a fixed total.

The frontend's `useWCSData.ts` fetches `data/wcs_prelims.parquet` under the
site base URL and reads it with `hyparquet`. The root build creates
`public/data/`, but the checked-in asset-generation scripts do not establish
an automatic copy of the ETL ledger there. Verify the intended dataset and
publish/copy step separately before claiming a rebuilt site has new data.
The `--studies` directory argument alone is not proof that Markdown study
files are generated.

## Automation status

The former `.github/workflows/wcs_etl.yml` referenced by older instructions
is absent from the current checkout. Do not assume a weekly crawl is
scheduled. Review the current `.github/workflows/` and the environment's
actual scheduler before relying on unattended refreshes.

Source references checked November 21, 2026. No crawl, dataset publication
or production scheduler verification was performed for this docs check.
