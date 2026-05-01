import re
import json
import os
import sys
from datetime import datetime

def parse_issue_body(body):
    # Extract JSON metadata
    json_match = re.search(r'```json\n(.*?)\n```', body, re.DOTALL)
    metadata = {}
    if json_match:
        try:
            metadata = json.loads(json_match.group(1))
        except json.JSONDecodeError:
            print("Warning: Failed to parse JSON metadata.")

    # Extract Markdown content
    # We look for the markdown block. If not found, we use the whole body as a fallback
    # but the drafter is expected to provide it.
    md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
    content = ""
    if md_match:
        content = md_match.group(1).strip()
    else:
        content = body.strip()

    return metadata, content

def generate_markdown(metadata, content):
    # Standardize metadata
    frontmatter = {
        "type": metadata.get("type", "post"),
        "title": metadata.get("title", "Untitled"),
        "date": metadata.get("date", datetime.now().strftime('%Y-%m-%d')),
        "author": metadata.get("author", "Ariel Anders, PhD"),
        "category": metadata.get("category", "Lifestyle"),
        "excerpt": metadata.get("excerpt", ""),
        "image": metadata.get("image", ""),
        "tags": metadata.get("tags", [])
    }

    if metadata.get("affiliateLink"):
        frontmatter["affiliateLink"] = metadata.get("affiliateLink")

    # Build YAML frontmatter
    yaml_lines = ["---"]
    for key, value in frontmatter.items():
        if isinstance(value, list):
            yaml_lines.append(f"{key}:")
            for item in value:
                yaml_lines.append(f"  - {item}")
        else:
            # Simple escaping for titles with quotes
            safe_value = str(value).replace('"', '\\"')
            yaml_lines.append(f'{key}: "{safe_value}"')
    yaml_lines.append("---")

    # Remove H1 if it exists in content to avoid duplication with title
    # (The drafter's markdownPreview currently starts with # title)
    clean_content = re.sub(r'^#\s+.*?\n+', '', content, flags=re.MULTILINE)

    return "\n".join(yaml_lines) + "\n\n" + clean_content

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 content_parser.py <issue_body_file> [issue_title]")
        sys.exit(1)

    body_file = sys.argv[1]
    issue_title = sys.argv[2] if len(sys.argv) > 2 else ""

    with open(body_file, 'r', encoding='utf-8') as f:
        body = f.read()

    metadata, content = parse_issue_body(body)

    # Use issue title if metadata title is missing
    if not metadata.get("title") and issue_title.startswith("Draft: "):
        metadata["title"] = issue_title.replace("Draft: ", "").strip()

    full_markdown = generate_markdown(metadata, content)

    # Route to the right folder
    folder_map = {
        'post': 'content/posts',
        'resource': 'content/resources',
        'study': 'content/studies',
        'event': 'content/events'
    }
    content_type = metadata.get("type", "post")
    folder = folder_map.get(content_type, 'content/posts')
    os.makedirs(folder, exist_ok=True)

    date_str = metadata.get("date", datetime.now().strftime('%Y-%m-%d'))
    safe_title = re.sub(r'[^a-z0-9]+', '-', metadata.get("title", "new-post").lower()).strip('-')
    filename = f"{folder}/{date_str}-{safe_title}.md"

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(full_markdown)

    print(f"FILE_CREATED={filename}")
    print(f"SAFE_TITLE={safe_title}")

if __name__ == "__main__":
    main()
