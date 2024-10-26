import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/trpcService"; // Necessary hard link to type server side -- should be the only one

export const trpc = createTRPCReact<AppRouter>();
