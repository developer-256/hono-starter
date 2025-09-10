import { createRouter } from "./lib/config/create-router.config";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import {
  HonoLogger,
  logger as CustomLogger,
} from "./lib/handlers/custom-log.handler";
import { cors } from "hono/cors";
import { notFound } from "./lib/handlers/not-found.handler";
import { onError } from "./lib/handlers/on-error.handler";
import configureOpenAPI from "./lib/config/open-api.config";
import env from "./env";
import { HTTP__STATUS } from "./lib/constants/status-codes";
import { serve } from "bun";
import { serveEmojiFavicon } from "./lib/handlers/favicon.handler";

const createApp = () => {
  const app = createRouter().basePath("/api");

  app.use(requestId()).use(serveEmojiFavicon("📝"));
  app.use(logger(HonoLogger));
  app.use("/*", cors());

  app.notFound(notFound);
  app.onError(onError);

  return app;
};

export const app = createApp();
configureOpenAPI(app);

const controllers: any = [];

for (const controller of controllers) {
  app.route("/", controller);
}

app.get("/", (c) => c.json({ message: "Yolo Bozo" }, HTTP__STATUS.OK));

serve({
  port: env.PORT,
  fetch: app.fetch,
  // tls: {}, // for certbot certificate files
});

CustomLogger.log(
  `🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`
);
