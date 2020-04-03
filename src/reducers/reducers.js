import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import dashboard from "./dashboardReducer";
import country from "./countryReducer";

const appReducer = combineReducers({
  dashboard,
  country,
  routing,
  form,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
