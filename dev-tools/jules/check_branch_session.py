#!/usr/bin/env python3
import argparse
import csv
import os
import sys

# Try to import JulesClient for messaging capabilities
try:
    from jules_ops import JulesClient

    JULES_OPS_AVAILABLE = True
except ImportError:
    JULES_OPS_AVAILABLE = False

# Default artifact path (assumes script is run from same dir as csv)
DEFAULT_CSV_PATH = "consolidated_workstreams.csv"


def get_jules_session(query, csv_path=DEFAULT_CSV_PATH):
    """
    Attempts to find the Jules session ID associated with the provided query.
    The query can be a branch name, a PR number (e.g., "160" or "#160"),
    or an Issue number.

    Returns a dict with session info or None if not found.
    """
    if not os.path.exists(csv_path):
        return None

    # Normalize query for ID comparison
    query_str = str(query).strip()

    # Create a set of variants to check against ID columns to be flexible
    query_variants = {query_str}
    if not query_str.startswith("#"):
        query_variants.add(f"#{query_str}")
    else:
        query_variants.add(query_str[1:])

    try:
        with open(csv_path, "r") as f:
            reader = csv.DictReader(f)
            # CSV is assumed to be sorted by date descending,
            # so first match is "latest"
            for row in reader:
                # 1. Check Branch (Exact Match)
                if row.get("branch") == query_str:
                    return _extract_session_info(row, "Branch match")

                # 2. Check PR ID (Checks "160" and "#160")
                if row.get("pr_id") in query_variants:
                    return _extract_session_info(row, "PR ID match")

                # 3. Check Issue ID (Checks "152" and "#152")
                if row.get("issue_id") in query_variants:
                    return _extract_session_info(row, "Issue ID match")

    except Exception as e:
        print(f"Error reading workstreams CSV: {e}", file=sys.stderr)

    return None


def _extract_session_info(row, match_type):
    """Helper to format the return dict."""
    return {
        "id": row.get("session_id"),
        "title": row.get("session_title"),
        "state": row.get("session_state"),
        "match_type": match_type,
    }


def send_message_to_session(session_id, message):
    """Initializes JulesClient and sends a message."""
    if not JULES_OPS_AVAILABLE:
        print(
            "Cannot send message: 'jules_ops.py' not found in "
            "current directory.",
            file=sys.stderr,
        )
        return False

    try:
        # JulesClient expects API key in env vars if not passed
        client = JulesClient()
        print(f"📨 Sending message to session {session_id}...")
        return client.send_message(session_id, message)
    except Exception as e:
        print(
            f"Failed to initialize JulesClient or send message: {e}",
            file=sys.stderr,
        )
        return False


def delete_session_via_client(session_id):
    """Initializes JulesClient and deletes the session."""
    if not JULES_OPS_AVAILABLE:
        print(
            "Cannot delete session: 'jules_ops.py' not found "
            "in current directory.",
            file=sys.stderr,
        )
        return False

    try:
        client = JulesClient()
        print(f"🗑️  Deleting session {session_id}...")
        client.delete_session(session_id)
        return True
    except Exception as e:
        print(
            f"Failed to initialize JulesClient or delete session: {e}",
            file=sys.stderr,
        )
        return False


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Interact with Jules sessions linked to git branches, PRs, or "
            "Issues."
        )
    )
    parser.add_argument(
        "identifier",
        help="Branch name, PR number (e.g. #160), or Issue number",
    )
    parser.add_argument(
        "--csv",
        default=DEFAULT_CSV_PATH,
        help="Path to consolidated_workstreams.csv",
    )
    parser.add_argument(
        "-m",
        "--message",
        help="If found, send this message to the active Jules session",
    )
    parser.add_argument(
        "-d",
        "--delete",
        action="store_true",
        help="Delete the session if found",
    )
    args = parser.parse_args()

    session_info = get_jules_session(args.identifier, args.csv)

    if session_info:
        print(f"Found Linked Session ({session_info['match_type']}):")
        print(f"   ID:    {session_info['id']}")
        print(f"   Title: {session_info['title']}")
        print(f"   State: {session_info['state']}")

        # Handle Message
        if args.message:
            print("-" * 40)
            if send_message_to_session(session_info["id"], args.message):
                print("Message sent successfully.")
            else:
                print("Failed to send message.")
                sys.exit(1)

        # Handle Deletion
        if args.delete:
            print("-" * 40)
            confirm = (
                input(
                    f"Are you sure you want to DELETE session "
                    f"{session_info['id']}? [y/N]: "
                )
                .strip()
                .lower()
            )
            if confirm == "y":
                if delete_session_via_client(session_info["id"]):
                    print("✅ Session deleted successfully.")
                else:
                    print("Failed to delete session.")
                    sys.exit(1)
            else:
                print("Deletion cancelled.")

        sys.exit(0)
    else:
        print(
            f"No active Jules session found for identifier: "
            f"{args.identifier}"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
