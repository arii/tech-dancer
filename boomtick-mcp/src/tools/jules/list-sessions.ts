import { z } from "zod";
import { JulesSession, JulesStatus } from "../types.js";

export const ListJulesSessionsInputSchema = z.object({});

export async function listJulesSessionsHandler(input: z.infer<typeof ListJulesSessionsInputSchema>): Promise<JulesSession[]> {
  const apiKey = process.env.JULES_API_KEY;
  if (!apiKey) {
    throw new Error("JULES_API_KEY environment variable is not set.");
  }

  const response = await fetch("https://jules.googleapis.com/v1alpha/sessions?pageSize=100", {
    method: "GET",
    headers: {
      "x-goog-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Jules API error (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as any;
  const sessions = data.sessions || [];

  return sessions.map((session: any) => {
    const name = session.name || "";
    const id = name.startsWith("sessions/") ? name.substring(9) : name;

    let status: JulesStatus = "PENDING";
    if (session.state === "SUCCEEDED" || session.state === "COMPLETED") status = "COMPLETED";
    else if (session.state === "FAILED" || session.state === "CANCELLED" || session.state === "TERMINATED") status = "FAILED";
    else if (session.state === "IN_PROGRESS") status = "IN_PROGRESS";

    let pullRequestUrl: string | undefined;
    if (session.outputs && Array.isArray(session.outputs)) {
      for (const output of session.outputs) {
        if (output.pullRequest && output.pullRequest.url) {
          pullRequestUrl = output.pullRequest.url;
          break;
        }
      }
    }

    return {
      id,
      status,
      createdAt: session.createTime ? new Date(session.createTime) : new Date(),
      pullRequestUrl,
    };
  });
}
