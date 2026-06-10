#!/usr/bin/env python3
import os
import sys
import json
import argparse

RULES = [
    {
        "name": "API route naming",
        "path": "hrm/app/api",
        "pattern": "route.ts",
        "required": True,
        "desc": "All API routes should use route.ts files."
    },
    {
        "name": "Auth route present",
        "path": "hrm/app/api/auth",
        "pattern": "[...nextauth]/route.ts",
        "required": True,
        "desc": "Auth route must exist at app/api/auth/[...nextauth]/route.ts."
    },
    {
        "name": "Client control page present",
        "path": "hrm/app/client/control",
        "pattern": "page.tsx",
        "required": True,
        "desc": "Client control page should exist at app/client/control/page.tsx."
    },
    {
        "name": "MUI usage in components",
        "path": "hrm/components",
        "pattern": "import .*@mui/",
        "required": False,
        "desc": "Components should use MUI imports where applicable."
    },
]

def walk_files(base):
    for root, _, files in os.walk(base):
        for f in files:
            yield os.path.join(root, f)


def check_rule(rule):
    base = rule["path"]
    if not os.path.exists(base):
        return (rule["name"], False, f"Missing path: {base}")

    matched = False
    if rule["pattern"] == "route.ts":
        for fp in walk_files(base):
            if fp.endswith("route.ts"):
                matched = True
                break
    elif rule["pattern"].endswith("page.tsx"):
        for fp in walk_files(base):
            if fp.endswith("page.tsx"):
                matched = True
                break
    elif "[...nextauth]/route.ts" in rule["pattern"]:
        # look for folder containing [...nextauth]/route.ts
        for fp in walk_files(base):
            if fp.endswith("[...nextauth]/route.ts"):
                matched = True
                break
    else:
        # lightweight text search
        for fp in walk_files(base):
            try:
                with open(fp, "r", encoding="utf-8", errors="ignore") as fh:
                    text = fh.read()
                    if "@mui/" in text:
                        matched = True
                        break
            except Exception:
                continue

    if rule["required"] and not matched:
        return (rule["name"], False, rule["desc"])
    return (rule["name"], True, rule["desc"])


def main():
    parser = argparse.ArgumentParser(description="Analyze hrm structure")
    parser.add_argument("--json", action="store_true", help="Output JSON result")
    args = parser.parse_args()

    results = []
    failures = []
    for r in RULES:
        name, ok, info = check_rule(r)
        status = "OK" if ok else "FAIL"
        results.append({"name": name, "ok": ok, "info": info})
        if not ok:
            failures.append(name)
        if not args.json:
            print(f"[{status}] {name} - {info}")

    if args.json:
        print(json.dumps({"results": results, "failures": failures}, ensure_ascii=False))

    if failures:
        if not args.json:
            print("\nStructural checks found issues:")
            for n in failures:
                print(f" - {n}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
