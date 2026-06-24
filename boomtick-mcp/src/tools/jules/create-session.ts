import { z } from "zod";
import { JulesSession, JulesStatus } from "../types.js";

export const CreateJulesSessionInputSchema = z.object({
  task: z.string(),
});

export async function createJulesSessionHandler(input: z.infer<typeof CreateJulesSessionInputSchema>): Promise<JulesSession> {
  const apiKey = process.env.JULES_API_KEY;
  if (!apiKey) {
    throw new Error("JULES_API_KEY environment variable is not set.");
  }

  const response = await fetch("https://jules.googleapis.com/v1alpha/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      prompt: input.task,
      sourceContext: {
        source: "sources/github/arii/tech-dancer",
        githubRepoContext: {
          startingBranch: process.env.DEFAULT_BASE_BRANCH || "main",
        },
      },
      automationMode: "AUTO_CREATE_PR",
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Jules API error (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as any;
  const name = data.name || "";
  const id = name.startsWith("sessions/") ? name.substring(9) : name;

  let status: JulesStatus = "PENDING";
  if (data.state === "SUCCEEDED" || data.state === "COMPLETED") status = "COMPLETED";
  else if (data.state === "FAILED" || data.state === "CANCELLED" || data.state === "TERMINATED") status = "FAILED";
  else if (data.state === "IN_PROGRESS") status = "IN_PROGRESS";

  return {
    id,
    status,
    createdAt: data.createTime ? new Date(data.createTime) : new Date(),
  };
}
