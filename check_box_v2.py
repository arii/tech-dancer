import re
import sys

def check_balance(filename):
    with open(filename, 'r') as f:
        content = f.read()

    opening_regex = r'<Box(?:\s+[^>]*?)?(/?)\s*>'
    closing_regex = r'</Box>'

    matches = []
    for m in re.finditer(opening_regex, content, re.DOTALL):
        matches.append((m.start(), 'OPEN' if not m.group(1) else 'SELF'))
    for m in re.finditer(closing_regex, content):
        matches.append((m.start(), 'CLOSE'))

    matches.sort()

    balance = 0
    for pos, type in matches:
        if type == 'OPEN':
            balance += 1
        elif type == 'CLOSE':
            balance -= 1

        line_num = content.count('\n', 0, pos) + 1
        print(f"Line {line_num}: {type} -> New Balance: {balance}")

check_balance(sys.argv[1])
