# WCS Navigator API

Backend service for WCS Navigator, built with FastAPI. It handles parsing event URLs, communicating with the Gemini API to discover schedule data, and generating an 'Explainability First' flight buffer timeline and personalized `.ics` schedule.

## Features & Services

The WCS Navigator API consists of two primary services (endpoints):

- **Stage 1: Discover (`/api/v1/wcs/discover`)**: Pre-scans a given event URL to determine available tracks and generate a dynamic context-aware questionnaire.
- **Stage 2: Generate (`/api/v1/wcs/generate`)**: Processes the event URL and user's questionnaire responses to extract schedule data, compute flight buffer timelines, audit sessions, and output a personalized `.ics` file along with an agent decision trace.
- **Explainability First**: The agent decision trace details why every session was included or filtered, and breaks down flight buffer mathematical formulas step-by-step.

We utilize Google's **Gemini 3.5+ models** (specifically `gemini-3.5-flash` by default) to perform the intelligent extraction and reasoning required for schedule parsing and analysis.

## Local Development & Configuration

To run the API locally along with the frontend using `vite preview`:

### Environment Variables

Create a `.env` file in the `wcs_navigator_api` directory (you can use `.env.example` as a template):

```env
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGINS=["http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:4173", "https://boomtick.blog"]
PORT=8080
```

### Running the Services

**Backend (API):**

```bash
# Navigate to the API directory
cd wcs_navigator_api

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt # Optional, for testing

# Run the API locally (Ensure you are in the wcs_navigator_api directory)
PYTHONPATH=.. uvicorn wcs_navigator_api.main:app --host 0.0.0.0 --port 8080 --reload
```

**Frontend (Vite Preview):**

From the root of the repository, build and start the frontend using `vite preview`. Ensure the base path is set:

```bash
# Build the frontend
pnpm run build

# Start the preview server pointing to the local API
VITE_BASE_PATH=/ pnpm run preview
```

*Note: Ensure your frontend is configured to make requests to `http://localhost:8080` or wherever your API is running.*

## Running with Docker

You can easily run the WCS Navigator API using Docker. The multi-stage Dockerfile ensures a lightweight runtime container.

```bash
# Build the Docker image
docker build -t wcs-navigator-api wcs_navigator_api/

# Run the Docker container
docker run -p 8080:8080 \
  -e GEMINI_API_KEY="your_gemini_api_key_here" \
  -e ALLOWED_ORIGINS='["http://localhost:5173", "http://127.0.0.1:4173"]' \
  wcs-navigator-api
```

## Deployment via Google Cloud Run

We have configured the application to work seamlessly with **Google Cloud Run**, as it provides an easy and serverless way to run Docker containers.

Our GitHub Actions CI/CD pipeline automatically builds the Docker container and releases it. Cloud Run is then configured to pull and deploy the container using the latest tag.

If you wish to deploy it yourself using the provided deployment script:

```bash
cd wcs_navigator_api

# Ensure you are authenticated and have gcloud installed
gcloud auth login

# Set your Gemini API key in your shell environment
export GEMINI_API_KEY="your_gemini_api_key_here"

# Deploy using the script
./deploy.sh
```

## Testing

To run the backend Pytest suite, validating contract schemas, buffer math, and event fixtures:

```bash
# From the repository root
python3 -m pytest wcs_navigator_api/tests
```

## Contract Consistency

The API strictly adheres to type parity with the frontend TypeScript contracts in `src/features/wcs-navigator/types.ts`.
