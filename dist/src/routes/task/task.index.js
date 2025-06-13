import { createRouter } from "../../lib/create-app.js";
import { taskGetAll, taskGetAllhandler } from "./get.js";
import { taskCreate, taskCreateHandler } from "./post.js";
import { taskGetOne, taskGetOneHandler } from "./getOne.js";
import { taskDelete, taskDeleteHandler } from "./delete.js";
import { taskUpdate, taskUpdateHandler } from "./patch.js";
const taskRouter = createRouter()
    .openapi(taskGetAll, taskGetAllhandler)
    .openapi(taskCreate, taskCreateHandler)
    .openapi(taskGetOne, taskGetOneHandler)
    .openapi(taskUpdate, taskUpdateHandler)
    .openapi(taskDelete, taskDeleteHandler);
export default taskRouter;
