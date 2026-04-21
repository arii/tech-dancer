import argparse
import json
import os
import sys
import subprocess
from datetime import datetime
import requests

# --- Settings ---
# These settings help our AI and human devs stay in sync on the project.
TOKEN = os.getenv("GITHUB_TOKEN")
ENV_REPO = os.getenv("GH_REPO")
REVIEW_LOG = os.path.expanduser("~/.gh_pending_reviews")

# ==========================================
# API INTERACTION LAYER
# ==========================================

class GitHubAPI:
    def __init__(self, repo_override=None, dry_run=False):
        self.repo = repo_override or ENV_REPO or self._auto_detect_repo()
        self.dry_run = dry_run

        if not self.repo:
            self._error("I couldn't detect a GitHub repo here. Are we in the right git folder? You can also pass --repo or set GH_REPO.")
        if not TOKEN and not self.dry_run:
            self._error("Whoops, GITHUB_TOKEN environment variable isn't set. I need that to talk to GitHub!")

    def _auto_detect_repo(self):
        try:
            url = subprocess.check_output(
                ['git', 'config', '--get', 'remote.origin.url'],
                stderr=subprocess.DEVNULL, text=True
            ).strip()
            if url.endswith('.git'): url = url[:-4]
            return url.split('://github.com')[-1].split(':')[-1]
        except:
            return None

    def _get_headers(self):
        return {
            "Authorization": f"Bearer {TOKEN}",
            "Accept": "application/vnd.github.v3+json",
        }

    def _error(self, msg):
        # Using a friendly but clear error voice for our AI & human collaborators
        print(f"\033[91m[Oops!] {msg}\033[0m", file=sys.stderr)
        sys.exit(1)

    def _info(self, msg):
        print(f"\033[94m[Heads up] {msg}\033[0m")

    def _request(self, method, path, data=None):
        url = f"https://api.github.com/repos/{self.repo}/{path.lstrip('/')}"
        if self.dry_run:
            self._info(f"[Dry-Run] {method} {url}")
            if data: print(json.dumps(data, indent=2))
            return {"id": "MOCK_ID", "state": "PENDING", "sha": "MOCK_SHA"}

        resp = requests.request(method, url, headers=self._get_headers(), json=data)
        if not resp.ok:
            self._error(f"The GitHub API wasn't happy about that ({resp.status_code}): {resp.text}")
        return resp.json()

    def get_pending_review(self, pr_num):
        reviews = self._request("GET", f"pulls/{pr_num}/reviews")
        pending = [r for r in reviews if r.get('state') == 'PENDING']
        return pending[0] if pending else None

    def create_review(self, pr_num, json_file=None, body=None):
        data = {}
        if json_file:
            with open(json_file, 'r') as f:
                data = json.load(f)
        else:
            # Friendly default message indicating AI/CLI collaboration
            data['body'] = body or "🤖 Automated review session started via collab CLI."

        if not data.get('commit_id'):
            commits = self._request("GET", f"pulls/{pr_num}/commits")
            if commits:
                data['commit_id'] = commits[-1]['sha']

        if not self.dry_run and self.get_pending_review(pr_num):
            self._error(f"Looks like we already have a pending review for PR #{pr_num}. Let's submit or clear that one first!")

        res = self._request("POST", f"pulls/{pr_num}/reviews", data)
        review_id = res['id']

        # We log this locally so AI agents or subsequent CLI commands can easily pick up where we left off
        os.makedirs(os.path.dirname(REVIEW_LOG), exist_ok=True)
        with open(REVIEW_LOG, "a") as f:
            f.write(f"{datetime.now()}|{self.repo}|PR#{pr_num}|{review_id}\n")

        print(f"✅ Awesome! Pending review {review_id} has been successfully created and logged.")
        return review_id

    def submit_review(self, pr_num, event, review_id=None):
        if not review_id:
            pending = self.get_pending_review(pr_num)
            if not pending: self._error(f"I couldn't find a pending review for PR #{pr_num} to submit.")
            review_id = pending['id']

        self._request("POST", f"pulls/{pr_num}/reviews/{review_id}/events", {"event": event.upper()})
        print(f"🚀 All set! Review {review_id} submitted as {event}. The codebase is one step better!")

# ==========================================
# MARKDOWN PLANNER LAYER
# ==========================================

class ReviewPlanner:
    @staticmethod
    def truncate(text, length=70):
        text = ' '.join(text.strip().split())
        if len(text) > length:
            return text[: length - 3] + '...'
        return text

    @staticmethod
    def format_date(iso_date):
        try:
            dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
            return dt.strftime('%Y-%m-%d')
        except Exception:
            return iso_date[:10] if iso_date else 'unknown'

    @staticmethod
    def quote_body(body):
        lines = body.strip().split('\n')
        return '\n'.join('> ' + line if line.strip() else '>' for line in lines)

    @classmethod
    def generate_plan(cls, pr_info, inline_comments, general_comments, reviews, repo, output_path):
        pr_number = pr_info.get('number', '?')
        pr_title = pr_info.get('title', 'Unknown')
        pr_author = pr_info.get('author', {}).get('login', 'unknown')

        replies_by_parent = {}
        inline_top_level = []
        for c in inline_comments:
            parent_id = c.get('in_reply_to_id')
            if parent_id:
                replies_by_parent.setdefault(parent_id, []).append(c)
            else:
                inline_top_level.append(c)

        inline_top_level.sort(key=lambda c: (c.get('path', ''), c.get('line') or c.get('original_line') or 0))

        tracker = cls._build_tracker(inline_top_level, general_comments)
        inline_section = cls._build_inline_section(inline_top_level, replies_by_parent)
        review_summary_section = cls._build_review_body_section(reviews)
        general_section = cls._build_general_section(general_comments)

        n_inline = len(inline_top_level)
        n_general = len(general_comments)
        total = n_inline + n_general

        pr_url = f'https://github.com/{repo}/pull/{pr_number}'
        gen_date = datetime.now().strftime('%Y-%m-%d')

        doc = f"""# AI Collab Plan: PR #{pr_number}

> **Note for AI & Human Collaborators:** This plan is generated to structure our review workflow.
> Please use this structured breakdown to ensure all automated suggestions and manual checks are addressed thoroughly!

**PR:** {pr_title}
**URL:** {pr_url}
**Repo:** {repo}
**Author:** @{pr_author}
**Generated:** {gen_date}
**Status:** In Progress
**Comments to Address:** {total} ({n_inline} inline, {n_general} general)

---

## 🧠 Code Review Best Practices

*Before drafting responses or reviewing code, please adhere to these guidelines:*
- **Scope & Focus:** Keep feedback strictly relevant to the PR's main goal. Isolate unrelated refactors or nitpicks to separate issues or flag them as explicitly non-blocking.
- **Actionable & Clear:** Suggest specific code changes rather than vague complaints.
- **Explain the "Why":** Ground your requests in objective principles (e.g., security, performance, readability, architecture) rather than pure opinion.
- **Constructive Tone:** Be collaborative and empathetic. Ask clarifying questions instead of making immediate demands.
- **Highlight the Good:** Take a moment to call out elegant solutions and clean code.

---

## Progress Tracker

{tracker}

---

## Response Options Reference

| Strategy | When to use |
|---|---|
| `modify-code` | Change the code to address the feedback |
| `add-comment` | Reply for clarification without changing code yet |
| `new-github-issue` | Valid feedback, but out of scope for this PR |
| `disagree` | Explain why you are keeping the code as is |
| `acknowledged` | Simple "thanks" or "done" for non-actionable items |
| `question` | Need more information from the reviewer |

---

{review_summary_section}

## Inline Review Detail

{inline_section}

## General Comment Detail

{general_section}
        """
        with open(output_path, 'w') as f:
            f.write(doc)
        print(f"✅ Created a shiny new PR Collab Plan here: {output_path}")

    @classmethod
    def _build_tracker(cls, inline_top_level, general_comments):
        lines = []
        n = 1
        if inline_top_level:
            lines.append('**Inline Review Comments:**')
            for c in inline_top_level:
                path, line = c.get('path', 'unknown'), c.get('line') or c.get('original_line', '?')
                author = c.get('user', {}).get('login', 'unknown')
                preview = cls.truncate(c.get('body', ''), 60)
                lines.append(f'- [ ] {n}. [`{path}:{line}`] @{author} — "{preview}"')
                c['_global_idx'] = n
                n += 1

        if general_comments:
            lines.append('\n**General PR Comments:**')
            for c in general_comments:
                author = c.get('user', {}).get('login', 'unknown')
                preview = cls.truncate(c.get('body', ''), 60)
                lines.append(f'- [ ] {n}. [general] @{author} — "{preview}"')
                c['_global_idx'] = n
                n += 1

        return '\n'.join(lines) if lines else '_No comments found._'

    @classmethod
    def _build_inline_section(cls, inline_top_level, replies_by_parent):
        if not inline_top_level: return '_No inline review comments._\n'
        parts = []
        for c in inline_top_level:
            idx = c['_global_idx']
            path, line = c.get('path', 'unknown'), c.get('line') or c.get('original_line', '?')
            author, date = c.get('user', {}).get('login', 'unknown'), cls.format_date(c.get('created_at', ''))
            body, diff_hunk = c.get('body', '').strip(), c.get('diff_hunk', '').strip()

            block = [f'### {idx}. `{path}` line {line} — @{author}', f'**Date:** {date}\n']
            if diff_hunk:
                hunk_lines = diff_hunk.split('\n')
                if len(hunk_lines) > 12: hunk_lines = ['...'] + hunk_lines[-12:]
                block.extend(['**Context:**', '```diff'] + hunk_lines + ['```\n'])

            block.append(cls.quote_body(body) + '\n')

            for reply in replies_by_parent.get(c['id'], []):
                r_author, r_date = reply.get('user', {}).get('login', 'unknown'), cls.format_date(reply.get('created_at', ''))
                block.extend([f'**Reply — @{r_author} ({r_date}):**', cls.quote_body(reply.get('body', '').strip()), '\n'])

            block.extend([
                '**Response Strategy:**',
                '<!-- Action: modify-code | add-comment | new-github-issue | disagree | acknowledged | question -->',
                '<!-- Rationale: [Briefly explain why, applying the best practices above] -->\n',
                '---'
            ])
            parts.append('\n'.join(block))
        return '\n\n'.join(parts)

    @classmethod
    def _build_review_body_section(cls, reviews):
        relevant = [r for r in reviews if r.get('body', '').strip() and r.get('state') in ('CHANGES_REQUESTED', 'COMMENTED', 'COMMENT')]
        if not relevant: return ''

        parts = ['## Review Summaries\n', '_These are the overall review messages (not tied to a specific line)._\n']
        for r in relevant:
            author, date, state = r.get('user', {}).get('login', 'unknown'), cls.format_date(r.get('submitted_at', '')), r.get('state', '')
            parts.extend([f'### @{author} — {date} ({state})\n', cls.quote_body(r.get('body', '').strip()), ''])
        return '\n'.join(parts)

    @classmethod
    def _build_general_section(cls, general_comments):
        if not general_comments: return '_No general PR comments._\n'
        parts = []
        for c in general_comments:
            idx = c['_global_idx']
            author, date = c.get('user', {}).get('login', 'unknown'), cls.format_date(c.get('created_at', ''))
            block = [
                f'### {idx}. @{author} — {date}\n',
                cls.quote_body(c.get('body', '').strip()), '\n',
                '**Response Strategy:**',
                '<!-- Action: modify-code | add-comment | new-github-issue | disagree | acknowledged | question -->',
                '<!-- Rationale: [Briefly explain why, applying the best practices above] -->\n',
                '---'
            ]
            parts.append('\n'.join(block))
        return '\n\n'.join(parts)

# ==========================================
# CLI ENTRY POINT
# ==========================================

def main():
    parser = argparse.ArgumentParser(description="GitHub Review & AI Collaboration Tool")
    parser.add_argument("--repo", help="Override repo (owner/repo)")
    parser.add_argument("--dry-run", action="store_true", help="Simulate API requests without making changes")

    sub = parser.add_subparsers(dest="cmd", required=True)

    # Subcommand: plan
    p_plan = sub.add_parser("plan", help="Generate a markdown response plan from PR data")
    p_plan.add_argument("--pr-info", required=True)
    p_plan.add_argument("--inline", required=True)
    p_plan.add_argument("--general", required=True)
    p_plan.add_argument("--reviews", required=True)
    p_plan.add_argument("--output", required=True, help="Markdown output path")

    # Subcommand: create
    p_create = sub.add_parser("create", help="Create a pending review on GitHub")
    p_create.add_argument("pr", help="PR Number")
    p_create.add_argument("--file", help="JSON file with review data")
    p_create.add_argument("--body", help="Simple comment body")

    # Subcommand: submit
    p_submit = sub.add_parser("submit", help="Submit a pending review on GitHub")
    p_submit.add_argument("pr", help="PR Number")
    p_submit.add_argument("event", choices=["APPROVE", "REQUEST_CHANGES", "COMMENT"])
    p_submit.add_argument("--id", help="Optional review ID override")

    args = parser.parse_args()

    if args.cmd == "plan":
        # Load JSON files locally
        def load_json(path):
            with open(path, 'r') as f: return json.load(f)

        repo = args.repo or ENV_REPO or "unknown/repo"
        ReviewPlanner.generate_plan(
            pr_info=load_json(args.pr_info),
            inline_comments=load_json(args.inline),
            general_comments=load_json(args.general),
            reviews=load_json(args.reviews),
            repo=repo,
            output_path=args.output
        )
    else:
        # API Commands
        gh = GitHubAPI(repo_override=args.repo, dry_run=args.dry_run)
        if args.cmd == "create":
            gh.create_review(args.pr, json_file=args.file, body=args.body)
        elif args.cmd == "submit":
            gh.submit_review(args.pr, args.event, review_id=args.id)

if __name__ == "__main__":
    main()
