import pytest
import pandas as pd
import os
from src.scraper import WCSScraper

def test_parse_scoring_dance():
    scraper = WCSScraper()
    mock_file = os.path.join(os.path.dirname(__file__), 'mock_scoring_dance.html')
    with open(mock_file, 'r') as f:
        html_content = f.read()

    df = scraper.parse_scoring_dance(html_content)

    # Check if data was extracted
    assert not df.empty
    assert len(df) == 6  # 3 competitors * 2 judges each

    # Check competitor data
    john_doe = df[df['competitor_name'] == 'John Doe']
    assert len(john_doe) == 2
    assert 101 in john_doe['competitor_bib'].values

    # Check wsdc_points mapping
    # John Doe: Yes (10.0), Alt1 (4.5)
    assert 10.0 in john_doe['wsdc_points'].values
    assert 4.5 in john_doe['wsdc_points'].values

    # Jane Smith: No (0.0), Alt2 (4.3)
    jane_smith = df[df['competitor_name'] == 'Jane Smith']
    assert 0.0 in jane_smith['wsdc_points'].values
    assert 4.3 in jane_smith['wsdc_points'].values

    # Bob Brown: Alt3 (4.2), No (0.0)
    bob_brown = df[df['competitor_name'] == 'Bob Brown']
    assert 4.2 in bob_brown['wsdc_points'].values
    assert 0.0 in bob_brown['wsdc_points'].values

def test_data_validation():
    # Load the actual generated data if it exists, otherwise use mock
    scraper = WCSScraper()
    mock_file = os.path.join(os.path.dirname(__file__), 'mock_scoring_dance.html')
    with open(mock_file, 'r') as f:
        html_content = f.read()
    df = scraper.parse_scoring_dance(html_content)

    # Null Checks
    assert df['wsdc_points'].notnull().all()

    # Schema Bounds
    expected_points = [10.0, 4.5, 4.3, 4.2, 0.0]
    assert df['wsdc_points'].isin(expected_points).all()

    # Type Casting
    assert pd.api.types.is_integer_dtype(df['competitor_bib'])
    assert pd.api.types.is_string_dtype(df['competitor_name'])
    assert pd.api.types.is_string_dtype(df['judge_name'])
