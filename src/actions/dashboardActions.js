import api from "./api";
import world from "Assets/images/world-map.png";

export const GLOBAL_STATS_LOADED = "dashboard:global:stats:loaded";
export const GLOBAL_STATS_LOADING = "dashboard:global:stats:loading";
export const ALL_COUNTRIES_LOADED = "dashboard:all:countries:loaded";
export const LOADING_ALL_COUNTRIES = "dashboard:all:countries:loading";

export function loadGlobalStats() {
  return dispatch => {
    dispatch({ type: GLOBAL_STATS_LOADING, payload: true });
    api.get("/all")
      .then(({data}) => {
        dispatch({ payload: data, type: GLOBAL_STATS_LOADED, map: world });
        dispatch({ type: GLOBAL_STATS_LOADING, payload: false });
      })
      .catch(err => dispatch({ type: GLOBAL_STATS_LOADING, payload: false }))
  }
};

export function loadAllCountries() {
  return dispatch => {
    dispatch({ type: LOADING_ALL_COUNTRIES, payload: true });
    api.get("/countries")
      .then(({data}) => {
        dispatch({ payload: data, type: ALL_COUNTRIES_LOADED });
      })
      .catch(err => dispatch({ type: LOADING_ALL_COUNTRIES, payload: false }))
  }
};

export function loadGlobalStatsByCountry(countryCode) {
  return dispatch => {
    dispatch({ type: GLOBAL_STATS_LOADING, payload: true });
    api.get(`/countries/${countryCode}`)
      .then(({data}) => {
        dispatch({ payload: data, type: GLOBAL_STATS_LOADED, map: data.countryInfo ? data.countryInfo.flag : world });
        dispatch({ type: GLOBAL_STATS_LOADING, payload: false });
      })
      .catch(err => dispatch({ type: GLOBAL_STATS_LOADING, payload: false }))
  }
};
