import pandas as pd
import numpy as np
import os
import argparse
from datetime import datetime, timedelta

# Standard schema: date, affiliate_id, network, clicks, conversions, revenue, commission, cost
COLUMN_NAMES = ['date', 'affiliate_id', 'network', 'clicks', 'conversions', 'revenue', 'commission', 'cost']

def generate_mock_data(days=90):
    """Generates synthetic affiliate data for development and ROI analysis."""
    networks = ['Amazon', 'Fuego']
    affiliate_ids = ['loop-quiet', 'bloch-grecian', 'loop-experience', 'suede-sheets',
                     'compression-cubes', 'travel-bottles', 'dance-socks', 'listerine-tabs',
                     'rave-fan', 'neck-fan', 'hanging-toiletry-bag', 'garment-steamer',
                     'epsom-salt', 'foam-roller', 'fuego-split-sole', 'fuego-low-top']

    data = []
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)

    # Pre-calculated fixed costs per asset (mocking content production cost)
    asset_costs = {aff_id: np.random.uniform(50, 200) for aff_id in affiliate_ids}

    for i in range(days):
        current_date = start_date + timedelta(days=i)
        for aff_id in affiliate_ids:
            # Probability of having activity on a given day
            if np.random.random() > 0.3:
                network = 'Fuego' if 'fuego' in aff_id else 'Amazon'
                clicks = np.random.randint(5, 50)
                # Conversions (roughly 2-5% conversion rate)
                conversions = int(clicks * np.random.uniform(0.02, 0.05))

                # Revenue per conversion
                avg_price = 40 if network == 'Amazon' else 110
                revenue = conversions * avg_price * np.random.uniform(0.9, 1.1)

                # Commission rate (Amazon ~4%, Fuego ~10%)
                comm_rate = 0.04 if network == 'Amazon' else 0.10
                commission = revenue * comm_rate

                # Attributed cost (daily portion of the fixed cost or variable spend)
                cost = (asset_costs[aff_id] / days) + (clicks * 0.05) # Fixed + variable (e.g. PPC)

                data.append({
                    'date': current_date.strftime('%Y-%m-%d'),
                    'affiliate_id': aff_id,
                    'network': network,
                    'clicks': clicks,
                    'conversions': conversions,
                    'revenue': round(revenue, 2),
                    'commission': round(commission, 2),
                    'cost': round(cost, 2)
                })

    return pd.DataFrame(data)

def process_csv(filepath, network):
    """Processes a CSV file from a specific network."""
    df = pd.read_csv(filepath)

    if network.lower() == 'amazon':
        # Example Amazon schema mapping
        # Expected: Date, Tag, Clicks, Items Shipped, Revenue, Earnings
        mapping = {
            'Date': 'date',
            'Tag': 'affiliate_id',
            'Clicks': 'clicks',
            'Items Shipped': 'conversions',
            'Revenue': 'revenue',
            'Earnings': 'commission'
        }
        df = df.rename(columns=mapping)
        df['network'] = 'Amazon'
        df['cost'] = 0.0 # Amazon doesn't provide cost data in earnings reports

    elif network.lower() == 'fuego':
        # Example Fuego schema mapping
        # Expected: created_at, link_id, clicks, orders, sales_amount, commission_amount, spend
        mapping = {
            'created_at': 'date',
            'link_id': 'affiliate_id',
            'clicks': 'clicks',
            'orders': 'conversions',
            'sales_amount': 'revenue',
            'commission_amount': 'commission',
            'spend': 'cost'
        }
        df = df.rename(columns=mapping)
        df['network'] = 'Fuego'
        if 'cost' not in df.columns:
            df['cost'] = 0.0

    # Ensure all required columns exist
    for col in COLUMN_NAMES:
        if col not in df.columns:
            df[col] = 0 if col in ['clicks', 'conversions'] else 0.0

    return df[COLUMN_NAMES]

def main():
    parser = argparse.ArgumentParser(description="Affiliate Reporting ETL")
    parser.add_argument("--output", default="etl/data/affiliate_reporting.parquet", help="Path to output Parquet file")
    parser.add_argument("--mock", action="store_true", help="Generate mock data")
    parser.add_argument("--days", type=int, default=180, help="Days of mock data to generate")
    parser.add_argument("--csv", help="Path to CSV file for import")
    parser.add_argument("--network", choices=['amazon', 'fuego'], help="Network for CSV import")
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    dataframes = []

    # Load existing data if it exists to append
    if os.path.exists(args.output):
        try:
            dataframes.append(pd.read_parquet(args.output))
        except Exception as e:
            print(f"Warning: Could not read existing parquet: {e}")

    if args.mock:
        print(f"Generating {args.days} days of mock affiliate data...")
        dataframes.append(generate_mock_data(args.days))

    if args.csv and args.network:
        print(f"Importing {args.network} data from {args.csv}...")
        dataframes.append(process_csv(args.csv, args.network))

    if not dataframes:
        print("No data sources specified. Use --mock or --csv.")
        return

    df = pd.concat(dataframes, ignore_index=True)

    if not df.empty:
        # Deduplicate by date and affiliate_id
        df = df.drop_duplicates(subset=['date', 'affiliate_id'], keep='last')
        df.to_parquet(args.output, index=False)
        print(f"Saved {len(df)} records to {args.output}")
    else:
        print("No data to save.")

if __name__ == "__main__":
    main()
