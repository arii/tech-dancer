import subprocess
print(subprocess.run(["node", "scripts/detect-antipatterns.mjs", "--count-only"], capture_output=True, text=True).stderr)
