import subprocess
import os

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WCS Navigator API Technical Documentation</title>
<style>
  @page {
    size: letter;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {
      content: counter(page);
    }
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 11pt;
    padding: 0 10px;
  }
  h1 {
    color: #0f172a;
    font-size: 20pt;
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 8px;
    margin-top: 0;
  }
  h2 {
    color: #1e3a8a;
    font-size: 14pt;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
    margin-top: 24px;
  }
  h3 {
    color: #2563eb;
    font-size: 12pt;
    margin-top: 18px;
  }
  h4 {
    color: #475569;
    font-size: 11pt;
    margin-top: 12px;
  }
  pre {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #3b82f6;
    border-radius: 4px;
    padding: 10px 14px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 9pt;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
  code {
    background-color: #f1f5f9;
    color: #0f172a;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 9.5pt;
    padding: 2px 4px;
    border-radius: 3px;
  }
  pre code {
    background-color: transparent;
    padding: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #cbd5e1;
    padding: 8px 10px;
    text-align: left;
  }
  th {
    background-color: #f1f5f9;
    color: #0f172a;
    font-weight: 600;
  }
  tr:nth-child(even) td {
    background-color: #f8fafc;
  }
  blockquote {
    border-left: 4px solid #94a3b8;
    margin: 12px 0;
    padding: 6px 14px;
    color: #475569;
    background-color: #f8fafc;
  }
  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 20px 0;
  }
</style>
</head>
<body>
"""

# Convert markdown body to html using pandoc
cmd = ["pandoc", "docs/wcs-navigator-api-docs.md", "-f", "markdown", "-t", "html"]
body_html = subprocess.check_output(cmd).decode("utf-8")

full_html = html_template + body_html + "</body></html>"
with open("docs/wcs-navigator-api-docs-styled.html", "w") as f:
    f.write(full_html)

# Render to PDF using headless Chrome
chrome_cmd = [
    "google-chrome",
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--print-to-pdf=pdf_docs/wcs_navigator_api_documentation.pdf",
    "docs/wcs-navigator-api-docs-styled.html"
]
subprocess.run(chrome_cmd, check=True)
print("Successfully generated pdf_docs/wcs_navigator_api_documentation.pdf")
