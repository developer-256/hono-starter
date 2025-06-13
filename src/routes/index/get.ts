import { createRouter } from "@/lib/create-app";
import { tags } from "../route.tags";
import { HTTP__STATUS } from "@/lib/constants/status-codes";
import { z } from "zod";

const indexRouter = createRouter().openapi(
  {
    path: "/",
    method: "get",
    tags: tags.index,
    responses: {
      [HTTP__STATUS.OK]: {
        content: {
          "application/json": { schema: z.object({ message: z.string() }) },
        },
        description: "Index Route",
      },
    },
  },
  (c) => {
    return c.json({ message: "Yello From Hono🔥" }, HTTP__STATUS.OK);
  }
);

export default indexRouter;
