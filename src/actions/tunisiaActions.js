import axios from "axios";

export const DONATION_LOADED = "tunisia:donation:loaded";

export function getDonation() {
  return dispatch => {
    axios.get(`https://apis.cni.tn/donate/getAmount`)
      .then(({data}) => {
        dispatch({ type: DONATION_LOADED, payload: data });
      })
      .catch(err => {})
  }
}getDonation