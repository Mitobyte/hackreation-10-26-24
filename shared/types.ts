export type HelloWorld = string & { brand: "HelloWorld" };

export type Bookmark = {
  id: number;
  url: string;
  title: string;
  notes?: string;
}

