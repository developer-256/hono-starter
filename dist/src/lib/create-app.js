import { OpenAPIHono } from "@hono/zod-openapi";
import { UNPROCESSABLE_ENTITY } from "./constants/status-codes.js";
// biome-ignore lint/suspicious/noExplicitAny: <just here any>
const defaultHook = (result, c) => {
    if (!result.success) {
        return c.json({
            success: result.success,
            error: result.error,
        }, UNPROCESSABLE_ENTITY);
    }
};
export const createRouter = () => {
    return new OpenAPIHono({ strict: false, defaultHook });
};
