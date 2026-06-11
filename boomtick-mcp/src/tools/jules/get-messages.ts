import { z } from "zod";

export const GetJulesMessagesInputSchema = z.object({
  id: z.string(),
});

export async function getJulesMessagesHandler(input: z.infer<typeof GetJulesMessagesInputSchema>) {
  return {
    id: input.id,
    messages: [
      { role: "user", content: "hello" },
      { role: "jules", content: "I am ready." }
    ],
  };
}
