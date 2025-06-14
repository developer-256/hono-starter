import { createRoute, z, type RouteHandler } from "@hono/zod-openapi";
import { tags } from "../route.tags";
import { HTTP__STATUS } from "@/lib/constants/status-codes";
import { CREATE_ERRORS, CREATE_ERRORS_SCHEMA } from "@/lib/utils";
import db from "@/db";
import { eq } from "drizzle-orm";
import { task } from "@/db/schema";

export const taskGetOne = createRoute({
  path: "/task/{id}",
  method: "get",
  tags: tags.task,
  request: {
    params: z.object({
      id: z.coerce.number({ message: "Id must be a valid number" }).openapi({
        param: {
          name: "id",
          in: "path",
          required: true,
        },
        required: ["id"],
        example: 42,
      }),
    }),
  },
  responses: {
    [HTTP__STATUS.OK]: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string(),
            id: z.number(),
            done: z.boolean(),
            createdAt: z.string().nullable(),
            updatedAt: z.string().nullable(),
          }),
        },
      },
      description: "Requested Single Task",
    },
    [HTTP__STATUS.NOT_FOUND]: {
      content: {
        "application/json": { schema: CREATE_ERRORS_SCHEMA("Not Found Error") },
      },
      description: "Requested Task not found",
    },
    [HTTP__STATUS.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": { schema: CREATE_ERRORS_SCHEMA("Invalid ID") },
      },
      description: "Invalid ID",
    },
  },
});

export const taskGetOneHandler: RouteHandler<typeof taskGetOne> = async (c) => {
  const { id } = c.req.valid("param");
  const taskResponse = await db.query.task.findFirst({
    where: eq(task.id, id),
  });
  if (!taskResponse) {
    return c.json(
      CREATE_ERRORS({
        errorName: "Task Not Found",
        messages: [`Task with ID: ${id} not found`],
      }),
      HTTP__STATUS.NOT_FOUND
    );
  }
  return c.json(taskResponse, HTTP__STATUS.OK);
};
