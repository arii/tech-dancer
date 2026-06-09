import { z } from "zod";
import { config } from "../config.js";

export const HealthInputSchema = z.object({});

export async function healthHandler() {
  return {
    status: "ok",
    readOnly: !config.githubToken,
  };
}
