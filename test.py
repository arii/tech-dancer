import yaml
with open('.github/workflows/auto-conflict-resolver.yml', 'r') as f:
    print(yaml.safe_load(f)['on'])
