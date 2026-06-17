FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Links the image to your repository
LABEL org.opencontainers.image.source="https://github.com/arii/tech-dancer"

USER root

# Create pwuser to match expected devcontainer environment
# Playwright image already has a pwuser, we might just need to configure it
RUN useradd -m jules || true

ENV PNPM_VERSION=10.28.2
ENV NODE_VERSION=22

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
    zstd \
  && rm -rf /var/lib/apt/lists/*

# Install node version 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | /bin/bash - \
  && apt-get install -y nodejs

RUN npm install -g pnpm@${PNPM_VERSION}

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | /bin/bash

# Bake Ollama model
RUN ollama serve > ollama_output.log 2>&1 & \
    sleep 5 \
    && ollama pull llava:latest \
    && pkill ollama

RUN mkdir -p /workspace && chown -R pwuser:pwuser /workspace

USER pwuser

WORKDIR /workspace