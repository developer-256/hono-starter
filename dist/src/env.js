import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";
expand(config());
const EnvSchema = z
    .object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: z.coerce.number().default(9999),
    DATABASE_URL: z.string().url(),
    UPLOADTHING_TOKEN: z.string(),
    TURSO_DATABASE_AUTH_TOKEN: z.string().optional(),
})
    .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.TURSO_DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: "string",
            received: "undefined",
            path: ["DATABASE_AUTH_TOKEN"],
            message: "Must be set when NODE_ENV is 'production'.",
        });
    }
});
// biome-ignore lint/nursery/noProcessEnv: <only place in app where this is used>
const { data: env, error } = EnvSchema.safeParse(process.env);
if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
// biome-ignore lint/style/noNonNullAssertion: <we know it is present bcz we have thrown error otherwise>
export default env;
