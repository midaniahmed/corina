import api from "./api";

export const LOADING_COUNTRY_HISTORY = "country:history:loading";
export const COUNTRY_HISTORY_LOADED = "country:history:loaded";

export function loadCountryHistory(code) {
  return dispatch => {
    dispatch({ type: LOADING_COUNTRY_HISTORY, payload: true });
    api.get(`/v2/historical/${code}`)
      .then(({data}) => {
        dispatch({ type: COUNTRY_HISTORY_LOADED, payload: data });
      })
      .catch(err => dispatch({ type: LOADING_COUNTRY_HISTORY, payload: false }))
  }
};