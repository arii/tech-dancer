import pandas as pd
import argparse
import os
import logging

def query_dancer(path, identity):
    if not os.path.exists(path):
        print(f"❌ Ledger file not found at: {path}")
        return

    try:
        df = pd.read_parquet(path)
    except Exception as e:
        print(f"❌ Failed to read ledger file: {e}")
        return

    # Robust schema validation
    required_cols = ['Dancer_ID', 'competitor_name']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        print(f"❌ Ledger schema mismatch. Missing columns: {', '.join(missing_cols)}")
        return

    # Search by WSDC ID or Name
    try:
        result = df[
            (df['Dancer_ID'].astype(str) == str(identity)) |
            (df['competitor_name'].str.contains(str(identity), case=False, na=False))
        ]
    except Exception as e:
        print(f"❌ Error during query execution: {e}")
        return

    if result.empty:
        print(f"❌ No records found for '{identity}'")
    else:
        print(f"✅ Found {len(result)} records for '{identity}':")
        # Display key columns including the new 'Promoted' flag
        cols = ['event_date', 'event_title', 'competitor_name', 'Dancer_ID', 'Promoted']
        # Filter columns to only those that exist in the dataframe
        available_cols = [c for c in cols if c in df.columns]
        print(result[available_cols].sort_values('event_date', ascending=False).to_string(index=False))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Query the WCS competition ledger.")
    parser.add_argument("query", help="Dancer Name or WSDC ID")
    parser.add_argument("--ledger", default="etl/data/wcs_prelims.parquet", help="Path to Parquet ledger")
    args = parser.parse_args()
    query_dancer(args.ledger, args.query)
