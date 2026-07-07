import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let constants = {
  STRICT_JSON_VERIFICATION: '',
  SNIPPET_AND_VERIFICATION_RULES: ''
};

try {
  const jsonPath = resolve(__dirname, 'ReviewPromptConstants.json');
  constants = JSON.parse(readFileSync(jsonPath, 'utf8'));
} catch (e) {
  console.warn('Failed to load ReviewPromptConstants.json:', e);
}

export const STRICT_JSON_VERIFICATION = constants.STRICT_JSON_VERIFICATION;
export const SNIPPET_AND_VERIFICATION_RULES = constants.SNIPPET_AND_VERIFICATION_RULES;
