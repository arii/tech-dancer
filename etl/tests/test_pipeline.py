# pylint: disable=missing-docstring,no-name-in-module,singleton-comparison,syntax-error,too-many-locals,unused-argument
"""Tests for the ETL pipeline."""
import os
from datetime import datetime, timedelta

import pandas as pd
import pytest
import requests

from etl.processor import process_for_ledger
from etl.scraper import BASE_URL, ETLPipeline, OutputManager, ScoringDanceCrawler, ScoringDanceParser


def test_wsdc_id_extraction():
    parser = ScoringDanceParser()
    # Mock HTML snippet representing a result row with a WSDC link
    html_snippet = """
    <table>
        <tr>
            <td>101</td>
            <td class="competitor-name"><a href="/dancer/24305" data-wsdc="24305">Ariel</a></td>
            <td class="promoted">Yes</td>
            <td title="Judge 1">Yes</td>
        </tr>
    </table>
    """
    url = "http://mock-url.com/results/123.html"
    df = parser.parse_results(html_snippet, url)

    assert df["Dancer_ID"].iloc[0] == "24305"
    assert df["Promoted"].iloc[0] == True


def test_parse_results():
    parser = ScoringDanceParser()
    mock_file = os.path.join(os.path.dirname(__file__), "mock_scoring_dance.html")
    with open(mock_file, "r", encoding="utf-8") as f:
        html_content = f.read()

    url = "https://scoring.dance/enUS/events/190/results/2945.html"
    df = parser.parse_results(html_content, url)

    assert not df.empty
    # In mock, we have 3 rows, but each has 2 judge marks, so 6 rows in df
    assert len(df) == 6
    john_doe = df[df["competitor_name"] == "John Doe"]
    assert john_doe["Dancer_ID"].iloc[0] == "123"
    assert 101 in john_doe["competitor_bib"].values
    assert 10.0 in john_doe["wsdc_points"].values
    assert all(df["result_id"] == "2945")

    # Test fallback for Bob Brown who has no link (based on cell text)
    bob_brown = df[df["competitor_name"] == "Bob Brown"]
    assert not bob_brown.empty
    assert bob_brown["Dancer_ID"].iloc[0] == "TEMP_103_Bob_Brown"
    assert 103 in bob_brown["competitor_bib"].values


def test_process_for_ledger():
    raw_data = pd.DataFrame(
        {
            "Dancer_ID": ["123", "123", "456"],
            "competitor_bib": [101, 101, 102],
            "competitor_name": ["John Doe", "John Doe", "Jane Smith"],
            "wsdc_points": [10.0, 4.5, 0.0],
            "Promoted": [True, True, False],
            "result_id": ["2945", "2945", "2945"],
            "event_title": ["Mock Event", "Mock Event", "Mock Event"],
            "event_date": ["01/01/2025", "01/01/2025", "01/01/2025"],
            "event_url": ["http://mock.com/1", "http://mock.com/1", "http://mock.com/1"],
            "location": ["City A", "City A", "City B"],
        }
    )
    df = process_for_ledger(raw_data)
    assert len(df) == 2
    assert df[df["Dancer_ID"] == "123"]["Registry_Points_Sum"].values[0] == 14.5
    assert df[df["Dancer_ID"] == "123"]["Promoted"].values[0] == True


def test_update_ledger_hygiene(tmp_path):
    ledger_file = tmp_path / "test_ledger.parquet"
    manager = OutputManager(ledger_path=str(ledger_file), studies_dir=str(tmp_path / "studies"))

    data1 = pd.DataFrame(
        {
            "Dancer_ID": ["123", "456"],
            "result_id": ["2945", "2945"],
            "competitor_name": ["John Doe", "Jane Smith"],
            "Registry_Points_Sum": [10.0, 10.0],
            "Promoted": [True, False],
            "event_title": ["Mock Event", "Mock Event"],
            "event_date": ["01/01/2025", "01/01/2025"],
            "event_url": ["http://mock.com/1", "http://mock.com/1"],
            "location": ["City A", "City A"],
        }
    )
    manager.update_ledger(data1)

    data2 = pd.DataFrame(
        {
            "Dancer_ID": ["123", "456"],
            "result_id": ["2946", "2946"],
            "competitor_name": ["John Doe", "Jane Smith"],
            "Registry_Points_Sum": [5.0, 5.0],
            "Promoted": [True, False],
            "event_title": ["Mock Event 2", "Mock Event 2"],
            "event_date": ["01/02/2025", "01/02/2025"],
            "event_url": ["http://mock.com/2", "http://mock.com/2"],
            "location": ["City B", "City B"],
        }
    )
    manager.update_ledger(data2)

    assert os.path.exists(ledger_file)

    df = pd.read_parquet(ledger_file)
    # Deduplication is on (Dancer_ID, result_id).
    # Since result_id differs, we should have 4 rows.
    assert len(df) == 4


def test_get_recent_events(mocker):
    # Use relative date for deterministic test
    test_date = (datetime.now() - timedelta(days=10)).strftime("%m/%d/%Y")

    html_text = f"""
    <table>
        <tr>
            <td>{test_date}</td>
            <td><a href="/enUS/events/338/results/">Results</a></td>
        </tr>
    </table>
    """
    mocker.patch(
        "etl.scraper.ScoringDanceCrawler._fetch_page_text",
        side_effect=[html_text, requests.RequestException("End of pagination")],
    )

    crawler = ScoringDanceCrawler()
    links = list(crawler.get_recent_events(years=1))
    # get_recent_events yields tuples of (url, location)
    urls = [url for url, _ in links]
    assert f"{BASE_URL}/enUS/events/338/results/" in urls


@pytest.mark.asyncio
async def test_run_historical_batching_and_cache(tmp_path, mocker):
    ledger_file = tmp_path / "test_ledger.parquet"
    queue_file = tmp_path / "queue.json"
    manager = OutputManager(ledger_path=str(ledger_file), studies_dir=str(tmp_path / "studies"))

    mock_event_html = """
    <html>
        <body>
            <a href="/enUS/events/100/results/1001.html">Result 1</a>
            <a href="/enUS/events/100/results/1002.html">Result 2</a>
        </body>
    </html>
    """

    mock_result_1_html = """
    <h1>Jack & Jill Prelims</h1>
    <table>
        <tr>
            <td>101</td>
            <td class="competitor-name"><a href="/dancer/1001" data-wsdc="1001">Dancer One</a></td>
            <td class="promoted">Yes</td>
            <td title="Judge 1">Yes</td>
        </tr>
    </table>
    at 01/01/2025
    """

    mock_result_2_html = """
    <h1>Jack & Jill Finals</h1>
    <table>
        <tr>
            <td>102</td>
            <td class="competitor-name"><a href="/dancer/1002" data-wsdc="1002">Dancer Two</a></td>
            <td class="promoted">No</td>
            <td title="Judge 1">Alt1</td>
        </tr>
    </table>
    at 01/01/2025
    """

    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()
    pipeline = ETLPipeline(crawler, parser, manager, queue_path=str(queue_file))
    pipeline.event_queue = [["https://scoring.dance/enUS/events/100/results/", "City X"]]

    mocker.patch.object(crawler, "get_recent_events", return_value=[])
    mocker.patch("etl.scraper.ethical_throttle", mocker.AsyncMock())

    async def mock_fetch_page(_context, url):
        if "1001.html" in url:
            return mock_result_1_html
        if "1002.html" in url:
            return mock_result_2_html
        return mock_event_html

    mocker.patch.object(pipeline, "_fetch_page", new=mocker.AsyncMock(side_effect=mock_fetch_page))

    mock_playwright_ctx = mocker.MagicMock()
    mock_browser = mocker.AsyncMock()
    mock_context = mocker.AsyncMock()
    mock_browser.new_context = mocker.AsyncMock(return_value=mock_context)
    mock_playwright_ctx.chromium.launch = mocker.AsyncMock(return_value=mock_browser)

    mocker.patch(
        "etl.scraper.async_playwright",
        return_value=mocker.MagicMock(
            __aenter__=mocker.AsyncMock(return_value=mock_playwright_ctx),
            __aexit__=mocker.AsyncMock(return_value=False),
        ),
    )

    spy_update_ledger = mocker.spy(manager, "update_ledger")

    processed = await pipeline.run_historical(years=1)

    assert processed == 1
    assert spy_update_ledger.call_count == 1
    call_df = spy_update_ledger.call_args[0][0]
    assert set(call_df["result_id"]) == {"1001", "1002"}

    assert "1001" in pipeline.processed_result_ids
    assert "1002" in pipeline.processed_result_ids


@pytest.mark.asyncio
async def test_run_single_updates_cache(tmp_path, mocker):
    ledger_file = tmp_path / "test_ledger.parquet"
    manager = OutputManager(ledger_path=str(ledger_file), studies_dir=str(tmp_path / "studies"))

    mock_result_html = """
    <h1>Jack & Jill Prelims</h1>
    <table>
        <tr>
            <td>101</td>
            <td class="competitor-name"><a href="/dancer/1001" data-wsdc="1001">Dancer One</a></td>
            <td class="promoted">Yes</td>
            <td title="Judge 1">Yes</td>
        </tr>
    </table>
    at 01/01/2025
    """

    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()
    pipeline = ETLPipeline(crawler, parser, manager)

    mocker.patch.object(pipeline, "_fetch_page", new=mocker.AsyncMock(return_value=mock_result_html))

    mock_playwright_ctx = mocker.MagicMock()
    mock_browser = mocker.AsyncMock()
    mock_context = mocker.AsyncMock()
    mock_browser.new_context = mocker.AsyncMock(return_value=mock_context)
    mock_playwright_ctx.chromium.launch = mocker.AsyncMock(return_value=mock_browser)

    mocker.patch(
        "etl.scraper.async_playwright",
        return_value=mocker.MagicMock(
            __aenter__=mocker.AsyncMock(return_value=mock_playwright_ctx),
            __aexit__=mocker.AsyncMock(return_value=False),
        ),
    )

    url = "https://scoring.dance/enUS/events/100/results/2005.html"
    await pipeline.run_single(url)

    assert "2005" in pipeline.processed_result_ids
    assert os.path.exists(ledger_file)
