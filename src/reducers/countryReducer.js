import {
  LOADING_COUNTRY_HISTORY,
  COUNTRY_HISTORY_LOADED,
} from "ReduxActions/countryActions";

const initialState = {
  provinces: [],
  timeline: {
    cases: {},
    deaths: {},
    recovered: {},
  },
  country: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COUNTRY_HISTORY_LOADED:
      console.log(200, action.payload)
      return {
        ...state,
        ...action.payload,
        // provinces: action.payload.provinces,
        // country: action.payload.country,
        // cases: action.payload.timeline.cases,
        // deaths: action.payload.timeline.deaths,
        // recovered: action.payload.timeline.recovered,
        loading: false,
      };

    case LOADING_COUNTRY_HISTORY:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
