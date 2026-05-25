FROM node:22.22.2-bookworm

USER root

# Create pwuser to match expected devcontainer environment
RUN useradd -m pwuser && chsh -s /bin/bash pwuser

ENV PNPM_VERSION=10.28.2
ENV PLAYWRIGHT_DOWNLOAD_HOST=https://playwright.azureedge.net
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    jq \
    git \
    gh \
    python3 \
    python3-pip \
    python3-venv \
    python3-setuptools \
    python3-wheel \
    build-essential \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

RUN mkdir -p /workspace && chown -R pwuser:pwuser /workspace

USER pwuser

WORKDIR /workspace
