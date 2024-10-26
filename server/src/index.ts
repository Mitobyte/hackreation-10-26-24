import express from "express";
import { envVars } from "@server/utils/envUtils";
import path from "node:path";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createTRPCContext } from "@server/trpcService";
import helmet from "helmet";
import { logger } from "@server/utils/logger";

const hostname = "0.0.0.0";
const port = envVars.SERVER_PORT;

const app = express();

app.use(helmet());

// This serves the client build in production mode.
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
    onError: (opts) => {
      logger.error("TRPC error", opts.error);
    },
  }),
);

app.get("/api/hi-express", (_, res) => res.send("hello world api"));

app.listen(port, hostname, () => {
  logger.info(`Express server started on port: ${port}`);
});
