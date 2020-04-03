import { GLOBAL_STATS_LOADED, ALL_COUNTRIES_LOADED, LOADING_ALL_COUNTRIES } from "ReduxActions/dashboardActions";

const initialState = {
  global: {
    cases: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    update: new Date(),
    affectedCountries: 0,
  },
  allCountries: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_STATS_LOADED:
        return {
          ...state,
          global: action.payload,
          cases: action.payload.cases,
          deaths: action.payload.deaths,
          recovered: action.payload.recovered,
          active: action.payload.active,
          update: action.payload.updated,
          affectedCountries: action.payload.affectedCountries,
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
        }

    default:
      return state;
  }
}
