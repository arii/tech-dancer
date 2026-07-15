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
# ── Node.js 24.16.0 (pinned) ────────────────────────────────────────────────
ENV NODE_VERSION=24.16.0
RUN curl -fsSL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz \
  | tar -xJ -C /usr/local --strip-components=1 && \
  node --version

# ── pnpm 10.28.2 via corepack (matches AGENTS.md runtime contract) ─────────────
ENV PNPM_VERSION=10.28.2
ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV PATH=$PNPM_HOME:$PATH
# Use pre-installed browsers from the Playwright base image
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PYTHONPATH=/workspace/boomtick-pkg/cli

RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && mkdir -p /workspace && chown pwuser:pwuser /workspace \
  && mkdir -p $PNPM_HOME && chown pwuser:pwuser $PNPM_HOME

# ── Workspace ──────────────────────────────────────────────────────────────────
WORKDIR /workspace

# ── Python packages (Pre-bake dependencies for caching) ────────────────────────
# Copy only dependency definitions first to leverage Docker layer caching
COPY boomtick-pkg/cli/pyproject.toml boomtick-pkg/cli/requirements-dev.txt /workspace/boomtick-pkg/cli/

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
    langchain-core \
    duckduckgo-search>=6.0.0 \
    && if [ -f /workspace/boomtick-pkg/cli/requirements-dev.txt ]; then \
        pip3 install --no-cache-dir --break-system-packages -r /workspace/boomtick-pkg/cli/requirements-dev.txt; \
    fi

# ── Dev Tools ──────────────────────────────────────────────────────────────────
# Now copy the rest of the CLI source and install in editable mode
COPY boomtick-pkg/cli/ /workspace/boomtick-pkg/cli/
RUN pip3 install --no-cache-dir --break-system-packages -e /workspace/boomtick-pkg/cli/

# ── pnpm Dependencies (Pre-bake) ──────────────────────────────────────────────
# Copy lockfile and workspace config to pre-install dependencies
COPY --chown=pwuser:pwuser package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version ./
COPY --chown=pwuser:pwuser boomtick-pkg/mcp/package.json ./boomtick-pkg/mcp/
COPY --chown=pwuser:pwuser boomtick-pkg/scripts/ ./boomtick-pkg/scripts/
COPY --chown=pwuser:pwuser scripts/ ./scripts/

USER pwuser

RUN --mount=type=cache,id=pnpm,uid=1001,target=/pnpm/store pnpm install --frozen-lockfile
