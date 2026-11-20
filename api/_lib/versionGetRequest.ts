import type { VercelRequest, VercelResponse } from '@vercel/node';
import { type Ecosystem, MAX_PARAM_LENGTH } from './versions.js';

const VALID: Ecosystem[] = ['npm', 'node', 'gh-action'];

interface VersionGetParams {
  ecosystem: Ecosystem;
  name?: string;
}

export function prepareVersionGetRequest(req: VercelRequest, res: VercelResponse, requireCandidate: true): (VersionGetParams & {candidate: string}) | null;
export function prepareVersionGetRequest(req: VercelRequest, res: VercelResponse, requireCandidate?: false): VersionGetParams | null;
/** Retain the GET endpoints' shared headers, coercion, and validation order. */
export function prepareVersionGetRequest(req: VercelRequest, res: VercelResponse, requireCandidate = false): (VersionGetParams & {candidate?: string}) | null {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  if (req.method === 'OPTIONS') { res.status(204).end(); return null; }
  if (req.method !== 'GET') { res.status(405).json({error: 'GET only'}); return null; }

  const ecosystem = String(req.query.ecosystem ?? '') as Ecosystem;
  const name = req.query.name ? String(req.query.name) : undefined;
  const candidate = requireCandidate && req.query.candidate ? String(req.query.candidate) : undefined;
  let error: string | undefined;
  if (!VALID.includes(ecosystem)) {
    error = `ecosystem must be one of: ${VALID.join(', ')}`;
  } else if (requireCandidate && !candidate) {
    error = 'candidate is required, e.g. candidate=v4';
  } else if (candidate && candidate.length > MAX_PARAM_LENGTH) {
    error = `candidate must be ${MAX_PARAM_LENGTH} characters or fewer`;
  } else if (name && name.length > MAX_PARAM_LENGTH) {
    error = `name must be ${MAX_PARAM_LENGTH} characters or fewer`;
  } else if (ecosystem !== 'node' && !name) {
    error = `name is required for ecosystem=${ecosystem}`;
  }
  if (error) { res.status(400).json({error}); return null; }
  return {ecosystem, name, ...(requireCandidate ? {candidate} : {})};
}
