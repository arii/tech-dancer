    def _get_diff_mapping(self, pr_number: int) -> Dict[str, Dict[int, int]]:
        """
        Parses the PR diff and returns a mapping of {filename: {new_line_number: diff_position}}.
        Diff position is 0-indexed starting from the first '@@' hunk header in the file.
        """
        diff_text = self.fetch_pr_diff(pr_number)
        mapping = {}
        current_file = None
        file_diff_pos = 0
        new_line_num = 0
        first_hunk_seen = False

        for line in diff_text.splitlines():
            if line.startswith('diff --git'):
                current_file = None
                first_hunk_seen = False
                continue
            if line.startswith('--- '):
                continue
            if line.startswith('+++ b/'):
                current_file = line[6:].strip()
                mapping[current_file] = {}
                file_diff_pos = 0
                continue
            if line.startswith('@@ '):
                if current_file is not None:
                    if not first_hunk_seen:
                        # First hunk of the file: hunk header is position 0
                        file_diff_pos = 0
                        first_hunk_seen = True
                    else:
                        # Subsequent hunk headers count as a line in the diff
                        file_diff_pos += 1

                    match = re.search(r'\+(\d+)', line)
                    if match:
                        new_line_num = int(match.group(1))
                continue

            if current_file is not None:
                file_diff_pos += 1
                if line.startswith('+'):
                    mapping[current_file][new_line_num] = file_diff_pos
                    new_line_num += 1
                elif line.startswith('-'):
                    # Deletions increment position but don't have a line number in the new file
                    pass
                elif line.startswith('\\'):
                    # "\ No newline at end of file" increments position
                    pass
                else:
                    # Context line
                    mapping[current_file][new_line_num] = file_diff_pos
                    new_line_num += 1
        return mapping

    def update_issue(self, number: int, body: Optional[str] = None, labels: Optional[List[str]] = None) -> Dict[str, Any]:
        """Updates a GitHub issue's body and/or labels."""
        data = {}
        if body is not None:
            data['body'] = body
        if labels is not None:
            data['labels'] = labels
        return self._request('PATCH', f'/repos/{self.repo}/issues/{number}', json_data=data)

    def create_review(self, number: int, body: str, comments: List[Dict[str, Any]], event: str) -> Dict[str, Any]:
        data = {
            "body": body,
            "event": event,
            "comments": comments
        }
        return self._request('POST', f'/repos/{self.repo}/pulls/{number}/reviews', json_data=data)

    def add_labels(self, number: int, labels: List[str]) -> List[Dict[str, Any]]:
        """Adds labels to an issue or pull request."""
        return self._request('POST', f'/repos/{self.repo}/issues/{number}/labels', json_data={"labels": labels})

    def remove_label(self, number: int, label_name: str) -> None:
        """Removes a label from an issue or pull request."""
        encoded_label = quote(label_name)
        return self._request('DELETE', f'/repos/{self.repo}/issues/{number}/labels/{encoded_label}')

    @staticmethod
    def validate_review_payload(payload: Dict[str, Any]):
        """
        Validates that the review payload is not just boilerplate or empty.
