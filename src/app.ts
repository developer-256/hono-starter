import { onError } from "./lib/handlers/on-error.handler";
import { notFound } from "./lib/handlers/not-found.handler";
import { logger } from "hono/logger";
import { customLogger } from "./lib/handlers/custom-log.handler";
import { requestId } from "hono/request-id";
import { cors } from "hono/cors";
import configureOpenAPI from "./lib/open-api.config";
import taskRouter from "./routes/task/task.index";
import { createRouter } from "./lib/create-app";
import indexRouter from "./routes/index/get";

const createApp = () => {
  const app = createRouter().basePath("/api");
  app.use(requestId());
  app.use(logger(customLogger));
  app.use("/*", cors());

  app.notFound(notFound);
  app.onError(onError);

  return app;
};

export const app = createApp();

const routes = [indexRouter, taskRouter];

configureOpenAPI(app);

for (const route of routes) {
  app.route("/", route);
}

export default app;
