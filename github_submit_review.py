    def submit_pr_review(self, pr_number: int, filepath: str, cleanup: bool = False, dry_run: bool = True, event_override: Optional[str] = None, is_json: bool = False):
        """
        Submits a PR review from a markdown file containing a JSON payload.
        The file should have standard Markdown at the top and a JSON block at the bottom for metadata.
        """
        from dev_tools.utils import CLIError, log_info, log_warn
        import re
        import json

        if not os.path.exists(filepath):
            raise CLIError(f"Review file missing: {filepath}")

        with open(filepath, 'r') as f:
            content = f.read()

        # Find all JSON blocks and identify the metadata block (must contain 'recommendation', 'comments', or 'labels')
        json_blocks = list(re.finditer(r'```json\n(.*?)\n```', content, re.DOTALL))
        if not json_blocks:
            raise CLIError("Could not find any JSON block in review document")

        # Known keys used to distinguish the metadata block from other JSON blocks (like code samples)
        METADATA_IDENTIFIER_KEYS = {"recommendation", "comments", "labels"}

        payload = None
        metadata_match = None
        for match in reversed(json_blocks):
            try:
                candidate = json.loads(match.group(1))
                if isinstance(candidate, dict) and any(k in candidate for k in METADATA_IDENTIFIER_KEYS):
                    payload = candidate
                    metadata_match = match
                    break
            except json.JSONDecodeError:
                continue

        if not payload:
            raise CLIError(f"Could not find a valid JSON metadata block (expected keys: {', '.join(METADATA_IDENTIFIER_KEYS)})")

        # Extract Markdown body (everything above the metadata JSON block)
        body = content[:metadata_match.start()].strip()
        # Clean up the trailing "Output JSON" instructions if present
        body = re.split(r'##\s+Output JSON', body, flags=re.IGNORECASE)[0].strip()

        if not body:
             raise CLIError("Review body (Markdown section) is empty. Provide findings before the JSON block.")

        # Combine extracted body (Markdown section) and payload body (JSON section)
        existing_body = payload.get("body", "").strip()

        if existing_body:
            # Strip known placeholders out of the JSON body
            for p in ["<findings>", "<summary>", "<feedback>", "## ANTI-AI-SLOP", "## FINDINGS", "## FINAL RECOMMENDATION"]:
                existing_body = re.sub(rf"{p}\s*", "", existing_body, flags=re.IGNORECASE).strip()

        if existing_body:
            payload["body"] = f"{body}\n\n{existing_body}"
        else:
            payload["body"] = body

        # Validate payload before proceeding
        self.validate_review_payload(payload)

        # Map comment lines to diff positions
        try:
            diff_mapping = self._get_diff_mapping(pr_number)
            mapped_comments = []
            unmapped_comments = []

            for comment in payload.get("comments", []):
                path = comment.get("path")
                line = comment.get("line")

                if path in diff_mapping and line in diff_mapping[path]:
                    comment["position"] = diff_mapping[path][line]
                    mapped_comments.append(comment)
                else:
                    unmapped_comments.append(comment)

            payload["comments"] = mapped_comments

            if unmapped_comments:
                extra_body = "\n\n### Additional Feedback (Lines not found in diff)\n"
                for c in unmapped_comments:
                    extra_body += f"- **{c.get('path')}:{c.get('line')}**: {c.get('body')}\n"
                payload["body"] = payload.get("body", "") + extra_body

        except Exception as e:
            log_warn(f"Failed to generate diff mapping for PR #{pr_number}: {e}")

        pr_details = self.fetch_pr_details(pr_number)
        check_runs = self.fetch_check_runs(pr_details.get('head', {}).get('sha'))
        failing_checks = [run.get('name') for run in check_runs if run.get('conclusion') == 'failure']

        # Determine event based on recommendation field, then fallback to body analysis
        recommendation = payload.get("recommendation", "")
        if event_override:
            event = event_override
        elif recommendation == "Approved":
            event = "APPROVE"
        elif recommendation == "Approved with Minor Changes":
            # Per code review, minor changes shouldn't automatically approve
            event = "COMMENT"
        elif recommendation == "Not Approved":
            event = "REQUEST_CHANGES"
        else:
            event = ("REQUEST_CHANGES" if "Not Approved" in payload.get("body","")
                     else "APPROVE" if "Approved" in payload.get("body","")
                     else "COMMENT")

        if failing_checks and event == "APPROVE":
            event = "COMMENT"
            warning = f"> ⚠️ **BLOCKING CI FAILURE**: Approval overridden to COMMENT because the following checks are failing: {', '.join(failing_checks)}. Please resolve CI issues before approval.\n\n"
            payload["body"] = warning + payload.get("body", "")

        if not dry_run:
            def try_create_review(review_body, review_comments, review_event):
                try:
                    return self.create_review(pr_number, review_body, review_comments, review_event)
                except requests.exceptions.HTTPError as e:
                    if e.response is not None and e.response.status_code == 422:
                        try:
                            error_data = e.response.json()
                            error_msg = json.dumps(error_data)
                        except Exception:
                            error_msg = e.response.text

                        if "Can not approve your own pull request" in error_msg and review_event != "COMMENT":
                            log_warn("Cannot approve own PR. Retrying as COMMENT...")
                            return try_create_review(review_body, review_comments, "COMMENT")

                        # Handle individual comment failures if possible, or fallback to body
                        if review_comments:
                            log_warn(f"Failed to post {len(review_comments)} inline comments. Retrying as body comments. Error: {error_msg[:200]}")
                            fallback_body = review_body
                            fallback_body += "\n\n### Inline Comments (Fallback due to line resolution errors)\n"
                            for comment in review_comments:
                                line_info = f":{comment.get('line')}" if comment.get('line') else ""
                                fallback_body += f"- **{comment.get('path')}{line_info}**: {comment.get('body')}\n"
                            return try_create_review(fallback_body, [], review_event)
                    raise e

            try_create_review(payload.get("body",""), payload.get("comments",[]), event)

            if event == "REQUEST_CHANGES":
                labels = [l.get('name') if isinstance(l, dict) else l for l in pr_details.get('labels', [])]
                if "needs-design-system-fix" not in labels and any(k in payload.get("body","").lower() for k in ['tailwind', 'token']):
                    self.add_labels(pr_number, ["needs-design-system-fix"])

            if not is_json:
                log_info(f"✅ Submitted {event} for PR #{pr_number}")

            if cleanup:
                if os.path.exists(filepath):
                    os.remove(filepath)
                ctx = filepath.replace('pr-review-', 'pr-context-')
                if os.path.exists(ctx):
                    os.remove(ctx)
        else:
            if not is_json:
                log_info(f"[DRY-RUN] Would submit {event} for PR #{pr_number}")

        return {"status": "success", "event": event, "pr": pr_number}

    def download_zipball(self, ref: str, dest: str = "repo.zip") -> None:
        """A stateless download helper for the Orchestrator"""
        url = f"{self.base_url}/repos/{self.repo}/zipball/{ref}"
        headers = {"Authorization": f"Bearer {self.token}"}
        # Increased timeout for large downloads
        response = requests.get(url, headers=headers, stream=True, timeout=300)
        response.raise_for_status()
        with open(dest, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        subprocess.run(["unzip", "-o", dest], check=True)
