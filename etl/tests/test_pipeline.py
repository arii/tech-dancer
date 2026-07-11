# pylint: disable=missing-docstring,no-name-in-module,singleton-comparison,syntax-error
"""Tests for the ETL pipeline."""
import os
from datetime import datetime, timedelta

import pandas as pd
import requests

from etl.processor import process_for_ledger
from etl.scraper import BASE_URL, OutputManager, ScoringDanceCrawler, ScoringDanceParser


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
