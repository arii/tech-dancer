FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Links the image to your repository
LABEL org.opencontainers.image.source="https://github.com/arii/tech-dancer"

USER root

# ── System tools ──────────────────────────────────────────────────────────────
# lsof + gh: used in ci.yml (test-build job)
# git-lfs:   used in wcs_etl.yml
# gh is not in Ubuntu's default apt sources — add GitHub CLI's repo first
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

# ── Node.js 22.22.2 (matches .node-version / runtime contract) ────────────────
# Uses NodeSource to get the exact patch version, then locks it via corepack.
ENV NODE_MAJOR=22
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash - \
  && apt-get install -y nodejs \
  && node --version

# ── pnpm 10.28.2 via corepack (matches AGENTS.md runtime contract) ─────────────
ENV PNPM_VERSION=10.28.2
RUN corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && pnpm --version

# ── Python packages ────────────────────────────────────────────────────────────
# Inline CI deps (ci.yml: pip install PyGithub pytest click)
# ETL pipeline deps (etl/requirements.txt)
RUN pip3 install --no-cache-dir --break-system-packages \
    PyGithub \
    click \
    pytest==9.0.3 \
    pytest-asyncio==1.3.0 \
    pytest-mock==3.15.1 \
    playwright==1.49.0 \
    beautifulsoup4==4.14.3 \
    pandas==3.0.2 \
    pyarrow==23.0.1 \
    tenacity==8.2.3 \
    requests==2.33.1 \
    tqdm==4.67.3

# ── Workspace ──────────────────────────────────────────────────────────────────
RUN mkdir -p /workspace && chown -R pwuser:pwuser /workspace

USER pwuser

WORKDIR /workspace
