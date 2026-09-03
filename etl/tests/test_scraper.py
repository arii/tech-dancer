# pylint: disable=missing-docstring,redefined-outer-name,protected-access,unused-argument
"""Unit tests for error handling and fallback paths in etl/scraper.py."""
import json
import logging
import pytest
import pandas as pd
from playwright.async_api import TimeoutError as PlaywrightTimeoutError

from etl.scraper import (
    ETLPipeline,
    OutputManager,
    ScoringDanceCrawler,
    ScoringDanceParser,
)


def test_get_recent_events_page_fetch_exception(mocker, caplog):
    """Test crawling loop exception handling when _fetch_page_text raises an exception."""
    mocker.patch(
        "etl.scraper.ScoringDanceCrawler._fetch_page_text",
        side_effect=Exception("Network connection failed"),
    )
    crawler = ScoringDanceCrawler()
    with caplog.at_level(logging.ERROR):
        events = list(crawler.get_recent_events(years=1))
    assert not events
    assert "Error crawling page 1: Network connection failed" in caplog.text


def test_get_recent_events_date_parsing_exception(mocker):
    """Test fallback yielding event when date parsing raises an exception."""
    html_with_bad_date = """
    <div>
        <a href="/events/100/results/">Test Event</a>
        <i class="fa-calendar"></i> invalid-date-format
    </div>
    """
    mocker.patch(
        "etl.scraper.ScoringDanceCrawler._fetch_page_text",
        side_effect=[html_with_bad_date, "<html></html>"],
    )
    crawler = ScoringDanceCrawler()
    events = list(crawler.get_recent_events(years=1))
    assert len(events) == 1
    assert events[0][0].endswith("/events/100/results/")


def test_load_existing_ids_corrupt_ledger(tmp_path, caplog):
    """Test ledger loading exception handling when reading corrupted parquet file."""
    corrupt_ledger = tmp_path / "corrupt.parquet"
    corrupt_ledger.write_bytes(b"not a parquet file content")

    output_mgr = OutputManager(ledger_path=str(corrupt_ledger), studies_dir=str(tmp_path / "studies"))
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()

    with caplog.at_level(logging.ERROR):
        pipeline = ETLPipeline(crawler, parser, output_mgr)

    assert "Failed to load existing ledger for incremental check" in caplog.text
    assert pipeline.processed_result_ids == set()


def test_load_queue_exception(tmp_path, caplog):
    """Test _load_queue exception handling when queue file is invalid JSON."""
    queue_file = tmp_path / "bad_queue.json"
    queue_file.write_text("invalid json content", encoding="utf-8")

    output_mgr = OutputManager(ledger_path=str(tmp_path / "ledger.parquet"), studies_dir=str(tmp_path / "studies"))
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()

    with caplog.at_level(logging.ERROR):
        pipeline = ETLPipeline(crawler, parser, output_mgr, queue_path=str(queue_file))

    assert "Failed to load queue from" in caplog.text
    assert pipeline.event_queue == []


def test_save_queue_exception(tmp_path, caplog, mocker):
    """Test _save_queue exception handling when file writing fails."""
    queue_file = tmp_path / "queue.json"

    output_mgr = OutputManager(ledger_path=str(tmp_path / "ledger.parquet"), studies_dir=str(tmp_path / "studies"))
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()
    pipeline = ETLPipeline(crawler, parser, output_mgr, queue_path=str(queue_file))

    # Mock open to raise OSError
    mocker.patch("builtins.open", side_effect=OSError("Permission denied"))

    with caplog.at_level(logging.ERROR):
        pipeline._save_queue()

    assert "Failed to save queue to" in caplog.text


@pytest.mark.asyncio
async def test_fetch_page_playwright_timeout(mocker, caplog):
    """Test _fetch_page handling PlaywrightTimeoutError when waiting for table selector."""
    mock_page = mocker.AsyncMock()
    mock_page.goto = mocker.AsyncMock()
    mock_page.wait_for_selector = mocker.AsyncMock(side_effect=PlaywrightTimeoutError("Timeout"))
    mock_page.content = mocker.AsyncMock(return_value="<html><body>No table</body></html>")
    mock_page.close = mocker.AsyncMock()

    mock_context = mocker.AsyncMock()
    mock_context.new_page = mocker.AsyncMock(return_value=mock_page)

    output_mgr = OutputManager(ledger_path="dummy.parquet", studies_dir="dummy_dir")
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()
    pipeline = ETLPipeline(crawler, parser, output_mgr)

    # _fetch_page is decorated with retry, so bypass retry for unit testing by calling the inner function directly
    with caplog.at_level(logging.DEBUG):
        content = await pipeline._fetch_page.__wrapped__(pipeline, mock_context, "http://example.com")

    assert content == "<html><body>No table</body></html>"
    assert "Timeout waiting for results table on http://example.com." in caplog.text


def test_parse_results_missing_date_warning(caplog):
    """Test warning log when no event date is found in result page HTML."""
    html_without_date = "<html><body><h1>Test Competition</h1><table></table></body></html>"
    parser = ScoringDanceParser()

    with caplog.at_level(logging.WARNING):
        df = parser.parse_results(html_without_date, "http://example.com/results/123.html")

    assert df.empty
    assert "No event date found while parsing results page: Test Competition" in caplog.text


def test_output_manager_validate_schema_missing_columns(tmp_path):
    """Test OutputManager._validate_schema raises ValueError on missing columns."""
    output_mgr = OutputManager(ledger_path=str(tmp_path / "ledger.parquet"), studies_dir=str(tmp_path / "studies"))
    incomplete_df = pd.DataFrame({"Dancer_ID": ["123"]})

    with pytest.raises(ValueError, match="DataFrame missing required columns"):
        output_mgr.update_ledger(incomplete_df)


@pytest.mark.asyncio
async def test_run_historical_fetch_result_exception(mocker, caplog, tmp_path):
    """Test run_historical error paths (fetch_result failure)."""
    output_mgr = OutputManager(ledger_path=str(tmp_path / "ledger.parquet"), studies_dir=str(tmp_path / "studies"))
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()

    queue_file = tmp_path / "queue.json"
    queue_file.write_text(json.dumps([["http://example.com/events/1/results/", "Location A"]]), encoding="utf-8")

    pipeline = ETLPipeline(crawler, parser, output_mgr, queue_path=str(queue_file))

    mocker.patch.object(crawler, "get_recent_events", return_value=[])

    mock_browser = mocker.AsyncMock()
    mock_context = mocker.AsyncMock()
    mock_browser.new_context = mocker.AsyncMock(return_value=mock_context)

    mocker.patch(
        "etl.scraper.async_playwright",
        return_value=mocker.AsyncMock(
            __aenter__=mocker.AsyncMock(
                return_value=mocker.AsyncMock(
                    chromium=mocker.AsyncMock(
                        launch=mocker.AsyncMock(return_value=mock_browser)
                    )
                )
            )
        ),
    )

    discovery_html = '<html><a href="/results/999.html">Result 999</a></html>'

    def fetch_page_side_effect(context, url):
        if "results/999.html" in url:
            raise Exception("Fetch result page error")
        return discovery_html

    mocker.patch.object(pipeline, "_fetch_page", side_effect=fetch_page_side_effect)

    with caplog.at_level(logging.ERROR):
        processed = await pipeline.run_historical(years=1)

    assert processed == 0
    assert "Failed to fetch http://example.com/results/999.html: Fetch result page error" in caplog.text


@pytest.mark.asyncio
async def test_run_historical_gather_and_parse_exceptions(mocker, caplog, tmp_path):
    """Test run_historical handling returned exceptions in gather and result parsing exceptions."""
    output_mgr = OutputManager(ledger_path=str(tmp_path / "ledger.parquet"), studies_dir=str(tmp_path / "studies"))
    crawler = ScoringDanceCrawler()
    parser = ScoringDanceParser()

    queue_file = tmp_path / "queue.json"
    queue_file.write_text(
        json.dumps([
            ["http://example.com/events/1/results/", "Location A"],
            ["http://example.com/events/2/results/", "Location B"],
        ]),
        encoding="utf-8",
    )

    pipeline = ETLPipeline(crawler, parser, output_mgr, queue_path=str(queue_file))

    mocker.patch.object(crawler, "get_recent_events", return_value=[])

    mock_browser = mocker.AsyncMock()
    mock_context = mocker.AsyncMock()
    mock_browser.new_context = mocker.AsyncMock(return_value=mock_context)

    mocker.patch(
        "etl.scraper.async_playwright",
        return_value=mocker.AsyncMock(
            __aenter__=mocker.AsyncMock(
                return_value=mocker.AsyncMock(
                    chromium=mocker.AsyncMock(launch=mocker.AsyncMock(return_value=mock_browser))
                )
            )
        ),
    )

    mocker.patch.object(crawler, "extract_results_links", side_effect=[
        ["http://example.com/results/101.html"],
        Exception("Event-level discovery exception"),
    ])

    mocker.patch.object(pipeline, "_fetch_page", return_value="<html></html>")

    # Mock asyncio.gather to return an exception and a fetched result
    async def fake_gather(*tasks, **kwargs):
        # Cancel or close tasks to avoid unawaited coroutine warnings
        for t in tasks:
            if hasattr(t, "close"):
                t.close()
        return [
            Exception("Unhandled exception from gather"),
            ("http://example.com/results/101.html", "<html></html>", "101"),
        ]

    mocker.patch("asyncio.gather", side_effect=fake_gather)
    mocker.patch.object(parser, "parse_results", side_effect=Exception("Parse error inside gather loop"))

    with caplog.at_level(logging.ERROR):
        processed = await pipeline.run_historical(years=1)

    assert processed == 0
    assert "Unhandled exception during fetch: Unhandled exception from gather" in caplog.text
    assert "Failed to process http://example.com/results/101.html: Parse error inside gather loop" in caplog.text
    assert (
        "Failed to process event http://example.com/events/2/results/: Event-level discovery exception"
        in caplog.text
    )
