# 1. Start with the official Playwright image (Includes Node.js and Browser binaries)
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# 2. Install basic utilities
RUN apt-get update && apt-get install -y curl pnpm && rm -rf /var/lib/apt/lists/*

# 3. Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | bash

# 4. Bake the llava:7b model directly into the image layers
RUN nohup bash -c "ollama serve &" && \
    sleep 5 && \
    ollama pull llava:7b

# 5. Set the default working directory for GitHub Actions
WORKDIR /app
