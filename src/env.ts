import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(9999),
  DATABASE_URL: z.string(),
});

export type env = z.infer<typeof EnvSchema>;

// biome-ignore lint/nursery/noProcessEnv: <only place in app where this is used>
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(z.prettifyError(error));
  process.exit(1);
}

// biome-ignore lint/style/noNonNullAssertion: <we know it is present bcz we have thrown error otherwise>
export default env!;
