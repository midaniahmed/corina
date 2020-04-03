import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from "redux-form";

import dashboard from './dashboardReducer';

const appReducer = combineReducers({
  dashboard,
  routing,
  form,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
