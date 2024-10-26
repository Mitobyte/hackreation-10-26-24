import z from "zod";

export type HelloWorld = string & { brand: "HelloWorld" };

export type Bookmark = {
  id: number;
  url: string;
  title: string;
  notes?: string;
}

export const updateBookmarkSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.string().optional(),
});

export type UpdateBookmark = z.infer<typeof updateBookmarkSchema>;
