import { Bookmark, HelloWorld } from "@shared/types";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "@server/dbClient";
import { parseUrlContent } from "@server/bookmarkService";

export const createTRPCContext = () => ({});
type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<TRPCContext>().create();

export type AppRouter = typeof appRouter;

function getHelloWorld() {
  return "Hello World" as HelloWorld;
}

const createBookmarkSchema = z.object({
  url: z.string().url(),
});

type CreateBookmark = z.infer<typeof createBookmarkSchema>;
async function createBookmark(request: CreateBookmark): Promise<number> {
  const title = await parseUrlContent(request.url);

  const result = await db.bookmark.create({
    data: {
      url: request.url,
      title: title,
    },
    select: {
      id: true,
    },
  });

  return result.id;
}

const updateBookmarkSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string().optional(),
});

type UpdateBookmark = z.infer<typeof updateBookmarkSchema>;

async function updateBookmark(request: UpdateBookmark): Promise<Bookmark> {
  const result = await db.bookmark.update({
    where: {
      id: request.id,
    },
    data: {
      title: request.title,
      notes: request.notes || null,
    },
  });

  return {
    ...result,
    notes: result.notes || undefined,
  };
}

async function loadBookmark(id: number): Promise<Bookmark> {
  const result = await db.bookmark.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      url: true,
      title: true,
      notes: true,
    },
  });

  if (!result) {
    throw new Error("bookmark not found");
  }

  return {
    ...result,
    notes: result.notes || undefined,
  };
}

async function loadBookmarks(): Promise<Bookmark[]> {
  const result = await db.bookmark.findMany({
    select: {
      id: true,
      url: true,
      title: true,
      notes: true,
    },
  });

  const output: Bookmark[] = result.map((x) => ({
    id: x.id,
    url: x.url,
    title: x.title,
    notes: x.notes || undefined,
  }));

  return output;
}

export const appRouter = t.router({
  getHelloWorld: t.procedure.query(getHelloWorld),
  createBookmark: t.procedure.input(createBookmarkSchema).mutation(async (opts) => {
    return await createBookmark(opts.input);
  }),
  updateBookmark: t.procedure.input(updateBookmarkSchema).mutation(async (opts) => {
    return await updateBookmark(opts.input);
  }),
  getBookmark: t.procedure.input(z.coerce.number()).query(async (opts) => {
    return await loadBookmark(opts.input);
  }),
  getBookmarks: t.procedure.query(loadBookmarks),
});
