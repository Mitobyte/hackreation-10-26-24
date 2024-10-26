import { HomeRoute } from "@client/components/HomeRoute";
import { routes } from "@client/constants";
import { Route, Switch } from "wouter";

export function AppBody() {
  return (
    <Switch>
      <Route path={routes.root} component={HomeRoute} />
    </Switch>
  );
}
