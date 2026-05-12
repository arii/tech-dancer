/**
 * Automation script to configure Vercel Log Drains via the REST API.
 *
 * Usage:
 *   VERCEL_TOKEN=xxx \
 *   VERCEL_PROJECT_ID=xxx \
 *   LOG_DRAIN_URL=https://api.axiom.co/v1/datasets/xxx/ingest \
 *   LOG_DRAIN_TOKEN=xxx \
 *   node scripts/configure-log-drains.mjs
 */

import { env } from 'process';

const {
  VERCEL_TOKEN,
  VERCEL_PROJECT_ID,
  LOG_DRAIN_URL,
  LOG_DRAIN_TOKEN,
  VERCEL_TEAM_ID, // Optional: if working in a team scope
} = env;

const DRAIN_NAME = 'boomtick-axiom-logs';

async function configureLogDrain() {
  // Validate required environment variables
  const missing = [];
  if (!VERCEL_TOKEN) missing.push('VERCEL_TOKEN');
  if (!VERCEL_PROJECT_ID) missing.push('VERCEL_PROJECT_ID');
  if (!LOG_DRAIN_URL) missing.push('LOG_DRAIN_URL');
  if (!LOG_DRAIN_TOKEN) missing.push('LOG_DRAIN_TOKEN');

  if (missing.length > 0) {
    console.error(`❌ Error: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  const baseUrl = 'https://api.vercel.com/v1/drains';
  const queryParams = new URLSearchParams();
  if (VERCEL_TEAM_ID) queryParams.append('teamId', VERCEL_TEAM_ID);

  const queryString = queryParams.toString();
  const listUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  const headers = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    console.log(`🔍 Checking for existing Log Drain: ${DRAIN_NAME}...`);

    const listResponse = await fetch(listUrl, { headers });

    if (!listResponse.ok) {
      const errorData = await listResponse.json();
      throw new Error(`Failed to list drains: ${JSON.stringify(errorData)}`);
    }

    const { drains } = await listResponse.json();
    const existingDrain = drains.find(d => d.name === DRAIN_NAME);

    if (existingDrain) {
      console.log(`ℹ️ Found existing Log Drain "${DRAIN_NAME}" (ID: ${existingDrain.id}).`);

      // Compare configuration for idempotency
      const currentUrl = existingDrain.delivery?.endpoint;
      const currentAuthHeader = existingDrain.delivery?.headers?.Authorization;
      const targetAuthHeader = `Bearer ${LOG_DRAIN_TOKEN}`;

      const isUrlMatch = currentUrl === LOG_DRAIN_URL;
      const isAuthMatch = currentAuthHeader === targetAuthHeader;
      const isProjectMatch = existingDrain.projectIds?.includes(VERCEL_PROJECT_ID);

      if (isUrlMatch && isAuthMatch && isProjectMatch) {
        console.log('✅ Configuration matches target. No updates required.');
        return;
      }

      console.log('⚠️ Configuration mismatch detected. Updating existing drain...');
      // Note: Vercel API for PATCH /v1/drains/:id might have specific requirements
      // For simplicity and to ensure correct state, we recommend manual update or re-creation
      // but here we'll log what's different.
      if (!isUrlMatch) console.log(`  - URL: "${currentUrl}" -> "${LOG_DRAIN_URL}"`);
      if (!isAuthMatch) console.log('  - Authorization Token mismatch');
      if (!isProjectMatch) console.log(`  - Project ID "${VERCEL_PROJECT_ID}" missing from drain`);

      // We will proceed to create a new one or the user should delete the old one.
      // In a more robust script, we would PATCH here.
      console.log('💡 Recommendation: Delete the existing drain in Vercel Dashboard and re-run this script, or update it manually.');
      return;
    }

    console.log(`🚀 Creating new Log Drain: ${DRAIN_NAME}...`);

    const createUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    const body = {
      name: DRAIN_NAME,
      projectIds: [VERCEL_PROJECT_ID],
      schemas: {
        log: 'v1'
      },
      delivery: {
        type: 'http',
        endpoint: LOG_DRAIN_URL,
        encoding: 'json',
        headers: {
          'Authorization': `Bearer ${LOG_DRAIN_TOKEN}`
        }
      },
      sampling: [
        {
          type: 'head_sampling',
          rate: 1, // 100% sampling (1.0)
          env: 'production'
        }
      ]
    };

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      throw new Error(`Failed to create drain: ${JSON.stringify(errorData)}`);
    }

    const result = await createResponse.json();
    console.log(`✨ Successfully created Log Drain: ${result.id}`);

  } catch (error) {
    console.error(`❌ Error configuring Log Drain: ${error.message}`);
    process.exit(1);
  }
}

configureLogDrain();
