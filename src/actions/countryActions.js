import api from "./api";

export const LOADING_COUNTRY_HISTORY = "country:history:loading";
export const COUNTRY_HISTORY_LOADED = "country:history:loaded";
export const COUNTRY_PROVINCES_LOADED = "country:provinces:loaded";
export const EMPTY_COUNTRY = "country:on:unmount";

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

export function onUnmount() {
  return dispatch => {
    dispatch({ type: EMPTY_COUNTRY });
  }
};

export function loadByProvinces(country) {
  return dispatch => {
    api.get(`/${country}`)
      .then(({data}) => {
        dispatch({ type: COUNTRY_PROVINCES_LOADED, payload: data });
      })
      .catch(err => {})
  }
}