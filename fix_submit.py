import re

with open('dev-tools/submit_pr_review_data.py', 'r') as f:
    content = f.read()

payload_def = """        payload = {
            "event": "COMMENT",
            "body": overall_body,
            "comments": inline_comments
        }
        json.dump(payload, f, indent=2)"""

content = content.replace("with open(payload_path, \"w\") as f:\n        payload = {\n            \"event\": \"COMMENT\",\n            \"body\": overall_body,\n            \"comments\": inline_comments\n        }\n    json.dump(payload, f, indent=2)\n    print(f\"✅ Payload written: {payload_path}\")", f"with open(payload_path, \"w\") as f:\n{payload_def}\n    print(f\"✅ Payload written: {{payload_path}}\")")

# Actually let's just do it simpler
lines = []
with open('dev-tools/submit_pr_review_data.py', 'r') as f:
    for line in f:
        lines.append(line)

new_lines = []
for line in lines:
    if line.strip() == "payload = {":
        new_lines.append("        payload = {\n")
    elif line.strip() == "\"event\": \"COMMENT\",":
        new_lines.append("            \"event\": \"COMMENT\",\n")
    elif line.strip() == "\"body\": overall_body,":
        new_lines.append("            \"body\": overall_body,\n")
    elif line.strip() == "\"comments\": inline_comments":
        new_lines.append("            \"comments\": inline_comments\n")
    elif line.strip() == "}":
        new_lines.append("        }\n")
    elif line.strip() == "json.dump(payload, f, indent=2)":
        new_lines.append("        json.dump(payload, f, indent=2)\n")
    else:
        new_lines.append(line)

with open('dev-tools/submit_pr_review_data.py', 'w') as f:
    f.writelines(new_lines)
