#!/usr/bin/env python3
import json,re,sys
def parse_diff_into_hunks(diff_text:str)->list[dict]:
    hunks=[]; current_file=None; current_hunk=None
    for line in diff_text.splitlines():
        if line.startswith('+++ b/'): current_file=line[6:]
        elif line.startswith('@@ '):
            m=re.search(r'\+(\d+)(?:,(\d+))?',line)
            if m:
                current_hunk={"file":current_file,"start_line":int(m.group(1)),"added":[],"removed":[],"context":[]}
                hunks.append(current_hunk)
        elif current_hunk:
            if line.startswith('+') and not line.startswith('+++'): current_hunk['added'].append(line[1:])
            elif line.startswith('-') and not line.startswith('---'): current_hunk['removed'].append(line[1:])
            else: current_hunk['context'].append(line)
    return hunks
def extract_review_signals(hunks:list[dict])->dict:
    signals={k:[] for k in ['inline_styles','arbitrary_tailwind','missing_types','unnecessary_react_import','div_with_flex','large_hunks']}
    for h in hunks:
        for line in h['added']:
            if 'style={{' in line: signals['inline_styles'].append({'file':h['file'],'snippet':line.strip()})
            if re.search(r'-\[\d+px\]', line): signals['arbitrary_tailwind'].append({'file':h['file'],'snippet':line.strip()})
            if "import React from 'react'" in line: signals['unnecessary_react_import'].append({'file':h['file'],'snippet':line.strip()})
            if re.search(r'<div[^>]*className="[^"]*flex[^"]*"',line): signals['div_with_flex'].append({'file':h['file'],'snippet':line.strip()})
            if ': any' in line or 'as any' in line: signals['missing_types'].append({'file':h['file'],'snippet':line.strip()})
        if len(h['added'])>50: signals['large_hunks'].append({'file':h['file'],'added_lines':len(h['added'])})
    return {k:v for k,v in signals.items() if v}
if __name__=='__main__':
    h=parse_diff_into_hunks(sys.stdin.read()); print(json.dumps({'hunk_count':len(h),'signals':extract_review_signals(h)},indent=2))
