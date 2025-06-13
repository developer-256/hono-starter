import { createRouter } from "@/lib/create-app";
import { taskGetAll, taskGetAllhandler } from "./get";
import { taskCreate, taskCreateHandler } from "./post";
import { taskGetOne, taskGetOneHandler } from "./getOne";
import { taskDelete, taskDeleteHandler } from "./delete";
import { taskUpdate, taskUpdateHandler } from "./patch";

const taskRouter = createRouter()
  .openapi(taskGetAll, taskGetAllhandler)
  .openapi(taskCreate, taskCreateHandler)
  .openapi(taskGetOne, taskGetOneHandler)
  .openapi(taskUpdate, taskUpdateHandler)
  .openapi(taskDelete, taskDeleteHandler);

export default taskRouter;
