"""Module for querying the ledger data."""
import argparse
import os

import pandas as pd


def _print_message(msg, status="info"):
    icon = {"info": "ℹ️", "success": "✅", "error": "❌"}.get(status, "ℹ️")
    print(f"{icon} {msg}")


def _print_results(df, query):
    if df.empty:
        _print_message(f"No records found for '{query}'", "error")
        return

    _print_message(f"Found {len(df)} records for '{query}':", "success")
    cols = ["event_date", "event_title", "competitor_name", "Dancer_ID", "Promoted"]
    available_cols = [c for c in cols if c in df.columns]
    print(df[available_cols].sort_values("event_date", ascending=False).to_string(index=False))


def query_dancer(path, identity):
    """Main function for querying the ledger."""
    # Sanitize and resolve path
    safe_path = os.path.abspath(path)

    if not os.path.exists(safe_path) or not os.path.isfile(safe_path):
        _print_message(f"Ledger file not found or invalid: {safe_path}", "error")
        return

    try:
        df = pd.read_parquet(safe_path)
    except Exception as e:
        _print_message(f"Failed to read ledger file: {e}", "error")
        return

    required_cols = ["Dancer_ID", "competitor_name"]
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        _print_message(f"Ledger schema mismatch. Missing columns: {', '.join(missing_cols)}", "error")
        return

    try:
        result = df[
            (df["Dancer_ID"].astype(str) == str(identity))
            | (df["competitor_name"].str.contains(str(identity), case=False, na=False))
        ]
        _print_results(result, identity)
    except Exception as e:
        _print_message(f"Error during query execution: {e}", "error")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Query the WCS competition ledger.")
    parser.add_argument("query", help="Dancer Name or WSDC ID")
    parser.add_argument("--ledger", default="etl/data/wcs_prelims.parquet", help="Path to Parquet ledger")
    args = parser.parse_args()
    query_dancer(args.ledger, args.query)
