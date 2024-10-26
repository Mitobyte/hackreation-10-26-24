import { BookmarkCreateRoute } from "@client/components/BookmarkCreateRoute";
import { BookmarkDetailsRoute } from "@client/components/BookmarkDetailsRoute";
import { BookmarkEditRoute } from "@client/components/BookmarkEditRoute";
import { BookmarkListRoute } from "@client/components/BookmarkListRoute";
import { HomeRoute } from "@client/components/HomeRoute";
import { routes } from "@client/constants";
import { Route, Switch } from "wouter";

export function AppBody() {
  return (
    <Switch>
      <Route path={routes.root} component={HomeRoute} />
      <Route path={routes.bookmarkList} component={BookmarkListRoute} />
      <Route path={routes.bookmarkCreate} component={BookmarkCreateRoute} />
      <Route path={routes.bookmarkDetails} component={BookmarkDetailsRoute} />
      <Route path={routes.bookmarkEdit} component={BookmarkEditRoute} />
    </Switch>
  );
}
