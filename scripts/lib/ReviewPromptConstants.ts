export const STRICT_JSON_VERIFICATION = `Strict JSON Verification:
- You MUST self-verify the completeness and validity of the JSON block before finishing your response.
- Every finding MUST have an \`id\`, \`file\`, \`issue\`, and \`status\`.
- Ensure the JSON is well-formed and contained entirely within the \`<findings>\` tags.
- Ensure 'snippet' is a unique string from the diff that identifies the issue.`;

export const SNIPPET_AND_VERIFICATION_RULES = `Snippet and verification rules:
- STRICT SNIPPET RULE: When citing an error or anti-pattern, you MUST quote the entire, exact line from the diff in the "snippet" field. Do not truncate the line.
- Before flagging a "syntax error" or "missing property/method", re-read the diff to confirm the code isn't simply continued on the next line or truncated in the diff chunk. Hallucinating errors due to chunk truncation is a severe failure.
- If a line appears truncated in the diff (e.g. at the edge of a chunk), DO NOT assume it is a syntax error. Assume it is valid code that continues outside the visible context.`;
