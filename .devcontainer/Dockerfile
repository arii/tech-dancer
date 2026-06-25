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
# Use pre-installed browsers from the Playwright base image
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PYTHONPATH=/workspace/dev-tools

RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && pnpm --version

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

# ── Dev Tools ──────────────────────────────────────────────────────────────────
RUN mkdir -p /workspace/dev-tools
COPY dev-tools/pyproject.toml /workspace/dev-tools/
RUN pip3 install --no-cache-dir --break-system-packages -e /workspace/dev-tools/

# ── Workspace ──────────────────────────────────────────────────────────────────
RUN mkdir -p /workspace && chown -R pwuser:pwuser /workspace

USER pwuser

WORKDIR /workspace
