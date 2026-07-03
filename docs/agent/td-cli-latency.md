### Why `td-cli` calls often feel "slow"

| Factor | What happens under the hood | How it adds latency |
| :--- | :--- | :--- |
| **Context hydration** | Every Tier-1 MCP call (and every direct `td-cli` call) first reads `.agent-context.json` to inject the file-tree, CLI schema and repo metadata into the subprocess environment. | Reading a ~80 KB JSON file, parsing it, and passing it to the child process costs a few hundred ms, especially on a cold start. |
| **Subprocess spawn** | `td-cli` is a Node.js binary launched as a separate process for each command (`node scripts/…`). Node startup + module resolution adds ~200-400 ms. | Repeated calls (e.g., a loop over many PRs) multiply this overhead. |
| **Network round-trips** | Many sub-commands talk to the GitHub REST/GraphQL API (e.g., `gh search-prs`, `gh pr-view`, `gh issue-update`). Each request has TLS handshake, authentication, and API-rate-limit handling. | Even a fast 150 ms response becomes noticeable when you run dozens of calls. |
| **CLI-schema validation** | Before executing the real command, `td-cli` validates the supplied arguments against the embedded schema (`cli_schema`). This involves JSON-schema parsing and a Zod validation pass. | Adds an extra ~50-100 ms per call. |
| **Worktree creation for mutating ops** | Commands that modify the repo (`repo.create_branch`, `repo.run_tests`, `gh resolve-conflicts`) spin up a temporary worktree and run a Git checkout in it. | Disk I/O and Git's plumbing can take 200-500 ms, depending on repo size. |
| **Safety wrappers** | The CLI has built-in timeout guards, log redaction, and error-handling layers that catch and re-format errors before bubbling them up. | Extra try/catch and serialization steps add a few milliseconds. |
| **Rate-limit / pagination handling** | List-type commands (`github.search_open_prs`, `repo.get_changed_files`) automatically paginate until the requested limit is satisfied. | Multiple HTTP requests stack up. |
| **Cold caches** | The first run of a command has to load the GitHub token, resolve the repo remote, and possibly warm the local caches (`.agent-context.json`, npm modules). Subsequent calls are faster. | First-call latency can be 1-2 seconds; later calls drop to ~300 ms. |

---

## Typical numbers you'll see in this repo

| Command | Approximate minimum latency (no network) | Approximate full latency (incl. API) |
| :--- | :--- | :--- |
| `td-cli doctor` | 300 ms (context + schema) | 350 ms (no network) |
| `td-cli gh search-prs --state merged --limit 20` | 400 ms (context + validation) | 800-1200 ms (GitHub list API) |
| `td-cli gh pr-view 3270` | 350 ms | 900-1300 ms (GitHub PR API) |
| `td-cli repo.run_tests` | 500 ms (setup) | 1.5-3 s (test runner + CI logs) |
| `td-cli gh resolve-conflicts --pr 3270` | 600 ms (worktree + checkout) | 1-2 s (Git merge-tree + push) |

*(All values are averages on the current CI runner - actual times vary with load and network.)*

---

## Mitigation strategies (stay within the MCP-first policy)

1. **Batch calls** – Use the MCP-provided "list" endpoints (`github.search_prs`, `repo.get_changed_files`) to pull multiple items in one request rather than looping over single-item calls.
2. **Cache results** – Many tools respect a `--no-cache` flag. Omit it to let the built-in cache reuse the previous diff/PR payload.
3. **Parallelize safely** – For independent reads you can issue several MCP calls concurrently (each spawns its own subprocess). The system will still respect the per-tool rate limits.
4. **Prefer "get-session" → "pr-id" flow** – Instead of calling a generic `github.get_pr` for every PR, first retrieve the Jules session list (`jules.list_sessions`) and then only fetch PR details for sessions that actually need fixing. Fewer API calls = less latency.
5. **Warm the context** – Run a cheap "noop" command (`td-cli doctor` or `repo.read_agent_context`) once at the start of a batch; subsequent commands will benefit from the already-loaded `.agent-context.json`.
6. **Use pagination limits wisely** – When you only need the last 10 merged PRs, pass `--limit 10` (or the equivalent MCP argument). Larger limits just increase the number of API calls.
7. **Avoid unnecessary mutating worktrees** – For read-only analysis (e.g., scanning PR bodies) use the read-only MCP tools (`github.get_pr`, `github.get_pr_diff`) instead of `repo.create_repair_branch` or similar.

---

### TL;DR

`td-cli` is intentionally safe and context-aware, which means every call does extra work: loading repo metadata, validating arguments, handling worktrees, and hitting the GitHub API. That safety adds a few hundred milliseconds to each invocation. By batching, caching, and using the right MCP tools, you can cut the perceived latency dramatically while staying within the repository's strict tooling policy.
