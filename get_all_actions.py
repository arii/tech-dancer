import os
import subprocess
import json

def get_major(action_repo):
    try:
        out = subprocess.check_output(['node', '--experimental-strip-types', 'test_versions.js', action_repo], text=True)
        return out.strip()
    except Exception as e:
        return str(e)

with open("test_versions.js", "w") as f:
    f.write("""
import { resolveLatest } from './api/_lib/versions.ts';
const action = process.argv[2];
resolveLatest('gh-action', action).then(version => {
  if (version) {
    const major = version.split('.')[0];
    console.log(major);
  } else {
    console.log('not found');
  }
});
""")

actions_found = set()
for f_name in os.listdir('.github/workflows'):
    if not f_name.endswith('.yml'): continue
    with open(f'.github/workflows/{f_name}') as fp:
        lines = fp.readlines()
        for line in lines:
            if 'uses:' in line:
                parts = line.strip().split('uses:')
                if len(parts) > 1:
                    action_str = parts[1].strip().split('@')[0].strip("'\"")
                    if '/' in action_str and not action_str.startswith('.'):
                        # check if it's not a local path
                        actions_found.add(action_str)

print("Fetching versions...")
results = {}
for a in actions_found:
    v = get_major(a)
    results[a] = v

with open('action_versions.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Done. See action_versions.json")
