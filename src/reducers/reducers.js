import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import dashboard from "./dashboardReducer";
import country from "./countryReducer";
import tunisia from "./tunisiaReducer";

const appReducer = combineReducers({
  dashboard,
  country,
  tunisia,
  routing,
  form,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
