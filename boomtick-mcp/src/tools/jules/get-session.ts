import { z } from "zod";
import fetch from "node-fetch";
import { JulesSession } from "../types.js";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const GetJulesSessionInputSchema = z.object({
  id: z.string(),
  apiKey: z.string(),
});

export async function getJulesSessionHandler(input: z.infer<typeof GetJulesSessionInputSchema>): Promise<JulesSession> {
  const cleanId = input.id.replace("sessions/", "");
  const response = await fetch(`${JULES_API_URL}/${cleanId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get Jules session: ${response.statusText}`);
  }

  const data: any = await response.json();
  let recentMessage: string | undefined = undefined;

  try {
    const msgsResponse = await fetch(`${JULES_API_URL}/${cleanId}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": input.apiKey,
      },
    });

    if (msgsResponse.ok) {
      const msgsData: any = await msgsResponse.json();
      const messages = msgsData.messages || [];
      if (messages.length > 0) {
        recentMessage = messages[messages.length - 1].content || messages[messages.length - 1].text;
      }
    }
  } catch (err) {
    // Ignore message fetch errors to not block session retrieval
  }

  return {
    id: data.name || input.id,
    status: data.state || "COMPLETED",
    createdAt: data.createTime || new Date().toISOString(),
    pullRequestUrl: data.pullRequestUrl,
    recentMessage,
  };
}
