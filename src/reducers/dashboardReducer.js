import {
  GLOBAL_STATS_LOADED,
  ALL_COUNTRIES_LOADED,
  LOADING_ALL_COUNTRIES,
  GLOBAL_STATS_LOADING,
  EMPTY_DASHBOARD_DETAILS,
  ALL_HISTORY_LOADED,
} from "ReduxActions/dashboardActions";

import world from "Assets/images/world-map.png";

const initialState = {
  global: {
    cases: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    update: new Date(),
    affectedCountries: 0,
  },
  countryMap: world,
  allCountries: [],
  loading: false,
  statsLoaging: false,
  allHistory: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_STATS_LOADED:
      return {
        ...state,
        global: action.payload,
        countryMap: action.map,
      };

    case ALL_COUNTRIES_LOADED:
      return {
        ...state,
        allCountries: action.payload,
        loading: false,
      };

    case LOADING_ALL_COUNTRIES:
      return {
        ...state,
        loading: action.payload,
      };

    case GLOBAL_STATS_LOADING:
      return {
        ...state,
        statsLoaging: action.payload,
      };

    case ALL_HISTORY_LOADED:
      return {
        ...state,
        allHistory: action.payload,
      }

    case EMPTY_DASHBOARD_DETAILS:
      return {
        ...state,
        allCountries: [],
      };

    default:
      return state;
  }
}
