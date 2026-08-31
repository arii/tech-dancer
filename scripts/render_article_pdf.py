import re
import subprocess
import os

with open("content/studies/wcs-navigator-architecture.md", "r") as f:
    raw_md = f.read()

# Parse frontmatter
frontmatter_match = re.match(r"^---\n(.*?)\n---\n(.*)$", raw_md, re.DOTALL)
if frontmatter_match:
    fm_text = frontmatter_match.group(1)
    body_md = frontmatter_match.group(2)
else:
    body_md = raw_md
    fm_text = ""

title = "WCS Navigator Architecture Deep Dive"
author = "Ariel Anders, PhD"
date = "2026-08-28"
tags = "DevAI, FastAPI, Gemini, React, WCS, Automation"
excerpt = "Explore how WCS Navigator uses a search-first UI, pre-flight footprint analysis, auto-advancing card questionnaires, dynamic rule engines, taskmaker debug telemetry, and stateless in-memory calendar streaming to deliver personalized convention itineraries."

for line in fm_text.splitlines():
    if line.startswith("title:"):
        title = line.split(":", 1)[1].strip().strip('"')
    elif line.startswith("author:"):
        author = line.split(":", 1)[1].strip().strip('"')
    elif line.startswith("date:"):
        date = line.split(":", 1)[1].strip().strip('"')
    elif line.startswith("excerpt:"):
        excerpt = line.split(":", 1)[1].strip().strip('"')

# Replace image paths to absolute file URIs for local chrome rendering
workspace_root = os.path.abspath(os.getcwd())
def replace_img(match):
    path = match.group(1)
    if path.startswith("/"):
        full_path = os.path.join(workspace_root, "public", path.lstrip("/"))
        return f"({full_path})"
    return f"({path})"

body_md = re.sub(r'\((/assets/[^)]+)\)', replace_img, body_md)

# Save temporary markdown
with open("temp_article.md", "w") as f:
    f.write(body_md)

# Convert to html body with pandoc
body_html = subprocess.check_output(["pandoc", "temp_article.md", "-f", "markdown", "-t", "html"]).decode("utf-8")
os.remove("temp_article.md")

styled_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  @page {{
    size: letter;
    margin: 20mm 18mm 20mm 18mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.65;
    font-size: 11pt;
  }}
  .article-header {{
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }}
  h1.title {{
    color: #0f172a;
    font-size: 22pt;
    margin: 0 0 10px 0;
    line-height: 1.25;
  }}
  .meta-bar {{
    display: flex;
    gap: 16px;
    font-size: 9.5pt;
    color: #64748b;
    margin-bottom: 14px;
  }}
  .meta-item strong {{
    color: #334155;
  }}
  .excerpt {{
    background-color: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 10.5pt;
    color: #334155;
    font-style: italic;
    margin-top: 10px;
  }}
  h2 {{
    color: #1e3a8a;
    font-size: 14.5pt;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 6px;
    margin-top: 28px;
    page-break-after: avoid;
  }}
  h3 {{
    color: #2563eb;
    font-size: 12pt;
    margin-top: 20px;
    page-break-after: avoid;
  }}
  pre {{
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #3b82f6;
    border-radius: 6px;
    padding: 12px 14px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 9pt;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }}
  code {{
    background-color: #f1f5f9;
    color: #0f172a;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 9.5pt;
    padding: 2px 4px;
    border-radius: 3px;
  }}
  pre code {{
    background-color: transparent;
    padding: 0;
  }}
  img {{
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin: 16px 0 8px 0;
    display: block;
  }}
  p > em {{
    color: #64748b;
    font-size: 9pt;
    display: block;
    text-align: center;
    margin-bottom: 16px;
  }}
  ul, ol {{
    padding-left: 20px;
  }}
  li {{
    margin-bottom: 6px;
  }}
  hr {{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 24px 0;
  }}
</style>
</head>
<body>
  <div class="article-header">
    <h1 class="title">{title}</h1>
    <div class="meta-bar">
      <span class="meta-item"><strong>Author:</strong> {author}</span>
      <span class="meta-item"><strong>Date:</strong> {date}</span>
      <span class="meta-item"><strong>Category:</strong> DevAI Study</span>
    </div>
    <div class="excerpt">
      {excerpt}
    </div>
  </div>
  {body_html}
</body>
</html>
"""

with open("docs/wcs-navigator-deep-dive.html", "w") as f:
    f.write(styled_html)

chrome_cmd = [
    "google-chrome",
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--print-to-pdf=pdf_docs/wcs_navigator_deep_dive_article.pdf",
    "docs/wcs-navigator-deep-dive.html"
]
subprocess.run(chrome_cmd, check=True)
print("Successfully generated pdf_docs/wcs_navigator_deep_dive_article.pdf")
