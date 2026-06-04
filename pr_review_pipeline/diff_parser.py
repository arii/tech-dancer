from dataclasses import dataclass
import re


@dataclass(frozen=True)
class AddedLine:
    file: str
    line: int | None
    text: str


def extract_added_lines(diff_text: str) -> list[AddedLine]:
    current_file: str | None = None
    new_line: int | None = None
    added: list[AddedLine] = []
    hunk_re = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@")

    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            current_file = line.removeprefix("+++ b/")
            continue
        if line.startswith("+++ "):
            current_file = line.removeprefix("+++ ")
            continue
        hunk_match = hunk_re.match(line)
        if hunk_match:
            new_line = int(hunk_match.group(1))
            continue
        if new_line is None:
            continue
        if line.startswith("+") and not line.startswith("+++"):
            if current_file is not None:
                added.append(AddedLine(current_file, new_line, line[1:]))
            new_line += 1
        elif line.startswith("-") and not line.startswith("---"):
            continue
        else:
            new_line += 1
    return added


def changed_files(diff_text: str) -> list[str]:
    files: list[str] = []
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            file = line.removeprefix("+++ b/")
            if file != "/dev/null" and file not in files:
                files.append(file)
    return files
