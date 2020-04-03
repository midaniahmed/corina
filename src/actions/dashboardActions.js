import api from "./api";

export const GLOBAL_STATS_LOADED = "dashboard:global:stats:loaded";
export const ALL_COUNTRIES_LOADED = "dashboard:all:countries:loaded";
export const LOADING_ALL_COUNTRIES = "dashboard:all:countries:loading";

export function loadGlobalStats() {
  return dispatch => {
    api.get("/all")
      .then(({data}) => {
        dispatch({ payload: data, type: GLOBAL_STATS_LOADED });
      })
      .catch(err => console.log(err))
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