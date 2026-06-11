import subprocess
import time
import os
import sys

def submit_reviews():
    pr_numbers = [1733, 1848, 2047, 2048, 2049, 2050, 2052, 2053, 2054, 2055, 2056, 2062, 2063, 2064, 2065, 2067, 2070, 2071, 2073, 2075, 2076]

    for pr in pr_numbers:
        feedback_file = f"feedback_{pr}.md"
        if not os.path.exists(feedback_file):
            print(f"File {feedback_file} does not exist.")
            continue

        print(f"Submitting review for PR #{pr}...")
        result = subprocess.run(["python3", "pr_reviewer.py", "comment", str(pr), feedback_file], capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("Error:", result.stderr)

        # Add a small delay to avoid rate limiting
        time.sleep(1)

if __name__ == "__main__":
    submit_reviews()
