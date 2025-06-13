import { HTTP__STATUS } from "../../lib/constants/status-codes.js";
import { z } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { tags } from "../route.tags.js";
import { CREATE_ERRORS, CREATE_ERRORS_SCHEMA } from "../../lib/utils.js";
import db from "../../db/index.js";
import { task } from "../../db/schema/index.js";
import { eq } from "drizzle-orm";
export const taskDelete = createRoute({
    path: "/task/{id}",
    method: "delete",
    tags: tags.task,
    request: {
        params: z.object({
            id: z.coerce.number().openapi({
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
                    schema: z.object({ message: z.string() }),
                },
            },
            description: "Task Deleted Successfully",
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
export const taskDeleteHandler = async (c) => {
    const { id } = c.req.valid("param");
    const [deleteResponse] = await db
        .delete(task)
        .where(eq(task.id, id))
        .returning();
    if (!deleteResponse) {
        return c.json(CREATE_ERRORS({
            errorName: "Not Found",
            messages: [`Task With id: ${id} not found`],
        }), HTTP__STATUS.NOT_FOUND);
    }
    return c.json({ message: `Task with id: ${id} successfully deleted` }, HTTP__STATUS.OK);
};
