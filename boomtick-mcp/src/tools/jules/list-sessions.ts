import { z } from "zod";
import fetch from "node-fetch";
import { JulesSession } from "../types.js";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const ListJulesSessionsInputSchema = z.object({
  apiKey: z.string(),
  pageSize: z.number().optional(),
});

export async function listJulesSessionsHandler(input: z.infer<typeof ListJulesSessionsInputSchema>): Promise<JulesSession[]> {
  const url = new URL(JULES_API_URL);
  if (input.pageSize) {
    url.searchParams.append("pageSize", input.pageSize.toString());
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list Jules sessions: ${response.statusText}`);
  }

  const data: any = await response.json();
  const sessions = data.sessions || [];

  return sessions.map((s: any) => ({
    id: s.name,
    status: s.state,
    createdAt: s.createTime,
    pullRequestUrl: s.pullRequestUrl,
  }));
}
