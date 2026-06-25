import subprocess
import os

prs_to_close = [
    2914, 2925, 2931, 2950, 2963, 2965, 2966, 2970, 2972,
    2902, 2936, 2952, 2955, 2956, 2959
]

for pr in prs_to_close:
    print(f"Closing PR {pr}...")
    subprocess.run(["td-cli", "gh", "audit-pr", str(pr), "--submit"], check=False) # Wait, there is no generic close command in td-cli?
