FROM node:22.22.2-bookworm

USER root

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    jq \
    gh \
    git \
    python3 \
    python3-venv \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
  && corepack prepare pnpm@10.28.2 --activate

WORKDIR /workspace
