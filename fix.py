import sys

def fix_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()

    new_lines = []
    skip = False
    for line in lines:
        if line.startswith('<<<<<<<'):
            skip = True
        elif line.startswith('======='):
            skip = False
        elif line.startswith('>>>>>>>'):
            pass
        elif not skip:
            new_lines.append(line)

    with open(filename, 'w') as f:
        f.writelines(new_lines)

fix_file('src/features/events/components/CuratedGear.tsx')
fix_file('src/features/events/EventGuide.tsx')
