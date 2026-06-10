import { z } from "zod";
import fetch from "node-fetch";
import { JulesSession } from "../types.js";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const CancelJulesSessionInputSchema = z.object({
  id: z.string(),
  apiKey: z.string(),
});

export async function cancelJulesSessionHandler(input: z.infer<typeof CancelJulesSessionInputSchema>): Promise<JulesSession> {
  const cleanId = input.id.replace("sessions/", "");
  const response = await fetch(`${JULES_API_URL}/${cleanId}:cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel Jules session: ${response.statusText}`);
  }

  const data: any = await response.json();
  return {
    id: data.name || input.id,
    status: data.state || "FAILED",
    createdAt: data.createTime || new Date().toISOString(),
  };
}
