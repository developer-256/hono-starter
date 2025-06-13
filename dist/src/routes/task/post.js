import { createRoute, z } from "@hono/zod-openapi";
import { tags } from "../route.tags.js";
import { HTTP__STATUS } from "../../lib/constants/status-codes.js";
import db from "../../db/index.js";
import { task } from "../../db/schema/index.js";
import { CREATE_ERRORS, CREATE_ERRORS_SCHEMA } from "../../lib/utils.js";
export const taskCreate = createRoute({
    path: "/task",
    method: "post",
    tags: tags.task,
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({ name: z.string().min(3), done: z.boolean() }),
                },
            },
            description: "Task to create",
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
    },
});
export const taskCreateHandler = async (c) => {
    const reqData = c.req.valid("json");
    const [taskResponse] = await db.insert(task).values(reqData).returning();
    if (!taskResponse) {
        return c.json(CREATE_ERRORS({ messages: ["Something went wrong while creating task"] }), HTTP__STATUS.INTERNAL_SERVER_ERROR);
    }
    return c.json(taskResponse, HTTP__STATUS.OK);
};
