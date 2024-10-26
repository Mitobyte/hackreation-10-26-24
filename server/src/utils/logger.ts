import { pino } from "pino";
import path from "node:path";
// https://github.com/pinojs/pino/blob/main/docs/api.md#logger

const transport = pino.transport({
  targets: [
    {
      level: "debug",
      target: "pino/file",
      options: {
        destination: path.join(__dirname, "../../.server-logs.log"),
        nestedKey: "payload",
      },
    },
    {
      level: "info",
      target: "pino-pretty",
      options: {
        nestedKey: "payload",
      },
    },
  ],
});

const pinoLogger = pino(transport);

//type MergingObject = undefined | { err?: Error } & unknown;
// TODO: Rethink this type
// https://github.com/pinojs/pino/blob/main/docs/api.md#error
type MergingObject = object;

export const logger = {
  info(msg?: string, obj?: MergingObject): void {
    pinoLogger.info(obj, msg);
  },
  warn(msg?: string, obj?: MergingObject): void {
    pinoLogger.warn(obj, msg);
  },
  error(msg?: string, obj?: MergingObject | unknown): void {
    if (typeof obj === "string") {
      obj = { errMsg: obj };
    }
    pinoLogger.error(obj, msg);
  },
};
