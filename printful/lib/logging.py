import json
import os
from datetime import datetime

def save_audit_log(log_data, output_dir="printful/output/logs"):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
    filename = f"{timestamp}-batch-update.json"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w") as f:
        json.dump(log_data, f, indent=2)

    return filepath
