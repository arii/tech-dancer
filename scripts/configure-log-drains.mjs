/**
 * Automation script to configure Vercel Log Drains via the REST API.
 *
 * Uses the Vercel Drains API (v1/drains) which supports PATCH for updates.
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
  const urlWithTeam = (url) => queryString ? `${url}?${queryString}` : url;

  const headers = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const targetHeaders = {
    'Authorization': `Bearer ${LOG_DRAIN_TOKEN}`
  };

  try {
    console.log(`🔍 Checking for existing Log Drain: ${DRAIN_NAME}...`);

    const listResponse = await fetch(urlWithTeam(baseUrl), { headers });

    if (!listResponse.ok) {
      const errorData = await listResponse.json().catch(() => ({}));
      throw new Error(`Failed to list drains: ${listResponse.status} ${JSON.stringify(errorData)}`);
    }

    const { drains } = await listResponse.json();
    const existingDrain = drains.find(d => d.name === DRAIN_NAME);

    if (existingDrain) {
      console.log(`ℹ️ Found existing Log Drain "${DRAIN_NAME}" (ID: ${existingDrain.id}).`);

      // Compare configuration for idempotency
      const currentUrl = existingDrain.delivery?.endpoint;
      const currentHeaders = existingDrain.delivery?.headers || {};
      const currentProjectIds = existingDrain.projectIds || [];

      const sortObject = (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        return Object.keys(obj).sort().reduce((acc, key) => {
          acc[key] = sortObject(obj[key]);
          return acc;
        }, {});
      };

      const isUrlMatch = currentUrl === LOG_DRAIN_URL;
      const isHeadersMatch = JSON.stringify(sortObject(currentHeaders)) === JSON.stringify(sortObject(targetHeaders));
      const isProjectMatch = currentProjectIds.includes(VERCEL_PROJECT_ID);

      if (isUrlMatch && isHeadersMatch && isProjectMatch) {
        console.log('✅ Configuration matches target. No updates required.');
        return;
      }

      console.log('⚠️ Configuration mismatch detected. Updating existing drain via PATCH...');

      const patchBody = {
        projectIds: Array.from(new Set([...currentProjectIds, VERCEL_PROJECT_ID])),
        delivery: {
          type: 'http',
          endpoint: LOG_DRAIN_URL,
          encoding: 'json',
          headers: targetHeaders
        }
      };

      const patchResponse = await fetch(urlWithTeam(`${baseUrl}/${existingDrain.id}`), {
        method: 'PATCH',
        headers,
        body: JSON.stringify(patchBody),
      });

      if (!patchResponse.ok) {
        const errorData = await patchResponse.json().catch(() => ({}));
        throw new Error(`Failed to update drain: ${patchResponse.status} ${JSON.stringify(errorData)}`);
      }

      console.log(`✨ Successfully synchronized Log Drain: ${existingDrain.id}`);
      return;
    }

    console.log(`🚀 Creating new Log Drain: ${DRAIN_NAME}...`);

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
        headers: targetHeaders
      },
      sampling: [
        {
          type: 'head_sampling',
          rate: 1, // 100% sampling (1.0)
          env: 'production'
        }
      ]
    };

    const createResponse = await fetch(urlWithTeam(baseUrl), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      throw new Error(`Failed to create drain: ${createResponse.status} ${JSON.stringify(errorData)}`);
    }

    const result = await createResponse.json();
    console.log(`✨ Successfully created Log Drain: ${result.id}`);

  } catch (error) {
    console.error(`❌ Error configuring Log Drain: ${error.message}`);
    process.exit(1);
  }
}

configureLogDrain();
