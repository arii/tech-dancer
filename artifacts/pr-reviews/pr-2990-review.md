## PR Review

**Summary:** This PR updates the default AI models across the application to prioritize `gemini-2.5-flash-lite`. It also updates the Python HTTP requests to Gemini to use the `x-goog-api-key` header rather than passing the API key in the URL.

**Findings:**
- **Model Selection:** The changes successfully default to the `lite` tier, specifically `gemini-2.5-flash-lite`, across Python services (`ai_service.py`, `utils.py`), TypeScript scripts (`geminiModelPicker.ts`, `geminiCodeReviewClient.ts`), and the frontend `useUXAuditor.ts`. This aligns perfectly with the repository's constraint to minimize costs using the lite models.
- **Security Posture:** In `ai_service.py` and `useUXAuditor.ts`, moving the Gemini API key from the query string (`?key=...`) to the HTTP header (`x-goog-api-key`) resolves a security concern where sensitive credentials could be exposed in request URLs/logs, strictly adhering to the repository's convention.
- **Testing:** All CI checks, including deployment impact analysis, build, and linters, passed successfully. The model fallbacks are correctly implemented based on token estimations.

**Recommendation:** Approved. The changes effectively implement the cost-saving directive by defaulting to Flash Lite and improve security by properly passing API keys via headers.
