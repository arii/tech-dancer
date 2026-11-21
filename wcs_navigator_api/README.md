# WCS Navigator API

FastAPI service for schedule discovery and calendar generation. The React
client is in `src/features/wcs-navigator/` in the repository root.

## Current routes

- `POST /api/v1/discover`: discover schedule information from a URL or
  uploaded document and return questionnaire data.
- `POST /api/v1/generate`: combine the document and questionnaire responses
  into a schedule, decision trace and calendar output.
- `GET /health`, `/ready` and `/api/v1/health`: service health responses.

Compatibility aliases are defined in `routes/discover.py` and
`routes/generate.py`. There is no `/api/v1/wcs/` prefix in those routers.
The request/response models live in `models/`; frontend contracts live in
`src/features/wcs-navigator/types.ts` and `types/`.

## Local API

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r wcs_navigator_api/requirements.txt
cp wcs_navigator_api/.env.example wcs_navigator_api/.env
```

Set credentials in that untracked environment file or your shell, never in
Git. `config.py` reads `.env` relative to the process working directory.
Run from the API directory to use the file above:

```bash
cd wcs_navigator_api
PYTHONPATH=.. python -m uvicorn wcs_navigator_api.main:app --host 127.0.0.1 --port 8080 --reload
```

`GEMINI_API_KEY` supplies an explicit Gemini key. Without it, the code asks
the Google client to use its ambient configuration; that does not prove
credentials are available. `GEMINI_MODEL` defaults in source to
`gemini-3.5-flash`. This is a configured identifier, not a claim that the
model is currently available to your account. Extraction requests can incur
provider charges. `ALLOWED_ORIGINS` accepts a JSON list; localhost origins
are also allowed by the CORS middleware. The command's `--port`, not the
settings field alone, selects the listening port.

There is no separate `requirements-dev.txt` in this directory; the checked-in
requirements already include pytest and pytest-asyncio.

## Local frontend

Use the root README's Node/pnpm setup. Vite embeds `VITE_*` values at build
time, so set the API URL before building, not only before previewing:

```bash
VITE_WCS_API_URL=http://localhost:8080 pnpm build
pnpm preview
```

Alternatively, set `VITE_WCS_API_URL` in the root `.env.local` before
`pnpm dev`. Set only the service origin, without `/api/v1`; the client adds
`/api/v1/discover` or `/api/v1/generate`. Never put a provider secret in a
`VITE_*` variable. Failed live discovery can return client heuristics;
that fallback is not evidence of a successful API extraction.

## Container and deployment

From the repository root, build with the API directory as context:

```bash
docker build -t wcs-navigator-api wcs_navigator_api/
docker run --rm -p 127.0.0.1:8080:8080 --env-file wcs_navigator_api/.env wcs-navigator-api
```

The Dockerfile runs Uvicorn on port 8080. The
[image workflow](../.github/workflows/deploy-image.yml) builds/pushes GHCR
images on matching main changes or manual dispatch. It does not contain a
Cloud Run rollout step. Image publication alone is not proof that Cloud Run
has deployed the image.

`deploy.sh` is a separate manual Cloud Run deployment path using `gcloud run
deploy --source .`. It changes cloud resources, allows unauthenticated
access and passes configured provider credentials. Review the script,
project, region and service settings before any authorized deployment.
No deployment, live provider call or credential test was performed for this
documentation check.

## Tests

From the repository root in the Python environment:

```bash
python -m pytest wcs_navigator_api/tests
```

Source/command references checked November 21, 2026. This records a source
check, not a fresh installation, successful provider extraction or live
service-health check.
