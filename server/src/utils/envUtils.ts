import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().min(1),
});

function parseEnv(env: any) {
  return envSchema.parse(env);
}

export const envVars = parseEnv(process.env);
