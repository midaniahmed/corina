import {
  LOADING_COUNTRY_HISTORY,
  COUNTRY_HISTORY_LOADED,
  EMPTY_COUNTRY,
  COUNTRY_PROVINCES_LOADED,
} from "ReduxActions/countryActions";

const initialState = {
  provinces: [],
  timeline: {
    cases: {},
    deaths: {},
    recovered: {},
  },
  statsByProvinces: [],
  country: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COUNTRY_HISTORY_LOADED:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case LOADING_COUNTRY_HISTORY:
      return {
        ...state,
        loading: action.payload,
      };
    
    case COUNTRY_PROVINCES_LOADED:
      return {
        ...state,
        statsByProvinces: action.payload,
      }

    case EMPTY_COUNTRY:
      return initialState;

    default:
      return state;
  }
}
