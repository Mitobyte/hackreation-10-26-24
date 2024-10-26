export const routes = {
  root: "/",
  bookmarkList: "/bookmark",
  bookmarkCreate: "/bookmark/create",
  bookmarkDetails: "/bookmark/:id",
  toBookmarkDetails: (id: number) => `/bookmark/${id}`,
};