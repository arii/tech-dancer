# Boomtick MCP Tool Contracts

All tools return JSON-shaped data in MCP tool content and `structuredContent`.

## `boomtick.health`

Returns configured repo path, owner, repo, base branch, base path, and safety mode flags. It must not run shell commands or touch GitHub.

## `github.search_open_prs`

Inputs:

```ts
{
  state?: "open" | "closed" | "all";
  includeDrafts?: boolean;
  maxResults?: number;
  labels?: string[];
}
```

Output:

```ts
{
  success: boolean;
  data?: { prs: Array<NormalizedPr> };
  error?: { code: string; message: string; details?: unknown };
}
```

## `repo.get_package_scripts`

Returns `package.json` path and its `scripts` object so agents can choose validation commands from repo evidence.
