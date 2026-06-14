# Vercel Log Forwarding (Drains) Configuration Guide

To ensure long-term log retention and centralized observability for boomtick.blog, we use Vercel Log Drains to forward logs to an external destination.

This guide details how to configure log forwarding, specifically using **Axiom** as the reference ingestion target.

## 1. Prerequisites

- Access to the Vercel Project (boomtick.blog) settings.
- An Axiom account and a dataset created (e.g., `boomtick-logs`).
- An Axiom API Token with `Ingest` permissions for the dataset.

## 2. Ingestion Target: Axiom

| Parameter | Value |
|-----------|-------|
| **Endpoint URL** | `https://api.axiom.co/v1/datasets/<YOUR_DATASET_NAME>/ingest` |
| **Log Format** | `JSON` |
| **Custom Headers** | `Authorization: Bearer <YOUR_AXIOM_API_TOKEN>` |

## 3. Configuration Steps (Vercel Dashboard)

1.  **Navigate to Drains**:
    - Go to your Vercel Project: **boomtick.blog**.
    - Navigate to **Settings** > **Drains**.
2.  **Add Drain**:
    - Click **Add Drain**.
3.  **Configure Data Type**:
    - Select **Logs** as the data type.
4.  **Configure Sources & Environments**:
    - **Environments**: Enable for `Production` (and optionally `Preview` for debugging).
    - **Sources**: Select `build`, `edge`, `lambda` (Function logs), `static`, and `firewall`.
5.  **Configure Destination**:
    - Select **Custom Endpoint**.
    - **Endpoint URL**: Enter your Axiom ingestion URL.
    - **Format**: Select `JSON`.
    - **Custom Headers**: Add `Authorization: Bearer <YOUR_AXIOM_API_TOKEN>`.
6.  **Create Drain**:
    - Click **Create Drain**.

## 4. Verification

After creating the drain, verify the setup:

1.  **Test Payload**: Use the built-in **Test** button in the Vercel Drains settings.
2.  **Axiom Logs Viewer**: Confirm that the test payload and real-time traffic logs appear in your Axiom dataset.
3.  **Search & Alert**: Set up searches and alerts in Axiom to monitor for errors or anomalies.

## 5. Automation

For programmatic management, you can use the `scripts/configure-log-drains.mjs` script provided in this repository.

### Setup

1.  Ensure you have a Vercel Access Token.
2.  Configure your environment variables:
    ```bash
    export VERCEL_TOKEN="your_vercel_token"
    export VERCEL_PROJECT_ID="your_project_id"
    export LOG_DRAIN_URL="https://api.axiom.co/v1/datasets/<dataset>/ingest"
    export LOG_DRAIN_TOKEN="your_axiom_token"
    ```
3.  Run the configuration script:
    ```bash
    node scripts/configure-log-drains.mjs
    ```

## References

- [Vercel Drains Documentation](https://vercel.com/docs/drains)
- [Axiom Vercel Integration](https://axiom.co/docs/integrations/vercel)
