import re
import sys

def check_balance(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Match <Box ... >, <Box ... />, </Box>
    # Using a more robust regex for React tags
    tags = re.findall(r'<Box(?:\s+[^/>]*)?(/?)>|</Box>', content)

    balance = 0
    for i, tag in enumerate(tags):
        if tag == '': # <Box>
            balance += 1
        elif tag == '/': # <Box ... />
            pass
        else: # </Box> (the regex actually returns None for the second part if not matched)
            pass

    # Re-doing the regex to be clearer
    all_box_tags = re.finditer(r'(<Box(?:\s+[^/>]*)?(/?)>)|(</Box>)', content)
    balance = 0
    for match in all_box_tags:
        if match.group(3): # </Box>
            balance -= 1
        elif match.group(2) == '/': # <Box ... />
            pass
        else: # <Box ... >
            balance += 1

        # Get line number
        line_num = content.count('\n', 0, match.start()) + 1
        print(f"Line {line_num}: {match.group(0)} -> New Balance: {balance}")

check_balance(sys.argv[1])
