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

# Install Node.js (v22 to match .nvmrc)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install Python packages required for dev-tools
RUN pip3 install --no-cache-dir --break-system-packages \
    click \
    PyGithub \
    requests

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Set environment variable for model storage
ENV OLLAMA_MODELS=/root/.ollama/models

# Pre-pull models
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
