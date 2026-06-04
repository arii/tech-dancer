import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

type ToolContent = {
  type: string;
  text?: string;
};

const expectedTools = new Set(["boomtick.health", "boomtick.echo"]);

function parseTextResult(result: { content?: ToolContent[] }, toolName: string) {
  const textContent = result.content?.find((item) => item.type === "text" && typeof item.text === "string");
  if (!textContent?.text) {
    throw new Error(`${toolName} did not return text content`);
  }
  return JSON.parse(textContent.text) as Record<string, unknown>;
}

async function main() {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["dist/index.js"],
    cwd: process.cwd(),
    stderr: "pipe",
  });

  const stderrChunks: string[] = [];
  transport.stderr?.on("data", (chunk) => {
    stderrChunks.push(chunk.toString());
  });

  const client = new Client({ name: "boomtick-tool-verifier", version: "0.1.0" });

  try {
    await client.connect(transport);
    const listed = await client.listTools();
    const listedNames = new Set(listed.tools.map((tool) => tool.name));

    for (const expectedTool of expectedTools) {
      if (!listedNames.has(expectedTool)) {
        throw new Error(`Missing MCP tool: ${expectedTool}`);
      }
    }

    const health = parseTextResult(await client.callTool({ name: "boomtick.health", arguments: {} }), "boomtick.health");
    if (health.name !== "boomtick-mcp" || typeof health.readOnly !== "boolean") {
      throw new Error(`Unexpected boomtick.health payload: ${JSON.stringify(health)}`);
    }

    const echoMessage = "tool verification ok";
    const echo = parseTextResult(
      await client.callTool({ name: "boomtick.echo", arguments: { message: echoMessage } }),
      "boomtick.echo",
    );
    if (echo.success !== true || echo.message !== echoMessage) {
      throw new Error(`Unexpected boomtick.echo payload: ${JSON.stringify(echo)}`);
    }

    console.log(JSON.stringify({
      success: true,
      listedTools: [...listedNames].sort(),
      calledTools: [...expectedTools].sort(),
    }, null, 2));
  } catch (error) {
    const stderr = stderrChunks.join("").trim();
    if (stderr) {
      console.error(stderr);
    }
    throw error;
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
