import { createRoute, z, type RouteHandler } from "@hono/zod-openapi";
import { tags } from "../route.tags";
import { HTTP__STATUS } from "@/lib/constants/status-codes";
import { CREATE_ERRORS, CREATE_ERRORS_SCHEMA } from "@/lib/utils";
import db from "@/db";
import { task } from "@/db/schema";
import { eq } from "drizzle-orm";

export const taskUpdate = createRoute({
  path: "/task/{id}",
  method: "patch",
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
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              name: z.string().optional(),
              done: z.boolean().optional(),
            })
            .superRefine((input, ctx) => {
              if (!input.name && !input.done) {
                ctx.addIssue({
                  code: "custom",
                  message: "Change atleast one argument",
                  path: ["name", "done"],
                });
              }
            }),
        },
      },
      description: "Task to Update",
    },
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
      description: "Create new Task",
    },
    [HTTP__STATUS.INTERNAL_SERVER_ERROR]: {
      content: {
        "application/json": {
          schema: CREATE_ERRORS_SCHEMA(),
        },
      },
      description: "Internal Server Error",
    },
    [HTTP__STATUS.UNPROCESSABLE_ENTITY]: {
      content: { "application/json": { schema: CREATE_ERRORS_SCHEMA() } },
      description: "Invalid Input Data",
    },
    [HTTP__STATUS.NOT_FOUND]: {
      content: {
        "application/json": { schema: CREATE_ERRORS_SCHEMA("Not Found Error") },
      },
      description: "Task not found",
    },
  },
});

export const taskUpdateHandler: RouteHandler<typeof taskUpdate> = async (c) => {
  const { id } = c.req.valid("param");
  const { name, done } = c.req.valid("json");

  const [updateResponse] = await db
    .update(task)
    .set({ name: name, done: done })
    .where(eq(task.id, id))
    .returning();
  if (!updateResponse) {
    return c.json(
      CREATE_ERRORS({
        errorName: "Not Found",
        messages: [`Task with id: ${id} not found`],
      }),
      HTTP__STATUS.NOT_FOUND
    );
  }
  return c.json(updateResponse, HTTP__STATUS.OK);
};
