# pylint: disable=missing-docstring,redefined-outer-name,protected-access
"""Unit tests for error handling and fallback paths in etl/query_ledger.py."""
import pandas as pd
from etl.query_ledger import query_dancer


def test_query_dancer_file_not_found(capsys):
    """Test query_dancer error message when file does not exist."""
    query_dancer("non_existent_ledger.parquet", "123")
    captured = capsys.readouterr()
    assert "❌ Ledger file not found or invalid:" in captured.out


def test_query_dancer_path_is_directory(tmp_path, capsys):
    """Test query_dancer error message when path points to a directory instead of a file."""
    dir_path = tmp_path / "somedir"
    dir_path.mkdir()
    query_dancer(str(dir_path), "123")
    captured = capsys.readouterr()
    assert "❌ Ledger file not found or invalid:" in captured.out


def test_query_dancer_corrupted_parquet(tmp_path, capsys):
    """Test query_dancer error message when reading a corrupted Parquet file."""
    corrupt_file = tmp_path / "corrupt.parquet"
    corrupt_file.write_bytes(b"corrupt file data")
    query_dancer(str(corrupt_file), "123")
    captured = capsys.readouterr()
    assert "❌ Failed to read ledger file:" in captured.out


def test_query_dancer_missing_schema_columns(tmp_path, capsys):
    """Test query_dancer schema mismatch error when required columns are missing."""
    invalid_schema_file = tmp_path / "invalid_schema.parquet"
    df = pd.DataFrame({"Wrong_Col": ["A", "B"]})
    df.to_parquet(invalid_schema_file)

    query_dancer(str(invalid_schema_file), "123")
    captured = capsys.readouterr()
    assert "❌ Ledger schema mismatch. Missing columns: Dancer_ID, competitor_name" in captured.out


def test_query_dancer_query_execution_error(tmp_path, capsys, mocker):
    """Test query_dancer exception during filtering/query execution."""
    ledger_file = tmp_path / "valid.parquet"
    df = pd.DataFrame({
        "Dancer_ID": ["123", "456"],
        "competitor_name": ["Alice", "Bob"],
        "event_date": ["2025-01-01", "2025-01-02"],
        "event_title": ["Event A", "Event B"],
        "Promoted": [False, True],
    })
    df.to_parquet(ledger_file)

    # Mock pd.read_parquet to return a DataFrame whose column operation raises an exception
    mock_df = mocker.MagicMock()
    mock_df.columns = ["Dancer_ID", "competitor_name"]
    # Mock __getitem__ indexing to raise Exception
    mock_df.__getitem__.side_effect = Exception("Pandas filtering error")
    mocker.patch("pandas.read_parquet", return_value=mock_df)

    query_dancer(str(ledger_file), "123")
    captured = capsys.readouterr()
    assert "❌ Error during query execution: Pandas filtering error" in captured.out


def test_query_dancer_no_records_found(tmp_path, capsys):
    """Test query_dancer output when query matches no records."""
    ledger_file = tmp_path / "valid.parquet"
    df = pd.DataFrame({
        "Dancer_ID": ["123", "456"],
        "competitor_name": ["Alice Smith", "Bob Jones"],
        "event_date": ["2025-01-01", "2025-01-02"],
        "event_title": ["Event A", "Event B"],
        "Promoted": [False, True],
    })
    df.to_parquet(ledger_file)

    query_dancer(str(ledger_file), "999")
    captured = capsys.readouterr()
    assert "❌ No records found for '999'" in captured.out


def test_query_dancer_success_found_records(tmp_path, capsys):
    """Test query_dancer output when matching records are found."""
    ledger_file = tmp_path / "valid.parquet"
    df = pd.DataFrame({
        "Dancer_ID": ["123", "456"],
        "competitor_name": ["Alice Smith", "Bob Jones"],
        "event_date": ["2025-01-01", "2025-01-02"],
        "event_title": ["Event A", "Event B"],
        "Promoted": [False, True],
    })
    df.to_parquet(ledger_file)

    query_dancer(str(ledger_file), "Alice")
    captured = capsys.readouterr()
    assert "✅ Found 1 records for 'Alice':" in captured.out
    assert "Alice Smith" in captured.out
