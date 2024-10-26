import { HelloWorld } from "@shared/types";
import { initTRPC } from "@trpc/server";

export const createTRPCContext = () => ({});
type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<TRPCContext>().create();

export type AppRouter = typeof appRouter;

function getHelloWorld() {
  return "Hello World" as HelloWorld;
}

export const appRouter = t.router({
  getHelloWorld: t.procedure.query(getHelloWorld),
});
