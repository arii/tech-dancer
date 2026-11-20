# BoomTick

[BoomTick.blog](https://boomtick.blog) is a Vite-powered React and TypeScript site with dance articles, gear guides, services and research tools, including WCS Navigator. Application code lives in `src/`, articles in `content/posts/`, static assets in `public/` and serverless endpoints in `api/`.

Developer automation is maintained separately in [arii/boomtick](https://github.com/arii/boomtick). This checkout does not contain a `boomtick-pkg` submodule.

## Local development

Use **Node.js 24.16.0** and **pnpm 10.28.2**. The pinned Node version is in `.node-version` and `.nvmrc`; `package.json` requires Node 24.x and pnpm 10.28.2. `.npmrc` enforces engine compatibility.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server listens at `http://localhost:3000`. To configure optional integrations, copy `.env.example` to `.env.local` and set only the values you need. Never commit credentials. Variables prefixed with `VITE_` are exposed to the browser and must not contain secrets.

Important optional settings:

- `VITE_APP_URL`: site URL used by the application.
- `VITE_WCS_API_URL`: WCS Navigator gateway. Failed discovery can fall back to a local synthesized schedule, not a verified extraction.
- `VITE_MAILING_LIST_DEPLOYMENT_ID` and `VITE_CALENDAR_BOOKING_URL`: mailing-list and consultation integrations.
- `INDEXNOW_KEY` / `VITE_INDEXNOW_KEY`: optional IndexNow verification generation. Empty values skip key-file generation.
- `VITE_ADSENSE_CLIENT` and `VITE_ADSENSE_SLOT_*`: publisher and per-placement ad unit IDs. An empty client disables the ad loader; an invalid or empty slot ID renders no ad unit. The example file includes a publisher client, so clear it for an ads-disabled local configuration. See `.env.example` for the consent behavior and all settings.

`pnpm install` also attempts a `td doctor` preflight and runs the Python dependency-sync script. `SKIP_BOOMTICK_PKG=true` skips those optional automation hooks; it does not relax the Node/pnpm engines requirement.

## Build and checks

```bash
pnpm build
pnpm preview
pnpm test
pnpm type-check
pnpm lint
```

The production build goes to `dist/`. The preview command uses Vite's preview server, normally `http://localhost:4173`. Its prepreview hook terminates processes listening on ports 4173 and 4174, so check those ports before starting it. Build lifecycle scripts generate assets, SPA route stubs, sitemap updates, merchant feeds and optional IndexNow/ads files.

`pnpm type-check` enforces the checked-in TypeScript error baseline rather than promising zero existing errors. `pnpm lint` includes JavaScript/TypeScript checks and Python linting; the Python checks need their own dependencies. `pnpm ci:local` additionally runs anti-pattern, dead-code, Semgrep and duplication audits and requires those tools to be available.

For browser tests, install Chromium first:

```bash
pnpm setup:playwright
pnpm test:e2e
```

Use `pnpm test:e2e:targeted` when you need the unfiltered Playwright suite. See `package.json` for the exact commands and default exclusions. CI configuration lives in `.github/workflows/`; it adds security, audit and workflow checks beyond the local unit tests.

## Optional developer automation

The standalone `boomtick-cli` package provides `td`; it is not part of the site source tree. To install it into an activated Python environment:

```bash
python -m pip install --upgrade boomtick-cli
td doctor
td preflight
```

See the [Boomtick onboarding guide](https://github.com/arii/boomtick/blob/main/docs/onboarding.md) for supported runtime requirements and the separate `@arii/boomtick-mcp` server. This repository's `setup-agent.sh` installs the CLI, registers MCP integrations, runs `td doctor` and primes repository context; review it before running because it changes the local automation environment.

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md): contribution notes. References to the former `boomtick-pkg` layout belong to the standalone repository, not this checkout.
- [AGENTS.md](AGENTS.md): project coding conventions and runtime notes.
- [.env.example](.env.example): optional integration settings.

Setup and command references verified against repository source on November 20, 2026. This date records a documentation check, not a claim that every integration or CI job is healthy.

## License

[Apache License 2.0](LICENSE).
