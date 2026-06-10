import { z } from "zod";

export const SendJulesMessageInputSchema = z.object({
  id: z.string(),
  message: z.string(),
});

export async function sendJulesMessageHandler(input: z.infer<typeof SendJulesMessageInputSchema>) {
  return {
    id: input.id,
    status: "success",
    message: "Message sent successfully",
  };
}
