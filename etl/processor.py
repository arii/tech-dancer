"""Module for processing raw data for the ledger."""
import pandas as pd


def process_for_ledger(raw_df):
    """Handles data transformation and aggregation."""
    if raw_df.empty:
        return pd.DataFrame()

    # Group by the new Dancer_ID and other metadata
    processed_df = (
        raw_df.groupby(
            [
                "Dancer_ID",
                "competitor_name",
                "result_id",
                "event_title",
                "event_date",
                "event_url",
                "location",
            ]
        )
        .agg(Registry_Points_Sum=("wsdc_points", "sum"), Promoted=("Promoted", "any"))
        .reset_index()
    )

    return processed_df
