"""
MCP Server management for boomtick-cli.
"""
import subprocess
from dev_tools.utils import resolve_resource_path

def start_mcp_server():
    """
    Spawns the TypeScript MCP server as a Node.js subprocess.
    """
    server_js = resolve_resource_path("dist/index.js")
    # Spawn Node subprocess to communicate via standard I/O pipes
    return subprocess.Popen(
        ["node", server_js],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
