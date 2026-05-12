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
  if (!VERCEL_TOKEN || !LOG_DRAIN_URL || !LOG_DRAIN_TOKEN) {
    console.error('❌ Error: Missing required environment variables.');
    console.error('Required: VERCEL_TOKEN, LOG_DRAIN_URL, LOG_DRAIN_TOKEN');
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
      console.log(`✅ Log Drain "${DRAIN_NAME}" already exists (ID: ${existingDrain.id}).`);
      console.log('Skipping creation.');
      return;
    }

    console.log(`🚀 Creating new Log Drain: ${DRAIN_NAME}...`);

    const createUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    const body = {
      name: DRAIN_NAME,
      projectIds: VERCEL_PROJECT_ID ? [VERCEL_PROJECT_ID] : [],
      schemas: {
        log: 'v1' // Current version for log schema
      },
      delivery: {
        type: 'http',
        endpoint: LOG_DRAIN_URL,
        encoding: 'json',
        headers: {
          'Authorization': `Bearer ${LOG_DRAIN_TOKEN}`
        }
      },
      // Default environments: Production
      sampling: [
        {
          type: 'head_sampling',
          rate: 100,
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
