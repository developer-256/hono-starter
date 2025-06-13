import { serve } from "@hono/node-server";
import env from "./env.js";
import app from "./app.js";
app.get("/hello", (c) => {
    return c.text("Hello Hono!");
});
serve({
    fetch: app.fetch,
    port: env.PORT,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
