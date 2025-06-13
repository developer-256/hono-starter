import { z, type RouteHandler } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { tags } from "../route.tags";
import { HTTP__STATUS } from "@/lib/constants/status-codes";
import db from "@/db";

export const taskGetAll = createRoute({
  path: "/task",
  method: "get",
  tags: tags.task,
  responses: {
    [HTTP__STATUS.OK]: {
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              name: z.string(),
              id: z.number(),
              done: z.boolean(),
              createdAt: z.string().nullable(),
              updatedAt: z.string().nullable(),
            })
          ),
        },
      },
      description: "Returns all tasks",
    },
  },
});

export const taskGetAllhandler: RouteHandler<typeof taskGetAll> = async (c) => {
  const tasks = await db.query.task.findMany();
  return c.json(tasks);
};
