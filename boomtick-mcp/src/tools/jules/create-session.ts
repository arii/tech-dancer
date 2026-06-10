import { z } from "zod";
import fetch from "node-fetch";
import { JulesSession } from "../types.js";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const CreateJulesSessionInputSchema = z.object({
  task: z.string(),
  apiKey: z.string(),
});

export async function createJulesSessionHandler(input: z.infer<typeof CreateJulesSessionInputSchema>): Promise<JulesSession> {
  const response = await fetch(JULES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
    body: JSON.stringify({
      prompt: input.task,
      automationMode: "AUTO_CREATE_PR"
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create Jules session: ${response.statusText}`);
  }

  const data: any = await response.json();
  return {
    id: data.name || `session-${Date.now()}`,
    status: data.state || "PENDING",
    createdAt: data.createTime || new Date().toISOString(),
  };
}
