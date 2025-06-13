import type { ErrorHandler } from "hono";
import { INTERNAL_SERVER_ERROR, OK } from "../constants/status-codes";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";
import env from "@/env";

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== OK
      ? (currentStatus as StatusCode)
      : INTERNAL_SERVER_ERROR;
  const curr_env = c.env?.NODE_ENV || env.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: curr_env === "production" ? undefined : err.stack,
    },
    statusCode as ContentfulStatusCode
  );
};
