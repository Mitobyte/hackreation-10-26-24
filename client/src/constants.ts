export const routes = {
  root: "/",
  bookmarkCreate: "/bookmark",
  bookmarkDetails: "/bookmark/:id",
  toBookmarkDetails: (id: number) => `/bookmark/${id}`,
};
