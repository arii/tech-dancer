import pickle
import itertools
from collections import defaultdict
import os

CACHE_FILE = ".pr_cache.pkl"

if not os.path.exists(CACHE_FILE):
    print("Error: Cache file not found. Run pr_overlap.py first.")
    exit(1)

with open(CACHE_FILE, 'rb') as f:
    cache = pickle.load(f)

prs = list(cache["files"].keys())
similarity_scores = []

for p1, p2 in itertools.combinations(prs, 2):
    files1 = cache["files"][p1]
    files2 = cache["files"][p2]

    intersection = files1 & files2
    union = files1 | files2

    if union:
        jaccard_score = len(intersection) / len(union)
        if jaccard_score > 0:
            similarity_scores.append((jaccard_score, p1, p2))

# Sort by similarity score descending
similarity_scores.sort(key=lambda x: x[0], reverse=True)

print("Most Similar PRs (Jaccard Index):")
for score, p1, p2 in similarity_scores[:10]:
    print(f"Score: {score:.2f} | PRs {p1} & {p2}")
    print(f"  [{p1}] {cache['prs'][p1]}")
    print(f"  [{p2}] {cache['prs'][p2]}")
    print("-" * 30)
