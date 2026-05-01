import os
import re
import subprocess
from typing import Optional

AUDIT_CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx']

AUDIT_CONFIG = {
    'allowedColors': [
        'bg', 'surface', 'accent', 'accent-brand', 'accent-navy',
        'text-main', 'text-body', 'text-dim', 'line', 'white', 'black',
        'transparent', 'current', 'yellow-400', 'emerald-500', 'red-500',
        'amber-500', 'success', 'error', 'warning'
    ],
    'allowedTextUtils': ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic'],
    'allowedTextSizes': ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    'rules': [
        {
            'name': 'Arbitrary Value',
            'pattern': r'-\[.*?\]',
            'message': 'Avoid arbitrary values like -[...]. Use design tokens instead.'
        },
        {
            'name': 'Raw Layout/Spacing',
            'pattern': r'\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b',
            'isClassNameRule': True,
            'message': 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
        },
        {
            'name': 'div Layout',
            'pattern': r'<div\s+[^>]*?className=["\'](.*?(?:flex|grid|p-|m-|gap-).*?)["\']',
            'message': 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
        }
      ]
}

AUDIT_LAYOUT_SUGGESTIONS = {
    'flex flex-col': '<Stack direction="col">',
    'flex flex-row': '<Stack direction="row">',
    'flex items-center': '<Stack align="center">',
    'flex justify-between': '<Stack justify="between">',
    'grid grid-cols': '<Grid cols={...}>',
}

def get_violations_count(content: str, filepath: str) -> int:
    if '// impeccable-ignore-file' in content:
        return 0

    lines = content.split('\n')
    violations_count = 0

    # 1. Check for regex patterns defined in rules
    for rule in AUDIT_CONFIG['rules']:
        if rule.get('isClassNameRule'):
            continue

        pattern = rule['pattern']
        for match in re.finditer(pattern, content):
            line_num = content.count('\n', 0, match.start()) + 1
            if line_num <= len(lines) and '// impeccable-ignore' in lines[line_num - 1]:
                continue
            violations_count += 1

    # 2. Check for classes in className
    class_name_regex = r'className=["\'](.*?)["\']'
    for match in re.finditer(class_name_regex, content):
        line_num = content.count('\n', 0, match.start()) + 1
        if line_num <= len(lines) and '// impeccable-ignore' in lines[line_num - 1]:
            continue

        class_str = match.group(1)
        classes = class_str.split()

        layout_rule = next(r for r in AUDIT_CONFIG['rules'] if r['name'] == 'Raw Layout/Spacing')

        for cls in classes:
            # Check against Raw Layout/Spacing rule
            if re.search(layout_rule['pattern'], cls):
                violations_count += 1

            # Colors check
            if re.search(r'\b(bg-|text-)\b', cls):
                color_match = re.search(r'\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b', cls)
                if color_match:
                    base_color = color_match.group(2).split('/')[0]
                    full_token = f"{color_match.group(1)}-{base_color}"

                    is_allowed = (base_color in AUDIT_CONFIG['allowedColors'] or
                                  full_token in AUDIT_CONFIG['allowedColors'] or
                                  base_color in AUDIT_CONFIG['allowedTextUtils'] or
                                  base_color in AUDIT_CONFIG['allowedTextSizes'])

                    if not is_allowed:
                        violations_count += 1

        for pattern, suggestion in AUDIT_LAYOUT_SUGGESTIONS.items():
            if pattern in class_str:
                violations_count += 1
                break

    return violations_count

def get_audit_baseline_count() -> int:
    baseline_count = 0
    try:
        # Get files from origin/main
        ls_cmd = ["git", "ls-tree", "-r", "origin/main", "--name-only"]
        main_files = subprocess.check_output(ls_cmd, text=True, stderr=subprocess.DEVNULL).splitlines()

        relevant_main_files = []
        for mf in main_files:
            if not mf.endswith('.tsx'):
                continue
            for check_dir in AUDIT_CHECK_DIRS:
                if mf == check_dir or mf.startswith(check_dir + '/'):
                    relevant_main_files.append(mf)
                    break

        for mf in relevant_main_files:
            try:
                show_cmd = ["git", "show", f"origin/main:{mf}"]
                content = subprocess.check_output(show_cmd, text=True, stderr=subprocess.DEVNULL)
                baseline_count += get_violations_count(content, mf)
            except subprocess.CalledProcessError:
                continue
    except subprocess.CalledProcessError:
        pass
    return baseline_count
