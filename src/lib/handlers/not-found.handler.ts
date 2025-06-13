import type { NotFoundHandler } from "hono";
import { HTTP__STATUS } from "../constants/status-codes";

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `Not Found - ${c.req.path}`,
    },
    HTTP__STATUS.NOT_FOUND
  );
};
