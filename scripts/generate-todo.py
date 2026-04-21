import re
import os

def generate_todo():
    report_path = 'antipattern-report.txt'
    if not os.path.exists(report_path):
        print(f"Error: {report_path} not found.")
        return

    with open(report_path, 'r') as f:
        lines = f.readlines()

    todo_content = "# UI Anti-Pattern TODO List\n\n"
    todo_content += "This list is automatically generated from the `npm run audit` report. Fix these anti-patterns to adhere to the project design system.\n\n"

    current_file = None

    for line in lines:
        line = line.strip()
        if not line or line.startswith('>') or line.startswith('Scanning') or line.startswith('Anti-patterns detected'):
            continue

        # ANSI escape sequences cleanup
        line = re.sub(r'\x1b\[[0-9;]*m', '', line)

        if line.startswith('src/'):
            current_file = line
            todo_content += f"## {current_file}\n"
        elif current_file and line.startswith('Line'):
            # Example: Line 19: [Arbitrary Value] -[0.15em] - Avoid ...
            todo_content += f"- [ ] {line}\n"

    with open('TODO_ANTIPATTERNS.md', 'w') as f:
        f.write(todo_content)

    print("Successfully generated TODO_ANTIPATTERNS.md")

if __name__ == "__main__":
    generate_todo()
