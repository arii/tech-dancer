import { z } from "zod";
import fetch from "node-fetch";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const SendJulesMessageInputSchema = z.object({
  id: z.string(),
  message: z.string(),
  apiKey: z.string(),
});

export async function sendJulesMessageHandler(input: z.infer<typeof SendJulesMessageInputSchema>) {
  const cleanId = input.id.replace("sessions/", "");
  const response = await fetch(`${JULES_API_URL}/${cleanId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
    body: JSON.stringify({
      message: input.message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const data: any = await response.json();
  return {
    success: true,
    messageId: data.id || data.name,
  };
}
