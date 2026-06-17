# 1. Start with the official Playwright image (Includes Node.js and Browser binaries)
FROM mcr.microsoft.com/playwright:v1.49.0-noble
# Links the image to your repository
LABEL org.opencontainers.image.source="https://github.com/arii/tech-dancer"

# 2. Install basic utilities
RUN apt-get update && apt-get install -y curl lsof gh && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

# 3. Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | bash

# 4. Bake the llava:7b model directly into the image layers
RUN nohup bash -c "ollama serve &" && \
    for i in {1..15}; do curl -f -s --retry 10 --retry-connrefused --retry-delay 2 http://127.0.0.1:11434/api/tags && break || sleep 2; done && \
    ollama pull llava:7b

# 5. Set the default working directory for GitHub Actions
WORKDIR /app
