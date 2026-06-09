#!/usr/bin/env python3
import os
import sys

REQUIRED_FILES = [
    "hrm/package.json",
    "hrm/server.ts",
    "hrm/next.config.js",
    "hrm/playwright.config.ts",
    "hrm/Dockerfile",
]

REQUIRED_DIRS = [
    "hrm/tests",
]

# Architecture-specific paths (best-effort; may vary slightly)
ARCHITECTURE_PATHS = [
    "hrm/app/api/auth/[...nextauth]/route.ts",
    "hrm/app/client/control/page.tsx",
]


def check_path(path: str) -> bool:
    return os.path.exists(path)


def main() -> int:
    missing = []

    for f in REQUIRED_FILES:
        if not check_path(f):
            missing.append(f)

    for d in REQUIRED_DIRS:
        if not check_path(d):
            missing.append(d)

    for a in ARCHITECTURE_PATHS:
        if not check_path(a):
            missing.append(a)

    if missing:
        print("[ERROR] HRM layout validation failed. Missing paths:")
        for p in missing:
            print(f" - {p}")
        print("\nPlease ensure the hrm submodule adheres to the expected structure.")
        return 1

    print("[OK] HRM layout validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
