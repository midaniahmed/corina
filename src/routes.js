import React from "react";
import {
  Router,
  Route,
  browserHistory,
  Redirect,
  IndexRoute,
} from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import HeaderLayout from "./components/app/HeaderLayout";
import DashboardContext from "./components/dashboard/DashboardContext";

export default function(store) {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={history}>
      <Route path="/" component={HeaderLayout}>
        <IndexRoute component={DashboardContext} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  );
}
