import { INTERNAL_SERVER_ERROR, OK } from "../constants/status-codes.js";
import env from "../../env.js";
export const onError = (err, c) => {
    const currentStatus = "status" in err ? err.status : c.newResponse(null).status;
    const statusCode = currentStatus !== OK
        ? currentStatus
        : INTERNAL_SERVER_ERROR;
    const curr_env = c.env?.NODE_ENV || env.NODE_ENV;
    return c.json({
        message: err.message,
        stack: curr_env === "production" ? undefined : err.stack,
    }, statusCode);
};
