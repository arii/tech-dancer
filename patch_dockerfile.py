import re

with open('.devcontainer/Dockerfile', 'r') as f:
    content = f.read()

# Remove Ollama installation and baking
content = re.sub(r'# Install Ollama\nRUN curl -fsSL https://ollama\.com/install\.sh \| /bin/bash\n\n# Bake Ollama model\nRUN ollama serve > ollama_output\.log 2>&1 & \\\n    sleep 5 \\\n    && ollama pull llava:latest \\\n    && pkill ollama\n\n', '', content)

# Remove zstd from apt-get install
content = re.sub(r'    zstd \\\n', '', content)

# Remove useradd jules
content = re.sub(r'# Create pwuser to match expected devcontainer environment\n# Playwright image already has a pwuser, we might just need to configure it\nRUN useradd -m jules \|\| true\n\n', '', content)

# Remove ENV NODE_VERSION=22
content = re.sub(r'ENV NODE_VERSION=22\n\n', '', content)

# Add newline to end of file if missing
if not content.endswith('\n'):
    content += '\n'

with open('.devcontainer/Dockerfile', 'w') as f:
    f.write(content)
