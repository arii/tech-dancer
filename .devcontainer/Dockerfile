FROM mcr.microsoft.com/playwright:v1.44.0-jammy

USER root

ENV PNPM_VERSION=10.28.2
ENV PLAYWRIGHT_BROWSERS_PATH=0

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

RUN npm install -g pnpm@${PNPM_VERSION}

RUN mkdir -p /workspace && chown -R pwuser:pwuser /workspace

USER pwuser

WORKDIR /workspace
