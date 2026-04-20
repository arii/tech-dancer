import pytest
import pandas as pd
import os
from scraper import EEPROLedgerFeeder

def test_parse_scoring_dance():
    feeder = EEPROLedgerFeeder()
    mock_file = os.path.join(os.path.dirname(__file__), 'mock_scoring_dance.html')
    with open(mock_file, 'r') as f:
        html_content = f.read()

    df = feeder.parse_scoring_dance(html_content)

    # Check if data was extracted
    assert not df.empty
    assert len(df) == 6  # 3 competitors * 2 judges each

    # Check competitor data
    john_doe = df[df['competitor_name'] == 'John Doe']
    assert 101 in john_doe['competitor_bib'].values

    # Check wsdc_points mapping
    assert 10.0 in john_doe['wsdc_points'].values
    assert 4.5 in john_doe['wsdc_points'].values

def test_data_validation_hygiene(tmp_path):
    ledger_file = tmp_path / "test_ledger.parquet"
    feeder = EEPROLedgerFeeder(ledger_path=str(ledger_file))

    # Mock data following new schema
    data = {
        'Dancer_ID': ['REF_ID: 001', 'REF_ID: 002'],
        'Dancer_Name': ['John Doe', 'Jane Smith'],
        'Registry_Points_Sum': [20.0, 14.5]
    }
    df = pd.DataFrame(data)

    # Verify hygiene check passes
    feeder._verify_hygiene(df)

    # Test failure: Duplicate Dancer_ID
    bad_data = {
        'Dancer_ID': ['REF_ID: 001', 'REF_ID: 001'],
        'Registry_Points_Sum': [10.0, 10.0]
    }
    bad_df = pd.DataFrame(bad_data)
    with pytest.raises(ValueError, match="Duplicate REF_IDs detected"):
        feeder._verify_hygiene(bad_df)

    # Test failure: Legacy terminology
    slop_data = {
        'Dancer_ID': ['REF_ID: 003'],
        'Points': [10.0]
    }
    slop_df = pd.DataFrame(slop_data)
    with pytest.raises(ValueError, match="Legacy terminology detected"):
        feeder._verify_hygiene(slop_df)

@pytest.mark.asyncio
async def test_extract_scoring_dance_table_mocked(mocker):
    # Use pytest-mock to patch the scraper's network call
    mock_data = pd.DataFrame({
        'competitor_bib': [101, 101, 102],
        'competitor_name': ['John Doe', 'John Doe', 'Jane Smith'],
        'wsdc_points': [10.0, 4.5, 0.0]
    })
    mocker.patch('scraper.EEPROLedgerFeeder.scrape_scoring_dance', return_value=mock_data)

    feeder = EEPROLedgerFeeder()
    df = await feeder.extract_scoring_dance_table("http://dummy.url")

    assert not df.empty
    assert len(df) == 2
    assert 'Dancer_ID' in df.columns
    assert 'Registry_Points_Sum' in df.columns
    assert df[df['Dancer_ID'] == 'REF_ID: 101']['Registry_Points_Sum'].values[0] == 14.5
