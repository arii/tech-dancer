FROM mcr.microsoft.com/playwright:v1.60.0-noble

# Links the image to your repository
LABEL org.opencontainers.image.source="https://github.com/arii/tech-dancer"

USER root

# ── System tools ──────────────────────────────────────────────────────────────
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    jq \
    git \
    git-lfs \
    lsof \
    python3 \
    python3-pip \
    python3-venv \
    python3-setuptools \
    python3-wheel \
    build-essential \
  && git lfs install \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      > /etc/apt/sources.list.d/github-cli.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends gh \
  && rm -rf /var/lib/apt/lists/*

# ── Node.js 24.16.0 (matches .node-version / runtime contract) ────────────────
ENV NODE_MAJOR=24
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash - \
  && apt-get install -y nodejs \
  && node --version

# ── pnpm 10.28.2 via corepack (matches AGENTS.md runtime contract) ─────────────
ENV PNPM_VERSION=10.28.2
# PNPM_HOME is where binaries are installed
ENV PNPM_HOME="/pnpm"
# PNPM_STORE_DIR ensures the store is located in the cache mount
ENV PNPM_STORE_DIR="/pnpm/store"
ENV PATH="$PNPM_HOME:$PATH"

# Use pre-installed browsers from the Playwright base image
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate

# ── Python packages ────────────────────────────────────────────────────────────
RUN pip3 install --no-cache-dir --break-system-packages \
    PyGithub \
    click \
    pytest==9.1.1 \
    pytest-asyncio==1.4.0 \
    pytest-mock==3.15.1 \
    playwright \
    beautifulsoup4==4.14.3 \
    pandas==3.0.3 \
    pyarrow==24.0.0 \
    tenacity==8.2.3 \
    requests==2.33.1 \
    tqdm==4.68.3 \
    langchain-openai \
    langchain-core

# ── Workspace ──────────────────────────────────────────────────────────────────
RUN mkdir -p /workspace /pnpm && chown -R pwuser:pwuser /workspace /pnpm

USER pwuser

WORKDIR /workspace

# ── Dependencies ──────────────────────────────────────────────────────────────
# Copy only the files needed for installation to leverage Docker cache
COPY --chown=pwuser:pwuser package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=pwuser:pwuser boomtick-mcp/package.json ./boomtick-mcp/

# Install dependencies using BuildKit cache mount for pnpm store
# We use the environment variable PNPM_STORE_DIR to point pnpm to the mount.
# Playwright base image uses UID 1001 for pwuser.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001 \
    pnpm install --frozen-lockfile
