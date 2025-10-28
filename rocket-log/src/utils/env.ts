import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.url(),
});

export const ENV = envSchema.parse(process.env);
