FROM ubuntu:24.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    git \
    python3 \
    python3-pip \
    zstd \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages required for dev-tools
# We use --break-system-packages because this is a dedicated container image
RUN pip3 install --no-cache-dir --break-system-packages \
    click \
    PyGithub \
    requests

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set environment variable for model storage
# GH Actions overrides HOME to /github/home, so we need to point to the baked-in models
ENV OLLAMA_MODELS=/root/.ollama/models

# Pre-pull models
# We start the server, wait for it to be ready, pull models, then the process ends
RUN (ollama serve &) && \
    until curl -s http://localhost:11434/api/tags > /dev/null; do sleep 1; done && \
    ollama pull llama3.2 && \
    ollama pull qwen2.5-coder:7b

# Environment variables
ENV OLLAMA_HOST=0.0.0.0

# Expose Ollama port
EXPOSE 11434

# Default command
CMD ["ollama", "serve"]
