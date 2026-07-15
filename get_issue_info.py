import json

def get_issue():
    return {
        "title": "fix ci errors",
        "description": """
Fix `node scripts/detect-antipatterns.mjs --count-only` error in `td-cli gh audit-gate`:
It throws `Cannot find module '/__w/tech-dancer/tech-dancer/scripts/detect-antipatterns.mjs'`.
The orchestrator checks if `scripts/detect-antipatterns.mjs` exists, which returns True if checking from a wrong path, but since td-cli isn't always run from the root, we should resolve it via the current working directory, or actually, `td-cli gh audit-gate` uses a custom `run_command` in `handle_audit_gate`.

Wait, earlier I checked `scripts/detect-antipatterns.mjs` does NOT exist in the repo. It's actually under `boomtick-pkg/scripts/detect-antipatterns.mjs`.

Ah! The error log says:
`PYTHONPATH=boomtick-pkg/cli:boomtick-pkg/cli/dev_tools node boomtick-pkg/scripts/detect-antipatterns.mjs`
`✔ No anti-patterns detected!`
`❌ Error: Command failed (exit 1): ['node', 'scripts/detect-antipatterns.mjs', '--count-only']`

Wait, the `run_command` failed! Why is `script_path` equal to `scripts/detect-antipatterns.mjs` when `os.path.exists("scripts/detect-antipatterns.mjs")` is False?
Wait, `run_command(["node", script_path, "--count-only"]) or 0` is executed in `handle_audit_gate`.

But wait, in `handle_audit_gate`:
```python
        script_path = "scripts/detect-antipatterns.mjs"
        if not os.path.exists(script_path):
            script_path = "boomtick-pkg/scripts/detect-antipatterns.mjs"
```
Wait, if `os.path.exists("scripts/detect-antipatterns.mjs")` is False, `script_path` becomes `boomtick-pkg/scripts/detect-antipatterns.mjs`.

Wait, in my test script `os.path.exists("scripts/detect-antipatterns.mjs")` returned False.

Why did it use `scripts/detect-antipatterns.mjs`?
Is there a `scripts/detect-antipatterns.mjs` in the container?
Ah! I have a `scripts/` directory! Let's check `ls -la scripts/detect-antipatterns.mjs`
Earlier I did:
```
$ ls -la scripts/detect-antipatterns.mjs
ls: cannot access 'scripts/detect-antipatterns.mjs': No such file or directory
```

Why did `td-cli gh audit-gate` use `scripts/detect-antipatterns.mjs` in CI?
Maybe `td-cli` isn't using the local `boomtick-pkg` source code, but an installed version of `td-cli` that was bundled earlier or `td-cli` runs from `boomtick-pkg/cli` directly.

Wait, `td-cli gh audit-gate` is run. How is `td-cli` installed in CI?
```yaml
      - name: Install dependencies
        run: |
          pnpm install --frozen-lockfile --engine-strict=false
          if [ -f "requirements-dev.txt" ]; then
            pip install -r requirements-dev.txt --break-system-packages
          fi
          pip install -e boomtick-pkg/cli --break-system-packages
```
It is installed via `pip install -e boomtick-pkg/cli`. So it's using the local source code.
But why did `os.path.exists("scripts/detect-antipatterns.mjs")` return True in CI?
Ah! `scripts/detect-antipatterns.mjs` might have existed in the container before the job, or some action created it?
No. Let's look at the error log.
`❌ Error: Command failed (exit 1): ['node', 'scripts/detect-antipatterns.mjs', '--count-only']`
Wait, if `os.path.exists` returned True, then the script should be there. If it's there, why did `node` fail with `MODULE_NOT_FOUND`?
Because it's looking for `/__w/tech-dancer/tech-dancer/scripts/detect-antipatterns.mjs`.

Let's check if it's a symlink?
"""
    }
print(json.dumps(get_issue()))
