import pytest
import pandas as pd
import os
import requests
from datetime import datetime, timedelta
from scraper import (
    ScoringDanceCrawler,
    ScoringDanceParser,
    DataProcessor,
    OutputManager,
    BASE_URL
)

def test_parse_results():
    parser = ScoringDanceParser()
    mock_file = os.path.join(os.path.dirname(__file__), 'mock_scoring_dance.html')
    with open(mock_file, 'r') as f:
        html_content = f.read()

    url = "https://scoring.dance/enUS/events/190/results/2945.html"
    df = parser.parse_results(html_content, url)

    assert not df.empty
    # In mock, we have 3 rows, but each has 2 judge marks, so 6 rows in df
    assert len(df) == 6
    john_doe = df[df['competitor_name'] == 'John Doe']
    assert 101 in john_doe['competitor_bib'].values
    assert 10.0 in john_doe['wsdc_points'].values
    assert all(df['result_id'] == '2945')

    # Test fallback for Bob Brown who has no link (based on cell text)
    bob_brown = df[df['competitor_name'] == 'Bob Brown']
    assert not bob_brown.empty
    assert 103 in bob_brown['competitor_bib'].values

def test_process_for_ledger():
    processor = DataProcessor()
    raw_data = pd.DataFrame({
        'competitor_bib': [101, 101, 102],
        'competitor_name': ['John Doe', 'John Doe', 'Jane Smith'],
        'wsdc_points': [10.0, 4.5, 0.0],
        'result_id': ['2945', '2945', '2945']
    })
    df = processor.process_for_ledger(raw_data)
    assert len(df) == 2
    assert df[df['Dancer_ID'] == 'REF_ID: 101-2945']['Registry_Points_Sum'].values[0] == 14.5

def test_update_ledger_hygiene(tmp_path):
    ledger_file = tmp_path / "test_ledger.parquet"
    manager = OutputManager(ledger_path=str(ledger_file), studies_dir=str(tmp_path/"studies"))

    data = pd.DataFrame({
        'Dancer_ID': ['REF_ID: 001-2945', 'REF_ID: 002-2945'],
        'Dancer_Name': ['John Doe', 'Jane Smith'],
        'Registry_Points_Sum': [10.0, 10.0]
    })
    manager.update_ledger(data)
    assert os.path.exists(ledger_file)

    df = pd.read_parquet(ledger_file)
    assert len(df) == 2

def test_get_recent_events(mocker):
    # Use relative date for deterministic test
    test_date = (datetime.now() - timedelta(days=10)).strftime('%m/%d/%Y')

    html_text = f"""
    <table>
        <tr>
            <td>{test_date}</td>
            <td><a href="/enUS/events/338/results/">Results</a></td>
        </tr>
    </table>
    """
    mocker.patch('scraper.ScoringDanceCrawler._fetch_page_text', side_effect=[html_text, requests.RequestException("End of pagination")])

    crawler = ScoringDanceCrawler()
    links = list(crawler.get_recent_events(years=1))
    assert f"{BASE_URL}/enUS/events/338/results/" in links

def test_save_markdown(tmp_path):
    studies_dir = tmp_path / "studies"
    manager = OutputManager(ledger_path=str(tmp_path/"ledger.parquet"), studies_dir=str(studies_dir))

    df = pd.DataFrame([{
        'competitor_bib': 101,
        'competitor_name': 'John Doe & Jane Smith',
        'wsdc_points': 10.0,
        'event_title': 'Mock Event',
        'event_date': '01/01/2025'
    }])

    url = "https://scoring.dance/enUS/events/190/results/2945.html"
    manager.save_markdown(df, url)

    # Slug should be generated correctly
    expected_file = studies_dir / "mock-event-2945.md"
    assert expected_file.exists()
    content = expected_file.read_text()
    assert 'date: "2025-01-01"' in content
    assert '| 1 | John Doe | Jane Smith |' in content
