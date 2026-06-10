import { z } from "zod";
import fetch from "node-fetch";

const JULES_API_URL = "https://jules.googleapis.com/v1alpha/sessions";

export const GetJulesMessagesInputSchema = z.object({
  id: z.string(),
  apiKey: z.string(),
});

export async function getJulesMessagesHandler(input: z.infer<typeof GetJulesMessagesInputSchema>) {
  const cleanId = input.id.replace("sessions/", "");
  const response = await fetch(`${JULES_API_URL}/${cleanId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": input.apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get Jules messages: ${response.statusText}`);
  }

  const data: any = await response.json();
  return {
    id: input.id,
    messages: data.messages || [],
  };
}
