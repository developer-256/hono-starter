import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema/index.js";
import env from "../env.js";
const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.TURSO_DATABASE_AUTH_TOKEN,
});
const db = drizzle(client, { schema, logger: true });
export default db;
