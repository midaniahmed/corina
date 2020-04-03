import React from "react";
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  Redirect,
  IndexRoute,
} from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import HeaderLayout from "./components/app/HeaderLayout";
import CountryContext from "./components/country/CountryContext";
import DashboardContext from "./components/dashboard/DashboardContext";
import MapContext from "./components/dashboard/MapContext";
import TimelineContext from "./components/dashboard/TimelineContext";

export default function(store) {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={history}>
      <Route path="/" component={HeaderLayout}>
        <IndexRedirect to="details" />
        <Route path="details">
          <IndexRoute component={DashboardContext} />
          <Route path=":country" component={CountryContext} />
        </Route>
        <Route path="map" component={MapContext} />
        <Route path="timeline" component={TimelineContext} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  );
}
